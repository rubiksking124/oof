module.exports = async (client, message) => {
  const db = require("quick.db");
  let channel = db.fetch(`logs_${message.guild.id}`);
  if (!channel) return;
  let yes = message.guild.channels.cache.get(channel);
  let Discord = require("discord.js");
  let embed = new Discord.MessageEmbed()
    .setTitle("Message Delete")

    .setColor("RED")
    .setDescription(
      "🗑️ deleted message from " +
        message.author.username +
        " that said " +
        message.content
    );
  yes.send(embed);
};
