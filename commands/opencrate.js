const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let balc = db.fetch(`crates_${message.author.id}`);
        if (!balc) balc = 0;
        if (balc < 1) {
          message.channel.send("You do not have any crates");
        } else {
          let options = ["nothing", "nothing", "100", "1000", "nothing"];
          var picks = options[Math.floor(Math.random() * options.length)];
          if (picks == "nothing") {
            db.subtract(`crates_${message.author.id}`, 1);
            message.channel.send({
              embed: {
                color: 15158332,
                title: "Crate",
                fields: [
                  {
                    name: picks,
                    value: `${message.author} you won ${picks}`
                  }
                ]
              }
            });
          }
        }
        if (picks == "100") {
          db.subtract(`crates_${message.author.id}`, 1);
          db.add(`coins_${message.author.id}`, 1000);
          message.channel.send({
            embed: {
              color: 3066993,
              title: "Crate",
              fields: [
                {
                  name: picks,
                  value: `${message.author} you won ${picks} muffins`
                }
              ]
            }
          });
        }

        if (picks == "1000") {
          db.subtract(`crates_${message.author.id}`, 1);
          db.add(`coins_${message.author.id}`, 1000);
          message.channel.send({
            embed: {
              color: 3066993,
              title: "Crate",
              fields: [
                {
                  name: picks,
                  value: `${message.author} you won ${picks} muffins`
                }
              ]
            }
          });
        }
      }
};
module.exports.help = {
  name: "opencrate",
  aliases: ["oc"]
};
