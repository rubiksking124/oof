const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let search = args.join("+");
        if (!search) return message.reply("Please include something to google");

        message.channel.send("https://lmgtfy.com/?q=" + search);
  }
};
module.exports.help = {
  name: "google",
  aliases: ["google"]
}
