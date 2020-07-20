const Discord = require("discord.js");
const db = require("quick.db");
const beautify = require("beautify")
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if (message.author.id !== "606279329844035594") {
          return message.channel.send("You are not the owner of this bot");

          return;
        }
        if (!args[0]) {
          message.channel.send("You need to provide something to eval");

          return;
        }

        try {
          if (
            args
              .join(" ")
              .toLowerCase()
              .includes("token")
          ) {
            return;
          }
          const toEval = args.join(" ");
          const evaluated = eval(toEval);
          message.channel.send(
            new Discord.MessageEmbed()
              .setColor("#00FF00")
              .setTimestamp()
              .setFooter(client.user.username, client.user.displayAvatarURL)
              .setTitle("Eval")
              .addField(
                "To evaluate: ",
                `\`\`\`js\n${beautify(args.join(" "), {
                  format: "js"
                })}\n\`\`\``
              )
              .addField(
                "Evaluated: ",
                `\`\`\`js\n${beautify(evaluated, { format: "js" })}\n\`\`\``
              )
              .addField("Type of:", typeof evaluated)
          );
        } catch (e) {
          message.channel.send(
            new Discord.MessageEmbed()
              .setColor("#FF0000")
              .setTitle(":x: Error!")
              .setDescription(e)
              .setFooter(client.user.username, client.user.displayAvatarURL)
          );
        }
  }
};
module.exports.help = {
  name: "eval",
  aliases: ["eval"]
};
