const Discord = require("discord.js");
const db = require("quick.db");
const { stripIndents } = require("common-tags");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const fetch = require("node-fetch");
        const name = args.join(" ");

        if (!name) {
          return message
            .reply("Maybe it's useful to actually search for someone...!")
            .then(m => m.delete(5000));
        }

        const url = `https://instagram.com/${name}/?__a=1`;

        let res;

        try {
          res = await fetch(url).then(url => url.json());
        } catch (e) {
          return message
            .reply(e);
            
        }

        const account = res.graphql.user;
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField(
              "Profile information",
              stripIndents`**- Username:** ${account.username}
            **- Full name:** ${account.full_name}
            **- Biography:** ${
              account.biography.length == 0 ? "none" : account.biography
            }
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`
            )
        );
  }
};
module.exports.help = {
  name: "insta",
  aliases: ["instagram"]
};
