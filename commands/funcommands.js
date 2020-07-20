const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     let prefix =  db.fetch(`prefix_${message.guild.id}`)
      if(!prefix) prefix="^"
     message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Fun commands")
            .setDescription("All of the fun commands")
            .addField(
              `${prefix}slot`,
              "A small slot machine that gives 10 muffins if you win"
            )
            .addField(`${prefix}story`, "Sends a small story")
            .addField(
              `${prefix}kill <mention a person>`,
              "Says you killed the person you mentioined"
            )
            .addField(
              `${prefix}ninjakill <mention a person>`,
              "Says the person you mentioned was killed but doesnt say by who :wink:"
            )
            .addField(
              `${prefix}owo <text you want to owoify>`,
              "Turns every o in the text to owo"
            )
            .addField(
              `${prefix}uwu <text you want to uwuify>`,
              "Turns every u in the text to uwu"
            )
            .addField(
              `${prefix}dice <bet>`,
              "Bets the amount you said in a small dice game"
            )
            .addField(`${prefix}vote`, "Sends a link to vote for my bot")
            .addField(
              `${prefix}rate`,
              "Gives a random rating between 1/10 and 10/10"
            )
            .addField(
              `${prefix}percent`,
              "Gives a random percent between 0 and 100%"
            )
            .addField(
              `${prefix}8ball <question>`,
              "Gives a 8ball answer to the question you asked"
            )
            .addField(`${prefix}dad joke`, "Gives a random dad joke")
            .addField(
              `${prefix}react <emoji>`,
              "Reacts to the message with the emoji"
            )
            .addField(
              `${prefix}scolor <hex code>`,
              "Gives a image of the color and a rgba value of the color"
            )
            .addField(
              `${prefix}password <number>`,
              "Gives a random password encoded in binary thats the length of the number you said that deletes after 2 minutes"
            )
            .addField(
              `${prefix}say <what you want the bot to say>`,
              "The bot says what ever you wanted it to say"
            )
            .addField(
              `${prefix}gamble <amount you want to gamble>`,
              "Gambles the amount you entered"
            )
            .addField(
              `${prefix}rps <either r p or s> <amount you want to bet>`,
              "A rock paper scissors game with betting"
            )
            .addField(
              `${prefix}calc <calculation>`,
              "Sends back the answer to the calculation"
            )

            .addField(
              `${prefix}spoiler <text>`,
              "Adds spoiler tags to the text"
            )
            .addField(
              `${prefix}poll <question>`,
              "Creates a poll for the question you gave it"
            )
            .addField(`${prefix}bj`, "A fun game of blackjack")
            .addField(
              `${prefix}ms`,
              "Creates a 12x12 board of a minesweeper game"
            )
            .addField(`${prefix}ascii <text>`, "Converts the text to ascii art")
       .addField(`${prefix}tts <text>`, "Plays the text in a voice channel")
       .addField(`${prefix}ttt <mention a user>`, "Tic Tac Toe game")
        .addField(`${prefix}cf <mention a user>`, "Connect four")
        .addField(`${prefix}memory <amount to memorize>`, "A small memory game")
         .addField(`${prefix}sarc <text>`, "Makes the text sarcastic")
        )
   
        
     
        
        
  }
};
module.exports.help = {
  name: "func",
  aliases: ["cfun"]
};
