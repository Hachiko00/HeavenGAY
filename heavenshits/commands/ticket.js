const { Client, Message } = require('discord.js')

module.exports = {
    info: {
      name: "ticket",
      description: "create a ticket note: this is only for one server contact the owner if u want one",
      usage: "ticket",
      aliases: ["ticket"],
    },
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run: async function (client, message, args) {
        const ch = message.guild.channels.cache.find(ch => ch.name === message.author.id)
        if(ch) return message.channel.send('You already have a ticket open.')
        message.guild.channels.create(`Ticket: ${message.author.username}, ${message.author.id}`, {
            type : 'text',
            parent : '808243040044843009',
            permissionOverwrites : [
                {
                    id : message.guild.id,
                    deny : ['VIEW_CHANNEL']
                },
                {
                    id : message.author.id,
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                }
            ]
        }).then(async channel=> {
            message.reply(`click <#${channel.id}> to view your ticket`)
            channel.send(`${message.author}, welcome to your ticket!`)
        })
    }
}