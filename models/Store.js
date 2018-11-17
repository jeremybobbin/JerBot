
const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
    items: [{
        name: String,
        price: Number,
    }]
});
