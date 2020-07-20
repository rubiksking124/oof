const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client({ fetchAllMembers: true });
const DBL = require("dblapi.js");
const topapi = process.env.API_TOKEN;
const dbl = new DBL(topapi, client);
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let user = message.mentions.users.first();
    if (!user) return message.reply("Please mention a bot");
    if (user.bot == true) {
      dbl.getBot(user.id).then(bot => {
        let embed = new Discord.MessageEmbed()
          .setTitle("Bot info")
          .addField("Name:", bot.username)
          .addField("Description:", bot.description);
        message.channel.send(embed);
      });
    } else {
      message.reply("Please do not mention a user");
    }
  }
};
module.exports.help = {
  name: "botinfo",
  aliases: ["bi"]
};
