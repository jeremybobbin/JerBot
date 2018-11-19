const Discord = require("discord.js");
const User = require("./User.js");


module.exports = class List {
    
    static ListInventory(discordId) {

        return new Discord.RichEmbed()
            .setColor("#2FE0D7")
            .addField(`${message.author.username}'s Updated Items:`, invString);
    }



}
