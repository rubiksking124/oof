const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
           message.channel.send("no u", {
          files: [
            "https://cdn.clipart.email/f44961dc1ed18e1e63ef648dc1701638_uno-unoreversecard-unoreverse-reverse-card-reversecard-sign-_900-1236.png"
          ]
        });
  }
};
module.exports.help = {
  name: "nou",
  aliases: ["noyou"]
};
