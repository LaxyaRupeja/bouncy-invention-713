// ********************************
// Mahe sure you follow all good practices and Do use comments to specify that this is your code so it will not create any confusion 
// ********************************


// Imports are here
const express = require('express');
const ChatModel = require('../Models/chat.model');
const { GroupModel } = require('../Models/group.model');
// Code from here
const router = express.Router();
router.get("/", (req, res) => {
    res.send(`<h1 style="text-align:center; font-size:50px;">Chatify - Home Route</h1>`)
})
router.get("/group", async (req, res) => {
    try {
        console.log(await GroupModel.find())
        res.json(await GroupModel.find());
    }
    catch (err) {
        res.status(400).json(err);
    }
})
router.post("/add", async (req, res) => {
    await GroupModel.insertMany(req.body);
    res.json({ msg: 'success' });
})

module.exports = { router };