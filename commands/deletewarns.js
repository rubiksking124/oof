const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("You need manage messages permission");
    function removeA(arr) {
      var what,
        a = arguments,
        L = a.length,
        ax;
      while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1);
        }
      }
      return arr;
    }
    let member =
      message.mentions.users.first() ||
      message.guild.members.cache.find(m => m.id === args[0]);
    if(!member) return message.reply("Please include a member")
    let fish = db.fetch(`warnedd_${message.guild.id}_${member.id}`);
    if (!fish) return message.reply("This user has no warns");
    let idk = args.slice(1).join(" ");
    if (!fish.includes(idk))
      return message.reply("That user does not have a warn with this name");

    let test = removeA(fish, idk);

    db.set(`warnedd_${message.guild.id}_${member.id}`, test);
    message.channel.send(`deleted warn ${idk}`);
  }
};
module.exports.help = {
  name: "delwarns",
  aliases: ["delwarnings"]
};
