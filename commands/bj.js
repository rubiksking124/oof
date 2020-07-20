const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if(!message.guild.me.hasPermission("ADD_REACTIONS")) return message.reply("I cant add reactions")
    if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) return message.reply("I do not have the permission to use external emojis")
    let card1 = Math.floor(Math.random() * 11) + 1;
    let card2 = Math.floor(Math.random() * 11) + 1;
    let card4 = Math.floor(Math.random() * 11) + 1;
    let card5 = Math.floor(Math.random() * 11) + 1;

    let car = card1 + card2;
    let amount = 2;
    let embed = new Discord.MessageEmbed()
      .setTitle("Blackjack")
    .setColor("BLACK")
      .setDescription(
        "Your hand: " +
          card1 +
          "," +
          card2 +
          ":" +
          " Total: " +
          car +
          "\n" +
          `Bots hand: ${card4} ???: Total: ???`
      )
   
    let array = [];
    let botarray = [];

    array.push(card1);
    array.push(card2);
    botarray.push(card4);
    botarray.push(card5);
    let react1;
    let react2;

    message.channel.send(embed).then(msg => {
      msg.react("✅").then(r => {
        msg.react("❌");
        const backwardsFilter = (reaction, user) =>
          reaction.emoji.name === "❌" && user.id === message.author.id;
        const forwardsFilter = (reaction, user) =>
          reaction.emoji.name === "✅" && user.id === message.author.id;
        const backwards = msg.createReactionCollector(backwardsFilter, {
          time: 60000,
          max: 1
        });

        const forwards = msg.createReactionCollector(forwardsFilter, {
          time: 60000
        });

        let sum2 = botarray.reduce(function(a, b) {
          return a + b;
        }, 0);
        let count2;
        count2 = sum2;
        let sum = array.reduce(function(a, b) {
          return a + b;
        }, 0);
        let count;
        count = sum;
        if (count > 21) {
          embed.setDescription(
            "Your hand: " +
              array +
              ":" +
              " Total: " +
              count +
              "\n" +
              `Bots hand: ${botarray}: Total: ${count2}` +
              "\n" +
              "I won"
          )
         .setColor("RED")
          msg.edit(embed);
          forwards.stop();
          backwards.stop();
        } else if (count === 21 && count2 > 21) {
          embed.setDescription(
            "Your hand: " +
              array +
              ":" +
              " Total: " +
              count +
              "\n" +
              `Bots hand: ${botarray}: Total: ${count2}` +
              "\n" +
              "You won"
          )
          .setColor("GREEN")
          msg.edit(embed);
          forwards.stop();
          backwards.stop();
        } else if (count === 21 && count2 < 21) {
          embed.setDescription(
            "Your hand: " +
              array +
              ":" +
              " Total: " +
              count +
              "\n" +
              `Bots hand: ${botarray}: Total: ${count2}` +
              "\n" +
              "You won"
          )
        .setColor("GREEN")
          msg.edit(embed);
          forwards.stop();
          backwards.stop();
        } else if (count2 === 21 && count < 21) {
          embed.setDescription(
            "Your hand: " +
              array +
              ":" +
              " Total: " +
              count +
              "\n" +
              `Bots hand: ${botarray}: Total: ${count2}` +
              "\n" +
              "I won"
          )
          .setColor("RED")
          msg.edit(embed);
          forwards.stop();
          backwards.stop();
        } else if (count2 === 21 && count2 > 21) {
          embed.setDescription(
            "Your hand: " +
              array +
              ":" +
              " Total: " +
              count +
              "\n" +
              `Bots hand: ${botarray}: Total: ${count2}` +
              "\n" +
              "I won"
          )
          .setColor("RED")
          msg.edit(embed);
          forwards.stop();
          backwards.stop();
        } else if (count > 21 && count2 > 21) {
          embed.setDescription(
            "Your hand: " +
              array +
              ":" +
              " Total: " +
              count +
              "\n" +
              `Bots hand: ${botarray}: Total: ${count2}` +
              "\n" +
              "I won"
          )
         .setColor("RED")
          msg.edit(embed);
          forwards.stop();
          backwards.stop();
        }
        backwards.on("collect", r => {
          let sum2 = botarray.reduce(function(a, b) {
            return a + b;
          }, 0);
          let count2;
          count2 = sum2;
          let sum = array.reduce(function(a, b) {
            return a + b;
          }, 0);
          let count;
          count = sum;
          if (count2 > 21 && count < 21) {
            embed.setDescription(
              "Your hand: " +
                array +
                ":" +
                " Total: " +
                count +
                "\n" +
                `Bots hand: ${botarray}: Total: ${count2}` +
                "\n" +
                "You won"
            )
           .setColor("GREEN")
            msg.edit(embed);
            forwards.stop();
            backwards.stop();
          } else if (count > 21 && count2 < 21) {
            embed.setDescription(
              "Your hand: " +
                array +
                ":" +
                " Total: " +
                count +
                "\n" +
                `Bots hand: ${botarray}: Total: ${count2}` +
                "\n" +
                "I won"
            )
            .setColor("RED")
           
            msg.edit(embed);
            forwards.stop();
            backwards.stop();
          } else if(count > count2){
           embed.setDescription(
            "Your hand: " +
              array +
              ":" +
              " Total: " +
              count +
              "\n" +
              `Bots hand: ${botarray}: Total: ${count2}` +
              "\n" +
              "You won"
          )
          .setColor("GREEN")
          msg.edit(embed);
          forwards.stop();
          backwards.stop();
        }else if(count2 > count){
           embed.setDescription(
            "Your hand: " +
              array +
              ":" +
              " Total: " +
              count +
              "\n" +
              `Bots hand: ${botarray}: Total: ${count2}` +
              "\n" +
              "I won"
          )
          .setColor("RED")
         
          msg.edit(embed);
          forwards.stop();
          backwards.stop();
        }
        });
        forwards.on("collect", r => {
          let card3 = Math.floor(Math.random() * 11) + 1;
          let card6 = Math.floor(Math.random() * 11) + 1;
          array.push(card3);
          botarray.push(card6);
          let sum2 = botarray.reduce(function(a, b) {
            return a + b;
          }, 0);
          let count2;
          count2 = sum2;
          let sum = array.reduce(function(a, b) {
            return a + b;
          }, 0);
          let count;
          count = sum;

          if (count > 21) {
            embed.setDescription(
              "Your hand: " +
                array +
                ":" +
                " Total: " +
                count +
                "\n" +
                `Bots hand: ${botarray}: Total: ${count2}` +
                "\n" +
                "I won"
              
            )
            .setColor("RED")
          
            msg.edit(embed);
            forwards.stop();
            backwards.stop();
          } else if (count === 21 && count2 > 21) {
            embed.setDescription(
              "Your hand: " +
                array +
                ":" +
                " Total: " +
                count +
                "\n" +
                `Bots hand: ${botarray}: Total: ${count2}` +
                "\n" +
                "You won"
            )
            .setColor("GREEN")
           
            msg.edit(embed);
            forwards.stop();
            backwards.stop();
          } else if (count === 21 && count2 < 21) {
            embed.setDescription(
              "Your hand: " +
                array +
                ":" +
                " Total: " +
                count +
                "\n" +
                `Bots hand: ${botarray}: Total: ${count2}` +
                "\n" +
                "You won"
              
            )
            .setColor("GREEN")
            msg.edit(embed);
            forwards.stop();
            backwards.stop();
          } else if (count2 === 21 && count < 21) {
            embed.setDescription(
              "Your hand: " +
                array +
                ":" +
                " Total: " +
                count +
                "\n" +
                `Bots hand: ${botarray}: Total: ${count2}` +
                "\n" +
                "I won"
            )
            .setColor("RED")
            msg.edit(embed);
            forwards.stop();
            backwards.stop();
          } else if (count2 === 21 && count2 > 21) {
            embed.setDescription(
              "Your hand: " +
                array +
                ":" +
                " Total: " +
                count +
                "\n" +
                `Bots hand: ${botarray}: Total: ${count2}` +
                "\n" +
                "I won"
            )
            .setColor("RED")
            msg.edit(embed);
            forwards.stop();
            backwards.stop();
          } else if (count > 21 && count2 > 21) {
            embed.setDescription(
              "Your hand: " +
                array +
                ":" +
                " Total: " +
                count +
                "\n" +
                `Bots hand: ${botarray}: Total: ${count2}` +
                "\n" +
                "I won"
            )
             .setColor("RED")
          
            msg.edit(embed);
            forwards.stop();
            backwards.stop();
          } else {
            embed.setDescription(
              "Your hand: " +
                array +
                ":" +
                " Total: " +
                count +
                "\n" +
                `Bots hand:${card4} ???: Total: ???`
            );
            msg.edit(embed);
          }
        });
      });
    });
  }
};
module.exports.help = {
  name: "blackjack",
  cooldown: 5,
  aliases: ["bj"]
};
