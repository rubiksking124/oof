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
            .setTitle("Economy commands")
            .setDescription("All of the economy commands")
            .addField(
              `${prefix} bal <if you want to mention a user>`,
              "Sends your bal or the bal of the person you mentioned"
            )
            .addField(
              `${prefix} crates <if you want to mention a user>`,
              "Sends your amount of crates or the crate of the person you mentioned"
            )
            .addField(`${prefix} buy crate`, "Buys a crate for 1000 muffins")
            .addField(
              `${prefix} open crate`,
              "Opens one of the crates you have"
            )
            .addField(
              `${prefix} give <mention the person you want to give the coins to> <amount you want to give>`,
              "Subtracts the amount you provided and gives it to the person you mentioned"
            )
            .addField(
              `${prefix}work`,
              "Every 24 hours you can work and get a random amount of money"
            )
            .addField(
              `${prefix}fish`,
              "Every 24 hours you can fish and get a random amount of money"
            )
            .addField(
              `${prefix}daily`,
              "Every 24 hours you can use this command and it gives you 500 muffins"
            )
            .addField(
              `${prefix}bank`,
              "Shows you how much money you have in the bank"
            )
            .addField(
              `${prefix}deposit <amount you want to deposit>`,
              "Puts the amount of money you said in the bank"
            )
            .addField(
              `${prefix}withdraw <amount to withdraw>`,
              "Withdraws the amount you said"
            )
     .addField(
              `${prefix}lb`,
              "Sends the global lb"
            )
        );
  }
};
module.exports.help = {
  name: "ceconomy",
  aliases: ["economyc"]
};
