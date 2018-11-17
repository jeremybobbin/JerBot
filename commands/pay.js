const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../Storage/coins.json")

module.exports.run = async (bot, message, args) => {
  if (!coins[message.author.id]) {
    return message.reply("you don't have any coins");
  }

  let pUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args));
  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  if(sCoins < args[0]) return message.reply("Not enough coins");

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

  message.channel.send(`${message.author.username} has given ${pUser.username} ${args[1]} coins`);

  fs.writeFile("../Storage/coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err);
  })
}

module.exports.help = {
  name: "PAY"
}
