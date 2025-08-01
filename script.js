const socket = io();
const editor = document.getElementById('editor');

socket.on('load-document', content => {
  editor.value = content;
});

editor.addEventListener('input', () => {
  socket.emit('send-changes', editor.value);
});

socket.on('receive-changes', content => {
  editor.value = content;
});
