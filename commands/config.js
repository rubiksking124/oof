const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   let prefix =  db.fetch(`prefix_${message.guild.id}`)
      if(!prefix) prefix="^"
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Config commands")
        .setDescription("All config commands")
        .addField(
          `${prefix}setprefix <new prefix>`,
          "Changes server prefix to the new prefix you entered",
          true
        )
        .addField(`${prefix}prefix`, "Shows your servers prefix", true)
        .addField(
          `${prefix}cs1 <what to change it to>`,
          "changes slot 1 to what you said",
          true
        )
        .addField(
          `${prefix}cs2 <what to change it to>`,
          "changes slot 3 to what you said",
          true
        )
        .addField(
          `${prefix}cs3 <what to change it to>`,
          "changes slot 3 to what you said",
          true
        )
        .addField(
          `${prefix}sw <mention a channel>`,
          "sets the welcome channel to the channel you mentioned"
        )
        .addField(
          `${prefix}sb <mention a channel>`,
          "sets the good bye channel to the channel you mentioned"
        )
        .addField(
          `${prefix}sjr <mention a role>`,
          "sets the role given to someone when they join your servef"
        )
        .addField(
          `${prefix}swt <text to change>`,
          "Changes the text in the image of the welcome message do  {mention} for the users name in the message"
        )
        .addField(
          `${prefix}sdm {text to change>`,
          "Changes the text sent in dms on join"
        )
        .addField(
          `${prefix}swh <heading to change>`,
          "Changes the heading of the actually message {mention} is the user {servername} is the server name"
        )
        .addField(`${prefix}swb <image url >`, "changes the backgrond image")
        .addField(`${prefix}swc <hex code with #>`, "Changes the text color")

        .addField(
          `${prefix}swi <either on or off>`,
          "Sets the welcome image to either on or off"
        )
        .addField(
          `${prefix}swd <either on or off>`,
          "Sets the dm on join to either on or off"
        )
        .addField(`${prefix}cp `, "Where you can change your profiles card background and color and status")
        .addField(`${prefix}swn <text>`, "Sets your profiles note")
      .addField(`${prefix}wbl <on or off>`, "Turns word blacklist on or off")
      .addField(`${prefix}ablw <word or phrase>`, "Adds the word phrase to the blacklist words")
    );
  }
};
module.exports.help = {
  name: "configc",
  aliases: ["cconfig"]
};
