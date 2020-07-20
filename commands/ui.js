const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let inline = true;
    let resence = true;
    const status = {
      online: "<:online:709285149929635961> Online",
      idle: "<:idle:709287172745724015> Idle",
      dnd: "<:dnd:709286381347667978> Do Not Disturb",
      offline: "<:offilne:709287117984890980> Offline/Invisible"
    };

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    let target = message.mentions.members.first() || message.author;

    message.channel.send(
      new Discord.MessageEmbed()
        //.setAuthor(member.user.username)
        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
        .setColor("#00ff00")
        .addField("Full Username", `${member.user.tag}`, inline)
        .addField("ID", member.user.id, inline)
        .addField(
          "Nickname",
          `${
            member.nickname !== null
              ? `✅ Nickname: ${member.nickname}`
              : "❌ None"
          }`,
          true
        )

        .addField(
          "Status",
          `${status[member.user.presence.status]}`,
          inline,
          true
        )
        .addField(
          "Playing",
          `${
            member.user.presence.game
              ? `🎮 ${member.user.presence.game.name}`
              : "❌ Not playing"
          }`,
          inline,
          true
        )
        .addField(
          "Roles",
          `${member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(roles => `\`${roles.name}\``)
            .join(" **|** ") || "❌ No Roles"}`,
          true
        )
        .addField("Joined Discord At", member.user.createdAt)
        .setFooter(`Information about ${member.user.username}`)
        .setTimestamp()
    );

    message.delete();
  }
};
module.exports.help = {
  name: "ui",
  aliases: ["userinfo"]
};
