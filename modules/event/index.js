//  telegram-bot
//  Events module

const currEvent = {
    "name": "",
    "in": [],
    "out": []
}

function removeFromArray(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

exports.newCommand = function(msg, bot, cmd, args) {
    if (cmd === "event") {
        if (!currEvent.name && (!args || args.length < 1)) {
            return bot.sendMessage(msg.chat.id, "No event is set!");
        }

        // Show ins/outs if no args are provided
        if (!args || args.length < 1) {
            const ins = currEvent.in.join(", ");
            const outs = currEvent.out.join(", ");

            return bot.sendMessage(msg.chat.id, `*${currEvent.name}*: The awesome people ${ins} are IN but the boring people ${outs} are OUT.`, { "parse_mode": "Markdown" });
        }

        // Add new event
        currEvent.in = [];
        currEvent.out = [];
        currEvent.name = args.join(" ");
        bot.sendMessage(msg.chat.id, `New event with name _${args.join(" ")}_ created. Who's in?`, { "parse_mode": "Markdown" });
    }
    else if (cmd === "in") {
        bot.getChatMember(msg.chat.id, msg.from.id).then(function(member) {
            const name = member.user.first_name;

            // check duplicates
            if (currEvent.in.includes(name)) {
                return bot.sendMessage(msg.chat.id, "You're already in, dumbass!");
            }

            // remove from out if exists
            removeFromArray(currEvent.out, name);

            // Add to in and reply
            currEvent.in.push(name);
            bot.sendMessage(msg.chat.id, "Ayyy, awesome!");
        });
    }
    else if (cmd === "out") {
        bot.getChatMember(msg.chat.id, msg.from.id).then(function(member) {
            const name = member.user.first_name;

            // check duplicates
            if (currEvent.out.includes(name)) {
                return bot.sendMessage(msg.chat.id, "You're already out, dumbass!");
            }

            // remove from out if exists
            removeFromArray(currEvent.in, name);

            // Add to in and reply
            currEvent.out.push(name);
            bot.sendMessage(msg.chat.id, "Boooring.");
        });
    }
}
