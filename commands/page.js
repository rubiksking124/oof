const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms")
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     let roleList = message.guild.roles.cache
          .sort((a, b) => b.position - a.position)
          .map(r => r);

        if (roleList.length > 1024) roleList = "To many roles to display";
        let ToSplitAt = 10;
        let arrayofRoles = [];
        for (var i = 0; i < roleList.length; i += ToSplitAt) {
          arrayofRoles.push(roleList.slice(i, i + ToSplitAt));
        }

        let pages = arrayofRoles;
        let page = 1;
        const embed = new Discord.MessageEmbed()
          .setFooter(`Page ${page} of ${pages.length}`)
          .setDescription(pages[page - 1]);
        message.channel.send(embed).then(msg => {
          msg.react("⏪").then(r => {
            msg.react("⏩");
            const backwardsFilter = (reaction, user) =>
              reaction.emoji.name === "⏪" && user.id === message.author.id;
            const forwardsFilter = (reaction, user) =>
              reaction.emoji.name === "⏩" && user.id === message.author.id;
            const backwards = msg.createReactionCollector(backwardsFilter, {
              time: 60000
            });
            const forwards = msg.createReactionCollector(forwardsFilter, {
              time: 60000
            });
            backwards.on("collect", r => {
              if (page === 1) {
                page = pages.length;
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
              } else {
                page--;
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
              }
            });
            backwards.on("end", r => {
              embed.setDescription("**ended**");

              msg.edit(embed);
            });
            forwards.on("end", r => {
              embed.setDescription("**ended**");

              msg.edit(embed);
            });
            forwards.on("collect", r => {
              if (page === pages.length) {
                page = 1;
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
              } else {
                page++;
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
              }
            });
          });
        });
  }
};
module.exports.help = {
  name: "page",
  aliases: ["page"]
};

