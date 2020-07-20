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
            .setTitle("Music commands")
            .setDescription("All music commands")
            .addField(`${prefix}play <song title or url>`, "Plays song", true)
            .addField(`${prefix}queue `, "Sends the queue for the guild", true)
            .addField(
              `${prefix}loop`,
              "Loops the song",
              true
            )
            .addField(
              `${prefix}stop`,
              "Stops playing music",
              true
            )
            .addField(
              `${prefix}pause`,
              "Pauses the music",
              true
            )
            .addField(
              `${prefix}resume`,
              "Resumes the music",
              true
            )
           )
  }
};
module.exports.help = {
  name: "musicc",
  aliases: ["cmusic"]
};
