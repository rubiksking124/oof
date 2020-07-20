const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
const Canvas = require("canvas");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;
    let xp = db.fetch(`xp.._${message.guild.id}_${user.id}`);
    let xpl = db.fetch(`xpl.._${message.guild.id}_${user.id}`);
    if (!xp) xp = 0;
    let nxtl = db.fetch(`nxtl.._${message.guild.id}_${user.id}`);
    if (!nxtl) nxtl = 300;
    if (!xpl) xpl = 1;
    let difference = nxtl - xp;
    let ye = db.fetch(`xpl.._${message.guild.id}_${user.id}`);
if(user.bot) return message.reply("Bot's can't have a rank silly")
    const canvas = Canvas.createCanvas(1000, 333);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "https://images-na.ssl-images-amazon.com/images/I/61WbuoKXiAL._AC_SY355_.jpg"
    );
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
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(180, 216, 770, 65);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeRect(180, 216, 770, 65);
    ctx.stroke();

    ctx.fillStyle = "#e67e22";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(180, 216, (100 / (nxtl)) * xp * 7.7, 65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = "30px Aerial"
    ctx.textAlign = "Center"
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${xp} / ${nxtl} XP`, 600, 260);

    ctx.textAlign = "Left";
    ctx.fillText(user.tag, 300, 120);

    ctx.font = "50px Aerial";
    ctx.fillText("Level:", 300, 180);
    ctx.fillText(xpl, 470, 180);

    ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff"
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(user.displayAvatarURL({format: "jpeg"}))
    ctx.drawImage(avatar, 40, 40, 250,250)
    const filename = "card.png";
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), filename);
    message.channel.send(`Rank card for ${user.username}`, attachment)
  }
};
module.exports.help = {
  name: "xp",
  aliases: ["xp"]
};
