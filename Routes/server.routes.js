// ********************************
// Mahe sure you follow all good practices and Do use comments to specify that this is your code so it will not create any confusion 
// ********************************


// Imports are here
const express = require('express');
const { UserModel } = require('../Models/user.model');
const { GroupModel } = require('../Models/group.model');
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateToken } = require('../Middleware/validate');
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
router.get('/user', validateToken, (req, res) => {
    // Here, you can access the user data from req.user and perform further actions

    // Assuming you have a user document, you can return it as a response
    const user = {
        id: req.user._id,
        name: req.user.username,
        email: req.user.email
        // Other user properties
    };
    res.json(user);
});
router.get("/room", async (req, res) => {
    try {
        res.json(await GroupModel.findById(req.query.id));
    }
    catch (err) {
        res.status(400).json(err);
    }
})
router.post("/add", async (req, res) => {
    await GroupModel.insertMany(req.body);
    res.json({ msg: 'success' });
})

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await UserModel.find({ username });
        if (user.length == 0) {
            bcrypt.hash(password, 5, async (err, hash) => {
                const new_user = new UserModel({ username, email, password: hash });
                await new_user.save();
                res.status(200).send({ "msg": "User has been added" });
            })
        } else {
            res.status(400).send({ "msg": "User already exists. Try another username" });
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserModel.find({ username });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user[0]._id }, process.env.jwtsecret);
                    //const refresh=jwt.sign({userId:user[0]._id},process.env.refreshsecret,{expiresIn:300});
                    res.status(200).send({ "msg": "Login Successful", "username": username, "token": token })
                } else {
                    res.status(400).send({ "msg": "Wrong credentials" })
                }
            })
        } else {
            res.status(400).send({ "msg": "Wrong credentials" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})

module.exports = { router };