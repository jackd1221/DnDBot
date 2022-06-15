const { ClientUser } = require("discord.js")
const { getFiles } = require("../util/functions")

module.exports = (bot, reload) => {
    const { client } = bot

    let event = getFiles("./events/", ".js")

    if (event.length === 0) {
        console.log("No events to load")
    }

    event.forEach((f, i) => {
        if (reload)
            delete require.cache[require.resolve(`../event/${f}`)]

        const event = require(`../events/${f}`)
        client.events.set(event.name, event)

        if (!reload)
            console.log(`${i+1}. ${f} loaded`)
    })

    if (!reload)
        initEvents(bot)
}

function triggerEventHandler(bot, event, ...args){
    const { client } = bot

    try {
        if (client.events.has(event))
            client.events.get(event).run(bot, ...args)
        else
            throw new Error(`Event ${event} does not exist`)
    }
    catch(err){
        console.error(err)
    }
}

function initEvents(bot){

}