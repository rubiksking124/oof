const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   let prefix =  db.fetch(`prefix_${message.guild.id}`)
      if(!prefix) prefix="^"
    let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.round(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

        message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("**Bot status**")
            .setColor("BLUE")
          .addField("Memory usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("Servers:", client.guilds.cache.size, true)
            .addField("Channels:", client.channels.cache.size, true)
            .addField("Users:", client.users.cache.size, true)
            .addField("Preifx:", prefix, true)
            .addField("Discord.JS:", "12.2.0", true)

            .addField("Uptime:", uptime, true)
        );
  }
};
module.exports.help = {
  name: "stats",
  aliases: ["stats"]
};
