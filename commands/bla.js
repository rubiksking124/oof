const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_GUILD"))
          return message.reply("You need manage GUILD permission");
        let reason = args.join(" ");
      let idk = db.fetch(`blw_${message.guild.id}`)
      if(idk === "off") return message.reply("Please turn on blacklist of words before you cann add words use wbl on to turn it on")

        if (!reason)
          return message.reply("Please include a word or phrase you want for the blacklistwords");
     
 

        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Added")
            .setDescription(`Successfullt added ${reason} to the word blacklist`)
            
        );
    db.push(`bla2_${message.guild.id}`, reason)
     
  }
};
module.exports.help = {
  name: "ablw",
  aliases: ["addblacklistword"]
};
