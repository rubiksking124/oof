const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!message.channel.nsfw && message.author.id !== "606279329844035594")
      return message.reply("NSFW channel command only");
    const puppeteer = require("puppeteer");
    if (!args[0])
      return message.reply(
        "Please include a link for the website you want us to screenshot"
      );
   
    try {
     
    
      const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
      const page = await browser.newPage();

      await page.goto(args[0]);

      let fishq = await page.screenshot({ path: "example.png" });
      await browser.close();
      message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("Here's your screenshooted image")
          .setImage("attachment://example.png")
          .attachFiles("./example.png")
      );
    } catch (err) {
      if (err) {
        message.channel.send("URL not found");
      }
    }
  }
};
module.exports.help = {
  name: "ss",
  aliases: ["ss"]
};
