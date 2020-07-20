const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let pat = [
          "https://gph.is/16uD0uM",
          "https://gph.is/16uD0uM",
          "https://gph.is/28LZXVY",
          "https://gph.is/29jux8N",
          "https://media.giphy.com/media/109ltuoSQT212w/giphy.gif",
          "https://media.giphy.com/media/e7xQm1dtF9Zni/giphy.gif"
        ];
        let random = pat[Math.floor(Math.random() * pat.length)];
        if (message.mentions.users.first().id === message.author.id) {
          return message.channel.send("I'm sorry you can't pat yourself");
        }

        message.channel.send(
          `<@${message.author.id}>` + " is patting " + args[0] + " " + random
        );
  }
};
module.exports.help = {
  name: "pat",
  aliases: ["pat"]
};
