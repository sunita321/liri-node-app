//write the code you need to grab the data from keys.js. Then store the keys in a variable.
/* Make it so liri.js can take in one of the following commands:

my-tweets
spotify-this-song
movie-this
do-what-it-says */

// Grabs the bands variables
var keys = require("./keys.js");

// Gets all of myBands bands from the bands file.
var keyList = keys.twitterKeys;

// Loop through band list and print out details
for (var key in keyList) 
{
  console.log(key + " " + keyList[key]);
}