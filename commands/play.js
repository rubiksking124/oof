const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let start = new Discord.MessageEmbed().setAuthor("...pinging");
    const m = await message.channel.send(start);

    let finisg = new Discord.MessageEmbed().setAuthor(
      `Message Latency - ${m.createdTimestamp - message.createdTimestamp}ms`
    );
    m.edit(finisg);
  }
};
module.exports.help = {
  name: "ping",
  aliases: ["ping"]
};
