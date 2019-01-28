const process = require('process');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use(express.static(__dirname))

io.on('connection', function (socket) {
    socket.on('sendServer',function(data){
        socket.broadcast.emit('sendClient',data)
    });
});

server.listen(process.argv[2], function () {
    console.log(server.address());
    console.log('Express server listening on ' + server.address().port);
});