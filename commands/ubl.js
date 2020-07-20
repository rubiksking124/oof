const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  if (message.author.id !== "606279329844035594")
    return message.reply("Owner command only");
  let user = message.mentions.users.first();
  if (!user) return message.reply("Please mention a person to blacklist");
  let fetched = db.fetch(`blacklist_${user.id}`);
  if (!fetched) {
    return message.channel.send(`This user is not blacklisted`);
  } else {
    db.delete(`blacklist_${user.id}`);
    message.channel.send(`Unblacklisted!`);
  }
};
module.exports.help = {
  name: "unblacklist",
  aliases: ["ubl"]
};
