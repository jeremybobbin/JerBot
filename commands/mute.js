const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
			if(!message.mentions.users.size){
							return 	message.channel.send(`i fwink ywouw fworgwot two mention a user two mute`);
						}
			TaggedUer.setMute(true, `${TaggedUser} was annoying the princess`)
			var channel = member.guild.channels.find(ch => ch.name === 'user-mute');
			channel.send(`${TaggedUser} was muted`);

}


module.exports.help = {
	name: "mute"
}
