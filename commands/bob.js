const Discord = require("discord.js");
const db = require("quick.db");
const trigger = process.env.TRIGGER;
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
         const user = message.mentions.users.first() || message.author;
        const { get } = require("superagent");

        const { body } = await get("https://emilia-api.glitch.me/api/bob-ross")
          .query({
            image: user.avatarURL({ format: "png", size: 1024 })
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
  name: "bob",
  aliases: ["bob"]
};
