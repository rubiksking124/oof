const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
      const Minesweeper = require("discord.js-minesweeper");
        const content = message.content.split(" ");
        const args = content.slice(1);

        const rows = 12;
        const columns = 12;
        const mines = 16;

        const minesweeper = new Minesweeper({ rows, columns, mines });
        const matrix = minesweeper.start();

        return matrix
          ? message.channel.send(matrix)
          : message.channel.send(":warning: You have provided invalid data.");
  }
};
module.exports.help = {
  name: "minesweeper",
  aliases: ["ms"]
};
