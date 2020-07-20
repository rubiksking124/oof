const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Invite Muffin to your server")
            .setDescription("A link to invite Muffin to your server")
            .addField(
              "Muffin invite",
              "https://discord.com/api/oauth2/authorize?client_id=700608658416861236&permissions=1610481143&scope=bot"
            )
        );
  }
};
module.exports.help = {
  name: "mi",
  aliases: ["mi"]
};
