const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You need manage channels permission");
   
    if (args[1] !== "ok")
      return message.reply("Please use ok to confirm the lock of this channel");
   
    if (!args[0]) return message.reply("Invalid command use");
    if (!args[1]) return message.reply("Invalid command use");
    let roleId = args[0];

  

    if (!message.guild.roles.cache.has(roleId))
      return message.reply("That role is not in this server");
    if(isNaN(args[0])) return message.reply("invalid command use")
     message.channel.updateOverwrite(roleId, {
        SEND_MESSAGES: true
      });
      let embed = new Discord.MessageEmbed()
      .setTitle("unlocked the channel :unlock:")
      message.channel.send(embed)
    
     
  }
};
module.exports.help = {
  name: "unlock",
  aliases: ["unlock"]
};
