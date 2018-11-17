const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    discordId: {
        type: String,
        unique: true
    },
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


const getUserInstance = (user, itemName) => 
    user.items.find(({name}) => name === itemName);

UserSchema.methods = {

    give(item, count = 1) {

        const userInstance = getUserInstance(this, item);

        if(count < 1 || isNaN(count))
            throw `Cannot give ${count} ${item}.`;


        if(userInstance) userInstance.count += count;
        else this.items.push({
                name: item,
                count
            });


        console.log(this);
        return this.save();
    },

    take(item, count = 1) {
        const userInstance = getUserInstance(this, item);

        if(isNaN(count) || count < 0)
            throw `Cannot take ${count} ${item}`;

        if(userInstance === null || userInstance.count < count)
            throw `User doesn't have enough ${item}`;


        userInstance.count -= count;


        this.save();
    }
        
    

}

const User = mongoose.model("User", UserSchema);




module.exports = User;
