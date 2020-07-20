const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let bond = db.fetch(`bond_${message.author.id}`);
    if (bond)
      return message.reply(
        "You are already bonded with " +
          bond +
          " why are you trying to bond with someone else"
      );

    let user = message.mentions.users.first();
    if (!user)
      return message.reply("Please include a person to bond with");
    let bonded = db.fetch(`bond_{user.id}`);

    if (bond)
      return message.reply(
        `${user} is already bonded with someone else try to bond with someone different`
      );
    if (user.bot == true) return message.reply("no bonding with bots");
    if (user.id === "700608658416861236")
      return message.reply("are you really trying to bond with the bot smh");
    if (user.id === message.author.id)
      return message.reply(
        "how lonely are you that you are you trying to bond with your self"
      );
     
    message.channel
      .send(
        `${message.author.username} Would like to bond with ${user.username} please accept the bond or decline the bond within 30 seconds
`
      )
      .then(msg => {
        const filter = m =>
          m.content.includes("accept") && m.author.id === user.id;
        const collector = message.channel.createMessageCollector(filter, {
          time: 30000
        });
        const filter2 = u =>
          u.content.includes("decline") && u.author.id === user.id;
        const collector2 = message.channel.createMessageCollector(filter2, {
          time: 30000
        });
      
          collector.on("collect", m => {
            message.channel.send(
              `Wow look at that ${user.username} accepted your bond`
            );
            db.set(`bond_${message.author.id}`, user.username);
            db.set(`bond_${user.id}`, message.author.username);
            db.set(`bondid_${message.author.id}`, user.id);
            db.set(`bondid_${user.id}`, message.author.id);
          });
          collector2.on("collect", m => {
            message.channel.send(
              user.username +
                " has declined the bond seems like you are once again alone"
            );
          });
    
      });
        
  }
};
module.exports.help = {
  name: "bond",
  aliases: ["date"]
};
