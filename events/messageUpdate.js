module.exports = async (client, message, oldMessage, newMessage) => {
  const db = require("quick.db");
  let channel = db.fetch(`logs_${message.guild.id}`);
  if (!channel) return;
  let yes = message.guild.channels.cache.get(channel);
  let Discord = require("discord.js");
  let embed = new Discord.MessageEmbed()
    .setTitle("Message Edit")

    .setColor("GREEN")
    .setDescription(`Edited message from ${message.author}`)
  .addField("Orignal message said ", message)
   .addField("New message says ", oldMessage)
  
  yes.send(embed);
};
