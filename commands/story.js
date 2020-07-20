const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     let stories = [
        "A boy stands knee-deep on heron-thin legs, stung skin numbing now, as stars prick creek water sliding slow, slow beneath him. Across the meadow, his house is burning. When he finally looks up — having almost outrun the sound of the front porch door banging like a rifle shot behind—flames illuminate the rope swing he’s just flown past and thick smoke billows into a harvest moon, a great big zero, now, just clearing the ridge. But what echoes still, are the last words his father, belt in hand, would ever utter: “Stop crying like a baby, son, and take it.”",
        "In May I tilled the garden, so swept up in the work that I churned beyond the boundaries of Grandma’s old plot into rocky soil where a dead maple had recently been removed. An animal, I said, when the tiller turned up bones. A beloved pet. Then the skull, silver crowns glinting in its jaw. I knelt. “Hello. I’m your granddaughter, Alice. We’ve never met, but your wife left me this house.” Mute bone. A hard man, cruel, I’d been told, who’d abandoned his bewildered family. The sunflowers I planted there flourished. They don’t need kind soil to grow strong.",
        "The playground is closing now. The ball pool isn’t open. We have to hold hands in the car park. We have no more chocolate in the house. The dentist is very fun. We’re nearly there.That drawing is amazing! You are so good at sharing! Yes, everyone’s going to bed now. Yes, that dog is playing with that squirrel.T hat bird has fallen asleep in the road. Abigail’s cat had to go away. That shouty man is being silly. I’ll keep the bad ponies away in the night. We always say please.We always say sorry. It’s okay. Everything’s fine."
      ];
     let random = stories[Math.floor(Math.random() * stories.length)];
            message.channel.send(random);
  }
};
module.exports.help = {
  name: "story",
  aliases: ["storys"]
};
