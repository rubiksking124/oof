const Discord = require("discord.js");
const db = require("quick.db");
const math = require("mathjs")
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     if (!args[0]) return message.channel.send("Please input a calculation");
        let resp;
        try {
          resp = math.eval(args.join(" "));
        } catch (e) {
          return message.channel.send("Please input a valid calculation");
        }

        message.channel.send({
          embed: {
            color: 15158332,
            title: "Math",
            fields: [
              {
                name: "Calculation",
                value: "Input" + `\`\`\`css\n${args.join("")}\`\`\``
              },
              {
                name: "Calculation",
                value: "Ouput" + `\`\`\`css\n${resp}\`\`\``
              }
            ]
          }
        });
  }
};
module.exports.help = {
  name: "math",
  aliases: ["calc"]
};
