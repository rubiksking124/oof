const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("You need manage channels permission");
    let fish = args[0];
    if (fish === "on") {
      db.set(`dm_${message.guild.id}`, "on");
      message.channel.send(
        new Discord.MessageEmbed().setDescription("join on dm turned on")
      );
    } else if (fish === "off") {
      db.set(`dm_${message.guild.id}`, "off");
      message.channel.send(
        new Discord.MessageEmbed().setDescription("join on dm turned off")
      );
    } else {
      message.channel.send("Please only use on or off");
    }
  }
};
module.exports.help = {
  name: "setwelcomedm",
  aliases: ["swd"]
};
