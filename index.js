const Discord = require("discord.js")

require("dotenv").config()

const codeChannel = 674014387056672768

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "n.",
    owners: ["161583650805252096"]

}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)


client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})



client.login(process.env.TOKEN)