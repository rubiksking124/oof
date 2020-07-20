module.exports = async (client, member)  => {
  let db = require("quick.db");
const Canvas = require("canvas")
const Discord = require("discord.js")
  let channel = db.fetch(`channel_${member.guild.id}`);
  if (!channel) return;
  let role = db.fetch(`role_${member.guild.id}`);
  let rolee = member.guild.roles.cache.get(role);
  try {
    member.roles.add(rolee);
  } catch (err) {
    console.log(err);
  }

  let dm = db.fetch(`dm_${member.guild.id}`);
  let ids = member.id;
  let dmText = db.fetch(`dmt_${member.guild.id}`);
  let yes = member.guild.channels.cache.get(channel);
  let id = member.guild.members.cache.get(ids);
  let theImage = db.fetch(`ttimage_${member.guild.id}`);
  if (!theImage) theImage = "on";
  if (!dm) dm = "off";
  if (!dmText) dmText = `Hey ${member}, welcome to **${member.guild.name}**`;
  let text = db.fetch(`text_${member.guild.id}`);
  let heading = db.fetch(`heading_${member.guild.id}`);
  let background1 = db.fetch(`background_${member.guild.id}`);
  let color = db.fetch(`color_${member.guild.id}`);
  if (!color) color = "#000000";
  if (!background1)
    background1 =
      "https://images-na.ssl-images-amazon.com/images/I/61WbuoKXiAL._AC_SY355_.jpg";
  if (!text) text = member.displayName + ` just joined this server`;
  if (text.includes("{mention}")) {
    let bob = text.replace("{mention}", member.displayName);
    text = bob;
  }
  if (!heading) heading = `Hey ${member}, welcome to **${member.guild.name}**`;
  if (heading.includes("{mention}")) {
    let bob = heading.replace("{mention}", member);
    heading = bob;
  }
  if (heading.includes("{servername}")) {
    let bob = heading.replace("{servername}", member.guild.name);
    heading = bob;
  }
  if (dmText.includes("{mention}")) {
    let bob = dmText.replace("{mention}", member);
    dmText = bob;
  }
  if (dmText.includes("{servername}")) {
    let bob = dmText.replace("{servername}", member.guild.name);
    dmText = bob;
  }
  const w = 1100,
    h = 500;
  const canvas = Canvas.createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  const background = await Canvas.loadImage(background1);

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
  ctx.font = applyText(canvas, "You are member " + member.guild.memberCount);

  ctx.fillStyle = color;

  ctx.textAlign = "center";
  ctx.fillText("You are member " + member.guild.memberCount, 840, 300);
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
    member.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true })
  );
  ctx.drawImage(avatar, avatar_x, avatar_y, diameter, diameter);

  const filename = "welcome-image.png";
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), filename);

  if (theImage === "on") {
    if (dm === "on") {
      id.send(dmText);
    }
    yes.send(heading, attachment);
  } else if (theImage === "off") {
    if (dm === "on") {
      try {
        id.send(dmText);
      } catch (err) {
        console.log(err);
      }
    }
    yes.send(heading);
  }
};
