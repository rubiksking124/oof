const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!args[0])
          return message.reply("Please provide something to set slot 1 too");
        let slot2 = db.fetch(`slot2_${message.guild.id}`);
        let slot3 = db.fetch(`slot3_${message.guild.id}`);
        if (args[0] === slot2 || args[0] === slot3)
          return message.reply(
            "please do not set slot 1 to the same as slot 2 or slot 3"
          );
        db.set(`slot1_${message.guild.id}`, args[0]);

        message.channel.send("Slot 1 successfully changed to " + args[0]);
  }
};
module.exports.help = {
  name: "changeslot1",
  aliases: ["cs1"]
};
