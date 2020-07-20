const Discord = require("discord.js");
const db = require("quick.db");
let moment = require("moment");
let Canvas = require("canvas");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    if (user.user.presence.activities.find(a => a.type === "LISTENING")) {
      let trackIMG = `https://i.scdn.co/image/${user.user.presence.activities
        .find(a => a.type === "LISTENING")
        .assets.largeImage.slice(8)}`;

      let trackName = user.user.presence.activities.find(
        a => a.type === "LISTENING"
      ).details;
      let trackAuthor = user.user.presence.activities.find(
        a => a.type === "LISTENING"
      ).state;
      let trackAlbum = user.user.presence.activities.find(
        a => a.type === "LISTENING"
      ).assets.largeText;
      let length = moment
        .utc(
          Date.now() -
            user.user.presence.activities.find(a => a.type === "LISTENING")
              .timestamps.start +
            new Date(
              user.user.presence.activities.find(
                a => a.type === "LISTENING"
              ).timestamps.end
            ).getTime() -
            Date.now()
        )
        .format("mm:ss");
      let yourlength = moment
        .utc(
          Date.now() -
            user.presence.activities.find(a => a.type === "LISTENING")
              .timestamps.start
        )
        .format("mm:ss");
      let w = 420,
        h = 125;
      let canvas = Canvas.createCanvas(w, h);
      let ctx = canvas.getContext("2d");
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

      ctx.fillStyle = "#1db954";
      ctx.fillRect(0, 0, 50, 50);

      let background =
        "https://storage.googleapis.com/storage.jpg.is/projects/images/spotify-love-notes-cover.jpg";
      let fish = await Canvas.loadImage(background);
      ctx.drawImage(fish, 0, 0, w, h);
      ctx.fillStyle = "#1db954";
      roundRect(ctx, 110, 50, 150, 20, 10, false, true, "#1db954");

      roundRect(ctx, 110, 50, 150, 20, 10, true, false, "rgba(0,0,0.3)");
      roundRect(
        ctx,
        110,
        50,
        (100 / length) * yourlength * 1.5,
        20,
        10,
        true,
        false,
        "#1db954"
      );
      let spotifyPicture = await Canvas.loadImage(trackIMG);
      ctx.drawImage(spotifyPicture, 18, 18, 90, 90);
      ctx.fillStyle = "black";
      ctx.font = "18px Aerial";
      ctx.fillText(trackName, 120, 30);

      const filename = `spotify.png`;
      const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        filename
      );
      message.channel.send(attachment);
    } else {
      message.channel.send("This user is not listening to spotify");
    }
  }
};
module.exports.help = {
  name: "spotify",
  aliases: ["sp"]
};
