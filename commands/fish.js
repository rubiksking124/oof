const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms")
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   let options = [
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "commonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "uncommonfish",
          "rarefish",
          "rarefish",
          "rarefish",
          "rarefish",
          "rarefish",
          "rarefish",
          "rarefish",
          "not fish",
          "not fish",
          "not fish",
          "not fish",
          "not fish",
          "not fish",
          "not fish",
          "not fish",
          "not fish"
        ];
        let lmao = options[Math.floor(Math.random() * options.length)];
        let rare = Math.floor(Math.random() * 100) + 1;
        let common = Math.floor(Math.random() * 50) + 1;
        let uncommon = Math.floor(Math.random() * 75) + 1;
        let rarexp = Math.floor(Math.random() * 100) + 1;
        let commonxp = Math.floor(Math.random() * 50) + 1;
        let uncommonxp = Math.floor(Math.random() * 75) + 1;

        let timeout = 86400000; // 24 hours in milliseconds, change if you'd like.

        // random amount: Math.floor(Math.random() * 1000) + 1;

        let daily = await db.fetch(`fish_${message.author.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
          let time = ms(timeout - (Date.now() - daily));

          message.channel.send(
            `You already fished come back and fish in **${time.hours}h ${time.minutes}m ${time.seconds}s**!`
          );
        } else {
          if (lmao === "commonfish") {
            message.channel.send(
              new Discord.MessageEmbed()
                .setTitle(`${message.author.username}\s fishing experince`)
                .setDescription("Fishing")
                .addField("You caught:", "A common fish 🐟")
                .addField(
                  "And got",
                  `${common} more muffins for selling the fish and got ${commonxp} xp`
                )
            );
            db.add(`coins_${message.author.id}`, common);
            db.add(`xp_${message.author.id}`, commonxp);
          }
          if (lmao === "uncommonfish") {
            message.channel.send(
              new Discord.MessageEmbed()
                .setTitle(`${message.author.username}\s fishing experince`)
                .setDescription("Fishing")
                .addField("You caught:", "A uncommon fish 🦆")
                .addField(
                  "And got",
                  `${uncommon} more muffins for selling the fish and got ${uncommonxp} xp`
                )
            );
            db.add(`coins_${message.author.id}`, uncommon);
            db.add(`xp_${message.author.id}`, uncommonxp);
          }
          if (lmao === "rarefish") {
            message.channel.send(
              new Discord.MessageEmbed()
                .setTitle(`${message.author.username}\s fishing experince`)
                .setDescription("Fishing")
                .addField("You caught:", "A rare fish 🐙")
                .addField(
                  "And got",
                  `${rare} more muffins for selling the fish and got ${rarexp} xp`
                )
            );
            db.add(`coins_${message.author.id}`, rare);
            db.add(`xp_${message.author.id}`, rarexp);
          }
          if (lmao === "not fish") {
            message.reply("You caught nothing");
          }
          db.set(`fish_${message.author.id}`, Date.now());
        }
  }
};
module.exports.help = {
  name: "fish",
  aliases: ["fish"]
};
