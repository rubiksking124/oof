const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms")
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else{
    let prefix = db.fetch(`prefix_${message.guild.id} `)
    if(!prefix) prefix ="^"
    let first = message.mentions.users.first() || message.member;
        let second = message.mentions.users.array()[1];
        if (!args[0])
          return message.channel.send(
            `Use ${prefix}love <mention1> <mention2> to calculate`
          );

        if (!args[1])
          return message.channel.send("`Please mention two users!`");
        if (args[0] === args[1])
          return message.channel.send("`You can't mention the same user.`");

        if (!args[2]) {
          let embed = new Discord.MessageEmbed()
            .setColor("#FE2E2E")
            .setTitle("Love calculator! :heart:")
            .setTimestamp()
            .setDescription(
              `${first} and ${second} have ` +
                Math.floor(Math.random() * 100 + 1) +
                "% of love."
            );
          message.channel.send(embed);
        }
  }
};
module.exports.help = {
  name: "lc",
  aliases: ["lc"]
};
