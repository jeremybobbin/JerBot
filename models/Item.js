
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
        name: {
            type: String,
            unique: true
        },
        price: Number
});



module.exports = mongoose.model("Item", ItemSchema);
