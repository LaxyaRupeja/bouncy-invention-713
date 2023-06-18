const mongoose = require('mongoose');
const groupSchema = mongoose.Schema({
    name: String,
    members: [String],
    message: [
        {
            text: String,
            user: {
                type: mongoose.Types.ObjectId,
                ref: "user",
            },
            Date: String
        }
    ]
})
const GroupModel = mongoose.model('group', groupSchema)
module.exports = { GroupModel };