const Discord = require("discord.js");
const db = require("quick.db");
const urban = require("urban")
const { stripIndents } = require("common-tags");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const prefix = await db.fetch(`prefix_${message.author.id}  q`)
    if (!message.channel.nsfw)
      return message.reply("NSFW channel command only");
    if (!args[0] || !["search", "random"].includes(args[0]))
      return message.channel.send(prefix + "`urban <search|random> (query)`");
    let image =
      "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
    let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
    try {
      search.first(res => {
        if (!res)
          return message.channel.send(
            "No results found for this topic, sorry!"
          );
        let {
          word,
          definition,
          example,
          thumbs_up,
          thumbs_down,
          permalink,
          author
        } = res;
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("FF0000")
            .setAuthor(`Urban Dictionary | ${word}`, image)
            .setThumbnail(image)
            .setDescription(
              stripIndents`**Defintion:** ${definition || "No definition"}
                            **Example:** ${example || "No Example"}
                            **Upvote:** ${thumbs_up || 0}
                            **Downvote:** ${thumbs_down || 0}
                            **Link:** [link to ${word}](${permalink ||
                "https://www.urbandictionary.com/"})`
            )
            .setTimestamp()
            .setFooter(`Written by ${author || "unknown"}`)
        );
      });
    } catch (e) {
      console.log(e);
      return message.channel.send("looks like i've broken! Try again");
    }
  }
};
module.exports.help = {
  name: "urban",
  aliases: ["urban"]
};
