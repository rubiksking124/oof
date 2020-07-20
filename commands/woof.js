const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms")
 const querystring = require("querystring");
      const r2 = require("r2");
     const DOG_API_URL = "https://api.thedogapi.com/";
      const DOG_API_KEY = "64246868-b3d9-44a6-b6ab-363ac4a084fb";
module.exports.run = async (client, message, args) => {
  let blacklist = db.fetch(`blacklist_${message.author.id}`);
  if (blacklist == true) {
    message.reply("No you are blacklisted");
  } else {
     messageRecieved1(message);
      }
      async function messageRecieved1(message) {
        try {
          // pass the name of the user who sent the message for stats later, expect an array of images to be returned.
          var images1 = await loadImage1(message.author.username);

          // get the Image, and first Breed from the returned object.
          var image1 = images1[0];
          var breed1 = image1.breeds[0];

          console.log("message processed", "showing", breed1);
          // use the *** to make text bold, and * to make italic
          message.channel.send(
            "***" + breed1.name + "*** \r *" + breed1.temperament + "*",
            { files: [image1.url] }
          );
          // if you didn't want to see the text, just send the file
        } catch (error) {
          console.log(error);
        }
      }
      /**
       * Makes a request to theDogAPI.com for a random dog image with breed info attached.
       */
      async function loadImage1(sub_id) {
        // you need an API key to get access to all the iamges, or see the requests you've made in the stats for your account
        var headers = {
          "X-API-KEY": DOG_API_KEY
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
          let _url = DOG_API_URL + `v1/images/search?${queryString}`;
          // make the request passing the url, and headers object which contains the API_KEY
          var response = await r2.get(_url, { headers }).json;
        } catch (e) {
          console.log(e);
        }
        return response;
      
  }
};
module.exports.help = {
  name: "woof",
  aliases: ["woof"]
};
