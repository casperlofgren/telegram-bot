//  telegram-bot
//  General/misc stuff

exports.newCommand = function(msg, bot, cmd, args) {
    if (cmd === "ping") {
        bot.sendMessage(msg.chat.id, "pong!");
    }
}
