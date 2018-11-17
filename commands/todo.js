const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	let bicon = sender.displayAvatarURL;
			let todo_embed = new Discord.RichEmbed()
				.setDescription("The todo list for this bot :) :")
				.setColor("AQUA")
				.setFooter("a bot that more then likley just wet its self")
				.addField("Todo:", "1. add assignable roles\n2. add a setup style command\n3. add unban command\n4. fix mute command\n5. add a logging system(in progress currently)\n6. add a xp system (like in corpbot)\n7. add image manipulation options (like in not so bot)\n8. pandoc file conversion(almost done)\n9. ffmpeg media conversion\n10. games\n11. auto pastebin/clyp/soundcloud/imgur uploading")
				.setThumbnail(bicon);
			message.channel.send(todo_embed);
		

}


module.exports.help = {
	name: "todo"
}
