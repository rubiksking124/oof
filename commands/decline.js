const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if(message.author.id !== "606279329844035594") return message.reply("Owner command only")
  let user = message.mentions.members.first();
    let accepted = db.fetch(`accepted3_${user.id}`)
    if(accepted === true){ return message.reply("This user has already been accepted")}else{
    let id = user.user.id
    let message1 = client.users.cache.get(id)
    message1.send("You have been declined please resubmit")
    db.push(`emotes1_${user.id}`,"Dev")
   
    }
  }
};
module.exports.help = {
  name: "decline",
  aliases: ["decline"]
};
