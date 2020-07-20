const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const coins = db.fetch(`coins_${message.author.id}`)
   let idk = parseInt(args[0]);
        if (args[0] <= 0) message.reply("Cant deposit less then 0");
        if (isNaN(args[0])) {
          return message.channel.send(
            "You have to enter a **NUMBER** or check the order of the command"
          );
        }
        if (args[0] > coins)
          return message.reply("You can't deposit more then you have");
        if (!args[0]) return message.reply("Please include an amount deposit");
        db.add(`bank_${message.author.id}`, idk);

        db.subtract(`coins_${message.author.id}`, idk);
        message.channel.send(
          "Succesfully deposited " +
            args[0] +
            " into " +
            message.author.username +
            "s bank"
        );
  }
};
module.exports.help = {
  name: "deposit",
  aliases: ["deposit"]
};
