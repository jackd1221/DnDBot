const momentTimezone = require('moment-timezone')
const { messageCollector } = require('discord.js')
const scheduledSchema  = require('../models/schedule-schema')

module.exports = {
  requiredPermissions: ['ADMINISTRATOR'],
  expectedArgs: '<Channel Tag> <YYYY/MM/DD> <HH:MM> <"AM" or <PM> <Timezone>',
  minArgs: 5,
  maxArgs: 5,
  init: (client) => {
    const checkForPosts = async () => {
      const query = {
        date: {
          $lte: Date.now()
        }
      }
      
      const results = await scheduledSchema.find(query)

      for(const post of results) {
        const { guildId, channelId, content } = post

        const guild = await client.guild.fetch(guildId)
        if(!guild){
          continue
        }

        const channel = guild.channels.cache.get(channelId)
        if (!channel){
          continue
        }
        channel.send(content)
      }
      await scheduledSchema.deleteMany(query)
      setTimeout(checkForPosts, 1000*10)
    }
  },
  callback: async ({ message, args}) => {
    const {mentions, guild, channel} = message
    const targetChannel = mentions.channels.first()
    if(!targetChannel) {
      message.reply("Please Tag a channel to send your message")
      return
    }

    // remove the channel tag from args array
    args.shift()
    const [date, time, clockType, timeZone] = args

    if (clockType !== 'AM' && clockType !== 'PM') {
      message.reply(`Provide either 'AM' or 'PM', you provided "${clockType}"`)
      return
    }

    const validTimeZones = momentTimezone.tz.names()

    if(!validTimeZones.includes(timeZone)) {
      message.reply('Invalid timezone... Please use one of the following, <https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a> ')
      return
    }
    const targetDate = momentTimezone.tz(
      `${date} ${time} ${clockType}`,
      'YYYY-MM-DD HH:mm A',
      timeZone
    )
    message.reply('Please send a message that you would like to schedule.')

    const filter = (newMessage) => {
      return newMessage.author.id === message.author.id
    }
    
    const collector = new MessageCollector(channel, filter, {
      max: 1,
      time: 1000 * 60 // 60 seconds
    })

    collector.on('end', async (collected) => {
      const collectedMessage = collected.first()

      if(!collectedMessage) {
        message.reply("You did not reply in time...")
        
        // save to Database
        await new scheduledSchema({
          date: targetDate.valueOf(),
          content: collectedMessage.content,
          guildId: guild.id,
          channelId: targetChannel.id
        }).save()
      }
    })
  }
}