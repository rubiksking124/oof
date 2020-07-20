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
          message.guild.roles
            .create({
              data: {
                name: args[0],
                color: args[1]
              },
              reason: "we needed a role for Super Cool People"
            })
            .then(role => {
              message.channel.send(`${role.name} role was created`);
            });
        }
  }
};
module.exports.help = {
  name: "createrole",
  aliases: ["crole"]
};
