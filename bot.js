//  telegram-bot
//  Application entrypoint

const config = require("./config.json");
const TelegramBot = require("node-telegram-bot-api");

// Init bot
const bot = new TelegramBot(config.token, { polling: true });

bot.on("message", function(msg) {
    console.log(msg);
});
