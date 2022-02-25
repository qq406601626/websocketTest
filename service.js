const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server:socketServer } = require("socket.io");
const socketIo =  new socketServer(server);

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});
socketIo.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // 向所有人发送消息
        // socketIo.emit('replay client', { someProperty: 'some value', otherProperty: 'other value' });
        // 向指定socket连接用户发送消息。该例中socket为最后一个连接的用户。
        socket.broadcast.emit('replay client', { someProperty: 'some value', otherProperty: 'other value' });
    });
});
server.listen(3000, () => {
    console.log('listening on *:3000');
});
