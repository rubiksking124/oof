const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const prefix = await db.fetch(`prefix_${message.guild.id}`)
   message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Search commands")
            .setDescription("All of the search commands")
            .addField(
              `${prefix} instagram <instagram account name>`,
              "Sends the details to the account you said"
            )
            .addField(
              `${prefix} ytsearch <youtube video name>`,
              "Sends the first result of the name you entered"
            )
            .addField(
              `${prefix} google <what you want to search>`,
              "Sends a link of what you wanted to search on google"
            )
            .addField(
              `${prefix} wiki <what you want to search on wiki>`,
              "Sends the result of what you searched"
            )
            .addField(
              `${prefix} urban <what you want to search on urban>`,
              "Sends the result of what you searched on urban"
            )
        );
  }
};
module.exports.help = {
  name: "csearch",
  aliases: ["searchc"]
};
