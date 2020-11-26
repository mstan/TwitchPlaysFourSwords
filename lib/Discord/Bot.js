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
function chatParser(message,channel,author) {
    // start by splitting all commands, comma separated
    var commands = message.split(',');
    // iterate through each. we need to match specific use cases so we need to check 
    for(var i = 0; i < commands.length; i++ ) {
        var command = commands[i].split('/')[0].toLowerCase().trim(); // represents command.
        var modifier = commands[i].split('/')[1]; // represents duration
		
		if(modifier) {
			modifier = modifier.trim();
		}
		
		// modify based on character passed

		let originalCommand = command;
		if(originalCommand == 'st') { originalCommand = 'start' }
		if(originalCommand == 'se') { originalCommand = 'select'}
		
		let color;
		
		let commandsMap;
		
		if(channel == 'green') {
			color = '\x1b[42m';
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
		} else
		if(channel == 'red') {
			color = '\x1b[41m';
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
		} else
		if(channel == 'blue') {
			color = '\x1b[44m';
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
		} else
		if(channel == 'purple') {
			color = '\x1b[45m';
			commandsMap = {
				'a': 'numpad_1',
				'b': 'numpad_2',
				'l': 'numpad_3',
				'r': 'numpad_4',
				'start': 'numpad_5',
				'st': 'numpad_5',
				'up': 'numpad_6',
				'down': 'numpad_7',
				'left': 'numpad_8',
				'right': 'numpad_9',
				'select': 'numpad_0',
				'se': 'numpad_0'
			}	
		} else {
			debug(`Channel unsupported`)
			return;
		}
		
		
		debug(`Command map lookup for ${command}`);
		if(!!commandsMap[command]) {
			command = commandsMap[command];
			debug(`Mapping found! Remapping to ${command}`);
		}
		

		debug('Passing command', command);
        switch (command) {
		// Player 1
		case 'q':		 // A
		case 'w':		 // B
		case 'e':		 // L
		case 'w':		 // B
		case 'r':		 // R 
		case 't':		 // START 
		case 'y':		 // UP 
		case 'u':		 // DOWN 
		case 'i':		 // LEFT 
		case 'o':		 // RIGHT
		case 'p':		 // SELECT
		// Player 2
		case 'a': 		 // A
		case 's': 		 // B
		case 'd': 		 // L
		case 'f': 		 // R 
		case 'g': 		 // START 
		case 'h': 		 // UP 
		case 'j': 		 // DOWN 
		case 'k': 		 // LEFT 
		case 'l': 		 // RIGHT
		case ';': 		 // SELECT
		// Player 3
		case 'z':  		 // A
		case 'x':  		 // B
		case 'c':  		 // L
		case 'v':  		 // R 
		case 'b':  		 // START 
		case 'n':  		 // UP 
		case 'm':  		 // DOWN 
		case ',':  		 // LEFT 
		case '.':  		 // RIGHT
		case '/':  		 // SELECT
		// Player 4
		case 'numpad_1': // A
		case 'numpad_2': // B
		case 'numpad_3': // L
		case 'numpad_':  // R 
		case 'numpad_5': // START 
		case 'numpad_6': // UP 
		case 'numpad_7': // DOWN 
		case 'numpad_8': // LEFT 
		case 'numpad_9': // RIGHT
		case 'numpad_0': // SELECT
			console.log(color, `${author} pressed ${originalCommand}`)
			keyboard.queueOne(command, modifier);
			break;
            default:
                debug('Error', `Ignored unknown command ${command}`)
        }
    }
}

client.on('message', msg => {
	debug(`Received message in [${msg.channel.name}] from [${msg.author.username}] of ${msg.content}`)
	if(msg.author.username == process.env.DISCORD_BOT_NAME){
		debug('Message from self. Ignore');
		return;
	}

	
	try {
		chatParser(msg.content,msg.channel.name,msg.author.username);
	} catch(error) {
		debug(error);
	}
	

});
 
module.exports = client;