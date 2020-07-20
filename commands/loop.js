const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("YOU NEED TO BE IN VOICE CHANNEL :/");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("There is nothing playing that i could loop");
    }

    //OOOOF
    serverQueue.loop = !serverQueue.loop;

    message.channel.send(
      `Loop is now **${serverQueue.loop ? "Enabled" : "Disabled"}**`
    );
  }
};
module.exports.help = {
  name: "loop",
  aliases: ["loop"]
};
