

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    socket.on('setup', (userData) => {
      if (userData) {
        // console.log(`${userData.username} joined`);
        socket.emit('connected');
      }
    });

    socket.on('joinChat', (room) => {
      socket.join(room);
    });

    socket.on('newMsg', (newMsgRecieved) => {
      var chat = newMsgRecieved.chat;
      if (!chat.users) return console.log('chat.users not defined');
      chat.users.forEach((user) => {
        if (user._id === newMsgRecieved.sender._id) return;
        socket.to(user._id).emit('msgRecieved', newMsgRecieved);
      });
    });

    socket.on('typing', (room) => {
      socket.to(room).emit('typing')
    });
    socket.on('notTyping', (room) => {
      socket.to(room).emit('notTyping')
    });
    socket.off('setup', () => {
      socket.leave(userData._id)
    });
  });
};

module.exports = socketHandler;