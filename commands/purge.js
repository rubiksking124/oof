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
      if (!args[0]) {
        return message.channel.send(
          "You need to provide a number of amount of messages you want to delete..."
        );
      }
      if (isNaN(args[0])) {
        return message.channel.send(
          "You have to enter a **NUMBER** of amount of messages you want to delete..."
        );
      }
      if (args[0] > 100) {
        return message.channel.send(
          "You can't delete more than 100 messages at once..."
        );
      }
      if (args[0] < 1) {
        return message.channel.send(
          "You have to delete 1 message at the very least..."
        );
      }

      message.channel.bulkDelete(args[0]);
      message.channel.send(`✅ Purged ${args[0]} messages!`).then(message => {
        setTimeout(async function() {
          await message.delete();
        }, 1100);
      });
    }
  }
};
module.exports.help = {
  name: "purge",
  aliases: ["purge"]
};
