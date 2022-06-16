const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")

module.exports = {
    name: "rolesselector",
    category: "test",
    devOnly: true,
    run: async ({client, message, args}) => {
        message.channel.send({
            embeds: [
                new MessageEmbed().setTitle("Join Party").setDescription("Click the button below to join the Party!").setColor("GREEN")
            ],
            components: [
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId("role-987094073250836610").setStyle("SUCCESS").setLabel("Join Party")
                ])
            ]
        })
    }
}