const socketIO = require('socket.io');
function initializeSocket(server) {
    const io = socketIO(server);
    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on("not", (nsg) => {
            console.log(nsg)
        })
        socket.on("joinRoom", (msg) => {
            console.log(msg)
            socket.join(msg.roomID);
            //find by id group
            // { data:group.message }
            // io.to(data.roomID).emit('msgData', MessageData);
        })
        socket.on("message", (data) => {
            console.log(data);
            // save in database
            // io.to(data.roomID).emit('chatMessage', data);
            // io.to(data.roomID).emit('msgData', MessageData);
            // 
        })
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

    });
}

module.exports = { initializeSocket }
