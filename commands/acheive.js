const Discord = require("discord.js");
const db = require("quick.db");
const trigger = process.env.TRIGGER;
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
              const text = args.join(" ");
        if (!text) return message.reply("Please provide a text!");
        const { get } = require("superagent");

        const { body } = await get(
          "https://emilia-api.glitch.me/api/achievement"
        )
          .query({
            image: message.author.displayAvatarURL({
              format: "png",
              size: 1024
            }),
            text
          })
          .set("Authorization", `Bearer ${trigger}`); // authentication

        message.channel.send(
          new Discord.MessageEmbed()
            .attachFiles({ attachment: body, name: "achievement.png" })
            .setImage("attachment://achievement.png")
        );
  }
};
module.exports.help = {
  name: "achievement",
  aliases: ["achieve"]
};
