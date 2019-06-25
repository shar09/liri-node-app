require("dotenv").config();

var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var nodeArgs = process.argv;
var artist = "";
for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
      artist = artist + "+" + nodeArgs[i];
    } else {
      artist += nodeArgs[i];
  
    }
} 
console.log(artist)
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
console.log(queryUrl);

axios.get(queryUrl).then(
    function(response) {
      //console.log(response);
      console.log("Name of the venue: " +response.data[1].venue.name);
      console.log("Venue location: " +response.data[1].venue.region);
      console.log("Date of the Event: " +moment(response.data[2].datetime).format("MM/DD/YYYY"));
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
});

// var input;
// switch(operand) {
//     case "concert-this":
//     break;

//     case "spotify-this-song":
//     break;

//     case "movie-this":
//     break;

//     case "do-what-it-says":
//     break;
// }

