const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
          return message.reply("You need manage messages permission");
        let reason = args.slice(1).join(" ");
        let member =
          message.mentions.users.first() ||
          message.guild.members.cache.find(m => m.id === args[0]);

        if (!reason)
          return message.reply("Please include a reason for warning");
        if (!member) return message.reply("Please include a member to warn");
        if (member.bot) return message.reply("can't warn bots");
        let warns = db.fetch(`warnedd_${message.guild.id}_${member.id}`);

        db.push(`warnedd_${message.guild.id}_${member.id}`, reason);

        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Warned")
            .setDescription(`${member} has been warns`)
            .addField("Warned for", `${member} has been warns for ${reason}`)
        );
        member
          .send(`You have been warned in ${message.guild.name} for ${reason}`)
          .catch(() => message.reply("Can't send DM to your user!"));
  }
};
module.exports.help = {
  name: "warn",
  aliases: ["warning"]
};
