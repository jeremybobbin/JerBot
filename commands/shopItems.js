const Discord = require("discord.js");
let storeItems = require("../Storage/storeItems.json");
let fs = require("fs")
module.exports.run = async (bot, message, args, storePrices) => {
  if(!storeItems[1]){
    storeItems[1] = storePrices;
  }

  let milk = storeItems[1].Milk;
  let food = storeItems[1].Food;
  let maid = storeItems[1].Maid;
  let geese = storeItems[1].Geese;

  itemEmbed = new Discord.RichEmbed()
  .setColor("#E82ED5")
  .addField("Items", `
    **Milk Price:** ${milk}
    **Maid Price:** ${maid}
    **Food Price:** ${food}
    **Geese Price:** ${geese}
  `)
  .setFooter("More to come 😋");

  message.channel.send(itemEmbed)
}

module.exports.help = {
  name: "SHOPPRICES"
}
