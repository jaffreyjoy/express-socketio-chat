var ip = 'express-socketio-chat.herokuapp.com';
var socket = io.connect(ip);

name = prompt('Enter your name');

document.getElementById('messageBox').focus();

sendButton = document.getElementById('sendButton');
messageBox = document.getElementById('messageBox');
messagesArea = document.getElementById('messagesArea');

function sendMessage() {
    message = messageBox.value;
    if(message != '') {
        messagesArea.innerHTML += `
            <p style="padding-right:2vh;padding-left:2vh;" align="right"><strong>${'You'}</strong> : ${message}<p>
        `;
        socket.emit('sendServer', {name,message});
        messageBox.value = '';
    }
}

function keyPressEvent(e) {
    console.log(e)
    if(e.keyCode == 13) {
        sendMessage();
    }
}

messageBox.addEventListener('keyup',keyPressEvent);

sendButton.addEventListener('click', sendMessage);

socket.on('sendClient',function(data) {
    messagesArea.innerHTML += `
        <p style="padding-right:2vh;padding-left:2vh;" align="left">
            <strong>${data.name}</strong>: ${data.message}
        <p>
    `;
})