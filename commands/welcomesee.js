const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let role = db.fetch(`role_${message.guild.id}`);
    let fish = "none";
    if (!role) role = fish;
    role = "<@&" + role + ">";
    let channel = db.fetch(`channel_${message.guild.id}`);
    let channel1 = "none";
    if (!channel) channel = channel1;
    channel = "<#" + channel + ">";
    let backgroundimage = db.fetch(`background_${message.guild.id}`);
    let color = db.fetch(`color_${message.guild.id}`);
    if (!color) color = "none";
    let dm = db.fetch(`dm_${message.guild.id}`);

    let dmText = db.fetch(`dmt_${message.guild.id}`);
if(!backgroundimage) backgroundimage = "https://images-na.ssl-images-amazon.com/images/I/61WbuoKXiAL._AC_SY355_.jpg"
    let theImage = db.fetch(`ttimage_${message.guild.id}`);
    if (!theImage) theImage = "on";
    if (!dm) dm = "off";
    if (!dmText) dmText = `Hey {mention}, welcome to **{servername}**`;
    let text = db.fetch(`text_${message.guild.id}`);
    let heading = db.fetch(`heading_${message.guild.id}`);

    if (!text) text = "{mention} " + ` just joined this server`;

    if (!heading) heading = `Hey {mention}, welcome to **{servername}**`;
   
 
  if (text.includes("{mention}")) {
    let bob = text.replace("{mention}", message.member.displayName);
    text = bob;
  }
  if (!heading) heading = `Hey ${message.member}, welcome to **${message.guild.name}**`;
  if (heading.includes("{mention}")) {
    let bob = heading.replace("{mention}", message.member);
    heading = bob;
  }
  if (heading.includes("{servername}")) {
    let bob = heading.replace("{servername}", message.guild.name);
    heading = bob;
  }
  if (dmText.includes("{mention}")) {
    let bob = dmText.replace("{mention}", message.member);
    dmText = bob;
  }
  if (dmText.includes("{servername}")) {
    let bob = dmText.replace("{servername}", message.guild.name);
    dmText = bob;
  }
    let Canvas = require("canvas")
  const w = 1100,
    h = 500;
  const canvas = Canvas.createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  const background = await Canvas.loadImage(backgroundimage);

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  const applyText = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a 70 size of the font
    let fontSize = 50;

    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${(fontSize -= 10)}px bold sans-serif`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
  };

  ctx.font = applyText(canvas, text);

  ctx.fillStyle = color;

  ctx.textAlign = "center";
  ctx.fillText(text, 840, 200);
  ctx.fillStyle = color;

  ctx.textAlign = "center";
  ctx.fillText(text, 840, 200);
  ctx.font = applyText(canvas, "You are member " + message.guild.messageCount);

  ctx.fillStyle = color;

  ctx.textAlign = "center";
  ctx.fillText("You are member " + message.guild.messageCount, 840, 300);
  const avatar_x = 30;
  const avatar_y = 90;
  const diameter = 300;
  const halfsize = diameter / 2;
  const shadow_size = 2;
  const shading_color = "rgba(0,0,0,0.5)";

  const sx = avatar_x + halfsize,
    sy = avatar_y + halfsize;

  ctx.beginPath();
  ctx.arc(sx, sy, halfsize - shadow_size * 2, 0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
   message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true })
  );
  ctx.drawImage(avatar, avatar_x, avatar_y, diameter, diameter);

  const filename = "welcome-image.png";
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), filename);
    let embed = new Discord.MessageEmbed()
      .setTitle("Welcome preview")
      .addField("Welcome channel", channel,true)
        .addField("Welcome background", backgroundimage,true)
      .addField("Welcome join role", role,true)
      .addField("Welcome color", color,true)
        .addField("Welcome dm", dm,true)
        .addField("Welcome dm text", dmText,true)
        .addField("Welcome image", theImage,true)
        .addField("Welcome heading", heading,true)
        .addField("Welcome text", text,true)
    .setImage("attachment://welcome-image.png")
              
    message.channel.send(embed);
  }
};
module.exports.help = {
  name: "welcomepreview",
  aliases: ["wp"]
};
