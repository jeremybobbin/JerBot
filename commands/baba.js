const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    let response = `one bottle coming up ${message.author}`;
    

    if(TaggedUser = message.mentions.users.first()) 
        response = `hands bottle to ${TaggedUser}`


    message.react('🍼');
    message.channel.send(response);

}


module.exports.help = {
    name: "baba"
}
