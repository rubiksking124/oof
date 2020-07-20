const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (message.author.id != "606279329844035594") {
          message.channel.send("You are not the bot owner");
        } else {
          if (isNaN(args[1])) {
            return message.channel.send(
              "You have to enter a **NUMBER** or check the order of the command"
            );
          }
          let puser =
            message.guild.member(message.mentions.users.first()) ||
            message.guild.members.get(args[0]);
          let pcoins = db.fetch(`coins_${puser.id}`);
          let scoins = db.fetch(`coins_${message.author.id}`);
          if (args[1] < 0)
            return message.reply("Awards must be greater then 0");
          db.subtract(`coins_${puser.id}`, parseInt(args[1]));
          message.channel.send({
            embed: {
              color: 15158332,
              title: "Removing",
              fields: [
                {
                  name: "Muffins",
                  value: `${message.author} has removed ${
                    args[1]
                  } muffins from ${args[0]}`
                }
              ]
            }
          });
        }
  }
};
module.exports.help = {
  name: "remove",
  aliases: ["remove"]
};
