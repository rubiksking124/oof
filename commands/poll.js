const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let question = args.join(" ");
        if (!question)
          return message.reply("please include a question for the poll");
        message.channel
          .send(
            new Discord.MessageEmbed()

              .setTitle(`${message.author.username}'s poll`)
              .setColor("#FF0000")
              .setDescription("Poll")
              .addField("question", question)
          )
          .then(async msg => {
            await msg.react("👍"), msg.react("👎");
          });
  }
};
module.exports.help = {
  name: "poll",
  aliases: ["poll"]
};
