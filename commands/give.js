const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
 let coins = db.fetch(`coins_${message.author.id}`);
        if (!coins) {
          return message.reply("You do not have any muffins");
        }
        let user =
          message.mentions.members.first() || client.users.cache.get(args[0]);
        if (!user) return message.reply("Sorry, couldn't find that user.");
        let coins1 = db.fetch(`coins_${user.id}`);
        if (!args[1])
          return message.reply("Please specify the amount you want to pay.");
        if (isNaN(args[1])) return message.reply("numbers only");
        if (!coins) return message.reply("Sorry, you don't have any coins.");

        if (parseInt(args[1]) > coins)
          return message.reply("You don't have the much coins.");
        if (parseInt(args[1]) < 1)
          return message.reply("You can't pay less then 1.");

        if (!coins) {
          coins = 0;
          db.subtract(`coins_${message.author.id}`, parseInt(args[1]));
        }
        if (!coins1) {
          coins1 = 0;
          db.add(`coins_${user.id}`, parseInt(args[1]));
          db.subtract(`coins_${message.author.id}`, parseInt(args[1]));
        }

        message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Giving")
            .setColor("GREEN")
            .setDescription("Muffins")
            .addField(
              `Giving`,
              `${message.author.username} has awarded ${args[0]} ${
                args[1]
              } muffins`
            )
        );
}
};
module.exports.help = {
  name: "give",
  aliases: ["give"]
};
