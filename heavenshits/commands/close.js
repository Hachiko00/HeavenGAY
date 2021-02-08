const discord = require("discord.js")
const { MessageEmbed } = require("discord.js");
const date = require('date-and-time')
module.exports = {
    info: {
      name: "close",
      description: "close your ticket",
      usage: "close",
      aliases: ["ct"],
    },
    run: async function (client, message, args) {
	if(!message.channel.name.startsWith("ticket-")) return message.channel.send("This is not a ticket channel")

	let reason = args.slice(0).join(" ")
  if(!reason) reason = "Ticket Closed"

  let logchannel = message.guild.channels.cache.find(ch => ch.id === "channel id here")
  if(!logchannel) return message.channel.send("Logchannel was not found")

  message.channel.messages.fetch()
    .then(messages => {
      let text = ""

      for(let [key, value] of messages) {
        const now =new Date()
        let dateString = `${date.format(now, 'YYYY/MM/DD HH:mm:ss', true)}` ;
        text += `${dateString} | ${value.author.tag}: ${value.content}\n` ; 
      }
        const embed = new MessageEmbed()
        .setTitle("Ticket Closed")
        .addField("**Information**", `User: ${message.author}\nID: ${message.author.id}\nReason: ${reason}`)
        
        message.channel.delete()
        
        logchannel.send(embed)
      })
    }
}