let Discord = require("discord.js");
module.exports = async (client, guild) => {
  let me = guild.members.cache.get("606279329844035594");
  let embed = new Discord.MessageEmbed().setTitle("I have been added");

  me.send(embed);
};
