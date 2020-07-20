const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);

app.get("/", (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end();
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});
setInterval(() => {
  http.get(`https://meow-woof.glitch.me`); //Do for good hosting
}, 280000);

const Discord = require("discord.js");

const db = require("quick.db");
const client = new Discord.Client({ fetchAllMembers: true, partials:['MESSAGE','REACTION']});
const DBL = require("dblapi.js");
const topapi = process.env.API_TOKEN;
const dbl = new DBL(topapi, client);
const token = process.env.DISCORD_TOKEN;
const trigger = process.env.TRIGGER;

const Canvas = require("canvas");
const port = 1000;
client.snipes = new Map();
const cooldowns = new Discord.Collection();
client.queue = new Map();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

dbl.on("posted", () => {
  console.log("Server count posted!");
});

dbl.on("error", e => {
  console.log(`Oops! ${e}`);
});

const fs = require("fs");
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Could not find any commands");
    return;
  }
  jsfile.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
fs.readdir("./events/", (err, files) => {
  if (err) console.log(err);

  let jsfile1 = files.filter(f => f.split(".").pop() === "js");
  if (jsfile1.length <= 0) {
    console.log("Could not find any events");
    return;
  }
  jsfile1.forEach(f => {
    const eventName = f.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${f}`);
  
    client.on(eventName, event.bind(null, client));
  });
});

client.on("message", async message => {
   let prefix; // define balnk variable with any name you want
  let prefixes = await db.fetch(`prefix_${message.guild.id}`);
  if (prefixes == null) {
    prefix = "^"; // default prefix if no prefix set for this guild
  } else {
    prefix = prefixes;
  }
  if (!message.content.startsWith(prefix)) return;

  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let cmd;
  cmd = args.shift().toLowerCase();
  let command;

  if (client.commands.has(cmd)) {
    command = client.commands.get(cmd);
  } else if (client.aliases.has(cmd)) {
    command = client.commands.get(client.aliases.get(cmd));
  }
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.help.name}\` command.`
      );
    }
  } else {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }
  try {
    command.run(client, message, args);
  } catch (e) {
    return;
  }
})
client.login(token);
