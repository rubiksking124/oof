const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas")
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let user = message.mentions.users.first();
        if (!user)
          return message.reply("Please include someone to ship you with");
        if (user.id === message.author.id)
          return message.reply("You cant ship yourself with yourself silly");

        const w = 400,
          h = 180;
        const canvas = Canvas.createCanvas(w, h);
        const ctx = canvas.getContext("2d");
        let string = message.author.username;
        let s = string.slice(0, 2);
        let string2 = user.username;
        let s2 = string2.slice(-2);
        let yes = s + s2;
        let numbers = Math.floor(Math.random() * 100) + 1;
        let numbers2 = numbers + "%";
        const avatar_x = 30;
        const avatar_y = 50;
        const diameter = 100;
        const halfsize = diameter / 2;
        const shadow_size = 2;
        const shading_color = "rgba(0,0,0,0.5)";
        const avatar_x2 = 180;
        const avatar_y2 = 50;
        const diameter2 = 100;
        const halfsize2 = diameter2 / 2;
        const shadow_size2 = 2;
        const shading_color2 = "rgba(0,0,0,0.5)";

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
        const url = message.author.displayAvatarURL({
          format: "png",
          size: 512,
          dynamic: true
        });
        const img = await Canvas.loadImage(url);

        ctx.drawImage(img, avatar_x, avatar_y, diameter, diameter);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        const sx2 = avatar_x2 + halfsize2,
          sy2 = avatar_y2 + halfsize2;
        ctx.arc(sx2, sy2, halfsize2 - shadow_size2, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = shading_color2;
        ctx.fillRect(avatar_x2, avatar_y2, diameter2, diameter2);
        ctx.restore();
        // add user avatar
        ctx.save();
        ctx.beginPath();
        ctx.arc(sx2, sy2, halfsize2 - shadow_size2 * 2, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.clip();
        const url2 = user.avatarURL({
          format: "png",
          size: 512,
          dynamic: true
        });
        const img2 = await Canvas.loadImage(url2);
        ctx.drawImage(img2, avatar_x2, avatar_y2, diameter2, diameter2);
        ctx.restore();

        const bob = await Canvas.loadImage(
          "https://cdn.glitch.com/551377b7-98a7-4c4a-a154-b94830d79867%2Fa7983d3e-5949-4ec5-8fbc-3a2b5ba0ca0c.image.png?v=1589845400196"
        );

        ctx.drawImage(bob, 55, 15, 200, 200);
        ctx.font = "20px sans-serif";
        // Select the style that will be used to fill the text in
        ctx.fillStyle = "#000000";
        // Actually fill the text with a solid color
        ctx.fillText(numbers2, 135, 120);
        const filename = `${user.username}.png`;
        const attachment = new Discord.MessageAttachment(
          canvas.toBuffer(),
          filename
        );
        message.channel.send(`Your ship name is ${yes}`, attachment);
  }
};
module.exports.help = {
  name: "ship",
  aliases: ["ship"]
};
