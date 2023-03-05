const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: {
        origin:"*"
    },
});

io.on('connection', (socket) => {
    console.log(`SocketID: ${socket.id}`);

});

http.listen(5500, () => console.log('listening on 127.0.0.1:5500'));

console.log("Running Server!");