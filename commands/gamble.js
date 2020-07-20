const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let coins = db.fetch(`coins_${message.author.id}`);
    if (!coins)
      return message.reply("You do not have any muffins to gamble with");
    if (!args[0]) return message.reply("Please specify an amount to bet");
    var maxBet = 10000;

    try {
      var bet = parseFloat(args[0]);
    } catch {
      return message.reply("You can only enter whole numbers");
    }
    if (bet != Math.floor(bet))
      return message.reply("You can only enter whole numbers");
    if (bet < 0) return message.reply("Bets must be greater then 0");
    if (coins < bet) return message.reply("You do not have that many muffins");
    if (bet > maxBet)
      return message.reply(
        `You cant bet higher then the maxbet, the  maxbet is ${maxBet}`
      );

    let chances = ["win", "lose"];
    var pick = chances[Math.floor(Math.random() * chances.length)];
    let lostt = (coins -= bet);
    let winn = (coins += bet);
    if (pick == "lose") {
      db.subtract(`coins_${message.author.id}`, bet);
      message.channel.send({
        embed: {
          color: 15158332,
          title: "Gamble",
          fields: [
            {
              name: "lose",
              value: `${message.author} you lost new balance: ${lostt} muffins`
            }
          ]
        }
      });
    } else {
      db.add(`coins_${message.author.id}`, bet);
      message.channel.send({
        embed: {
          color: 3066993,
          title: "Gamble",
          fields: [
            {
              name: "Win",
              value: `${message.author} you won! new balance: ${winn} muffins`
            }
          ]
        }
      });
    }
  }
};
module.exports.help = {
  name: "gamble",
  aliases: ["gamble"]
};
