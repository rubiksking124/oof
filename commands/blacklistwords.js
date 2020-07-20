const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_GUILD"))
    
          return message.reply("You need manage guild permission");
        let fish = args[0];
        if (fish === "on") {
          db.set(`blw_${message.guild.id}`, "on");
          message.channel.send(
            new Discord.MessageEmbed().setDescription("word blacklist turned on")
          );
        } else if (fish === "off") {
          db.set(`blw_${message.guild.id}`, "off");
          message.channel.send(
            new Discord.MessageEmbed().setDescription(
              "word blacklist turned off"
            )
          );
        } else {
          message.channel.send("Please only use on or off");
        }
  }
};
module.exports.help = {
  name: "wordblacklist",
  aliases: ["wbl"]
};
