//This is connection code
const mongoose = require('mongoose');
require('dotenv').config();
const connection = () => {
    mongoose.connect(process.env.MONGO_URL)
    console.log("Server listening on " + (process.env.PORT || 8080));
}

module.exports = connection;