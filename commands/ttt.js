  const Discord = require("discord.js");
const { stripIndents } = require('common-tags')
const db = require("quick.db");
const { verify } = require('../functions/function.js');
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
  if (!args[0]) return message.channel.send('**Please Enter A User!**')
        let opponent = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!opponent) return message.channel.send("**Please Enter A Valid User!**")
        if (opponent.user.bot) return message.channel.send('**Cannot Play Against Bots!**');
        if (opponent.user.id === message.author.id) return message.channel.send('**Cannot Play Against Yourself!**');
        const current = db.fetch(`game1_${message.guild.id}_${message.channel.id}`)
        if (current) return message.channel.send(`**Please Wait Until The Current Game Of \`${current.name}\` Is Finished!**`);
      db.set(`game1_${message.guild.id}_${message.channel.id}`,"ttt")
        try {
            await message.channel.send(`**${opponent}, Do You Accept This Challenge?**`);
            const verification = await verify(message.channel, opponent);
            if (!verification) {
                db.delete(`game1_${message.guild.id}_${message.channel.id}`,"ttt")
                return message.channel.send(`**Looks Like ${opponent} Doesnt Wants To Play!**`);
            }
            const sides = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const taken = [];
            let userTurn = true;
            let winner = null;
			      let lastTurnTimeout = false;
            while (!winner && taken.length < 9) {
                const user = userTurn ? message.author : opponent;
                const sign = userTurn ? 'X' : 'O';
                await message.channel.send(stripIndents`
					**${user}, Which Side Do You Pick? Type \`End\` To Forfeit!**
					\`\`\`
					${sides[0]} | ${sides[1]} | ${sides[2]}
					—————————
					${sides[3]} | ${sides[4]} | ${sides[5]}
					—————————
					${sides[6]} | ${sides[7]} | ${sides[8]}
					\`\`\`
				`);
                const filter = res => {
                    if (res.author.id !== user.id) return false;
                    const choice = res.content;
                    if (choice.toLowerCase() === 'end') return true;
                    return sides.includes(choice) && !taken.includes(choice);
                };
                const turn = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 30000
                });
                if (!turn.size) {
                    await message.channel.send(`**Time Is Up, Game Over!**`);
                    if (lastTurnTimeout) {
										  winner = 'time';
						          break;
					          } else {
						            userTurn = !userTurn;
						            lastTurnTimeout = true;
						            continue;
					          }
                 }
                const choice = turn.first().content;
                if (choice.toLowerCase() === 'end') {
                    winner = userTurn ? opponent : message.author;
                    break;
                }
                sides[Number.parseInt(choice, 10) - 1] = sign;
                taken.push(choice);
                if (verifyWin(sides)) winner = userTurn ? message.author : opponent;
              	if (lastTurnTimeout) lastTurnTimeout = false;
                userTurn = !userTurn;
            }
          
            db.delete(`game1_${message.guild.id}_${message.channel.id}`,"ttt")
            if (winner === 'time') return message.channel.send('**Game Ended Due To Inactivity!**');
            return message.channel.send(winner ? `**Congrats, ${winner}!**` : '**Its A Draw!**');
        } catch (err) {
             db.delete(`game1_${message.guild.id}_${message.channel.id}`,"ttt")
            throw err;
        }
        
        function verifyWin(sides) {
            return (sides[0] === sides[1] && sides[0] === sides[2])
                || (sides[0] === sides[3] && sides[0] === sides[6])
                || (sides[3] === sides[4] && sides[3] === sides[5])
                || (sides[1] === sides[4] && sides[1] === sides[7])
                || (sides[6] === sides[7] && sides[6] === sides[8])
                || (sides[2] === sides[5] && sides[2] === sides[8])
                || (sides[0] === sides[4] && sides[0] === sides[8])
                || (sides[2] === sides[4] && sides[2] === sides[6]);
        }
  }
}
module.exports.help = {
  name: "tictactoe",
  aliases: ["ttt"]
};