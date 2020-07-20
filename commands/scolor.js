const Discord = require("discord.js");
const db = require("quick.db");
 const superagent = require("superagent");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     if (!args[0] || args[0] === "help")
          return message.reply("Please provide a valid hex code without the #");
        var isOk = /^[0-9A-F]{6}$/i.test(args[0]);
        if (isOk === false)
          return message.reply("Please provide a valid hex code without the #");

        const { body } = await superagent.get(
          `https://api.alexflipnote.dev/color/` + args[0]
        );
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#ff9900")
            .setTitle(body.name)
            .setDescription("Hex: " + body.hex + "\n" + "RGB: " + body.rgb)
            .setImage(body.image)
        );
  }
};
module.exports.help = {
  name: "scolor",
  aliases: ["scolor"]
}
