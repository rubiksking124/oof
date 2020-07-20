const Discord = require("discord.js");
const db = require("quick.db");
const ms1 = require("ms");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("You do not have admin");

    if (!args[0]) return message.channel.send(`You did not specify your time!`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `You did not use the correct formatting for the time!`
      );
    if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);

    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `I could not find that channel in the guild!`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`No prize specified!`);
    message.channel.send(`*Giveaway created in ${channel}*`);
    let m = await message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`New giveaway!`)
        .setDescription(
          `The user ${message.author} is hosting a giveaway for the prize of **${prize}**`
        )
        .addField("Ends in ", ms1(args[0]))
        .setTimestamp(Date.now() + ms1(args[0]))
        .setColor(`GREEN`)
    );

    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `Not enough people reacted for me to start draw a winner!`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter(u => !u.bot)
        .random();
      channel.send(
        `The winner of the giveaway for **${prize}** is... ${winner}`
      );
    }, ms1(args[0]));
  }
};
module.exports.help = {
  name: "giveaway",
  aliases: ["gaway"]
};
