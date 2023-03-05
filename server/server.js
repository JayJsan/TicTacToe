//const http = require('http').createServer();

const io = require('socket.io')(3000, {
    cors: {
        origin:"*"
    },
});

io.on('connection', (socket) => {
    console.log(`SocketID: ${socket.id}`);
    socket.on('send-message', (message, room) => {
        // if room is empty, dont send message to anyone
        // otherwise, send message to that room
        if (room === '') {
            //socket.broadcast.emit('receive-message', message)
            return;
        } else {
            socket.to(room).emit("receive-message", message);
        }
    });
    socket.on('join-room', (room, cb) => {
        socket.join(room);
        cb(`Joined ${room}`);
    });
});

//http.listen(5500, () => console.log('listening on 127.0.0.1:5500'));

console.log("Running Server!");