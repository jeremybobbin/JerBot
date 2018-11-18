
const Fmt = require("../models/Fmt.js");
const Parser = require("../models/Parser.js");

const Discord = require("discord.js");
const Users = require("../models/User.js");
const Item = require("../models/Item.js");

let storeItems = require("../Storage/storeItems.json");

var file = "../Storage/coins.json";
let coins = require(file);

var files = "../Storage/userItems.json";
let items = require(files);




module.exports.run = async (bot, message, args, storePrices, CollItems) => {
    
    const discordId = message.author.id;

    const user = await Users.findOne({ discordId });

    try {

        if(user === null) {
            user = new Users({ discordId });
            await user.save();
        }

        let { item, amount } = Parser.purchase(args);
        let inventory = user.getInventory();

        await user.buy(item, amount);

        invString = fmt.Inventory(user.name, inventory);

        message.channel.send(itemEmbed);

    } catch (err) {
        err = Fmt.Error(err);

        message.channel.send(err);

    }


}

module.exports.help = {
  name: "buy"
}
