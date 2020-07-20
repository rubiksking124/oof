const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let fethed = db.fetch(`emotes1_${message.author.id}`);
    if (!fethed) fethed = "";
    if (fethed.includes("Cupcake")) {
      message.reply("You already have this badge");
    } else {
      const coins = db.fetch(`coins_${message.author.id}`);
      let idk = db.fetch(`emotes_${message.author.id}`);

      let di = 500 - coins;
      if (coins < 500)
        return message.reply(
          "You do not have enough muffins you need " + di + " more"
        );
      let cupcake = "<:Cupcake:713163555918053437>";
      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Emotes")
          .setDescription(
            "You have succesfully bought a cupcake emote to see emotes view your profile"
          )
      );
      db.subtract(`coins_${message.author.id}`, 500);
      db.push(`emotes1_${message.author.id}`, "Cupcake");
    }
  }
};
module.exports.help = {
  name: "buyc",
  aliases: ["buycupcake"]
};
