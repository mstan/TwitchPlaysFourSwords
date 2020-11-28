const robot = require('robotjs');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
const debug = require('debug')('TwitchPlays:Keyboard');


// Keyboard constructor
function Keyboard() {
    // list of key press commands to be consumed
    this.commands = [];

    // each time new input is being added, start processing the array
    myEmitter.on('newInput', () => {
        this.dequeue();
    })
}

// add one to the array
Keyboard.prototype.queueOne = function(key,duration,delay) {
    this.commands.push({ key, duration, delay });
    myEmitter.emit('newInput');
}

// toggle a key by pressing it down for a set amount of time, then letting up after 
// a set duration
Keyboard.prototype.toggleOne = function(key,duration, delay) {
    var DURATION_MIN = 100; // minimum 100 ms. Any lower and it doesn't seem to register
    var DURATION_MAX = 2500; // 2.5 seconds
	var DELAY_MIN = 100;
	var DELAY_MAX = 100;
    //don't let a person set a ridiculously long timeout for pressing down a key
    if(!duration) {
        duration = DURATION_MIN;
    }
    if(duration < DURATION_MIN) {
        duration = DURATION_MIN;
    }
    if(duration > DURATION_MAX) {
        duration = DURATION_MAX;
    }
	if(delay && delay < DURATION_MIN) {
		duration = DURATION_MIN;
	}
	if(delay && delay > DURATION_MAX) {
		duration = DURATION_MAX
	}

    // press it down
	debug(`Pressing down on key ${key}`);
    robot.keyToggle(key, 'down');

    // after the duration, let it go
    setTimeout( () => {
		debug(`Letting up on key ${key}`);
        robot.keyToggle(key, 'up');
        return;
    }, duration)
}

// go through the process of checking what's on the array.
// if something exists, check that it matches our switch case of valid
// keys that the user is allow to request
// then toggle it for a set period of time
// and dequeue it 
Keyboard.prototype.dequeue = function() {
    if( this.commands.length == 0) {
        return;
    }

    var key = this.commands[0].key;
    var duration = this.commands[0].duration;
	var delay = this.commands[0].delay;
	debug('Toggling key', key);
	
	if(delay) {
		setTimeout( () => {
			this.toggleOne(key,duration);		
		}, delay)
	} else {
		this.toggleOne(key,duration);
	}
    // remove command from queue now that it's been consumed
    this.commands.shift();
}

// return a list of commands
/*
Keyboard.prototype.getCommands = function() {
    return this.commands;
}
*/

module.exports = Keyboard; // construct with new Keyboard();
