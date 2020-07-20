const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
      if (!message.member.hasPermission("MANAGE_CHANNELS"))
          return message.reply("You need manage channels permission");
       let channel = message.mentions.channels.first();
 
        if (!channel) return message.reply("Please mention a channel");
        if (!message.guild.channels.cache.has(channel.id))
          return message.reply("That channel is not in this server");
        if (channel.type === "voice") return message.reply("No voice channels");
        db.set(`logs_${message.guild.id}`, channel.id);
        message.channel.send("logs channel set to " + channel.name);
};
}
module.exports.help = {
  name: "setlogs",
  aliases: ["sl"]
};
