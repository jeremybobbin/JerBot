const Discord = require("discord.js");
let items = require("../Storage/userItems.json");

module.exports.run = async (bot, message, args, CollItems) => {
  if(!items[message.author.id]){
    items[message.author.id] = CollItems
  };

  let maid = items[message.author.id].Maid;
  let geese = items[message.author.id].Geese;
  let food = items[message.author.id].Food;
  let milk = items[message.author.id].Milk;

  let itemEmbed = new Discord.RichEmbed()
  .setColor("#2FE0D7")
  .addField(`${message.author.username}'s Items:`, `
    **Milk amount:** ${milk}
    **Maid amount:** ${maid}
    **Food amount:** ${food}
    **Geese amount:** ${geese}
  `);

  message.channel.send(itemEmbed)
}

module.exports.help = {
  name: "MYITEMS"
}
