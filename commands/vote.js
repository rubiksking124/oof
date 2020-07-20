const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#000000")
            .setTitle("Vote for Muffin!")
            .addField(
              "Voting on discordbots.org:",
              "https://top.gg/bot/700608658416861236/vote"
            )
        );
  }
};
module.exports.help = {
  name: "vote",
  aliases: ["vote"]
};
