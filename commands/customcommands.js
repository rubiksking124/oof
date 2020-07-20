const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.reply("You need manage messages permission");
    let name = args[0];
    let contents = args.slice(1).join(" ");

    if (!args[0] || !contents)
      return message.reply(
        "Please include a name and contents for the command"
      );

    let commands = db.get(`cc3_${message.guild.id}`);
    

    db.set(`cc3_${message.guild.id}`,name);
    db.set(`555_${message.guild.id}`, contents)

    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("New custom command")
        .setDescription(`Name: ${name}\n Contents: ${contents}`)
    );
  }
};
module.exports.help = {
  name: "cc",
  aliases: ["customcommand"]
};
