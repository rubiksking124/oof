const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let coins = db.fetch(`coins_${message.author.id}`);
    let dif = 1000 - coins;
        let balc = db.fetch(`crates_${message.author.id}`);
        if (!balc) balc = 0;
        let bal = coins;
        if (bal <= 1000) {
          message.channel.send(
            " You do not have enough coins to buy a crate you need " +
              dif +
              " more muffins"
          );
        } else {
          db.add(`crates_${message.author.id}`, 1);
          db.subtract(`coins_${message.author.id}`, 1000);

          message.channel.send({
            embed: {
              color: 3066993,
              title: "Crates",
              fields: [
                {
                  name: "Crates",
                  value: "You bought one crate"
                }
              ]
            }
          });
        }
  }
};
module.exports.help = {
  name: "bcrate",
  aliases: ["buycrate"]
};
