const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let dbd = db.fetch(`commands1_${message.guild.id}`);
    if (!dbd)
      return message.channel.send(
        "You do not have any custom commands for this guild"
      );
    let embed = new Discord.MessageEmbed().setTitle("commands");
    message.channel.send(embed).then(msg => {
      let commands = 0;
      dbd.forEach(emoji => {
        commands++;
        embed.addField("Command name " +dbd[commands].Name, "Command " +dbd[commands].command);
        msg.edit(embed)
      });
    });
  }
};
module.exports.help = {
  name: "commands",
  aliases: ["commands"]
};
