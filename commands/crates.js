const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const member = message.mentions.members.first() || message.author;
        let balc = db.fetch(`crates_${member.id}`);
        if (!balc) balc = 0;
        if (message.mentions.users.first()) {
          message.channel.send({
            embed: {
              color: 3066993,
              title: "Crates",
              fields: [
                {
                  name: message.mentions.users.first().username + " crates",
                  value: balc + " crates"
                }
              ]
            }
          });
        } else {
          message.channel.send({
            embed: {
              color: 3066993,
              title: "Crates",
              fields: [
                {
                  name: "Crates",
                  value: balc + " crates"
                }
              ]
            }
          });
        }
  }
};
module.exports.help = {
  name: "crates",
  aliases: ["crates"]
};
