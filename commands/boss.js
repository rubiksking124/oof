const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let prefix =  db.fetch(`prefix_${message.guild.id}`)
      if(!prefix) prefix="^"
   let level = db.fetch(`level_${message.author.id}`);
        let getting = db.fetch(`strength_${message.author.id}`);
        let bothealt = db.fetch(`bothealth_${message.author.id}`);
        if (!bothealt) bothealt = 1359;
        let getting1 = db.fetch(`health_${message.author.id}`);
        if (!getting)
          return message.reply(
            `Please do ${prefix}rpg to set up a rpg account`
          );
        if (!level) level = 1;
        if (level < 20)
          return message.reply("You have to be level 20 to fight the boss");
        if (getting < bothealt) {
          message.channel.send(
            new Discord.MessageEmbed()
              .setTitle("You lost to the boss")
              .addField(`${message.author.username}\s health:`, "0")
              .addField(`${message.author.username}\s strength:`, getting)
              .addField(`dungeon monsters health:`, bothealt)
              .setColor("FF0000")
          );
        } else {
          message.channel.send(
            new Discord.MessageEmbed()
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/709968534486122556/712537643505680384/IMG_20200520_012417-removebg-preview.png"
              )
              .setTitle("You defeated dungeon the boss")

              .addField(`${message.author.username}\s health:`, getting1)
              .addField(`${message.author.username}\s strength:`, getting)
              .addField(`dungeon monsters health:`, "0")

              .setColor("#66ff00")
          );

          db.add(`coins_${message.author.id}`, 1000);
          db.add(`bothealth_${message.author.id}`, 1000);
        }
  }
};
module.exports.help = {
  name: "boss",
  aliases: ["boss"]
};
