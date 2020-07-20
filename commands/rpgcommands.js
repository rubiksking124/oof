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
            .setTitle("RPG commands")
            .setDescription("All RPG commands")
            .addField(`${prefix}rpg`, "Creates a rpg account for you", true)
            .addField(
              `${prefix}RPGstats <optional mention a person>`,
              "Sends the RPG stats of you or the person you mentioned",
              true
            )
            .addField(
              `${prefix}dungeon`,
              "Tells you if you beat the dungeon you are on or if you lost to the dungeon you are on",
              true
            )
            .addField(`${prefix}shop`, "Sends you the rpg shop", true)
            .addField(
              `${prefix}buy strength`,
              "Gives you a random amount of extra strength",
              true
            )
            .addField(`${prefix}xp`, "Shows you your xp and your level", true)
        );
  }
};
module.exports.help = {
  name: "rpgc",
  aliases: ["crpg"]
};
