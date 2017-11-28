//  telegram-bot
//  Giphy module

const config = require("../../config.json");
const giphy = require("giphy-api")(config.giphykey);

exports.newCommand = function(msg, bot, cmd, args) {
    if (cmd === "g") {
        if (!args || args.length < 1) {
            return bot.sendMessage(msg.chat.id, "Usage: /g <*s*earch/*r*andom/*t*rending> [args]", { "parse_mode": "Markdown" });
        }

        // Different subfunctions
        if (args[0] === "s") { // Phrase search
            if (!args[1]) {
                return bot.sendMessage(msg.chat.id, "Usage: /g s <tags>");
            }

            giphy.search({ q: args.slice(1).join(" "), limit: 1 }, function(err, res) {
                if (err) {
                    return console.error(err);
                }

                const data = res.data[0];
                if (!data) {
                    return bot.sendMessage(msg.chat.id, "No GIF found :(");
                }

                bot.sendMessage(msg.chat.id, data.url);
            });
        }
        else if (args[0] === "r") { // Random
            giphy.random({ tag: args.slice(1).join(" ") }, function(err, res) {
                if (err) {
                    return console.error(err);
                }

                const data = res.data;
                if (!data) {
                    return bot.sendMessage(msg.chat.id, "No GIF found :(");
                }

                bot.sendMessage(msg.chat.id, data.url);
            });
        }
        else if (args[0] === "t") { // Trending
            giphy.trending({ limit: 1 }, function(err, res) {
                if (err) {
                    return console.error(err);
                }

                const data = res.data[0];
                if (!data) {
                    return bot.sendMessage(msg.chat.id, "No GIF found :(");
                }

                bot.sendMessage(msg.chat.id, data.url);
            });
        }
    }
}
