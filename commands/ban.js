const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
          message.channel.send("<:incorrect:726607303939326023> You do not have ability to ban members");
        } else {
          // Easy way to get member object though mentions.
          var member = message.mentions.members.first();
          if (!member) return message.reply("please include someone to ban");
          // Kick
          member.ban().then(member => {
            // Successmessage
            message.channel.send(
              "<:correct:726607102604214323> " + member.displayName + " has been successfully BANNED"
            );
          });
        }
  }
};
module.exports.help = {
  name: "ban",
  aliases: ["ban"]
};
