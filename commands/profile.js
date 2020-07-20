const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    message.channel.startTyping();
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    let bal = db.fetch(`coins_${user.id}`);
    let bond = db.fetch(`bond_${user.id}`);
    if (!bond) bond = "no one";
    let xpl = db.fetch(`xpl.._${message.guild.id}_${user.id}`);
    let level = db.fetch(`level_${user.id}`);
    let nxtl = db.fetch(`nxtl.._${message.guild.id}_${user.id}`);
    if (!nxtl) nxtl = 300;
    let xp1 = db.fetch(`xp.._${message.guild.id}_${user.id}`);
    if (!xp1) xp1 = 0;
    if (!level) level = 0;
    if (!xpl) xpl = 0;
    if (!bal) bal = 0;
    const w = 530,
      h = 600;
    const canvas = Canvas.createCanvas(w, h);
    const ctx = canvas.getContext("2d");
    let color = db.fetch(`color_${message.guild.id}_${user.id}`);
    if (!color) color = "#e67260";
    //color #323736^
    //https://discordemoji.com/assets/emoji/6951_Online.png
    let simage;
    let status = db.fetch(`status_${message.guild.id}_${user.id}`) || user.user.presence.status
    if (user.user.presence.activities.length > 0) {
      if (
        user.user.presence.activities.find(a => a.type == "STREAMING") !==
        undefined
      ) {
        status = "streaming";
      }
    }
    if (status === "online") {
      simage = "https://discordemoji.com/assets/emoji/6951_Online.png";
    } else if (status === "dnd") {
      simage = "https://cdn.discordapp.com/emojis/712397651240550411.png?v=1";
    } else if (status === "idle") {
      simage = "https://cdn.discordapp.com/emojis/712397651370573875.png?v=1";
    } else if (status === "offline") {
      simage = "https://cdn.discordapp.com/emojis/712397651047481416.png?v=1";
    } else if (status === "streaming") {
      simage = "https://cdn.discordapp.com/emojis/712410126287503450.png?v=1";
    }
    let profile = db.fetch(`profile_${message.guild.id}_${user.id}`);
    let note = db.fetch(`note_${message.guild.id}_${user.id}`);
    if (!note) note = "nothing";
    if (!profile)
      profile =
        "https://houstoncertifiedmidwife.com/wp-content/uploads/2016/05/orange-profile-background-1.png";
    const background = await Canvas.loadImage(profile);
    const lsimage = await Canvas.loadImage(simage);
    ctx.drawImage(background, 0, 0, 530, 600);

    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(30, 20, 470, 570);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(45, 100, 440, 470);
    const avatar_x = 190;
    const avatar_y = 59;
    const diameter = 150;
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
    const url = user.user.avatarURL({
      format: "png",
      size: 1024,
      dynamic: true
    });
    const img = await Canvas.loadImage(url);
ctx.globalAlpha = 1;
    ctx.drawImage(img, avatar_x, avatar_y, diameter, diameter);
    ctx.restore();

    ctx.save();
    const convertUsername = (
      ctx,
      canvas,
      username,
      discrim,
      x,
      font,
      textAlignment,
      paddingLeft,
      paddingRight
    ) => {
      if (!ctx) throw new Error("Please provide a canvas context. (Option 1)");
      if (!canvas)
        throw new Error("Please provide the canvas workspace. (Option 2)");
      if (!username)
        throw new Error("Please provide a username to shorten. (Option 3)");
      if (!discrim)
        throw new Error("Please provide a user discriminator. (Option 4)");
      if (!x)
        throw new Error(
          "Please provide an X value for to start the measurement from! (Option 5)"
        );
      if (!font)
        throw new Error("Please provide a font + font size. (Option 6)");
      if (!textAlignment) textAlignment = "left";
      if (!paddingLeft) paddingLeft = 0;
      if (!paddingRight) paddingRight = 0;

      ctx.font = font;
      ctx.textAlign = textAlignment;
      const width = ctx.measureText(username + "#" + discrim).width;
      let smallest = "";
      if (textAlignment == "left") {
        if (width + x + paddingRight > canvas.width) {
          for (let i = 0; i < username.length; i++) {
            let temp = `${username.substring(
              0,
              username.length - i
            )}...#${discrim}`;
            let widthTemp = ctx.measureText(temp).width;
            if (
              widthTemp + x + paddingRight < canvas.width &&
              temp.length != 0
            ) {
              if (
                smallest.length != 0 &&
                widthTemp + x + paddingRight < canvas.width &&
                widthTemp > ctx.measureText(smallest).width
              ) {
                smallest = temp;
              } else if (smallest.length == 0) {
                smallest = temp;
              }
            }
          }
          return smallest;
        } else {
          smallest = username + "#" + discrim;
          return smallest;
        }
      } else if (textAlignment == "right") {
      } else if (textAlignment == "center") {
      } else {
        throw new Error(
          "The convertUsername function only supports text alignments of right, left and center."
        );
      }
    };
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
    let name = user.user.username;
    let disc = user.user.discriminator
    let changeName = (ctx, canvas, name, disc) => {
      if (!disc) {
        if (name.length > 13) {
          let test = name.length - 13;
          let fish = name.slice(0, test);
          name = fish + "...";
          return name;
        } else {
          return name;
        }
      } else {
        if (name.length > 13) {
let test = name.length - 13
        let fish = name.slice(0,test);
        name = fish + "..."+"#"+disc 
        return name;
      }else{
        return name+"#"+disc;
      }
      }
    };
    
    let fixXp = (ctx,canvas,value) => {
      if(value>=1000000)
    {
        value=parseInt((value)/1000000)+"M"
      
    }
    else if(value>=1000)
    {
        value=parseInt((value)/1000)+"K" 
     
    }else if(value>=100000){
      value=parseInt((value)/100000)+"K"
    }else if(value >=100){
      value=parseInt((value)/100)+"H"
    }
    return value;
      
    }
    let test2 = fixXp(ctx,canvas,xp1)
    let test3 = fixXp(ctx,canvas,nxtl)
    
    let usertag = changeName(ctx,canvas,name,disc)
    ctx.drawImage(lsimage, 269, 162, 60, 60);
    ctx.font = "25px Aerial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    let bigboi2 = ctx.measureText(note).width;
    ctx.fillText(usertag.toUpperCase(), w / 2, 235);
    ctx.font = "18px Aerial";
    ctx.fillStyle = color;

    let note2 = "note";
    let bigboi = ctx.measureText(note).width;
    ctx.font = "18px Aerial";
    ctx.textAlign = "right";
    ctx.fillText(`${test2}/ ${test3}`, bigboi + 420, 290);
    ctx.textAlign = "left";
    ctx.fillText(`${message.guild.name}`, 50, 360);
    ctx.fillText(`lvl ${xpl}`, 50, 390);

    ctx.fillText(`${note2}:`, 50, 290);
    ctx.fillText(`${note}`, 100, 290);
    let boet = message.guild.members.cache.get(user.user.id);
    let array = [];
    let yes = db.fetch(`emotes1_${user.id}`);
    if (!yes) yes = "You do not have any emotes";
    if (yes.includes("Cupcake")) {
      let i = await Canvas.loadImage(
        "https://cdn.discordapp.com/emojis/713163555918053437.png?v=1"
      );
      ctx.drawImage(i, 50, 405, 40, 40);
    }
    if (yes.includes("Dev")) {
      let i = await Canvas.loadImage(
        "data:image/png;base64,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"
      );
      ctx.drawImage(i, 110, 405, 40, 40);
    }
    if (user.user.bot) {
      let i = await Canvas.loadImage(
        "https://discordemoji.com/assets/emoji/4713_ubot.png"
      );
      ctx.drawImage(i, 50, 405, 40, 40);
    }
    if(user.user.id === "230542036137279490"){
      let fish;
      if(yes.includes("Cupcake") && yes.includes("Dev")){
        fish = 170;
      }else  if(yes.includes("Cupcake") && !yes.includes("Dev")){
        fish = 110;
      } else if(!yes.includes("Cupcake") && !yes.includes("Dev")){
        fish = 50;
      }
        let i = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/700825294466056324/729931064365285397/download.jpg"
      );
      ctx.drawImage(i, fish, 405, 40, 40);
}
    if (user.user.bot) {
      let boet = message.guild.members.cache.get(user.user.id);
      let yes = await boet.user.fetchFlags().then(f => f.toArray());
      if (yes.includes("VERIFIED_BOT")) {
        let i = await Canvas.loadImage(
          "https://discordemoji.com/assets/emoji/6133_TwitterVerified.png"
        );
        ctx.drawImage(i, 110, 405, 40, 40);
      }
    }
    //https://discordemoji.com/assets/emoji/4713_ubot.png
    //https://cdn.discordapp.com/emojis/717241428543143956.png?v=1
    ctx.strokeStyle = color;
    roundRect(ctx, 45, 300, 440, 40, 10, false, true, color);
    roundRect(ctx, 45, 300, 440, 40, 10, true, false, "rgba(0,0,0.3)");
    if (xp1 === 0) {
      roundRect(ctx, 45, 300, 15, 40, 10, true, false, color);
    } else if (xp1 > 0) {
      roundRect(
        ctx,
        45,
        300,
        (100 / nxtl) * xp1 * 4.4,
        40,
        10,
        true,
        false,
        color
      );
    }

    ctx.fillStyle = color;
    ctx.fillRect(45, 395, 440, 5);

    let test = changeName(ctx, canvas, name);
    ctx.fillText(`${test} is bonded with ${bond}`, 50, 475);
    ctx.fillText(`${test} is on dungeon level ${level}`, 50, 495);
    ctx.fillText(`${test} has a balance of ${bal}`, 50, 515);
    ctx.fillRect(45, 450, 440, 5);
    const filename = `profile.png`;
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      filename
    );
    message.channel.send(attachment).then(message.channel.stopTyping());
  }
};
module.exports.help = {
  name: "profile",
  aliases: ["profile"]
};
