const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
			let sicon = message.guild.iconURL;
			let serverembed = new Discord.RichEmbed()
				.setDescription("Bot Information")
				.setColor("AQUA")
				.setFooter("a bot that more then likley just wet its self")
				.addField("Server Name", message.guild.name)
				.addField("Created On", message.guild.createdAt)
				.addField("total number of members", message.guild.memberCount)
				.setThumbnail(sicon);
			message.channel.send(serverembed);

}


module.exports.help = {
	name: "serverinfo"
}
