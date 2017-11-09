//  telegram-bot
//  Application entrypoint

const config = require("./config.json");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");

// Array of available modules
const modules = [];

// Load modules
fs.readdir("modules", function(err, folders) {
    const mods = folders.map(name => path.join("modules", name)).filter((source) => fs.lstatSync(source).isDirectory() && path.basename(source)[0] !== "_");

    mods.forEach(function(mod) {
        console.log(`Loading module ${path.basename(mod)}...`);
        modules.push(require("./" + mod)); // shitty hack
    });
});


// Init bot
const bot = new TelegramBot(config.token, { polling: true });

// Bot events
bot.on("text", function(msg) { // Handle commands
    // Make sure text isn't empty
    if (!msg.text) {
        return;
    }

    // Commands starts with /
    if (msg.text.charAt(0) !== "/") {
        return;
    }

    // Extract command and arguments
    const cmd = msg.text.split(" ")[0].substring(1);
    const args = msg.text.split(" ").splice(1);

    // Call callback in modules
    modules.forEach(function(mod) {
        if (typeof mod.newCommand === "function") {
            mod.newCommand(msg, bot, cmd, args);
        }
    });
});

bot.on("message", function(msg) { // Forward all messages to modules
    modules.forEach(function(mod) {
        if (typeof mod.newMessage === "function") {
            mod.newMessage(msg, bot);
        }
    });
});
