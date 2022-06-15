const { getFiles } = require("../util/functions")
const fs = require("fs")
const { category } = require("../commands/info/ping")

module.exports = (bot, reload) => {
    const {client} = bot

    fs.readdirSync("./commands/").forEach((category)=> {
        let files = getFiles(`./commands/${category}`, ".js")

        commands.forEach((f) => {
            const command = require(`../commands/${category}/${f}`)
            client.command.set(command.name, command)
        })
    })
    console.log(`Loaded ${client.commands.size} commands`)
}

