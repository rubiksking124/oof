const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms")
 const querystring = require("querystring");
      const r2 = require("r2");
      const CAT_API_URL = "https://api.thecatapi.com/";
      const CAT_API_KEY = "da2e6846-4b21-4679-9f8c-1abb4a0e2357";
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
    messageRecieved(message);
     async function messageRecieved(message) {
        try {
          // pass the name of the user who sent the message for stats later, expect an array of images to be returned.
          var images = await loadImage(message.author.username);

          // get the Image, and first Breed from the returned object.
          var image = images[0];
          var breed = image.breeds[0];

          console.log("message processed", "showing", breed);
          // use the *** to make text bold, and * to make italic
          message.channel.send(
            "***" + breed.name + "*** \r *" + breed.temperament + "*",
            { files: [image.url] }
          );
          // if you didn't want to see the text, just send the file
        } catch (error) {
          console.log(error);
        }
      }
      /**
       * Makes a request to theDogAPI.com for a random dog image with breed info attached.
       */
      async function loadImage(sub_id) {
        // you need an API key to get access to all the iamges, or see the requests you've made in the stats for your account
        var headers = {
          "X-API-KEY": CAT_API_KEY
        };
        var query_params = {
          has_breeds: true, // we only want images with at least one breed data object - name, temperament etc
          mime_types: "jpg,png", // we only want static images as Discord doesn't like gifs
          size: "small", // get the small images as the size is prefect for Discord's 390x256 limit
          sub_id: sub_id, // pass the message senders username so you can see how many images each user has asked for in the stats
          limit: 1 // only need one
        };
        // convert this obejc to query string
        let queryString = querystring.stringify(query_params);

        try {
          // construct the API Get request url
          let _url = CAT_API_URL + `v1/images/search?${queryString}`;
          // make the request passing the url, and headers object which contains the API_KEY
          var response = await r2.get(_url, { headers }).json;
        } catch (e) {
          console.log(e);
        }
        return response;
      }
  }
};
module.exports.help = {
  name: "meow",
  aliases: ["meow"]
};
