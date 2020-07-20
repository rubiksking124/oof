const Discord = require("discord.js");
const db = require("quick.db");
const sf = require("snekfetch")
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if(!message.channel.nsfw) return message.reply("nsfw command only")
      const query = args.join(" ");
        const { body } = await sf
          .get("https://en.wikipedia.org/w/api.php")
          .query({
            action: "query",
            prop: "extracts",
            format: "json",
            titles: query,
            exintro: "",
            explaintext: "",
            redirects: "",
            formatversion: 2
          });
        if (!query)
          return message.reply("Please include something to search on wiki");
        if (body.query.pages[0].missing)
          return message.channel.send("No Results.");
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor(0x00a2e8)
            .setTitle(body.query.pages[0].title)
            .setAuthor("Wikipedia", "https://i.imgur.com/a4eeEhh.png")
            .setDescription(
              body.query.pages[0].extract
                .substr(0, 2000)
                .replace(/[\n]/g, "\n\n")
            )
        );
  }
};
module.exports.help = {
  name: "wiki",
  aliases: ["wiki"]
};
