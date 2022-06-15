const Discord = require("discord.js")
require("dotenv").config()

//const TOKEN = "OTg2NzE2NzE1NzU5MDc1Mzg4.G4Txqa.JgpuxzXsjD5Epl3D138j-65jpheFXUj2cCQac8"

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "hi"){
        message.reply("Hello")
    }
})



client.login(process.env.TOKEN)