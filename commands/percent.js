const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     let percent = Math.floor(Math.random() * 100) + 1;

        message.channel.send(percent + "%");
  }
};
module.exports.help = {
  name: "percent",
  aliases: ["percent"]
};
