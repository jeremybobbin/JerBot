const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
			if(!message.mentions.users.size){
							return 	message.channel.send(`i fwink ywouw fworgwot two mention a user two unmute`);
						}
			message.guild.member.setMute(false, `${TaggedUser} appolgized and gave *hugs* to the princess`);
			var channel = member.guild.channels.find(ch => ch.name === 'user-mute');
			channel.send(`${TaggedUser} was unmuted`);

}


module.exports.help = {
	name: "unmute"
}
