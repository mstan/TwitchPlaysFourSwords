var Keyboard = require('../lib/controls').Keyboard;
var keyboard = new Keyboard();

// simulated valid keys
var keys = [
    '1', '2', //weapons
    'w', 's', 'a','d', 'space', // movement
    'q','e', 'r', 'shift', // abilities
    'x' // communication
    ]

var randomKey = function() {
    return keys[ Math.floor(Math.random() * keys.length) ]
}

var randomTime = function () {
    var rand = Math.floor( Math.random() * 1000 * 5 );

    return rand;
}

module.exports = function(inputRate) {
    //input rate, in milliseconds
    const INPUT_RATE = inputRate || 25;

    setInterval( () => {
        keyboard.queueOne(randomKey() , randomTime() );
    }, INPUT_RATE)
}

