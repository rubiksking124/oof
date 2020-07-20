const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    
    let fish = args.join(" ");
    if (!fish) return message.reply("Please include text");
if(fish.length > 10) return message.reply("Please use shorter text")
    db.set(`note_${message.guild.id}_${message.author.id}`, fish);
    message.channel.send("Profile note set to " + fish);
  }
};
module.exports.help = {
  name: "setprofilenote",
  aliases: ["spn"]
};
