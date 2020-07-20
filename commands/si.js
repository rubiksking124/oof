const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   function checkDays(date) {
          let now = new Date();
          let diff = now.getTime() - date.getTime();
          let days = Math.floor(diff / 86400000);
          return days + (days == 1 ? " day" : " days") + " ago";
        }
        let fish = message.guild.roles.cache
          .sort((a, b) => b.position - a.position)
          .map(r => r)
          .join(",");
        if (fish.length > 1024) fish = "To many roles to display";
        if (!fish) fish = "No roles";
        let ish = message.guild.emojis.cache
          .sort((a, b) => b.position - a.position)
          .map(r => r)
          .join(",");
        if (ish.length > 1024) ish = "To many emojis to display";
        if (!ish) ish = "No emojis";
        let EmojiCount = 0;
        message.guild.emojis.cache.forEach(emoji => {
          EmojiCount++;
        });
        let rolescount = 0;
        message.guild.roles.cache.forEach(roles => {
          rolescount++;
        });
        let userid = message.author;
        if (message.author.bot) return;

        const e = new Discord.MessageEmbed()

          .setAuthor(
            `${message.guild.name}`,
            message.guild.iconURL({ dynamic: true })
          )
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .addField("Owner", message.guild.owner.user.tag, true)
          .addField("Server ID", message.guild.id, true)
          .addField(
            "Created On",
            `${message.channel.guild.createdAt
              .toUTCString()
              .substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`,
            true
          )

          .addField(
            `Members [${
              message.guild.members.cache.filter(
                gotcha => gotcha.user.bot !== true
              ).size
            }]`,
            `${
              message.guild.members.cache.filter(
                m => m.presence.status === "online" && m.user.bot !== true
              ).size
            } <:online:709285149929635961> | ${
              message.guild.members.cache.filter(
                m => m.presence.status === "idle" && m.user.bot !== true
              ).size
            }<:idle:709287172745724015> ${
              message.guild.members.cache.filter(
                m => m.presence.status === "dnd" && m.user.bot !== true
              ).size
            } <:dnd:709286381347667978> | ${
              message.guild.members.cache.filter(
                m => m.presence.status === "offline" && m.user.bot !== true
              ).size
            } <:offline:709287117984890980>`,
            true
          )
          .addField(
            `Bots [${
              message.guild.members.cache.filter(
                gotcha => gotcha.user.bot == true
              ).size
            }]`,
            `${
              message.guild.members.cache.filter(
                m => m.presence.status === "online" && m.user.bot == true
              ).size
            } <:online:709285149929635961> | ${
              message.guild.members.cache.filter(
                m => m.presence.status === "idle" && m.user.bot == true
              ).size
            }<:idle:709287172745724015> ${
              message.guild.members.cache.filter(
                m => m.presence.status === "dnd" && m.user.bot == true
              ).size
            } <:dnd:709286381347667978> | ${
              message.guild.members.cache.filter(
                m => m.presence.status === "offline" && m.user.bot == true
              ).size
            } <:offline:709287117984890980>`,
            true
          )
          .addField("Verification level", message.guild.verificationLevel, true)
          .addField(`Emojis [${EmojiCount}]`, ish)
          .addField(`Roles list [${rolescount}]`, fish)
          .setFooter(`Requested by ${message.author.tag}`)
          .setTimestamp();

        message.channel.send(e);
  }
};
module.exports.help = {
  name: "serverinfo",
  aliases: ["si"]
};
