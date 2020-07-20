const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let bank = db.fetch(`bank_${message.author.id}`);
      if (!bank) bank = 0;
    message.channel.send(new Discord.MessageEmbed()
           .setTitle(`${message.author.username}\'s bank`)            
                         .setDescription(`${bank}`)
                        )
  }
};
module.exports.help = {
  name: "bank",
  aliases: ["bank"]
};
