// Grab environment variables
require('dotenv').config();

// Debug
const debug = require('debug')('TwitchPlays:Bot');

// Discord setup
const Discord = require('discord.js');
const client = new Discord.Client();

 
client.on('ready', () => {
  debug(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.DISCORD_BOT_TOKEN);


// Keyboard setup
var Keyboard = require('../controls').Keyboard;
var keyboard = new Keyboard();

// Chat parser for incoming discord messages
function chatParser(message,channel) {
    // start by splitting all commands, comma separated
    var commands = message.split(',');
    // iterate through each. we need to match specific use cases so we need to check 
    for(var i = 0; i < commands.length; i++ ) {
        var command = commands[i].split('/')[0]; // represents command.
        var modifier = commands[i].split('/')[1]; // represents duration

		
		// modify based on character passed
		let commandsMap;
		
		if(channel == 'green') {
			commandsMap = {
				'a': 'q',
				'b': 'w',
				'l': 'e',
				'r': 'r',
				'start': 't',
				'st': 't',
				'up': 'y',
				'down': 'u',
				'left': 'i',
				'right': 'o',
				'select': 'p',
				'se': 'p'
			}		
		}
		if(channel == 'red') {
			commandsMap = {
				'a': 'a',
				'b': 's',
				'l': 'd',
				'r': 'f',
				'start': 'g',
				'st': 'h',
				'up': 'h',
				'down': 'j',
				'left': 'k',
				'right': 'l',
				'select': ';',
				'se': ';'
			}	
		}
		if(channel == 'blue') {
			commandsMap = {
				'a': 'z',
				'b': 'x',
				'l': 'c',
				'r': 'v',
				'start': 'b',
				'st': 'b',
				'up': 'n',
				'down': 'm',
				'left': ',',
				'right': '.',
				'select': '/',
				'se': '/'
			}	
		}
		if(channel == 'purple') {
			// unimplemented. what are the keypad options? robotjs.io is down
		}
		
		
		debug(`Command map lookup for ${command}`);
		if(!!commandsMap[command]) {
			command = commandsMap[command];
			debug(`Mapping found! Remapping to ${command}`);
		}
		

		debug('Passing command', command);
        switch (command) {
		// player 1
		case 'q': // A
		case 'w': // B
		case 'e': // L
		case 'r': // R 
		case 't': // START 
		case 'y': // UP 
		case 'u': // DOWN 
		case 'i': // LEFT 
		case 'o': // RIGHT
		case 'p': // SELECT
		// player 2
		case 'a':  // A
		case 's':  // B
		case 'd':  // L
		case 'f':  // R 
		case 'g':  // START 
		case 'h':  // UP 
		case 'j':  // DOWN 
		case 'k':  // LEFT 
		case 'l':  // RIGHT
		case ';':  // SELECT
		// player 3
		case 'z':  // A
		case 'x':  // B
		case 'c':  // L
		case 'v':  // R 
		case 'b':  // START 
		case 'n':  // UP 
		case 'm':  // DOWN 
		case ',':  // LEFT 
		case '.':  // RIGHT
		case '/':  // SELECT
			keyboard.queueOne(command, modifier);
			break;
            default:
                debug('Error', `Ignored unknown command ${command}`)
        }
    }
}



// New Discord
client.on('message', msg => {
	debug(`Received message in [${msg.channel.name}] from [${msg.author.username}] of ${msg.content}`)
	if(msg.author.username == process.env.DISCORD_BOT_NAME){
		debug('Message from self. Ignore');
		return;
	}

	chatParser(msg.content,msg.channel.name);
});
 
module.exports = client;