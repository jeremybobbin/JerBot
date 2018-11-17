const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    discordId: String,
    joined: {
        type: Date,
        default: Date.now
    },
    items: [{
        name: String,
        count: {
            type: Number,
            default: 0
        }
    }]
});


UserSchema.methods = {

    give(item, count) {
        if(count < 1 || isNaN(count))
            throw `Cannot give ${count} ${item}.`;


        if(isNaN(this.items[item].count))
            this.items[item] = {
                name: item,
                count: 0
            };


        this.items[items].count += count;

        return this.save();
    },

    take(item, count) {
        if(isNaN(count) || count < 0)
            throw `Cannot take ${count} ${item}`;

        if(isNaN(this.items[item].count))
            throw `User does not own any ${item}`;

        if(this.items[item].count < count)
            throw `Tried to take ${count} ${item}s but user only has ${this.items[item].count}`;

        this.items[item].count -= count;


    }
        
    

}

const User = mongoose.model("User", UserSchema);




module.exports = User;
