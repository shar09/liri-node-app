require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var option = process.argv[2];
var input = process.argv.slice(3).join(" ");
var fs = require("fs");

function displayBands(artist) {
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
    
    // if(option === "spotify-this-song" && input === undefined) {
    //     song = "The-Sign";
    //     run(option, "The-Sign");
    //  }
    // console.log(song);
    
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

function displayMovie(movie) {
    //console.log(movie);
    var queryUrl = "http://www.omdbapi.com/?t=" + movie+ "&y=&plot=short&tomatoes=true&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
          //console.log(response);  
          console.log("Title: " +response.data.Title);
          console.log("Release Year: " +response.data.Year);
          console.log("IMDB Rating: " +response.data.imdbRating);
          console.log("Rotten Tomatoes Rating: " +response.data.tomatoRating);
          console.log("Language: " +response.data.Language);
          console.log("Country: " +response.data.Country);
          console.log("Plot: " +response.data.Plot);
          console.log("Actors: " +response.data.Actors);
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

function display() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        //console.log(data);
        
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        run(dataArr[0], dataArr[1]);
        
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
      
    //    if(option === "spotify-this-song" && input === undefined) {
    //       run(option, dataArr[2]);
    //    }

    //    if(option === "movie-this" && input === undefined) {
    //     run(option, dataArr[3]);
    //    }

    });
      
}

function run(option, input) {
switch(option) {
    case "concert-this":
    displayBands(input);
    break;

    case "spotify-this-song":
    // if(option === "spotify-this-song" && input === undefined) {
    //     input = "The-Sign";
    //     displaySong("The-Sign");
    // break;
    //     }
    // else 
    displaySong(input);
    break;

    case "movie-this":
    displayMovie(input);
    break;

    case "do-what-it-says":
    display();
    break;
    
    default:
    console.log("Command not found");
}
}

run(option, input);
