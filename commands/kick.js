const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
          message.channel.send("You do not have ability to kick members");
        } else {
          // Easy way to get member object though mentions.
          var member = message.mentions.members.first();
          if (!member) return message.reply("please include someone to kick");
          member.kick().then(member => {
            // Successmessage
            message.channel.send(
              ":wave: " +
                member.displayName +
                " has been successfully kicked :point_right: "
            );
          });
        }
  }
};
module.exports.help = {
  name: "kick",
  aliases: ["kick"]
};
