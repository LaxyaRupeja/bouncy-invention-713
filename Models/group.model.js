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
// function getCurrentTime24() {
//     var date = new Date();
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
  
//     hours = hours < 10 ? '0' + hours : hours;
//     minutes = minutes < 10 ? '0' + minutes : minutes;    
//     var time24 = hours + ':' + minutes;
//     return time24;
//   }
  
const GroupModel = mongoose.model('groups', groupSchema)
module.exports = GroupModel