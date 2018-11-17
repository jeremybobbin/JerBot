const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
		let bicon = sender.displayAvatarURL;
			let Botembed = new Discord.RichEmbed()
				.setDescription("Bot Information")
				.setColor("AQUA")
				.setFooter("a bot that more then likley just wet its self")
				.addField("Bot Name", sender.username)
				.addField("Created On", sender.createdAt)
				.addField("Joined this server at:", sender.joinedAt)
				.setThumbnail(bicon);
			return message.channel.send(Botembed);

}


module.exports.help = {
	name: "userinfo"
}
