const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     if (!message.member.hasPermission("ADMINISTRATOR")) {
          message.channel.send("You do not have admin");
        } else {
          if (!args[0]) return message.reply("Please include a nick name");
          message.guild.me
            .setNickname(args[0])
            .then(user => message.reply(`My new nickname is ${args[0]}!`))
            .catch(console.error);
        }
  }
};
module.exports.help = {
  name: "nick",
  aliases: ["nick"]
};
