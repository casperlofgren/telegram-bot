//  telegram-bot
//  Emoji module

const config = require("../../config.json");
const fs = require("fs");
const path = require("path");

const emojis = new Map();

// Load emojis
fs.readdir(path.join(__dirname, "emojis"), function(err, files) {
    files.forEach(function(file) {
        const fileinfo = path.parse(file);

        // Check file extension
        if (fileinfo.ext === ".webp") {
            // Add to map
            const fileData = fs.createReadStream(path.join(__dirname, "emojis", fileinfo.base));
            emojis.set(fileinfo.name, fileData);
        }
    });
});


exports.newMessage = function(msg, bot) {
    if (msg.text && (msg.text.charAt(0) === ":") && (msg.text.charAt(msg.text.length - 1) === ":")) {
        const start_pos = msg.text.indexOf(":") + 1;
        const end_pos = msg.text.indexOf(":", start_pos);
        const emoji = msg.text.substring(start_pos, end_pos);

        const emojiData = emojis.get(emoji);
        if (!emojiData) {
            return bot.sendMessage(msg.chat.id, emoji + " is not an emoji!");
        }

        bot.sendSticker(msg.chat.id, emojiData);
    }
}

exports.newCommand = function(msg, bot, cmd, args) {
    if (cmd === "emojilist") {
        let message = "*List of emojis*:";

        const emojies = Array.from(emojis.keys());
        emojies.forEach(function(emoji) {
            message += "\n" + emoji;
        });

        bot.sendMessage(msg.chat.id, message, { "parse_mode": "Markdown" });
    }
}
