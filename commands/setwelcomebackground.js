const Discord = require("discord.js");
const db = require("quick.db");
const Puppet = require("puppeteer");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   if (!message.member.hasPermission("MANAGE_CHANNELS"))
          return message.reply("You need manage channels permission");
        let myRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
    if (myRegex.test(args[0]) === false)
      return message.reply("that is not a vaild image url");
    let fish = args[0];
    if (!fish) return message.reply("Please include image");
    try {
      const browser = await Puppet.launch({ args: ["--no-sandbox"] });
      const page = await browser.newPage();
      await page.goto(fish);

      let fishq = await page.screenshot({ path: "example.png" });
      await browser.close();
      db.set(`background_${message.guild.id}`, fish);
      message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("Welcome background set to")

          .setImage(fish)
      );
    } catch (err) {
      if (err) {
        message.channel.send("URL not found");
      }
    }
  }
};
module.exports.help = {
  name: "setwelcomebackground",
  aliases: ["swb"]
};
