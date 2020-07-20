const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     const spoiler = args.join(" ");
        if (!spoiler) return message.reply("What do you want me to say?");
        message.delete();
        message.channel.send("||" + spoiler + "||");
  }
};
module.exports.help = {
  name: "spoiler",
  aliases: ["spoiler"]
};
