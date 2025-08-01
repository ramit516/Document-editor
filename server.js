const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let documentContent = '';

io.on('connection', socket => {
  console.log('User connected');

  // Send current content to new client
  socket.emit('load-document', documentContent);

  socket.on('send-changes', (data) => {
    documentContent = data;
    socket.broadcast.emit('receive-changes', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

http.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
