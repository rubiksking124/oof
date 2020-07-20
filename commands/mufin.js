const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    message.channel.send("Here is a muffin", {
      files: [
        "https://cdn.discordapp.com/attachments/681606056086077478/701225508137861230/new_pfp.jpg"
      ]
    });
  }
};
module.exports.help = {
  name: "muffin",
  aliases: ["muffin"]
};
