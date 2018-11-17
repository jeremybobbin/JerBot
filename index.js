// todo:
// pandoc command
// fix player
// add image mapipulation commands
// fix mute/unmute
// add ffmpeg conversion commands
// add logging system
//
const fs = require("fs");
const path = require('path');
const ytdl = require('youtube-dl');
const pandoc = require('node-pandoc');
const imagemagick = require('imagemagick');
const deepdiff = require('deep-diff').diff;
const YouTube = require('simple-youtube-api');
const Discord = require("discord.js");


const botconfig = require("./config.json");



const storeFile = "./Storage/storeItems.json";
const files = "./Storage/userItems.json";
const file = "./Storage/coins.json";


const coins = require(file);
const items = require(files);
const storeItems = require(storeFile)


const bot = new Discord.Client();
bot.commands = new Discord.Collection();
console.log






const streamOptions = { seek: 0, volume: 1 };
const broadcast = bot.createVoiceBroadcast();
const youtube = new YouTube(botconfig.api_key);
const queue = new Map();



const CollItems = {
	Milk:  0,
	Food:  0,
	Pacis: 0,
	diapers: 0,
	stuffies: 0,
	toys: 0,
	onesies: 0,
	cookies: 0,
	jucie: 0,
	paciClips: 0,
	HairBands: 0,
	HeadBands: 0,
	dresses: 0,
	braclets: 0
};

const storePrices = {
	Milk:  3,
	Food:  6,
	Pacis: 15,
	diapers: 1,
	stuffies: 30,
	toys: 50,
	onesies: 90,
	cookies: 7,
	jucie: 4,
	paciClips: 12,
	HairBands: 5,
	dresses: 150,
	braclets: 70
};




// Need to install ytdl core & opusscript
//fs.readdir("./commands/", (err, file) => {
//		if(err) console.log(err);
//
//		let jsfile = file.filter(f => f.split(".").pop() === "js")
//	if(jsfile.length <= 0) {
//		console.log("couldn't find commands");
//	return; 
//	}
//})

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}





// BOT EVENT HANDLING

bot.on("ready", async () => {
	console.log(`${bot.user.username} is online`)
	bot.user.setActivity("with himself");
});


bot.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.find(ch => ch.name === 'waves');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Hewwo ${member} Welcome to the nursrey, please remember to read da ruelz and say hewwo *smiles*`);
});

bot.on('guildMemberRemove', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'bwyebwye');
	if (!channel) return;
	channel.send(`ByeBye ${member} the nursey will be sad without you`);
});

bot.on('messageDelete', message => {
var delmsg = message;
const channel = message.guild.channels.find(ch => ch.name === `messages-deleted`);
	if(!channel) return;
	channel.send(`Message deleted:\`\`\`${delmsg}\`\`\` `)
});

bot.on('messageUpdate', message => {
var changedmsg = message;
const channel = message.guild.channels.find(ch => ch.name === `messages-edited`);
	if(!channel) return;
	channel.send(`message edited from: \`\`\`${changedmsg}\`\`\` `)
});


fs.readdir('./commands/', (err, files) => {
    if(err) console.log(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if(jsfiles.length <= 0){
        console.log("Couldn't find commands");
        return;
    }


    const commandsSkipped = [
        "diff",
        "guy",
        "coins",
        "diapercheck",
        "hot-choclate",
        "items",
        "mute",
        "nini",
        "paci",
        "panodc",
        "pay",
        "ping",
        "profilepicture",
        "serverinfo",
        "shopItems",
        "todo",
        "tpb",
        "unban",
        "unmute",
        "userinfo",

    ];

    commandsSkipped.forEach((command, index) => {
        commandsSkipped[index] = command + ".js";
    });


    jsfiles.forEach((file, i) => {

        if(!commandsSkipped.includes(file)) {
            let props = require(`./commands/${file}`);

            console.log(`${file} loaded`)
            bot.commands.set(props.help.name, props);
        }

    });
});




bot.on("message", async (message) => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;


    const server = message.guild;


    global.userI = (what, user, amountString) => {

        let amount;

        try {
            amount = parseInt(amountString);

        } catch (err) {

            console.log(`User ${user} tried to get ${what} but entered an invalid number`);
            return; 
        }

            
        const possibleItems = [
            "Milk",
            "Food",
            "Diapers",
            "Stuffies",
            "Toys",
            "Onsie",
            "Cookie",
            "Juice",
            "PaciClip",
            "HarBands",
            "Dresses",
            "Braclets"
        ];

        // If requested item isn't a possible item.
        if(!possibleItems.includes(what)) 
            console.log(`User tried to get "${what}", but it doesn't exist.`);


        if(!items.includes(user))
            console.log(`User ${user} tried to get an item, but that user doesn't exist`);


        items.user[what] += amount;

    }



    // In this format, "return" is assumed.
    // getArgs("Bleep Blop Bloop") will return ["Blop", "Bloop"];
    const getArgs = (content) => content.split(" ").slice(1);

    const sender = message.author;
    const prefix = botconfig.prefix;
    const messageArray = message.content.split(" ");
    const searchString = messageArray.slice(1).join(' ');
    const command = messageArray[0];
    const input = messageArray[1];
    const args = messageArray.slice(1);
    const url = input ? input.replace(/<.+>/g, `$1`): '';
    const users = message.author;
    const args2 = messageArray[2];

    const TaggedUser = message.mentions.users.first();
    const serverQueue = queue.get(message.guild.id);


//    fs.writeFile(files, JSON.stringify(items), (err) => {
//        if(err) console.log(err);
//    });
//
//
//
//    if(!coins[sender.id]) {
//        coins[sender.id] = CollItems;
//    }
//
//    if(!storeItems[1]) {
//        storeItems[1] = storePrices;
//    }

    //store items
//    fs.writeFile(storeFile, JSON.stringify(items), (err) => {
//        if(err) console.log(err);
//    });
//
//
//    fs.writeFile(files, JSON.stringify(items), (err) => { 
//        if(err) console.log(err)
//    });
//
//    let coinAmt = Math.floor(Math.random() * 15) + 1;
//    let baseAmt = Math.floor(Math.random() * 15) + 1;
//
//    if(coinAmt === baseAmt){
//        coins[sender.id].coins += coinAmt;  
//
//        fs.writeFile(file, JSON.stringify(coins), (err) => {
//            if (err) console.log(err);
//        });
//    }



    let commandfile = bot.commands.get(command.slice(prefix.length));

    if(commandfile) commandfile.run(bot,message,args,storePrices,CollItems);


    //// if(command === `${prefix}help`) {
    //		let commands = 'baba\npaci\nfurry\nnini\nsource\nhelp\nspank\nchocey\npopcorn\njazzhands\npizza\ninvite\nping\ndiapercheck\nplay\nnp\nvolume\npause\nstop\nUserInfo\nprofilepicture\ntodolist\nserverinfo';
    //		let help_embed = new Discord.RichEmbed()
    //
    //			.setDescription("help me!")
    //			.setTitle("baby bot")
    //			.setColor('AQUA')
    //			.setFooter("a bot that more then likley just wet its self")
    //			.addField("baby-bot", `${commands}`)
    //		message.channel.send(help_embed);
    //	}
    //	if(command === `${prefix}source`) {
    //		let link = 'https://gitgud.io/babyprincess/baby-bot/tree/master';
    //		let source_embed = new Discord.RichEmbed()
    //			.setDescription("help me!")
    //			.setTitle("baby bot")
    //			.setColor('AQUA')
    //			.setFooter("a bot that more then likley just wet its self")
    //			.addField(`my babyishness thats holding me toghter are located at: ${link}`)
    //		message.channel.send(source_embed);
    //	}
    //
    //
    //	if(command === `${prefix}furry`) {
    //		let user = `<@161875606856794112>`
    //		message.channel.send(`${user} definlty is`);
    //	}
    //
    //
    //	if(command === `${prefix}spank`) {
    //		if(!message.mentions.users.size) {
    //			return message.channel.send(`what your going to spank yourself? okay then`);
    //		}
    //
    //		let dom = message.author;
    //		message.channel.send(`${dom} puts ${TaggedUser} over there knee and spanks them until they are crying`);
    //	}
    //	if(command === `${prefix}popcorn`) {
    //		if(!message.mentions.users.size) {
    //			return message.channel.send('you take a bag of popcorn for yourself');
    //		}
    //		message.channel.send(`you gave ${TaggedUser} a bag of popcorn`);
    //	}
    //
    //	if(command === `${prefix}chocey`) {
    //		if(!message.mentions.users.size) {
    //			return message.channel.send('you take a bar of choclate for you to eat');
    //		}
    //		message.channel.send(`you gave ${TaggedUser} some of your choclate bar`);
    //	}
    //	if(command === `${prefix}jazzhands`) {
    //		message.channel.send(`JAZZHANDS`);
    //	}
    //	if(command === `${prefix}pizza`) {
    //		if(!message.mentions.users.size) {
    //			return message.channel.send(`you take a pecie of pizza`)
    //		}
    //		message.channel.send(`${users} gave ${TaggedUser} a pecice of pizza`);
    //	}
    //	if(command === `${prefix}invite`) {
    //		let invite_embed = new Discord.RichEmbed()
    //			.setDescription("Invite")
    //			.setTitle("baby bot")
    //			.setColor('AQUA')
    //			.setFooter("a bot that more then likley just wet its self")
    //			.addField('https://discordapp.com/oauth2/authorize?client_id=480495916063784985&scope=bot')
    //		message.channel.send(invite_embed);
    //	}
    //
    //	if (command === `${prefix}kick`) {
    //		// Assuming we mention someone in the message, this will return the user
    //		// Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    //		const user = message.mentions.users.first();
    //		// If we have a user mentioned
    //		if (user) {
    //			// Now we get the member from the user
    //			const member = message.guild.member(user);
    //			// If the member is in the guild
    //			if (member) {
    //				/**
    //				 * Kick the member
    //				 * Make sure you run this on a member, not a user!
    //				 * There are big differences between a user and a member
    //				 */
    //				member.kick('Reason will be shown in the aduit log').then(() => {
    //					// We let the message author know we were able to kick the person
    //					const kick_log_channel = member.guild.channels.find(ch => ch.name === 'user-kicked');
    //					kick_log_channel.send('${user} was kicked from the nursey, they can come back when they behave');
    //					message.reply(`Successfully kicked ${user.tag} from the nursey, they can come back when they behave`);
    //				}).catch(err => {
    //					// An error happened
    //					// This is generally due to the bot not being able to kick the member,
    //					// either due to missing permissions or role hierarchy
    //					message.reply('owh nwo i cwant kick dis person');
    //					// Log the error
    //					console.error(err);
    //				});
    //			} else {
    //				// The mentioned user isn't in this guild
    //				message.reply('silly you, that user isn\'t in the nursery *giggles*');
    //			}
    //			// Otherwise, if no user was mentioned
    //		} else {
    //			message.reply('*giggles* i fwink ywouw fworgwot to mention a user to kick');
    //		}
    //	}
    //	if (command === `${prefix}ban`) {
    //		// Assuming we mention someone in the message, this will return the user
    //		// Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    //		const user = message.mentions.users.first();
    //		// If we have a user mentioned
    //		if (user) {
    //			// Now we get the member from the user
    //			const member = message.guild.member(user);
    //			// If the member is in the guild
    //			if (member) {
    //				/**
    //				 * Ban the member
    //				 * Make sure you run this on a member, not a user!
    //				 * There are big differences between a user and a member
    //				 * Read more about what ban options there are over at
    //				 * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
    //				 */
    //				member.ban({
    //					reason: 'They were bad, and broke the rules to much, so they can miss out on the nursey',
    //				}).then(() => {
    //					// We let the message author know we were able to ban the person
    //					const log_ban_channel = member.guild.channels.find(ch => ch.name === `user-banned`);
    //					log_ban_channel.send(`${user} was naughty awnd nwow gwets two mwiss owut own da nwursery`); 
    //
    //					message.reply(`Successfully banned ${user.tag}`);
    //
    //				}).catch(err => {
    //					// An error happened
    //					// This is generally due to the bot not being able to ban the member,
    //					// either due to missing permissions or role hierarchy
    //					message.reply('owh nwo i could not ban ban dat user');
    //					// Log the error
    //					console.error(err);
    //				});
    //			} else {
    //				// The mentioned user isn't in this guild
    //				message.reply('silly you that person is not in dis server');
    //			}
    //		} else {
    //			// Otherwise, if no user was mentioned
    //			message.reply('*giggles* i fwink ywouw fworgwot two mention a user two ban');
    //		}
    //	}
    //
    //	if(command === `${prefix}play`) {
    //		Music(input);
    //	}
    //
    //	if(command === `${prefix}ping`) {
    //		ping = bot.ping;
    //		message.channel.send(`pong: ${ping}`);
    //	}
    //
    //	if(command === `${prefix}stop`){
    //		if(message.guild.voiceConnection){
    //			message.guild.voiceConnection.disconnect();
    //		}
    //		else{
    //			message.reply("I must be in a voice channel to be banished by the Kea")
    //		}
    //	}
    //
    //// Plays Music
    //	if(command === `${prefix}play`){
    //		const voiceChannel = message.member.voiceChannel;
    //
    //		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
    //			const playlist = await youtube.getPlaylist(url);
    //			console.log(playlist);
    //			const videos = await playlist.getVideos();
    //			message.channel.send(`Playlist: **${playlist.title}** Has been add to the queue`)
    //			for (const video of Object.values(videos)){
    //				const video2 = await youtube.getVideoByID(video.id);
    //				await handleVideo(video2, message, voiceChannel, true);
    //			}
    //
    //		} else {
    //			try{
    //				var video = await youtube.getVideo(url);
    //			} catch(error) {
    //				try {
    //					var videos = await youtube.searchVideos(searchString, 10);
    //					let index = 0;
    //					message.channel.send(`
    //						__**Song Selections:**__
    //						${videos.map(video2 => `**${index}** ${video2.title}`).join('\n')}
    //
    //						Please Provide a value to select search results from 1 to 10
    //						`);
    //					// Disable next-line max-depth
    //					try {
    //						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
    //							maxMatches: 1,
    //							time: 10000,
    //							errors: ['time']
    //						});
    //					} catch (err) {
    //						console.log(err)
    //						return message.channel.send("No value entered, cancelling video Selection");
    //					}
    //					const videoIndex = parseInt(response.first().content);
    //					console.log(videoIndex);
    //					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
    //				} catch(err) {
    //					console.error(err);
    //					return message.channel.send("I could not contain any search results");
    //				}
    //			}
    //
    //			return handleVideo(video, message, voiceChannel);
    //		}
    //	}
    //
    //	if(command === `${prefix}skip`){
    //		if(!message.member.voiceChannel) return message.channel.send("You are not in voice channel")
    //		if(!serverQueue) return message.channel.send("There's nothing playing that i could skip");
    //		serverQueue.connection.dispatcher.end();
    //		return undefined;
    //	}
    //
    //	if(command === `${prefix}stop`){
    //		if(!message.member.voiceChannel) return message.channel.send("You are not in a voice channel");
    //		if(!serverQueue) return message.channel.send("There's nothing playing that I could stop");
    //		serverQueue.songs = [];
    //		serverQueue.connection.dispatcher.end();
    //		return undefined;
    //	}
    //
    //	if(command === `${prefix}np`){
    //		if(!serverQueue) return message.channel.send("Nothing is being played atm");
    //		return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
    //	}
    //
    //	if(command === `${prefix}volume`){
    //		if(!serverQueue) return message.channel.send("Nothing is being played atm");
    //		if (!input) return message.channel.send(`The current volume is: ${serverQueue.volume}`);
    //		serverQueue.volume = input;
    //		serverQueue.connection.dispatcher.setVolumeLogarithmic(input / 5);
    //		return message.channel.send(`I set the Volume to: **${serverQueue.volume}**`);
    //	}
    //
    //	if(command === `${prefix}queue`){
    //		if(!serverQueue) return message.channel.send("Nothing is being played atm");
    //		return message.channel.send(`
    //			__**Song Queue:**__
    //			${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
    //
    //			**Now Playing:** ${serverQueue.songs[0].title}
    //			`);
    //	}
    //
    //	if(command === `${prefix}resume`){
    //		if(serverQueue && !serverQueue.playing){
    //			serverQueue.playing = true;
    //			serverQueue.connection.dispatcher.resume();
    //			return message.channel.send("Resumed the music for you");
    //		}
    //		return message.channel.send("Nothing is playing");
    //	}
    //
    //	if(command === `${prefix}pause`){
    //		if(serverQueue && serverQueue.playing){
    //			serverQueue.playing = false;
    //			serverQueue.connection.dispatcher.pause();
    //			return message.channel.send("Paused the music for you");
    //		}
    //		return message.channel.send("Nothing is playing");
    //	}
    //	//to come
    //	//may take a while to implement
    //
    //
    //
    //	if(command === `${prefix}serverprofile`) {
    //		message.channel.send('this command is yet to come');
    //	}
    //	
    //
    //	if(command === `${prefix}tocome`) {
    //		messgae.channel.send('this command is yet to come');
    //	}




});


//.catch(console.error);
async function handleVideo(video, message, voiceChannel, playlist = false) {

	const serverQueue = queue.get(message.guild.id)
	const song = {
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};

	// console.log(song);
	if(!voiceChannel) return message.channel.send("You must be in voice channel to play the music")

	if(!serverQueue){
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};

		queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join(); // joins channel
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch(error) {
			console.error(`I could not join voice channel: ${error}`);
			queue.delete(message.guild);
			return message.channel.send(`I could not join voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		if(playlist) return undefined;
		else message.channel.send(`**${song.title}** has been added to the queue`);
	}
	return undefined;
}

function play(guild, song){
	const serverQueue = queue.get(guild.id);
	if(!song){
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id)
		console.log('End of queue!');
		return;
	}

	console.log(serverQueue.songs)
	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('next song!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0])
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(5 / 5);
	serverQueue.textChannel.send(`Start Playing: **${song.title}**`);
}

bot.login(botconfig.token);
