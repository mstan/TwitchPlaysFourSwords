// Grab environment variables
require('dotenv').config();

// Debug
const debug = require('debug')('TwitchPlays:Bot:Discord');

// Discord setup
const Discord = require('discord.js');
const client = new Discord.Client();

var { parser } = require('../chat/');;

 
client.on('ready', () => {
  debug(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.DISCORD_BOT_TOKEN);

client.on('message', msg => {
	debug(`Received message in [${msg.channel.name}] from [${msg.author.username}] of ${msg.content}`)
	if(msg.author.username == process.env.DISCORD_BOT_NAME){
		debug('Message from self. Ignore');
		return;
	}

	try {
		parser(msg.content,msg.channel.name,msg.author.username);
	} catch(error) {
		debug(error);
	}
});
 
module.exports = client;