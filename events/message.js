module.exports = async (client, message) => {
  if (message.channel.type === "dm") return;
  const Discord = require("discord.js");
  if (message.author.bot) return;

  let db = require("quick.db");
  let prefix = db.fetch(`prefix_${message.guild.id}`);
  if (!prefix) prefix = "^";

  if (message.content === `<@!700608658416861236>`) {
     let embed = new Discord.MessageEmbed()
    .setDescription(`Muffins prefix for this guild is ${prefix}`)
     .setColor("#FF9966")
    
 message.channel.send(embed)
  }
  let xp = db.fetch(`xp.._${message.guild.id}_${message.author.id}`);
  let xpl = db.fetch(`xpl.._${message.guild.id}_${message.author.id}`);
  if (!xpl) xpl = 1;

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  if (!xp) xp = 0;

  if (message.author.bot) {
    return;
  } else {
    db.add(`xp.._${message.guild.id}_${message.author.id}`, xpAdd);
  }
  let nxtl = db.fetch(`nxtl.._${message.guild.id}_${message.author.id}`);
  if (!nxtl) nxtl = 300;
  let mafs = nxtl * 2;
  if (xp >= nxtl) {
    db.add(`xpl.._${message.guild.id}_${message.author.id}`, 1);
    db.set(`nxtl.._${message.guild.id}_${message.author.id}`, mafs);
    db.set(`xp.._${message.guild.id}_${message.author.id}`, 0);
  }
  let coins = db.fetch(`coins_${message.author.id}`);
  if (!coins) coins = "0";
  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;

  if (coinAmt === baseAmt) {
    db.add(`coins_${message.author.id}`, coinAmt);
  }

  let namee = db.fetch(`cc3_${message.guild.id}`);
  let fuc = db.fetch(`555_${message.guild.id}`);
  if (!namee && !fuc) return;
  if (message.content === namee) {
    message.channel.send(fuc);
  }
  let onoroff = db.fetch(`blw_${message.guild.id}`);
  if (!onoroff) onoroff = "off";
  let array = db.fetch(`bla2_${message.guild.id}`);
  if (!array) {
    return;
  } else {
    for (let i = 0; i < array.length; i++) {
      const elem = array[i];

      // Shifting to lowercase here allows case iNsEnSiTiViTy.
      if (message.content.toLowerCase().includes(elem) && onoroff === "on") {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
          return;
        } else {
          message.delete();
        }
      }
    }
  }
};
