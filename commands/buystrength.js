const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const coins = db.fetch(`coins_${message.author.id}`)
    let di = 300 - coins;
        if (coins < 300)
          return message.reply(
            "You do not have enough muffins you need " + di + " more"
          );
        let ddd = Math.floor(Math.random() * 20) + 1;
        let bob = db.fetch(`strength_${message.author.id}`);
        message.channel.send(
          new Discord.MessageEmbed()
            .setTitle(message.author.username + " bought some extra strength")
            .setDescription("You have bought some extra strength")
            .addField("You bought ", `${ddd} extra strength`)
        );
        db.subtract(`coins_${message.author.id}`, 300);
        db.add(`strength_${message.author.id}`, ddd);
  }
};
module.exports.help = {
  name: "buys",
  aliases: ["getstrength"]
};
