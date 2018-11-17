const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
			guild.unban('some user ID')
				.then(user => console.log(`Unbanned ${user.username} from ${guild}`))
				.catch(console.error);


}


module.exports.help = {
	name: "unban"
}
