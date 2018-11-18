
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
        name: String,
        price: Number,
});

ItemSchema.methods = {


    
}

module.exports = mongoose.model("Item", ItemSchema);
