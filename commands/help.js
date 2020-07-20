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
            .setTitle("Commands")
            .setDescription("All commands")
            .addField(
              `${prefix}func`,
              "Sends a list of all the fun commands",
              true
            )
            .addField(
              `${prefix}searchc`,
              "Sends a list of all the search commands",
              true
            )
            .addField(
              `${prefix}economyc`,
              "Sends a list of all the economy commands",
              true
            )
            .addField(
              `${prefix}moderationc`,
              "Sends a list of all the moderation commands",
              true
            )
            .addField(
              `${prefix}imagec`,
              "Sends a list of all the image commands",
              true
            )
            .addField(
              `${prefix}configc`,
              "Sends a list of all the config commands",
              true
            )
            .addField(
              `${prefix}ownerc`,
              "Sends a list of all the owner commands",
              true
            )
            .addField(
              `${prefix}serverc`,
              "Sends a list of all the server commands",
              true
            )
            .addField(
              `${prefix}botc`,
              "Sends a list of all the bot commands",
              true
            )
            .addField(
              `${prefix}rpgc`,
              "Sends a list of all the rpg commands",
              true
            )
     .addField(
              `${prefix}musicc`,
              "Sends a list of all the music commands",
              true
            )
        );
  }
};
module.exports.help = {
  name: "help",
  aliases: ["help"]
};
