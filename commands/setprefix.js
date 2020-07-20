const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (
      !message.member.hasPermission("MANAGE_GUILD") &&
      message.author.id != "606279329844035594"
    )
      return message.reply(
        "you don't have required permision to use this command"
      );

    if (!args[0]) return message.reply("define new prefix");
    await db.set(`prefix_${message.guild.id}`, args[0]);
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Prefix changed")
        .setDescription(
          `prefix for this guild has been changed to ${
            args[0]
          } succssfully :tada:`
        )
    );
  }
};
module.exports.help = {
  name: "setprefix",
  aliases: ["sprefix"]
};
