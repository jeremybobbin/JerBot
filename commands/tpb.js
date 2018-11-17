const Discord = require("discord.js");
const TPB = require("thepiratebay");
module.exports.run = async (bot, message, args) => {
	let searchTerm = args[1];
	if(!searchTerm) {
	message.channel.send("Ywouw hwas a blwank swearch qwuery, i cwant nwot fwind awnyfwing wiv owut dat");
	return;
	}
	TPB.search(`${searchTerm}`, {
		category: 'all',
		page: '0',
		orderBy: 'date'
	
	})
	.then(results => message.channel.send(results.name, results.link))
	.catch(err => console.log(err));
}


module.exports.help = {
	name: "tpb"
}
