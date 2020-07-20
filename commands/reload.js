const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    if(message.author.id !== "606279329844035594") return message.reply("what are you trying to do there")
    client.unloadCommand = async commandName => {
      let command;
      if (client.commands.has(commandName)) {
        command = client.commands.get(commandName);
      }
      if (!command)
        return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

      if (command.shutdown) {
        await command.shutdown(client);
      }
      const mod =
        require.cache[require.resolve(`../commands/${command.help.name}`)];
      delete require.cache[
        require.resolve(`../commands/${command.help.name}.js`)
      ];
      for (let i = 0; i < mod.parent.children.length; i++) {
        if (mod.parent.children[i] === mod) {
          mod.parent.children.splice(i, 1);
          break;
        }
      }
      return false;
    };
    client.loadCommand = commandName => {
      try {
       console.log(`Loading Command: ${commandName}`);
        const props = require(`../commands/${commandName}`);
        if (props.init) {
          props.init(client);
        }
        
        return false;
      } catch (e) {
        return `Unable to load command ${commandName}: ${e}`;
      }
    };
    (async () => {
      const command =
        client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0]));
      let response = await client.unloadCommand(args[0]);
      if (response) return message.reply(`Error Unloading: ${response}`);

      response = client.loadCommand(command.help.name);
      if (response) return message.reply(`Error Loading: ${response}`);

      message.reply(`The command \`${command.help.name}\` has been reloaded`);
    })();
  }
};
module.exports.help = {
  name: "reload",
  aliases: ["reload"]
};
