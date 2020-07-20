const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const coins = db.fetch(`coins_${message.author.id}`)
     let rps = ["p", "r", "s"];

        let max = 10000;
        if (!coins) return message.reply("You don't have any muffins");
        if (bet < 0) return message.reply("Bets must be greater then 0");
        if (!rps.includes(args[0]))
          return message.reply("Please choose r, p or s.");
        if (!args[1]) return message.reply("Please add a bet");

        if (args[1].toLowerCase() == "all") args[1] = max;

        try {
          var bet = parseFloat(args[1]);
        } catch {
          return message.reply("You can only enter whole numbers.");
        }
        if (bet != Math.floor(bet))
          return message.reply("You can only enter whole numbers.");
        if (coins < bet)
          return message.reply("You don't have that much coins.");
        if (bet > max) return message.reply(`The maxium bet is ${max}.`);

        let bot = rps[Math.floor(Math.random() * rps.length)];

        if (args[0] === bot) {
          message.channel.send({
            embed: {
              color: 15158332,
              title: "Rock Paper Scissors",
              fields: [
                {
                  name: "Your choice",
                  value: `\`\`\`css\n${args[0]}\`\`\``
                },
                {
                  name: "My choice",
                  value: `\`\`\`css\n${bot}\`\`\``
                },
                {
                  name: "Output",
                  value: "We tied. New balance: " + coins
                }
              ]
            }
          });
        } else if (args[0] === "r" && bot === "p") {
          db.subtract(`coins_${message.author.id}`, bet);
          message.channel.send({
            embed: {
              color: 15158332,
              title: "Rock Paper Scissors",
              fields: [
                {
                  name: "Your choice",
                  value: `\`\`\`css\n${args[0]}\`\`\``
                },
                {
                  name: "My choice",
                  value: `\`\`\`css\n${bot}\`\`\``
                },
                {
                  name: "Output",
                  value: "You lost :(. New balance: " + coins
                }
              ]
            }
          });
        } else if (args[0] === "r" && bot === "s") {
          db.add(`coins_${message.author.id}`, bet);
          message.channel.send({
            embed: {
              color: 15158332,
              title: "Rock Paper Scissors",
              fields: [
                {
                  name: "Your choice",
                  value: `\`\`\`css\n${args[0]}\`\`\``
                },
                {
                  name: "My choice",
                  value: `\`\`\`css\n${bot}\`\`\``
                },
                {
                  name: "Output",
                  value: "You won!! New balance: " + coins
                }
              ]
            }
          });
        } else if (args[0] === "p" && bot === "s") {
          db.subtract(`coins_${message.author.id}`, bet);
          message.channel.send({
            embed: {
              color: 15158332,
              title: "Rock Paper Scissors",
              fields: [
                {
                  name: "Your choice",
                  value: `\`\`\`css\n${args[0]}\`\`\``
                },
                {
                  name: "My choice",
                  value: `\`\`\`css\n${bot}\`\`\``
                },
                {
                  name: "Output",
                  value: "You lost :(. New balance: " + coins
                }
              ]
            }
          });
        } else if (args[0] === "p" && bot === "r") {
          db.add(`coins_${message.author.id}`, bet);
          message.channel.send({
            embed: {
              color: 15158332,
              title: "Rock Paper Scissors",
              fields: [
                {
                  name: "Your choice",
                  value: `\`\`\`css\n${args[0]}\`\`\``
                },
                {
                  name: "My choice",
                  value: `\`\`\`css\n${bot}\`\`\``
                },
                {
                  name: "Output",
                  value: "You Won!! New balance: " + coins
                }
              ]
            }
          });
        } else if (args[0] === "s" && bot === "p") {
          db.add(`coins_${message.author.id}`, bet);
          message.channel.send({
            embed: {
              color: 15158332,
              title: "Rock Paper Scissors",
              fields: [
                {
                  name: "Your choice",
                  value: `\`\`\`css\n${args[0]}\`\`\``
                },
                {
                  name: "My choice",
                  value: `\`\`\`css\n${bot}\`\`\``
                },
                {
                  name: "Output",
                  value: "You Won!! New balance: " + coins
                }
              ]
            }
          });
        } else if (args[0] === "s" && bot === "r") {
          db.subtract(`coins_${message.author.id}`, bet);
          message.channel.send({
            embed: {
              color: 15158332,
              title: "Rock Paper Scissors",
              fields: [
                {
                  name: "Your choice",
                  value: `\`\`\`css\n${args[0]}\`\`\``
                },
                {
                  name: "My choice",
                  value: `\`\`\`css\n${bot}\`\`\``
                },
                {
                  name: "Output",
                  value: "You lost :(. New balance: " + coins
                }
              ]
            }
          });
        }
  }
};
module.exports.help = {
  name: "rps",
  aliases: ["rps"]
};
