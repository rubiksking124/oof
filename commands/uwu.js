const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   let fish = args.join(" ");
        if (!fish) return message.reply("Give me a sentence to uwuify");
        var str = fish;
        var replaced = str.split("u").join("uwu");
        message.channel.send(replaced);
  }
};
module.exports.help = {
  name: "uwu",
  aliases: ["uwu"]
};
