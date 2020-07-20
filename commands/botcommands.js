const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     let prefix =  db.fetch(`prefix_${message.guild.id}`)
      if(!prefix) prefix="^"
   message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Bot commands")
            .setDescription("All bot commands")
            .addField(`${prefix}stats`, "Sends all the bots stats", true)
     .addField(`${prefix}mi`,"sends a link to invite muffin",true)
        );
  }
};
module.exports.help = {
  name: "botc",
  aliases: ["cbot"]
};
