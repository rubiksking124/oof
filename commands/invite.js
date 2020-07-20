const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    var invite = await message.channel
          .createInvite({
            maxAge: 86400, // maximum time for the invite, in milliseconds
            maxUses: 100 // maximum times it can be used
          })
          .catch(console.log);
        console.log(invite);
        message.channel.send(
          `${invite}` + " thats your invite it will last for 1 day and 100 uses"
        );
  }
};
module.exports.help = {
  name: "invite",
  aliases: ["sinvite"]
};
