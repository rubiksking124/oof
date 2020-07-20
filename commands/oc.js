const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let prefix =  db.fetch(`prefix_${message.guild.id}`)
      if(!prefix) prefix="^"
   if (message.author.id !== "606279329844035594")
          return message.reply("You are not the owner");
        message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Owner commands")
            .setDescription("All owner commands")
            .addField(
              `${prefix}remove <user> <amount>`,
              "Removes the amount from the user",
              true
            )
            .addField(
              `${prefix}award <user> <amount>`,
              "Awards the user with the amount",
              true
            )
            .addField(`${prefix}eval <code>`, "Evals the code", true)
            .addField(
              `${prefix}bl <mention a person>`,
              "Blacklists the person from using your bot",
              true
            )
            .addField(
              `${prefix}ubl`,
              "Unblacklist a person from using your bot",
              true
            )
            .addField(`${prefix}restart`, "Restarts the bot", true)
           .addField(`${prefix}decline <user>`, "Declines the user as a dev", true)
           .addField(`${prefix}accept <user>`, "Accepts the user as a dev", true)
             .addField(`${prefix}reload <command name>`, "Reloads a command", true)
        );
  }
};
module.exports.help = {
  name: "ownerc",
  aliases: ["cowner"]
};
