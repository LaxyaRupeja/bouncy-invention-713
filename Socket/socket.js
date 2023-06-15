const mongoose=require("mongoose");
//const express = require('express');
//const ChatModel = require('../Models/chat.model');
const {GroupModel} = require('../Models/group.model');
// Code from here
//const router = express.Router();
const socketIO = require('socket.io');

function getCurrentTime24() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
      
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;    
        var time24 = hours + ':' + minutes;
        return time24;
}
function initializeSocket(server) {
    const io = socketIO(server);
    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on("not", (nsg) => {
            console.log(nsg)
        })
        socket.on("joinRoom", async (msg) => {
            console.log(msg)
            socket.join(msg.roomID);
            //find by id group
            // { data:group.message }
            // io.to(data.roomID).emit('msgData', MessageData);
            const group=await GroupModel.find({_id:msg.roomID});
            console.log(group);
            io.to(data.roomID).emit('msgData', {data:group.message});
        })
        socket.on("message", async (data) => {
            console.log(data);
            // save in database
            // io.to(data.roomID).emit('chatMessage', data);
            const group=await GroupModel.find({_id:data.roomID});
            let tim=getCurrentTime24();
            let ms={
                text:data.msg,
                user:data.user,
                Date:tim
            }
            group.message.push(ms);
            await GroupModel.findByIdAndUpdate({_id:data.roomID},group);
            io.to(data.roomID).emit('msgData', {data:group.message});
            
        })
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

    });
}

module.exports = { initializeSocket }
