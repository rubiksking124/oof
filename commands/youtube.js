const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   if (message.author.bot) return;
          const yt = require("youtube-dl");
        args = `ytsearch:${args.join(" ")}`;
        await yt.getInfo(
          args,
          [
            "-q",
            "--skip-download",
            "--no-warnings",
            "--format=bestaudio[protocol^=http]"
          ],
          async (err, info) => {
            if (
              err ||
              info.format_id === undefined ||
              info.format_id.startsWith("0")
            ) {
              let errorMessage;
              if (err && err.stack.includes("No video results")) {
                message.channel.send("error :/");
              } else {
                message.channel.send("error :/");
              }
              return message.channel.send("error :/");
            }

            await message.channel.send({
              embed: {
                color: 1752220,
                author: {
                  name: info.uploader,
                  url: info.uploader_url
                },
                title: info.title,
                url: `https://youtu.be/${info.id}`,
                fields: [
                  {
                    name: "Likes",
                    value: `${info.like_count}`,
                    inline: true
                  },
                  {
                    name: "Dislikes",
                    value: `${info.dislike_count}`,
                    inline: true
                  },
                  {
                    name: "Views",
                    value: `${info.view_count}`,
                    inline: true
                  }
                ],
                image: {
                  url: info.thumbnail
                },
                footer: {
                  text: info.is_live ? "Live Now" : `Duration: ${info.duration}`
                }
              }
            });
          }
        );
  }
};
module.exports.help = {
  name: "ytsearch",
  aliases: ["ytsearch"]
};
