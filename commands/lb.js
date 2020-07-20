const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let money = db
      .all()
      .filter(data => data.ID.startsWith(`coins_`))
      .sort((a, b) => b.data - a.data);
    if (!money.length) {
      let noEmbed = new Discord.MessageEmbed()
        .setAuthor(
          message.member.displayName,
          message.author.displayAvatarURL()
        )
        .setColor("GREEN")
        .setFooter("Nothing To See Here Yet!");
      return message.channel.send(noEmbed);
    }

    
    var finalLb = "";
    money.length = 10;
    for (var i in money) {
      if (money[i].data === null) money[i].data = 0;
      finalLb += `**${money.indexOf(money[i]) + 1}. ${
        client.users.cache.get(money[i].ID.split("_")[1])
          ? client.users.cache.get(money[i].ID.split("_")[1]).tag
          : "Unknown User#0000"
      }** - ${money[i].data} Muffins\n`;
    }
   
    const embed = new Discord.MessageEmbed()
      .setTitle(`Leaderboard`)
      .setColor("GREEN")
      .setDescription(finalLb)
      .setFooter(client.user.tag, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(embed)
  }
};
module.exports.help = {
  name: "leaderboard",
  aliases: ["lb"]
};
