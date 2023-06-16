const mongoose = require('mongoose');
const groupSchema = mongoose.Schema({
    name: String,
    members: [String],
    message: [
        {
            text: String,
            user: String,
            Date: String
        }
    ]
})
const GroupModel = mongoose.model('group', groupSchema)
module.exports = { GroupModel };