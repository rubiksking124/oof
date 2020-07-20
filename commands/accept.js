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
    let embed = new Discord.MessageEmbed()
    .setTitle("Acceptence")
    .setColor("GREEN")
    .setDescription("<:correct:726607102604214323> You have been accepted for the dev emote on your profile card")
    message1.send(embed)
   
    db.push(`emotes1_${user.id}`,"Dev")
    db.set(`accepted3_${user.id}`,true)
    }
  }
};
module.exports.help = {
  name: "accept",
  aliases: ["accept"]
};
