const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
 if (!message.member.hasPermission("ADMINISTRATOR")) {
          message.channel.send("You do not have admin");
        } else {
          if (!args[0]) return message.reply("Please add a channel name");
          let name = args[0];
          let type = args[1];
          message.guild.channels
            .create(args[1], {
              //optional
              type: args[0] //optional
            })

            .then(channel => {
              message.channel.send(`${channel.name} channel was created`);
            });
        }
  }
};
module.exports.help = {
  name: "channel",
  aliases: ["cchannel"]
};
