const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
   let sChannel = message.guild.channels.cache.find(
          channel => channel.name === "suggestions"
        );
        let suggestion = args.join(" ");
        var server = message.guild;

        if (!suggestion)
          return message.channel
            .send(`Please provide a suggestion!`)
            .then(m => m.delete(15000));

        if (!sChannel) {
          message.guild.channels
            .create("suggestions", {
              //optional
              type: "text" //optional
            })
            .then(createdChannel => {
              var id = createdChannel;
              message.channel
                .send(
                  "Your suggestion has been filled to the staff team. Thank you!"
                )
                .then(message => message.delete(15000)),
                id
                  .send({
                    embed: {
                      color: 3066993,
                      title: "Suggestion",
                      fields: [
                        {
                          name: "Name",
                          value: `${message.author}`
                        },
                        {
                          name: "Suggestion",
                          value: `${suggestion}`
                        }
                      ]
                    }
                  })
                  .then(async message => {
                    await message.react("✅"), await message.react("❌");
                  });
            });
        } else {
          message.channel
            .send(
              "Your suggestion has been filled to the staff team. Thank you!"
            )
            .then(message => message.delete(15000));
          sChannel
            .send({
              embed: {
                color: 3066993,
                title: "Suggestion",
                fields: [
                  {
                    name: "Name",
                    value: `${message.author}`
                  },
                  {
                    name: "Suggestion",
                    value: `${suggestion}`
                  }
                ]
              }
            })
            .then(async message => {
              await message.react("✅");
              await message.react("❌");
            });
        }
  }
};
module.exports.help = {
  name: "suggest",
  aliases: ["suggest"]
};
