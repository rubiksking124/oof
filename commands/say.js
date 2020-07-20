const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    const sayMessage = args.join(" ");
      
        message.delete().catch(O_o => {});
       if(sayMessage.includes("@everyone")){
         sayMessage.replace("@everyone","everyone")
       }
    const embed = new Discord.MessageEmbed()
    .setDescription(sayMessage)

        message.channel.send(embed);
    console.log(sayMessage)
  }
};
module.exports.help = {
  name: "say",
  aliases: ["say"]
};
