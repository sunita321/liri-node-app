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

	case "spotify-this-song":
    getSpotify();
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

function getSpotify()
{
	var spotify = require('spotify');
 
spotify.search({ type: 'track', query: 'bangarang' }, function(err, data) {
    
    if ( err ) 
    {
        console.log('Error occurred: ' + err);
        return;
    }
 
    else
    {
    	for (var i = 0; i < data.tracks.items[0].artists.length; i++)
    	{
    		console.log(data.tracks.items[0].artists[i].name);

    	}
    		
    		console.log(data.tracks.items[0].preview_url);

    	// Do something with 'data' 
    }
});
}
