const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let idfk = db.fetch(`applied3_${message.author.id}`);
    if (idfk === true) {
      message.channel.send("<:incorrect:726607303939326023> You have already applied");
    } else {
      let text = args.join(" ");
      if (!text)
        return message.reply(
          "Please include text on why you should get this emote and include your bot name"
        );
      let owner = client.users.cache.get("606279329844035594");
      owner.send(text + "-" + message.author.tag + "-" + message.author.id);
      message.channel.send("<:correct:726607102604214323> Your application has been submitted to the owner");
      db.set(`applied3_${message.author.id}`, true);
    }
  }
};
module.exports.help = {
  name: "apply",
  aliases: ["apply"]
};
