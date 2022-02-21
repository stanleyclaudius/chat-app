let users = []

const EditData = (data, id, call) => {
  const newData = data.map(item => item.id === id ? { ...item, call } : item)
  return newData
}

const socketServer = socket => {
  socket.on('joinUser', user => {
    users.push({id: user._id, socketId: socket.id})
  })

  socket.on('disconnect', () => {
    const data = users.find(item => item.socketId === socket.id)

    users.forEach(user => {
      socket.to(`${user.socketId}`).emit('checkUserOffline', data?.id)
    })

    if (data?.call) {
      const callUser = users.find(user => user.id === data.call)
      if (callUser) {
        users = EditData(users, callUser.id, null)
        socket.to(`${callUser.socketId}`).emit('callerDisconnect')
      }
    }

    users = users.filter(user => user.socketId !== socket.id)
  })
  
  socket.on('createMessage', data => {
    const client = users.find(user => user.id === data.recipient._id)
    if (client)
      socket.to(`${client.socketId}`).emit('createMessageToClient', data)
  })

  socket.on('typing', data => {
    const client = users.find(user => user.id === data.recipient)
    if (client)
      socket.to(`${client.socketId}`).emit('typingToClient', {
        message: data.sender.name + ' is typing ...'
      })
  })

  socket.on('doneTyping', data => {
    const client = users.find(user => user.id === data.recipient)
    if (client)
      socket.to(`${client.socketId}`).emit('doneTypingToClient', data)
  })

  socket.on('checkUserOnline', data => {
    users.forEach(user => {
      socket.to(`${user.socketId}`).emit('checkUserOnlineToClient', users)
    })

    socket.emit('checkUserOnlineToClient', users)
  })

  socket.on('readMessage', data => {
    const client = users.find(user => user.id === data.recipient)
    if (client)
      socket.to(`${client.socketId}`).emit('readMessageToClient', data)
  })

  socket.on('callUser', data => {
    users = EditData(users, data.sender, data.recipient)
    const client = users.find(user => user.id === data.recipient)
    if (client) {
      if (client.call) {
        users = EditData(users, data.sender, null)
        socket.emit('userBusy', data)
      } else {
        users = EditData(users, data.recipient, data.sender)
        socket.to(`${client.socketId}`).emit('callUserToClient', data)
      }
    }
  })

  socket.on('endCall', data => {
    const client = users.find(user => user.id === data.sender)

    if (client) {
      socket.to(`${client.socketId}`).emit('endCallToClient', data)
      users = EditData(users, client.id, null)

      if (client.call) {
        const clientCall = users.find(user => user.id === client.call)
        clientCall && socket.to(`${clientCall.socketId}`).emit('endCallToClient', data)
        users = EditData(users, client.call, null)
      }
    }
  })
}

module.exports = socketServer