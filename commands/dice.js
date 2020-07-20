const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const coins  = db.fetch(`coins_${message.author.id}`)
  let maxyboi = 1000;
        if (!coins) return message.reply("You don't have any muffins");
        if (!args[0]) return message.reply("Please specify a bet.");

        if (args[0].toLowerCase() == "all") args[0] = maxyboi;

        try {
          var whatyoulose = parseFloat(args[0]);
        } catch {
          return message.reply("You can only enter whole numbers.");
        }
        try {
          var myNumber = parseInt(args[1]);
        } catch {
          return message.reply("You can only enter whole numbers.");
        }
        if (isNaN(args[1])) return message.reply("Please only use numbers");
        if (!args[1])
          return message.reply("Please include a number to guess with");
        if (myNumber < 1 || myNumber > 6)
          return message.reply("Please only use numberrs between 1 2 3 4 5 6");

        if (whatyoulose != Math.floor(whatyoulose))
          return message.reply("You can only enter whole numbers.");
        if (whatyoulose < 0)
          return message.reply("Bets must be greater then 0");
        if (coins < whatyoulose)
          return message.reply("You don't have that much coins.");

        if (whatyoulose > maxyboi)
          return message.reply(`The maxium bet is ${maxyboi}.`);
        let idfingknow = ["1", "2", "3", "4", "5", "6"];
        let bot = idfingknow[Math.floor(Math.random() * idfingknow.length)];

        if (args[1] === bot) {
          message.channel.send(
            new Discord.MessageEmbed()
              .setTitle("Dice win")
              .setDescription("You won dice game")
              .addField("Bot choice", bot)
              .addField("Your choice", args[1])
              .addField("Amount won ", whatyoulose * args[1])
          );
          db.add(`coins_${message.author.id}`, whatyoulose * args[1]);
        } else {
          message.channel.send(
            new Discord.MessageEmbed()
              .setTitle("Dice lose")
              .setDescription("You lost dice game")
              .addField("Bot choice", bot)
              .addField("Your choice", args[1])
              .addField("Amount lost", whatyoulose * args[1])
          );
          db.subtract(`coins_${message.author.id}`, whatyoulose * args[1]);
        }
  }
};
module.exports.help = {
  name: "dice",
  aliases: ["dice"]
};
