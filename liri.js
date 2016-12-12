//write the code you need to grab the data from keys.js. Then store the keys in a variable.
/* Make it so liri.js can take in one of the following commands:

my-tweets
spotify-this-song
movie-this
do-what-it-says */

var action = process.argv[2];

switch (action) 
{
  case "my-tweets":
    getMyTweets();
    break;
}

function getMyTweets() 
{
	var Twitter = require('twitter');

	// Grabs the bands variables
	var keys = require("./keys.js");

	// Gets all of myBands bands from the bands file.
	var keyList = keys.twitterKeys;

	// Loop through band list and print out details
	/*for (var key in keyList) 
	{
		console.log(key + " " + keyList[key]);
	}*/

	var client = new Twitter(keyList);

	var params = {screen_name: 'Sunita_Girl'};
	client.get('statuses/user_timeline', params, processTweets);
}


function processTweets(error, tweets, response)
{
  if (!error) 
  {
  	for (var i = 0; i < 20; i++) 
  	{ 
  		console.log(tweets[i].text);
  	}
    
  }

  else 
  {
  	console.log("Server Error");
  }
}