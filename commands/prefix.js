const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
  const prefix = await db.fetch(`prefix_${message.guild.id}`);
  message.channel.send(
    new Discord.MessageEmbed()

      .setColor("#0099ff")
      .setTitle("Prefix")
      .setDescription(`prefix for this guild is ${prefix}`)
  );
}
};
module.exports.help = {
  name: "prefix",
  aliases: ["prefix"]
};
