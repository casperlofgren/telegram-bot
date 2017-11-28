//  telegram-bot
//  Cryptocurrency module

const request = require("request");

const getBTCPrice = function(cb) {
    request("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD", function(err, res, body) {
        if (err) {
            return cb(err, null);
        }
        else if (!res || res.statusCode !== 200) {
            return cb(new Error("Response wasn't 200 OK"), null);
        }

        try {
            body = JSON.parse(body);
        }
        catch (e) {
            return cb(e, null);
        }

        cb(null, body.USD);
    });
}

const getETHPrice = function(cb) {
    request("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD", function(err, res, body) {
        if (err) {
            return cb(err, null);
        }
        else if (!res || res.statusCode !== 200) {
            return cb(new Error("Response wasn't 200 OK"), null);
        }

        try {
            body = JSON.parse(body);
        }
        catch (e) {
            return cb(e, null);
        }

        cb(null, body.USD);
    });
}

exports.newCommand = function(msg, bot, cmd, args) {
    if (cmd === "btc") {
        getBTCPrice(function(err, price) {
            if (err) {
                return console.error(err);
            }

            bot.sendMessage(msg.chat.id, `1 BTC = *$${price}*`, { "parse_mode": "Markdown" });
        });
    }
    else if (cmd === "eth") {
        getETHPrice(function(err, price) {
            if (err) {
                return console.error(err);
            }

            bot.sendMessage(msg.chat.id, `1 ETH = *$${price}*`, { "parse_mode": "Markdown" });
        });
    }
}
