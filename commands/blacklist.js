const Discord = require("discord.js");
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
  if (message.author.id !== "606279329844035594")
    return message.reply("Owner command only");
  let user = message.mentions.users.first();
  if (!user) return message.reply("Please mention a person to blacklist");
  if (user.id === "606279329844035594")
    return message.reply("YoU cAn'T bLaCkLiSt YoUrSeLf");
  let fetched = db.fetch(`blacklist_${user.id}`);
  if (!fetched) {
    db.set(`blacklist_${user.id}`, true);
    message.channel.send(`Blacklisted!`);
  } else {
    return message.channel.send(`This user is already blacklisted!`);
  }
};
module.exports.help = {
  name: "blacklist",
  aliases: ["bl"]
};
