const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   const user = message.mentions.users.first() || message.author;
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor(0x333333)
            .setAuthor(`${user.username}'s avatar`)
            .setImage(
              user.avatarURL({ format: "png", size: 1024, dynamic: true })
            )
        );
  }
};
module.exports.help = {
  name: "avatar",
  aliases: ["av"]
};
