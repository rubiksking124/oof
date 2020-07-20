const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const Canvas = require("canvas");
    const canvas = Canvas.createCanvas(260, 260);
    const ctx = canvas.getContext("2d");
    let red = "#FF0000";
    let blue = "#0000FF";
    let white = "#ffffff";
    let black = "#000000";
    let yellow = "#FFFF00";
    let orange = "#FFA500";
    let green = "#008000";

    ctx.fillStyle = white;
    ctx.fillRect(0, 0, 260, 260);

    if (!args[0]) return message.reply("That is not a valid side on the cube");
    if (isNaN(args[0]))
      return message.reply("That is not a valid side on the cube");
    if (args[0] < 1 || args[0] > 6)
      return message.reply("That is not a valid side on the cube");
    let color;
    if (args[0] == 1) color = black;
    if (args[0] == 2) color = orange;
    if (args[0] == 3) color = green;
    if (args[0] == 4) color = red;
    if (args[0] == 5) color = blue;
    if (args[0] == 6) color = yellow;
    ctx.fillStyle = color;
    ctx.fillRect(50, 50, 50, 50);
    ctx.fillRect(105, 50, 50, 50);
    ctx.fillRect(160, 50, 50, 50);
    ctx.fillRect(50, 105, 50, 50);
    ctx.fillRect(50, 160, 50, 50);
    ctx.fillRect(105, 105, 50, 50);
    ctx.fillRect(160, 105, 50, 50);
    ctx.fillRect(105, 160, 50, 50);
    ctx.fillRect(160, 160, 50, 50);
    ctx.strokeStyle = black;
    ctx.lineWidth = 5;
    ctx.strokeRect(50, 50, 50, 50);
    ctx.strokeRect(105, 50, 50, 50);
    ctx.strokeRect(160, 50, 50, 50);
    ctx.strokeRect(50, 105, 50, 50);
    ctx.strokeRect(50, 160, 50, 50);
    ctx.strokeRect(105, 105, 50, 50);
    ctx.strokeRect(160, 105, 50, 50);
    ctx.strokeRect(105, 160, 50, 50);
    ctx.strokeRect(160, 160, 50, 50);
    const filename = `cube.png`;
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      filename
    );
    message.channel.send(attachment);
    generateScramble();
    function generateScramble() {
      var move; //includes face to turn and how to turn it. Ex. 2F
      var face; //Face to turn. Either R, L, F, B, U, or D
      var faceNum; //1-6, corresponds to face R-D
      var lastFaceNum = 10; //The face of the previous turn
      var turn; //How to turn a face. Either ', 2, or nothing.
      var scramble = ""; //inlucdes 25 moves

      for (var x = 0; x < 25; x++) {
        do {
          faceNum = Math.floor(Math.random() * 6) + 1;
        } while (faceNum === lastFaceNum); //the same face can't appear in consecutive moves.
        lastFaceNum = faceNum;
        if (faceNum === 1) {
          face = "R";
        }
        if (faceNum === 2) {
          face = "L";
        }
        if (faceNum === 3) {
          face = "U";
        }
        if (faceNum === 4) {
          face = "D";
        }
        if (faceNum === 5) {
          face = "F";
        }
        if (faceNum === 6) {
          face = "B";
        }
        turn = Math.floor(Math.random() * 3) + 1;
        if (turn === 1) {
          move = face;
        }
        if (turn === 2) {
          move = face + "2";
        }
        if (turn === 3) {
          move = face + "'";
        }

        scramble += move + " ";
      }
      message.channel.send(scramble);
    }
  }
};
module.exports.help = {
  name: "cube",
  aliases: ["rc"]
};
