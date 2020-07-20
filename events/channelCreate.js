module.exports = async (client, message, channel) => {
  const db = require("quick.db");
  let channel1 = db.fetch(`logs_${message.guild.id}`);
  if (!channel1) return;
  let yes = message.guild.channels.cache.get(channel1);
  let Discord = require("discord.js");
  let embed = new Discord.MessageEmbed()
    .setTitle("Channel Create")

    .setColor("GREEN")

    .setDescription(`Channel created named ` + message.name)
    .addField("Channel type", message.type)
    .addField("Channel id", message.id);

  yes.send(embed);
};
