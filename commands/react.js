const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     message.channel.send("").then(message.react(args[0]));
  }
};
module.exports.help = {
  name: "react",
  aliases: ["react"]
};
