const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    message.channel.send("or do i????", {
          files: [
            "https://cdn.discordapp.com/attachments/675792208909172736/695831669671985222/Untitled14_20200403230615.png"
          ]
        });
  }
};
module.exports.help = {
  name: "ordoi?",
  aliases: ["odi?"]
};
