const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     let ball = [
          "As I see it, yes.",
          "Ask again later.",
          "Better not tell you now.",
          "Cannot predict now.",
          "Concentrate and ask again.",
          "Don't count on it.",
          "It is certain.",
          "It is decidedly so."
        ];
        let ball1 = ball[Math.floor(Math.random() * ball.length)];
        if (!args[0]) {
          message.channel.send("Please provide a question");
        } else {
          message.channel.send(ball1);
        }
  }
};
module.exports.help = {
  name: "8ball",
  aliases: ["8b"]
};
