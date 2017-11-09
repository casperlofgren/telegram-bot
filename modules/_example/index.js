//  telegram-bot
//  Example module

exports.newCommand = function(msg, bot, cmd, args) {
    console.log(`New command "${cmd}" with args "${args}"`);
}

exports.newMessage = function(msg, bot) {
    console.log(`New message`, msg);
}
