let users = []

const socketServer = socket => {
  socket.on('joinUser', user => {
    users.push({id: user._id, socketId: socket.id})
  })

  socket.on('disconnect', () => {
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
}

module.exports = socketServer