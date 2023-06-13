// ********************************
// Mahe sure you follow all good practices and Do use comments to specify that this is your code so it will not create any confusion 
// ********************************


// Imports are here
const express = require('express');
const router = express.Router();
// Code from here
router.get("/", (req, res) => {
    res.send(`<h1 style="text-align:center; font-size:50px;">Chatify - Home Route</h1>`)
})
module.exports = { router };