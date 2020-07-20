const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms")
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   let timeout = 86400000; // 24 hours in milliseconds, change if you'd like.
        let amount = Math.floor(Math.random() * 1000) + 1;
        // random amount: Math.floor(Math.random() * 1000) + 1;
        let jobs = [
          "builder",
          "coder",
          "artist",
          "teacher",
          "engineer",
          "fisher",
          "game designer",
          "rollar coaster tester",
          "actor"
        ];
        let job = jobs[Math.floor(Math.random() * jobs.length)];
        let daily = await db.fetch(`work_${message.author.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
          let time = ms(timeout - (Date.now() - daily));

          message.channel.send(
            `You already worked come back in **${time.hours}h ${time.minutes}m ${time.seconds}s** and work again`
          );
        } else {
          message.channel.send(
            new Discord.MessageEmbed()
              .setAuthor(`work`, message.author.displayAvatarURL())
              .setColor("GREEN")
              .setDescription(`You worked as a ${job}`)
              .addField(`And made `, amount)
          );

          db.set(`work_${message.author.id}`, Date.now());
          db.add(`coins_${message.author.id}`, amount);
        }
  }
};
module.exports.help = {
  name: "work",
  aliases: ["work"]
};
