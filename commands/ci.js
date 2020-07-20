const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     let channel =
          message.mentions.channels.first() ||
          message.guild.channels.cache.find(c =>
            c.name.toLowerCase().includes(args.join(" ").toLowerCase())
          );
        if (!channel)
          return message.reply("Please include a channel or a valid channel");
        let bobb = channel.parent;
        if (!bobb) bobb = "I dont exist";

        let nsfw = channel.nsfw;
        if (nsfw === false) {
          nsfw = ":x:";
        } else {
          nsfw = ":white_check_mark:";
        }
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#FFB6C1")
            .setTitle(message.guild.name)
            .setDescription("Channel info")
            .addField("Name:", channel.name, true)
            .addField("Id:", channel.id, true)
            .addField("Type:", channel.type, true)
            .addField("Parent:", bobb, true)
            .addField("NSFW:", nsfw, true)
        );
  }
};
module.exports.help = {
  name: "channelinfo",
  aliases: ["ci"]
};
