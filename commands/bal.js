const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     const member = message.mentions.members.first() || message.author;
        let bal = db.fetch(`coins_${member.id}`);
        if (!bal) bal = 0;
        if (message.mentions.users.first()) {
          message.channel.send({
            embed: {
              color: 3066993,
              title: "Balance",
              fields: [
                {
                  name: message.mentions.users.first().username + " balance",
                  value: "🧁 " + bal + " muffins"
                }
              ]
            }
          });
        } else {
          message.channel.send({
            embed: {
              color: 3066993,
              title: "Balance",
              fields: [
                {
                  name: "Balance",
                  value: "🧁 " + bal + " muffins"
                }
              ]
            }
          });
        }
  }
};
module.exports.help = {
  name: "balance",
  aliases: ["bal"]
};
