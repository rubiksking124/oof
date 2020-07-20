const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.reply("You need manage roles permission");
    let role = message.mentions.roles.first();
    if (!role) return message.reply("Please mention a role");
    if (message.guild.roles.cache.get(role.id).managed)
      return message.reply("please do not use managed roles");

    if (!message.guild.roles.cache.has(role.id))
      return message.reply("That role is not in this server");

    db.set(`role_${message.guild.id}`, role.id);
    message.channel.send("welcome role set to " + role.name);
  }
};
module.exports.help = {
  name: "setjoinrole",
  aliases: ["sjr"]
};
