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
            .setTitle("RPG shop")
            .setDescription("The best shop in the west")
            .addField(
              `${prefix}buy strength`,
              "This gives you some extra strength" + "\n" + "Costs 300 muffins"
            )
            
        );
  }
};
module.exports.help = {
  name: "shop",
  aliases: ["shop"]
};
