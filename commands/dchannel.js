const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   const fetchedChannel = message.guild.channels.cache.find(
        r => r.name === args.join(" ")
      );
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
          message.channel.send("You do not have manage channels");
        } else {
          fetchedChannel.delete().then(channel => {
            message.channel.send(`${channel.name} channel was deleted`);
          });
        }
  }
};
module.exports.help = {
  name: "dchannel",
  aliases: ["dchannel"]
};
