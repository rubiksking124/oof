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
          try {
            let who = message.mentions.users.first();
            if (message.mentions.users.size < 1)
              return message.channel.send("no");
            if (message.author.id == who.id)
              return message.channel.send(`:x: Well no you can't dm yourself.`);
            let message2 = args.slice(1).join(` `);
            if (message2 >= 400) return message.channel.send("no");
            who.send(
              "**Message from " + message.author.username + "**: " + message2
            );
            message.channel.send(
              `Sucessfully sent message to ${who.username}.`
            );
          } catch (err) {
            return;
          }
        }
  }
};
module.exports.help = {
  name: "dm",
  aliases: ["dm"]
};
