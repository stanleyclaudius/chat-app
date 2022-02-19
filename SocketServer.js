let users = []

const socketServer = socket => {
  socket.on('joinUser', user => {
    users.push({id: user._id, socketId: socket.id})
  })

  socket.on('disconnect', () => {
    const data = users.find(item => item.socketId === socket.id)

    users.forEach(user => {
      socket.to(`${user.socketId}`).emit('checkUserOffline', data?.id)
    })

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
}

module.exports = socketServer