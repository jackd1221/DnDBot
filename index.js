const Discord = require("discord.js")

const keepAlive = require("./server")


require("dotenv").config()

const codeChannel = 690341290344448081

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: ".",
    owners: ["161583650805252096"]

}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.buttons = new Discord.Collection()

//client.on('debug', console.log);
client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadButtons = (bot, reload) => require("./handlers/buttons")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadButtons(bot, false)

module.exports = bot

keepAlive()
client.login(process.env.TOKEN)