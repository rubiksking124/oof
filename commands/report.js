const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     let target = message.mentions.members.first() || args[0];
        let reason = args.slice(1).join(" ");
        let fish = client.users.cache.get("606279329844035594");
        let reports = client.channels.cache.get("711708745054289942");
        if (!target) return message.reply("please specify a member to report!");
        if (!reason)
          return message.reply("please specify a reason for this report!");

        message.channel
          .send(`${target} was reported by ${message.author} for ${reason}`)
          .then(msg => msg.delete(2000));
        fish.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(target.user.avatarURL)
            .addField(
              "Reported Member",
              `${target.user.username} with an ID: ${target.user.id}`
            )
            .addField(
              "Reported By",
              `${message.author.username} with an ID: ${message.author.id}`
            )
            .addField("Reported Time", message.createdAt)
            .addField("Reported In", message.channel)
            .addField("Reported Reason", reason)
            .addField("Reported server", message.guild.name)
            .setFooter(
              "Reported user imformation",
              target.user.displayAvatarURL
            )
        );
        reports.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(target.user.avatarURL)
            .addField(
              "Reported Member",
              `${target.user.username} with an ID: ${target.user.id}`
            )
            .addField(
              "Reported By",
              `${message.author.username} with an ID: ${message.author.id}`
            )
            .addField("Reported Time", message.createdAt)
            .addField("Reported In", message.channel)
            .addField("Reported Reason", reason)
            .addField("Reported server", message.guild.name)
            .setFooter(
              "Reported user imformation",
              target.user.displayAvatarURL
            )
        );
  }
};
module.exports.help = {
  name: "report",
  aliases: ["report"]
};
