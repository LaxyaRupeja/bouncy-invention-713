const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(__dirname + '/public'));

// Store connected clients in a room
const room = 'video-room';
let clients = [];

// Handle incoming socket connections
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.get("/room.html", (req, res) => {
    res.sendFile(__dirname + '/room.html');
})
io.on('connection', socket => {
    console.log('New user connected');

    // Join the room
    socket.join(room);

    // Add the new client to the list
    clients.push(socket.id);

    // Notify other clients about the new connection
    socket.broadcast.to(room).emit('userConnected', socket.id);

    // Listen for signaling messages
    socket.on('signalingMessage', message => {
        // Send the message to the other clients in the room
        console.log("yoo")
        socket.broadcast.to(room).emit('signalingMessage', message);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');

        // Remove the client from the list
        clients = clients.filter(client => client !== socket.id);

        // Notify other clients about the disconnection
        socket.broadcast.to(room).emit('userDisconnected', socket.id);
    });
});