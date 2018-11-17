const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
			embed = new Discord.RichEmbed()
				.setDescription("how to make hot choclate")
				.setColor("AQUA").setFooter("a bot that more then likley just wet its self")
				.addField("ingregents", "one scoop of formula milk\n100ML hemp milk\n 4 tea spoons choca powder\none baby bottle\n warm water")
				.addField("Instructions", "1.clean out bottle\n2.add formula powder\n3. add hemp milk\n4.shake well \n5.heat for 40 seconds \n6.add coco powder\n7.shake well again\n8.enjoy")
			message.channel.send(embed);

}


module.exports.help = {
	name: "hot-choclate"
}
