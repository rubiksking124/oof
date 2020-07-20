module.exports = async (client, member, message) => {
  let db = require("quick.db");
  let channel = db.fetch(`channel1_${member.guild.id}`);
  if (!channel) return;
  let yes = member.guild.channels.cache.get(channel);
  yes.send(
    `We hope **${member.displayName}** got what they needed in ${member.guild.name}`
  );
};
