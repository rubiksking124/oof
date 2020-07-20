const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     let figlet = require("figlet");
        let text = args.join("");
        if (!text)
          return message.reply("please specify texts for the ascii conversion");
        figlet(text.toString(), function(err, data) {
          if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
          }
          message.channel.send("```" + data + "```");
        })
  }
};
module.exports.help = {
  name: "ascii",
  aliases: ["ascii"]
};
