const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let slot3 = db.fetch(`slot3_${message.guild.id}`);
        let slot1 = db.fetch(`slot1_${message.guild.id}`);
        if (!args[0])
          return message.reply("Please provide something to set slot 3 too");
        if (args[0] === slot3 || args[0] === slot1)
          return message.reply(
            "please do not set slot 2 to the same as slot one or slot three"
          );
        db.set(`slot2_${message.guild.id}`, args[0]);
        message.channel.send("Slot 2 successfully changed to " + args[0]);
  }
};
module.exports.help = {
  name: "changeslot2",
  aliases: ["cs2"]
};
