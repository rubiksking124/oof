const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
          return message.reply("You need manage messages permission");
        let member =
          message.mentions.users.first() ||
          message.guild.members.cache.find(m => m.id === args[0]);
        if(!member) return message.reply("Please include someone")
        let warns = db.fetch(`warnedd_${message.guild.id}_${member.id}`);
        if (!warns) return message.reply("This user has no warns");

        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `${member} has ${warns.length} warns their warns are ${warns}`
            )
        );
  }
};
module.exports.help = {
  name: "warns",
  aliases: ["warnings"]
};
