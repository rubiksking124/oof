const Discord = require("discord.js");
const db = require("quick.db");
const Puppet = require("puppeteer");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let reason = args.slice(1).join(" ");

    let reason3 = message.content.slice(-6);
    if (reason === "--background") {
      let myRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
      if (myRegex.test(args[0]) === false && args[0] !== "default")
        return message.reply("that is not a vaild image url");
      let fish = args[0];
      if (!fish) return message.reply("Please include image");

      try {
        if (args[0] === "default") {
          db.set(
            `profile_${message.guild.id}_${message.author.id}`,
            "https://houstoncertifiedmidwife.com/wp-content/uploads/2016/05/orange-profile-background-1.png"
          );
          message.channel.send("Background set to default");
        } else {
          const browser = await Puppet.launch({ args: ["--no-sandbox"] });
          const page = await browser.newPage();
          await page.goto(fish);

          let fishq = await page.screenshot({ path: "example.png" });
          await browser.close();
          db.set(`profile_${message.guild.id}_${message.author.id}`, fish);
          message.channel.send(
            new Discord.MessageEmbed()
              .setDescription("Profile background set to")

              .setImage(fish)
          );
        }
      } catch (err) {
        if (err && args[0] !== "default") {
          message.channel.send("URL not found");
        }
      }
    }else if(reason === "--color"){
       if (!args[0] || args[0] === "help")
          return message.reply("Please provide a valid hex code without the #");
        let isOk = /^[0-9A-F]{6}$/i.test(args[0]);
        if (isOk === false && args[0] !== "default")
          return message.reply("Please provide a valid hex code without the #");
      if(args[0] === "default"){
          db.delete(`color_${message.guild.id}_${message.author.id}`)
        message.channel.send("Succesfully set the color to the default color")
      }else{
      db.set(`color_${message.guild.id}_${message.author.id}`,"#"+args[0])
      message.channel.send("Succesfully set the color to " + args[0])
      }
    }else if(reason === "--status"){
       
        let isOk = "streaming" || "Streaming".toLowerCase() || "online" || "Online".toLowerCase() || "offline" || "Offline".toLowerCase() || "idle" || "Idle".toLowerCase() || "dnd"
        if (isOk === false && args[0] !== "delete")
          return message.reply("please only use streaming online offline or idle");
      if(args[0] === "delete"){
          db.delete(`status_${message.guild.id}_${message.author.id}`)
        message.channel.send("Succesfully deleted your status")
      }else{
      db.set(`status_${message.guild.id}_${message.author.id}`,args[0].toLowerCase())
      message.channel.send("Succesfully set the status to " + args[0].toLowerCase())
      }
    } else {
      return message.reply("Please only use --background or --color or --status");
    }
  }
};
module.exports.help = {
  name: "cprofile",
  aliases: ["cp"]
};
