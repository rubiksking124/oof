const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     let prefix =  db.fetch(`prefix_${message.guild.id}`)
      if(!prefix) prefix="^"
   if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.reply("You do not have admin");
        message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Moderation commands")
            .setDescription("All moderation commands")
            .addField(`${prefix}kick <user>`, "Kicks the user", true)
            .addField(`${prefix}ban <user>`, "Bans the user", true)
            .addField(
              `${prefix}purge <number between 1-100>`,
              "Deletes the amount of messages you said",
              true
            )
            .addField(
              `${prefix}nick <new nick name>`,
              "Changes the bots nick name",
              true
            )
            .addField(
              `${prefix}dm  <user> <message>`,
              "Dms the user with the message",
              true
            )
            .addField(
              `${prefix}report  <user> <reason>`,
              "Dms owner of bot with message on the reported user",
              true
            )
            .addField(
              `${prefix}giveaway  <time> <channel> <prize>`,
              "Hosts a giveaway for the time you provided in the channel you provided",
              true
            )
           
           .addField(`${prefix}lock <role id> ok`, "Locks the current channel for that role", true)
           .addField(`${prefix}unlock <role id> ok`, "Unlocks the current channel", true)
           )
  }
};
module.exports.help = {
  name: "moderationc",
  aliases: ["cmod"]
};
