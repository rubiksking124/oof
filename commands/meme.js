const Discord = require("discord.js");
const db = require("quick.db");
const sf = require("snekfetch")
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     try {
          const { body } = await sf
            .get("https://www.reddit.com/r/dankmeme.json?sort=top&t=week")
            .query({ limit: 800 });
          const allowed = message.channel.nsfw
            ? body.data.children
            : body.data.children.filter(post => !post.data.over_18);
          if (!allowed.length)
            return message.channel.send(
              "It seems we are out of fresh memes!, Try again later."
            );
          const randomnumber = Math.floor(Math.random() * allowed.length);
          message.channel.send(
            new Discord.MessageEmbed()
              .setColor(0x00a2e8)
              .setTitle(allowed[randomnumber].data.title)
              .setDescription("Posted by: " + allowed[randomnumber].data.author)
              .setImage(allowed[randomnumber].data.url)
              .addField(
                "Other info:",
                "Up votes: " +
                  allowed[randomnumber].data.ups +
                  " / Comments: " +
                  allowed[randomnumber].data.num_comments
              )
          );
        } catch (err) {
          return console.log(err);
        }
  }
};
module.exports.help = {
  name: "meme",
  aliases: ["meme"]
};
