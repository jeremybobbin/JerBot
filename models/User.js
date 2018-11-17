const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name: String,
    discordId: String,
    joined: {
        type: Date,
        default: Date.now
    },
    coins: {
        type: Number,
        default: 0
    },
    items: [{
        name: String,
        count: Number
    }]
});


const User = mongoose.model("User", UserSchema);


module.exports = User;
