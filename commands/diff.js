const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
			if(args < 1 ||args2 < 1){
							message.channel.send('ywouw nweed 2 files two dwo a diff *giggles*');
						}
			else {
							var diffrence = deepdiff(args, args2);
							message.channel.send(`this is the diffrence:\`\`\`${diffrence}\`\`\``);
						}
		
}


module.exports.help = {
	name: "diff"
}
