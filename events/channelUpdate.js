module.exports = async (client, message, channel) => {
  const db = require("quick.db");
  let channel1 = db.fetch(`logs_${message.guild.id}`);
  if (!channel1) return;
  let yes = message.guild.channels.cache.get(channel1);
  let Discord = require("discord.js");
  let embed = new Discord.MessageEmbed()
    .setTitle("Channel Update")

    .setColor("GREEN")

   
    .addField("Old channel", message)
   .addField("Old channel name", message.name)
   .addField("Old channel topic", message.topic)
    .addField("New channel", channel)
   .addField("New channel name", channel.name)
   .addField("New channel topic", channel.topic)
   
 

  yes.send(embed);
};
