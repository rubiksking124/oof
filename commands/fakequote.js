const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLowerCase()
      );
    let regex2 = /<@!?\d{18}>/;
    let text = args.slice(1).join(" ");
    if (regex2.test(text) === true) {
     
    }

    if (!user) return message.reply("Please include a user");
    const w = 803,
      h = 160;
    const canvas = Canvas.createCanvas(w, h);
    const ctx = canvas.getContext("2d");
    message.channel.startTyping();
    let time = message.createdAt
      .toLocaleString()
      .split(",")[1]
      .split(":");

    let ampm = time
      .splice(2)
      .join(",")
      .split(" ")[1];
    let time2 = "Today at" + time.join(":") + "" + ampm;
    ctx.fillStyle = "#36393e";
    ctx.fillRect(0, 0, w, h);
    if (user.user.bot) {
      function roundRect(
        ctx,
        x,
        y,
        width,
        height,
        radius,
        fill,
        stroke,
        fillstyle
      ) {
        if (typeof stroke === "undefined") {
          stroke = true;
        }
        if (typeof radius === "undefined") {
          radius = 5;
        }
        if (typeof radius === "number") {
          radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
          var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
          for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius.br,
          y + height
        );
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
          ctx.fillStyle = fillstyle;
          ctx.fill();
        }
        if (stroke) {
          ctx.stroke();
        }
      }
      let boet = message.guild.members.cache.get(user.user.id);
      let yes = await boet.user.fetchFlags().then(f => f.toArray());
      if (yes.includes("VERIFIED_BOT")) {
        if (!text) return message.reply("Please include text");
        if (text.length > 42) return message.reply("Please use shorter text");
        ctx.font = "30px Aerial";
        let bigboi = ctx.measureText(user.user.username).width;
        ctx.font = "20px Aerial";

        roundRect(ctx, bigboi + 158, 45, 70, 30, 10, true, false, "#7289da");
        let checkmark = await Canvas.loadImage(
          "https://cdn.discordapp.com/attachments/712920801388789800/725760599052779550/1593105189987.png"
        );
        ctx.drawImage(checkmark, bigboi + 160, 40, 70, 70);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.font = "30px Aerial";
        let bigboi2 = ctx.measureText(user.user.username).width;
        ctx.font = "18px Aerial";
        ctx.fillText("BOT", bigboi + 186, 66);
        ctx.font = "22px Aerial";
        ctx.fillStyle = "#72767d";
        ctx.fillText(time2, bigboi + 240, 66);
        ctx.font = "25px Aerial";
        ctx.fillStyle = "#fff";
        ctx.fillText(text, 160, 120);
      } else {
        if (!text) return message.reply("Please include text");
        if (text.length > 42) return message.reply("Please use shorter text");
        ctx.font = "30px Aerial";
        let bigboi = ctx.measureText(user.user.username).width;
        ctx.font = "20px Aerial";
        roundRect(ctx, bigboi + 158, 45, 50, 30, 10, true, false, "#7289da");
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.font = "30px Aerial";
        let bigboi2 = ctx.measureText(user.user.username).width;
        ctx.font = "18px Aerial";
        ctx.fillText("BOT", bigboi + 164, 66);
        ctx.font = "22px Aerial";
        ctx.fillStyle = "#72767d";
        ctx.fillText(time2, bigboi + 218, 66);
        ctx.font = "25px Aerial";
        ctx.fillStyle = "#fff";
        ctx.fillText(text, 160, 120);
      }
    } else if (user.user.bot !== true) {
      if (!text) return message.reply("Please include text");
      if (text.length > 42) return message.reply("Please use shorter text");
      ctx.fillStyle = "#72767d";
      ctx.textAlign = "left";
      ctx.font = "30px Aerial";
      let bigboi = ctx.measureText(user.user.username).width;
      ctx.font = "24px Aerial";
      ctx.fillText(time2, bigboi + 167, 70);
      ctx.font = "25px Aerial";
      ctx.fillStyle = "#fff";
      ctx.fillText(text, 160, 120);
    }

    let color = user.displayHexColor;
    if (!color) color = "#ffffff";
    ctx.font = "30px Aerial";
    ctx.textAlign = "left";
    ctx.fillStyle = color;

    ctx.fillText(user.user.username, 150, 70);

    const avatar_x = 30;
    const avatar_y = 30;
    const diameter = 100;
    const halfsize = diameter / 2;
    const shadow_size = 2;
    const shading_color = "rgba(0,0,0,0)";
    ctx.save();
    ctx.beginPath();
    const sx = avatar_x + halfsize,
      sy = avatar_y + halfsize;
    ctx.arc(sx, sy, halfsize - shadow_size, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fillStyle = shading_color;
    ctx.fillRect(avatar_x, avatar_y, diameter, diameter);
    ctx.restore();
    // add user avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(sx, sy, halfsize - shadow_size * 2, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.clip();
    const url = user.user.displayAvatarURL({
      format: "png",
      size: 512,
      dynamic: true
    });
    const img = await Canvas.loadImage(url);
    ctx.drawImage(img, avatar_x, avatar_y, diameter, diameter);
    ctx.restore();

    const filename = `fakequote.png`;
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      filename
    );
    message.channel.send(attachment).then(message.channel.stopTyping());
    message.delete();
  }
};
module.exports.help = {
  name: "fakequote",
  aliases: ["fq"]
};
