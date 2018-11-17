const Discord = require("discord.js");
let storeItems = require("../Storage/storeItems.json");

var file = "../Storage/coins.json";
let coins = require(file);

var files = "../Storage/userItems.json";
let items = require(files);

module.exports.run = async (bot, message, args, storePrices, CollItems) => {

    console.log("Hello?");

    if(!storeItems[1]){
        storeItems[1] = storePrices;
    }

    if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        }
    }

    if(!items[message.author.id]){
        items[message.author.id] = CollItems;
    }


    let uCoins = coins[message.author.id].coins;
    let milk = storeItems[1].Milk;

    if(!args[0])
        return console.log("No Args");

    let input = args[0].toUpperCase();

    if(input === "MILK"){
        console.log("Milk");
        var item = storeItems[1].Milk;
        var type = "Milk";
    } else if(input === "MAID"){
        console.log("Maid");
        var item = storeItems[1].Maid;
        var type = "Maid";
    } else if(input === "FOOD"){
        console.log("Food");
        var item = storeItems[1].Food;
        var type = "Food";
    } else if(input === "GEESE"){
        console.log("Geese");
        var type = "Geese";
        var item = storeItems[1].Geese;
    }

    try {
        var response = await message.channel.awaitMessages(message2 => message2.content, {
            maxMatches: 1
        });
    } catch (err) {
        console.log(err);
    }

    let itemSel = response.first().content;
    // console.log(itemSel);

    var cost = item * itemSel;
    message.channel.send(`The Total Cost for ${itemSel} **${input}** is ${cost} coins`);

    // console.log(uCoins);
    if(cost > uCoins)
        return message.channel.send(`You do not have enough coins ${uCoins} coins`);

    var added = uCoins - cost;
    var sender = message.author.id;

    message.channel.send(`Your balance is now ${added} coins`);

    let umaid = items[message.author.id].Maid;
    let ugeese = items[message.author.id].Geese;
    let ufood = items[message.author.id].Food;
    let umilk = items[message.author.id].Milk;

    let itemEmbed = new Discord.RichEmbed()
        .setColor("#2FE0D7")
        .addField(
            `${message.author.username}'s Updated Items:`, `
            **Milk amount:** ${umilk}
            **Maid amount:** ${umaid}
            **Food amount:** ${ufood}
            **Geese amount:** ${ugeese}`
        );

    message.channel.send(itemEmbed)

    coinS(added, sender);
    userI(type, sender, itemSel);
}

module.exports.help = {
  name: "BUY"
}
