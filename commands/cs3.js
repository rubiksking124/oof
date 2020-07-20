const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let slot3 = db.fetch(`slot3_${message.guild.id}`);
    let slot1 = db.fetch(`slot1_${message.guild.id}`);
        let slot2 = db.fetch(`slot2_${message.guild.id}`);

        if (!args[0])
          return message.reply("Please provide something to set slot 3 too");
        if (args[0] === slot1 || args[0] === slot2)
          return message.reply(
            "don't set slot 3 to the same as slot 1 or slot 2"
          );
        db.set(`slot3_${message.guild.id}`, args[0]);
        message.channel.send("Slot 3 successfully changed to " + args[0]);
  }
};
module.exports.help = {
  name: "changeslot3",
  aliases: ["cs3"]
};
