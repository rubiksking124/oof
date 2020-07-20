  const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {


let str = args.join(' ');
    if(!str) return message.reply("Please include a string")
    let build = '';
    for (let i = 0; i < str.length; i++) {
      if (i % 2 == 0) build += str.charAt(i).toLowerCase();
      else build += str.charAt(i).toUpperCase();
    }
    message.delete();
    return message.channel.send(build);
  }
}
module.exports.help = {
  name: "sarcastic",
  aliases: ["sarc"]
};