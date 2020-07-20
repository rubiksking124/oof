const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You need manage channels permission");
    let fish = args.join(" ");
    if (!fish) return message.reply("Please include text");

    db.set(`dmt_${message.guild.id}`, fish);
    message.channel.send("dm message set to " + fish);
  }
};
module.exports.help = {
  name: "setdmmessage",
  aliases: ["sdm"]
};
