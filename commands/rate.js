const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let math = Math.floor(Math.random() * 10) + 1;

    message.channel.send("I rate that " + math + "/10");
  }
};
module.exports.help = {
  name: "rate",
  aliases: ["rate"]
};
