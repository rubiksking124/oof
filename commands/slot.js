const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
      let coins = db.fetch(`coins_${message.author.id}`);
        if (!coins) coins = 0;
        let ahego = "<:ahego:709531101026058301>";
        let cute = "<:cute:709539847345405963>";
        let deku = "<:deku:709540254121459776>";
        let slot1 = db.fetch(`slot1_${message.guild.id}`);
        if (!slot1) slot1 = ahego;
        let slot2 = db.fetch(`slot2_${message.guild.id}`);
        if (!slot2) slot2 = cute;
        let slot3 = db.fetch(`slot3_${message.guild.id}`);
        if (!slot3) slot3 = deku;

        let slots = [slot1, slot2, slot3];
        let fish = slots[Math.floor(Math.random() * slots.length)];
        let fish2 = slots[Math.floor(Math.random() * slots.length)];
        let tod = slots[Math.floor(Math.random() * slots.length)];
        let result = `${fish}-${fish2}-${tod}\n`;

        if (fish === fish2 && fish === tod) {
          result += "Winner";
          db.add(`coins_${message.author.id}`, 10);
        } else {
          result += "Better luck next time(muggle)";
        }
        message.channel.send({
          embed: {
            color: 3066993,
            title: "Slot machine",
            fields: [
              {
                name: "slot",
                value: result + " " + message.author.username
              }
            ]
          }
        });
  }
};
module.exports.help = {
  name: "slot",
  aliases: ["slots"]
};
