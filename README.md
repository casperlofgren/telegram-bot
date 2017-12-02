# telegram-bot

## Running the bot
 - Install dependencies with `npm install`
 - Rename config.json.dist to config.json and fill in your settings
 - Run the bot with `node bot.js`

## Writing modules
Each module should have its dedicated folder inside the modules directory, and have an index.js file. This file can export the following:
 - `newMessage` - This is called when a message is observed by the bot
 - `newCommand` - This is called when a command was parsed
See the [example](modules/_example) module for more information.
