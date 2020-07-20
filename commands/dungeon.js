const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const prefix = await db.fetch(`prefix_${message.guild.id}`)
    let idk = Math.floor(Math.random() * 20) + 1;
        let idk1 = Math.floor(Math.random() * 5) + 1;
        let coinss = Math.floor(Math.random() * 25) + 75;
        let level = db.fetch(`level_${message.author.id}`);
        let getting = db.fetch(`strength_${message.author.id}`);
        let botstats = db.fetch(`botstats_${message.author.id}`);
        let getting1 = db.fetch(`health_${message.author.id}`);
        if (!getting)
          return message.reply(
            `Please do ${prefix}rpg to set up a rpg account`
          );
        if (!level) level = 1;
        if (getting < botstats) {
          message.channel.send(
            new Discord.MessageEmbed()
              .setTitle("You lost to dungeon " + level)
              .addField(`${message.author.username}\s health:`, "0")
              .addField(`${message.author.username}\s strength:`, getting)
              .addField(`dungeon monsters health:`, botstats)
              .setColor("FF0000")
          );
        } else {
          message.channel.send(
            new Discord.MessageEmbed()
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/709968534486122556/712537643505680384/IMG_20200520_012417-removebg-preview.png"
              )
              .setTitle("You defeated dungeon " + level)

              .addField(`${message.author.username}\s health:`, getting1)
              .addField(`${message.author.username}\s strength:`, getting)
              .addField(`dungeon monsters health:`, "0")

              .setColor("#66ff00")
          );
          db.add(`level_${message.author.id}`, 1);
          db.add(`botstats_${message.author.id}`, idk);

          db.add(`coins_${message.author.id}`, coinss);
        }
  }
};
module.exports.help = {
  name: "dungeon",
  aliases: ["dungeon"]
};
