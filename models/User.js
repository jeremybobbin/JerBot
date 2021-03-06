const mongoose = require("mongoose");
const Item = require("./Item.js");


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


        return this;


    },

    take(item, count = 1) {
        const userInstance = getUserInstance(this, item);
        console.log("USER: ", this);


        if(isNaN(count) || count < 0)
            throw `Cannot take ${count} ${item}`;

        console.log(userInstance);

        if(!userInstance || userInstance.count < count)
            throw `User doesn't have enough ${item}s.`;


        userInstance.count -= count;

        return this;

    },

    async buy(name, count = 1) {

        let item = await Item.findOne({ name });

        if(item === null)
            throw `Cannot find item ${name}`;

        return this.take("coin", item.price * count).give(item.name, count);

    },



    getInventory() {

        const inventoryObj = {};

        this.items.forEach(({name, count}) => {
           inventoryObj[name] = count;
        });

        return inventoryObj;
      
    },

    getUserInfo() {
        return this;
    }
        
    
    

}

const User = mongoose.model("User", UserSchema);




module.exports = User;
