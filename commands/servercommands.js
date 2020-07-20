const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const prefix = await db.fetch(`prefix_${message.guild.id}`)
     message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Server commands")
            .setDescription("All server commands")
            .addField(`${prefix}ping`, "Pings the bot", true)
            .addField(`${prefix}si`, "Sends server information", true)
            .addField(
              `${prefix}ui <you can mention a person>`,
              "Gives user information about you or the person you mentioned",
              true
            )
            .addField(
              `${prefix}invite`,
              "Creates a temp invite link for the server",
              true
            )
            .addField(
              `${prefix}suggest <suggestion>`,
              "Creates a suggestion channel and then adds the suggestion",
              true
            )
            .addField(
              `${prefix}av <you can mention a person>`,
              "Sends the your profile picture or the the profile picture of the person you mentioned",
              true
            )
            .addField(
              `${prefix}crole <role name> <role color>`,
              "Creates a role with the role name and the role color",
              true
            )

            .addField(
              `${prefix}channel <channel name> <voice channel or text channel>`,
              "Creates a channel with the",
              true
            )
            .addField(
              `${prefix}dchannel <channel name>`,
              "Deletes the channel",
              true
            )
            .addField(
              `${prefix}ci <channel name>`,
              "Gives you info about the channel",
              true
            )
        .addField(
              `${prefix}apply <why your bot should be accepted>`,
              "adds your reason to the queue for the dev badge",
              true
            )
        );
  }
};
module.exports.help = {
  name: "serverc",
  aliases: ["cserver"]
};
