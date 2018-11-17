const Discord = require("discord.js");
let coins = require("../Storage/coins.json");

module.exports.run = async (bot, message, args) => {
  // Coins
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    }
  }

  let uCoins = coins[message.author.id].coins;

  coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#00FF00")
  .addField("🤑 💸 💰", uCoins);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}

module.exports.help = {
  name: "MYCOINS"
}
