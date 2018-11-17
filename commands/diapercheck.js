const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let sender = message.author;
	let TaggedUser = message.mentions.users.first();
	if(!message.mentions.users.size) {
							var msg1 = Array(4);
							msg1[1] = `${sender} Diaper is dry and clean`;
							msg1[2] = `${sender} Diaper is wet`;
							msg1[3] = `${sender} Diaper is messy`;
							msg1[4] = `${sender} Daiper is nonexistant becuase they are a big person`;
							var x = getRandomInt(0, 20);
							if (x < 5){
												if (x < 3){
																		message.channel.send(msg1[1]);
																	}
												else {
																		message.channel.send(msg1[3]);
																	}
											}
							else if (x<= 9) {
												if (x >= 7){
																		message.channel.send(msg1[2]); }
												else{
																		message.channel.send(msg1[4]);
																	}
											}
						}
			var msg1 = Array(4);
			msg1[1] = `${TaggedUser} Diaper is dry and clean`;
			msg1[2] = `${TaggedUser} Diaper is wet`;
			msg1[3] = `${TaggedUser} Diaper is messy`;
			msg1[4] = `${TaggedUser} Daiper is nonexistant becuase they are a big person`;
			var x = getRandomInt(0, 20);
			if (x < 5){
							if (x < 3){
												message.channel.send(msg1[1]);
											}
							else {
												message.channel.send(msg1[3]);
											}
						}
			else if (x<= 9) {
							if (x >= 7){
												message.channel.send(msg1[2]); }
							else{
												message.channel.send(msg1[4]);
											}
						}


}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
module.exports.help = {
	name: "diapercheck"
}
