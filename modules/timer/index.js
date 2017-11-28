//  telegram-bot
//  Timer module

exports.newCommand = function(msg, bot, cmd, args) {
    if (cmd === "timer") {
        if (!args || args.length < 2) {
            return bot.sendMessage(msg.chat.id, "Usage: /timer [time] [title]");
        }

        // Extract data and build url
        const hour = args[0].split(":")[0];
        const min = args[0].split(":")[1];
        const url = `https://www.timeanddate.com/countdown/generic?hour=${hour}&min=${min}&sec=00&p0=101&msg=${args.slice(1).join("%20")}&font=cursive`;

        // Reply
        bot.sendMessage(msg.chat.id, url);
    }
}
