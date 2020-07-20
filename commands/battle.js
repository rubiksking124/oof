const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let prefix =  db.fetch(`prefix_${message.guild.id}`)
      if(!prefix) prefix="^"
     let user = message.mentions.users.first();
        if (!user) return message.reply("Please include a person to battle");
        let getting = db.fetch(`strength_${message.author.id}`);
        let getting1 = db.fetch(`strength_${user.id}`);
        let getting2 = db.fetch(`health_${message.author.id}`);
        let getting3 = db.fetch(`health_${user.id}`);
        if (!getting1) {
          return message.channel.send(
            `${user}` + " please do " + prefix + "rpg to set up a rpg account"
          );
        }
        if (user.id === message.author.id)
          return message.reply("do not battle yourself");
        message.channel
          .send(
            message.author.username +
              " has challenged " +
              user.username +
              " type `accept` to accept the battle type `decline` to decline the battle"
          )
          .then(msg => {
            const filter = m =>
              m.content.includes("accept") && m.author.id === user.id;
            const collector = message.channel.createMessageCollector(filter, {
              time: 15000
            });
            const filter2 = u =>
              u.content.includes("decline") && u.author.id === user.id;
            const collector2 = message.channel.createMessageCollector(filter2, {
              time: 15000
            });

            collector.on("collect", m => {
              if (getting < getting1) {
                message.channel.send(
                  new Discord.MessageEmbed()
                  .setColor("RED")
                    .setTitle(`<:incorrect:726607303939326023> ${message.author.username} has lost the battle`)
                    .addField(
                      `${message.author.username} health:`,
                      `${getting2}`
                    )
                    .addField(`${user.username} health:`, `${getting3}`)
                );
              } else if (getting1 < getting) {
                console.log("dis");
                message.channel.send(
                  new Discord.MessageEmbed()
                  .setColor("GREEN")
                    .setTitle(`<:correct:726607102604214323> ${message.author.username} has won the battle`)
                    .addField(
                      `${message.author.username} health:`,
                      `${getting2}`
                    )
                    .addField(`${user.username} health:`, `${getting3}`)
                );
              }
            });
            collector2.on("collect", m => {
              message.channel.send(user.username + " has declined the battle");
            });
          });
  }
};
module.exports.help = {
  name: "battle",
  aliases: ["battle"]
};
