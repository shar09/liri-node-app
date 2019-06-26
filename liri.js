require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var option = process.argv[2];
var input = process.argv.slice(3).join(" ");

function bands(artist) {

//var artist = input;

console.log(artist)
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
//console.log(queryUrl);
axios.get(queryUrl).then(
    function(response) {
      //console.log(response);
      console.log("Name of the venue: " +response.data[0].venue.name);
      console.log("Venue location: " +response.data[0].venue.region);
      console.log("Date of the Event: " +moment(response.data[0].datetime).format("MM/DD/YYYY"));
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
}

function displaySong(song) {
    console.log(song);

    spotify
    .request("https://api.spotify.com/v1/search?q="+song+"&type=track")
    .then(function(response) {
      //console.log(response);
      console.log("Artist(s): "+response.tracks.items[0].album.artists[0].name); 
      console.log("Song Name: "+song);
      console.log("Preview Link: "+response.tracks.items[0].href);
      console.log("Album: "+response.tracks.items[0].album.name);
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    })
}

function run(option, input) {
switch(option) {
    case "concert-this":
    bands(input);
    break;

    case "spotify-this-song":
    displaySong(input);
    break;

//  case "movie-this":
//  break;

//  case "do-what-it-says":
//  break;
    
    default:
        console.log("Command not found");
}
}

run(option, input);
