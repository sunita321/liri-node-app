//write the code you need to grab the data from keys.js. Then store the keys in a variable.
/* Make it so liri.js can take in one of the following commands:

my-tweets
spotify-this-song
movie-this
do-what-it-says */

// Load the fs package to read and write
var fs = require("fs");

fs.readFile("keys.js", "utf8", function(error, data) {

  // We will then print the contents of data
console.log(data);

  //Store the keys in a variable.
  var twitterKeys = data;

  // We will then re-display the content as an array for later use.
  console.log(twitterKeys);

});