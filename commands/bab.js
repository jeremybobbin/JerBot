const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let response = `you definly are ${message.author}`;


    if(TaggedUser = message.mentions.users.first())
        response = `yes ${TaggedUser} definly is *giggles*`;    

    message.channel.send(response);	
};

module.exports.help = {
    name: "bab"
}
