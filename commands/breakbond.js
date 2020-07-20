const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let bond = db.fetch(`bond_${message.author.id}`);
    if (!bond)
      return message.reply("You cant break a bond you are not in a bond");
      let id = db.fetch(`bondid_${message.author.id}`);
  let user =  message.guild.members.cache.get(id)
  let guild = message.guild.id
    if(!message.guild.members.cache.has(id)) return message.reply("Please do not try to break your bond with somenone not in the same server just talk it over with them first")
    message.channel.send("You have broken your bond with " + bond);
    db.delete(`bond_${message.author.id}`);
  
    db.delete(`bond_${user.id}`);
     db.delete(`bond_${message.author.id}`);
     db.delete(`bondid_${user.id}`);
     db.delete(`bondid_${message.author.id}`);
  }
};
module.exports.help = {
  name: "breakbond",
  aliases: ["breakup"]
};
