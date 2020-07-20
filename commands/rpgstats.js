const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas")
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const prefix = await db.fetch(`prefix_${message.guild.id}`)
     let user = message.mentions.users.first() || message.author;
        let level = db.fetch(`level_${user.id}`);
        let getting = db.fetch(`strength_${user.id}`);
        let botstats = db.fetch(`botstats_${user.id}`);
        let getting1 = db.fetch(`health_${user.id}`);
        if (!level) level = 1;
        if (!getting) {
          return message.channel.send(
            `${user}` + " please do " + prefix + "rpg to set up a rpg account"
          );
        }

        const w = 800,
          h = 360;
        const canvas = Canvas.createCanvas(w, h);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#2C2F33";
        ctx.fillRect(84, 0, 800, 360);
        ctx.fillStyle = "#7289DA";
        ctx.fillRect(0, 0, 84, 360);
        ctx.fillRect(300, 26, 231, 46);
        ctx.fillRect(300, 108, 231, 46);
        ctx.fillRect(300, 190, 231, 46);
        ctx.fillRect(300, 272, 231, 46);

        const avatar_x = 30;
        const avatar_y = 130;
        const diameter = 100;
        const halfsize = diameter / 2;
        const shadow_size = 2;
        const shading_color = "rgba(0,0,0,0.5)";

        // add user avatar bg shadow
        ctx.save();
        ctx.beginPath();
        const sx = avatar_x + halfsize,
          sy = avatar_y + halfsize;
        ctx.arc(sx, sy, halfsize - shadow_size, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = shading_color;
        ctx.fillRect(avatar_x, avatar_y, diameter, diameter);
        ctx.restore();
        // add user avatar
        ctx.save();
        ctx.beginPath();
        ctx.arc(sx, sy, halfsize - shadow_size * 2, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.clip();
        const url = user.avatarURL({
          format: "png",
          size: 512,
          dynamic: true
        });
        const img = await Canvas.loadImage(url);
        ctx.drawImage(img, avatar_x, avatar_y, diameter, diameter);
        ctx.restore();
        ctx.font = "20px sans-serif";
        // Select the style that will be used to fill the text in
        ctx.fillStyle = "#ffffff";
        // Actually fill the text with a solid color
        ctx.fillText("Health: " + getting1, 320, 55);
        ctx.font = "20px sans-serif";
        // Select the style that will be used to fill the text in
        ctx.fillStyle = "#ffffff";
        // Actually fill the text with a solid color
        ctx.fillText("Strength: " + getting, 320, 140);
        ctx.font = "20px sans-serif";
        // Select the style that will be used to fill the text in
        ctx.fillStyle = "#ffffff";
        // Actually fill the text with a solid color
        ctx.fillText("Level: " + level, 320, 225);
        ctx.font = "20px sans-serif";
        // Select the style that will be used to fill the text in
        ctx.fillStyle = "#ffffff";
        // Actually fill the text with a solid color
        ctx.fillText("Bots strength: " + botstats, 320, 310);
        const filename = "welcome-image.png";
        const attachment = new Discord.MessageAttachment(
          canvas.toBuffer(),
          filename
        );
    message.channel.send(attachment);
  }
};
module.exports.help = {
  name: "rpgstats",
  aliases: ["rpgstats"]
};
