const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const prefix = await db.fetch(`prefix_${message.guild.id}`)
      let d20 = Math.floor(Math.random() * 20) + 1;
        let strength = db.fetch(`strength_${message.author.id}`);
        let health = db.fetch(`health_${message.author.id}`);
        let botstats = db.fetch(`botstats_${message.author.id}`);
        let level = db.fetch(`level_${message.author.id}`);

        let d100 = Math.floor(Math.random() * 100) + 1;
        if (!health) {
          var bob = db.set(`strength_${message.author.id}`, d20);
          var f = db.set(`health_${message.author.id}`, d100);
          var idk = db.set(`botstats_${message.author.id}`, d20);
          var billy = db.set(`level_${message.author.id}`, 1);
          await message.channel.send(
            new Discord.MessageEmbed()
              .setTitle(
                message.author.username + " s rpg account has been created"
              )
              .setDescription(
                message.author.username + " just created a rpg account"
              )
              .addField("Health: ", f)
              .addField("Strength: ", bob)
              .addField("Level: ", billy)
              .addField("Bot strength: ", idk)
          );
        } else {
          message.reply(
            "You already have an account do " +
              `${prefix}dungeon to go to the last dungeon ${prefix}RPGstats to see your stats`
          );
        }
  }
};
module.exports.help = {
  name: "rpg",
  aliases: ["rpg"]
};
