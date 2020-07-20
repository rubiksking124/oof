const Discord = require("discord.js");
const db = require("quick.db");
const npm = require("search-npm-registry");
const moment = require("moment");
const rp = require("request-promise");
const $ = require("cheerio");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!args[0]) return message.reply("please include a package to search");
    message.channel.startTyping();
    const rp = require("request-promise");
    const url = "https://npmjs.com/package/" + args[0];

    try {
      rp(url)
        .then(function(html) {
          let ver = $(
            "span._76473bea.f6.dib.ph0.pv2.mb2-ns.black-80.nowrap.f5.fw4",
            html
          ).text();

          message.channel
            .send(
              new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setTitle("NPM package")
                .addField(
                  "Name:",
                  $("._50685029.truncate.flex-auto", html).text(),
                  true
                )
                .addField("Verison:", ver, true)
            )
            .then(() => message.channel.stopTyping());
        })
        .catch(function(err) {
          message.channel.send(err);
        });
    } catch {
      message.channel.send("that is not a vaild npm package");
    }
  }
};
module.exports.help = {
  name: "npm",
  aliases: ["npm"]
};
