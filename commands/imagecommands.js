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
        .setTitle("Image commands")
        .setDescription("All image commands")
        .addField(`${prefix}meme`, "Sends a random meme from r/dankmeme", true)
        .addField(`${prefix}muffin`, "Sends a muffin image", true)
        .addField(`${prefix}nou`, "Sends image of a uno reverse card", true)
        .addField(`${prefix}ordoi?`, "Sends a image of a question mark", true)
        .addField(
          `${prefix}pat <mention a user>`,
          "Sends a random pat gif and says your are patting the person you mentioned",
          true
        )
        .addField(
          `${prefix}cd`,
          "Sends a random image from r/crappydesign",
          true
        )

        .addField(
          `${prefix}bob <optional mention a person>`,
          "Sends back a picture of bob ross painting your profile picture",
          true
        )
        .addField(
          `${prefix}triggered <optional mention a person>`,
          "Sends back a gif of you or the person you mentioned being triggered",
          true
        )
        .addField(
          `${prefix}achievement <text to achieve>`,
          "Sends back a minecraft achievement of the text",
          true
        )
        .addField(
          `${prefix}ship <mention a person>`,
          "Sends back the ship name of you and the person and your ship percent",
          true
        )
        .addField(
          `${prefix}wanted <optional mention a person>`,
          "Sends back a wanted poster of you or the person you mentioned",
          true
        )
        .addField(
          `${prefix}meow`,
          "Sends back a random cat image and a little bit about that type of cat",
          true
        )
        .addField(
          `${prefix}woof`,
          "Sends back a random dog image and a little bit about that type of dog",
          true
        )
        .addField(
          `${prefix}ss <website url>`,
          "Sends back a screenshot of the website (without https://)",
          true
        )
       .addField(
          `${prefix}fakequote <mention someone or use id> <text>`,
          "Sends a image making it look like someone said something",
          true
        )
    );
  }
};
module.exports.help = {
  name: "imagec",
  aliases: ["cimages"]
};
