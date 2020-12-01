require('dotenv').config();
const tmi = require('tmi.js');
const debug = require('debug')('TwitchPlays:Bot:Twitch')

const client = new tmi.client({
		options: {
			debug: false
		},
		connection: {
			reconnect: true
		},
		identity: {
			username: process.env.TWITCH_BOT_USERNAME,
			password: process.env.TWITCH_BOT_TOKEN
		},
		channels: [process.env.TWITCH_BOT_CHANNEL]
});
client.connect();

var chatParser = require('../chat/').parser;

client.on('connected', (address,port) => {
	debug('Twitch bot online');
})

client.on('chat', (channel, userstate, message, isSelf ) => {
    if(isSelf) {
		debug('Message from self. Ignore');
		return;
    }
    if(userstate.username == 'nightbot') {
    	return;
    }
    if(channel != process.env.TWITCH_BOT_CHANNEL.toLowerCase() ) {
    	debug('Unrecognized channel');
    	return;
    }

    try {
    	let splitMessage = message.split('/');
        const splitMessageSpace = message.split(' ');
        if(splitMessageSpace.length >= splitMessage.length) splitMessage = splitMessageSpace;

    	let target = splitMessage[0];
    	const action = splitMessage[1];
    	const duration = splitMessage[2];
    	const delay = splitMessage[3];


    	if(target == 1) target = 'green';
    	if(target == 2) target = 'red';
    	if(target == 3) target = 'blue';
    	if(target == 4) target = 'purple';


    	if( ['green','red','blue','purple'].indexOf(target) > -1 ) {
    		//let command = `${action}`;
    		//if(duration) command += `/${duration}`;
    		//if(delay) command += `/${delay}`;
    		let command = message.slice(2, message.length);

    		chatParser(command,target,userstate.username);
    	} else if(message.length < 5) {
    		debug('Unrecognized action');
    		client.say(process.env.TWITCH_BOT_CHANNEL, 
    			`${userstate.username} your command was not recognized. Please use the following format for your command: \n 
    			player/action/[duration]/[delay]. \n 
    			For example: 1/b/2500 \n 
    			You can find more information about how to play over at https://twitchplaysfsa.com/index.php/how-to-play/`
    		)

    	}


    } catch(error) {
    	debug(error);
    }

    return;
})

module.exports = client;