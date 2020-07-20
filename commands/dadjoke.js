const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    let dad = [
          'Today, my son asked "Can I have a book mark?" and I burst into tears. 11 years old and he still doesn\'t know my name is Brian.',
          "My wife is really mad at the fact that I have no sense of direction. So I packed up my stuff and right.",
          "How do you make holy water? You boil the hell out of it.",
          "I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day!",
          "Did you know the first French fries weren't actually cooked in France? They were cooked in Greece",
          "If a child refuses to sleep during nap time, are they guilty of resisting a rest?",
          "The secret service isn't allowed to yell Get down! anymore when the president is about to be attacked. Now they have to yell Donald, duck!",
          "I'm reading a book about anti-gravity. It's impossible to put down!",
          "What do you call someone with no body and no nose? Nobody knows.",
          "When a dad drives past a graveyard: Did you know that's a popular cemetery? Yep, people are just dying to get in there!",
          "A slice of apple pie is $2.50 in Jamaica and $3.00 in the Bahamas. These are the pie rates of the Caribbean.",
          "What is the least spoken language in the world? Sign language",
          "I ordered a chicken and an egg from Amazon. I’ll let you know",
          "Spring is here! I got so excited I wet my plants!",
          "Why can't you hear a pterodactyl go to the bathroom? Because the pee is silent.",
          "The fattest knight at King Arthur’s round table was Sir Cumference. He acquired his size from too much pi.",
          "Justice is a dish best served cold, if it were served warm it would be justwater."
        ];
        let randomJ = dad[Math.floor(Math.random() * dad.length)];
        message.channel.send(randomJ);
  }
};
module.exports.help = {
  name: "dadjoke",
  aliases: ["djoke"]
};
