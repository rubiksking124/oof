const Discord = require("discord.js");
const db = require("quick.db");

const { stripIndents } = require("common-tags");
const { verify } = require("../functions/function.js");
const blankEmoji = "⚪️";
const playerOneEmoji = "🔴";
const playerTwoEmoji = "🟡";

const nums = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣"];
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (!args[0]) return message.channel.send("**Please Enter A User!**");
    let opponent =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!opponent)
      return message.channel.send("**Please Enter A Valid User!**");
    if (opponent.user.bot)
      return message.channel.send("**Bots May Not Be Played Against!**");
    if (opponent.user.id === message.author.id)
      return message.channel.send("**Cannot Play Against Yourself!**");
   
    db.set(`game1_${message.guild.id}_${message.channel.id}`, "c4");
    try {
      await message.channel.send(
        `**${opponent}, Do You Accept This Challenge?**`
      );
      const verification = await verify(message.channel, opponent);
      if (!verification) {
        db.delete(`game1_${message.guild.id}_${message.channel.id}`, "ttt");
        return message.channel.send(
          `**Looks Like ${opponent} Doesnt Wants To Play!**`
        );
      }
      const board = generateBoard();
      let userTurn = true;
      let winner = null;
      const colLevels = [5, 5, 5, 5, 5, 5, 5];
      let lastTurnTimeout = false;
      const user = userTurn ? message.author : opponent;
      const sign = userTurn ? "user" : "oppo";

      let embed = new Discord.MessageEmbed().setDescription(stripIndents`
					**${user}, Which Column Do You Want To Pick? Type \`end\` To Forfeit!**
					${displayBoard(board)}
					${nums.join("")}
`);
      await message.channel.send(embed).then(async msg =>  {
        
        while (!winner && board.some(row => row.includes(null))) {
           const user = userTurn ? message.author : opponent;
      const sign = userTurn ? "user" : "oppo";
          embed.setDescription(stripIndents`
					**${user}, Which Column Do You Want To Pick? Type \`end\` To Forfeit!**
					${displayBoard(board)}
					${nums.join("")}
`);
           msg.edit(embed);
          const filter = res => {
            if (res.author.id !== user.id) return false;
            const choice = res.content;
            if (choice.toLowerCase() === "end") return true;
            const i = Number.parseInt(choice, 10) - 1;
            return board[colLevels[i]] && board[colLevels[i]][i] !== undefined;
          };
          const turn = await message.channel.awaitMessages(filter, {
            max: 1,
            time: 60000
          });
          if (!turn.size) {
            if (lastTurnTimeout) {
              winner = "time";
              break;
            } else {
              lastTurnTimeout = true;
              userTurn = !userTurn;
              continue;
            }
          }
          const choice = turn.first().content;
          if (choice.toLowerCase() === "end") {
            winner = userTurn ? opponent : message.author;
            await message.channel.send(`**${winner} Won!**`);
            db.delete(`game1_${message.guild.id}_${message.channel.id}`, "ttt");
          }
          const i = Number.parseInt(choice, 10) - 1;
          board[colLevels[i]][i] = sign;
          colLevels[i] -= 1;
          if (verifyWin(board)) winner = userTurn ? message.author : opponent;
          if (lastTurnTimeout) lastTurnTimeout = false;
          userTurn = !userTurn;
        }

        db.delete(`game1_${message.guild.id}_${message.channel.id}`, "ttt");
        if (winner === "time")
          return message.channel.send("**Game Ended Due To Inactivity!**");
        return message.channel.send(
          winner ? `**Congrats, ${winner}!**` : "**Its A Draw!**"
        );
      });

      function checkLine(a, b, c, d) {
        return a !== null && a === b && a === c && a === d;
      }

      function verifyWin(bd) {
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 7; c++) {
            if (checkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c]))
              return bd[r][c];
          }
        }
        for (let r = 0; r < 6; r++) {
          for (let c = 0; c < 4; c++) {
            if (checkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3]))
              return bd[r][c];
          }
        }
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 4; c++) {
            if (
              checkLine(
                bd[r][c],
                bd[r + 1][c + 1],
                bd[r + 2][c + 2],
                bd[r + 3][c + 3]
              )
            )
              return bd[r][c];
          }
        }
        for (let r = 3; r < 6; r++) {
          for (let c = 0; c < 4; c++) {
            if (
              checkLine(
                bd[r][c],
                bd[r - 1][c + 1],
                bd[r - 2][c + 2],
                bd[r - 3][c + 3]
              )
            )
              return bd[r][c];
          }
        }
        return null;
      }

      function generateBoard() {
        const arr = [];
        for (let i = 0; i < 6; i++) {
          arr.push([null, null, null, null, null, null, null]);
        }
        return arr;
      }

      function displayBoard(board) {
        return board
          .map(row =>
            row
              .map(piece => {
                if (piece === "user") return playerOneEmoji;
                if (piece === "oppo") return playerTwoEmoji;
                return blankEmoji;
              })
              .join("")
          )
          .join("\n");
      }
    } catch (err) {
      console.log(err);
    }
  }
};
module.exports.help = {
  name: "cf",
  aliases: ["connectfour"]
};
