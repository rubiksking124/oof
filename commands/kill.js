const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.mentions.users.first())
      return message.reply("Please mention someone");
    if (message.mentions.users.first().id === message.author.id)
      return message.reply("You cant kill yourself");

    message.channel.send(
      args[0] + " was killed by " + `<@${message.author.id}>`
    );
  }
  
  
};
module.exports.help = {
  name: "kill",
  aliases: ["kill"]
};
