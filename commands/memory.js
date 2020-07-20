const Discord = require("discord.js");
const db = require("quick.db");
const { stripIndents } = require('common-tags');
const { delay } = require('../functions/function.js');
const directions = ['up', 'down', 'left', 'right'];
const colors = ['red', 'blue', 'green', 'yellow'];
const fruits = ['apple', 'orange', 'pear', 'banana'];
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
      if (!args[0]) return message.channel.send('**How Many Directions Do You Want To Have To Memorize?**');
        let level = args[0];
        if (level < 1 || level > 20) return message.channel.send('**You Can Only Select Between 1 - 20!**');
        const current =  db.delete(`game_${message.guild.id}_${message.channel.id}`,"ttt")
        if (current) return message.channel.send(`**Please Wait Until The Current Game of \`${current.name}\` is Finished!**`);
        db.delete(`game_${message.guild.id}_${message.channel.id}`,"ttt")
        try {
            const memorize = genArray(level);
            const memorizeDisplay = memorize.map(word => `\`${word.toUpperCase()}\``).join(' ');
            const memorizemessage = await message.channel.send(stripIndents`
				**You Have 10 Seconds To Memorize -**
				${memorizeDisplay}
			`);
            await delay(10000);
            await memorizemessage.edit('**Type What You Saw, Just The Words!**');
            const memorizeType = memorize.join(' ');
            const messages = await message.channel.awaitMessages(res => message.author.id === res.author.id, {
                max: 1,
                time: 30000
            });
           db.delete(`game_${message.guild.id}_${message.channel.id}`,"ttt")
            if (!messages.size) return message.channel.send(`**Time Uup! It Was ${memorizeDisplay}!**`);
            const answer = messages.first().content.toLowerCase();
            if (answer !== memorizeType) return message.channel.send(`**You Typed It Wrong, It Was ${memorizeDisplay}!**`);
            return message.channel.send('**You Won!**');
        } catch (err) {
             db.delete(`game_${message.guild.id}_${message.channel.id}`,"ttt")
            throw err;
        };
        function genArray(level) {
            const sourceArr = [colors, directions, fruits][Math.floor(Math.random() * 3)];
            const arr = [];
            for (let i = 0; i < level; i++) arr.push(sourceArr[Math.floor(Math.random() * sourceArr.length)]);
            return arr;
        };
  }
};
module.exports.help = {
  name: "memory",
  aliases: ["memory"]
};
