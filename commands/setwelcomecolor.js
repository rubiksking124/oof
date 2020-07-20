const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You need manage channels permission");
    let fish = args[0];
 
  let isOk = /^[0-9A-F]{6}$/i.test(args[0]);
        if (isOk === false)
          return message.reply("Please provide a valid hex code without the #");
    db.set(`color_${message.guild.id}`, "#"+fish);
    message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "welcome text color set to " + fish
      )
    );
  }
};
module.exports.help = {
  name: "setwelcomecolor",
  aliases: ["swc"]
};
