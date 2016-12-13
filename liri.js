//write the code you need to grab the data from keys.js. Then store the keys in a variable.
/* Make it so liri.js can take in one of the following commands:

my-tweets
spotify-this-song
movie-this
do-what-it-says */
//npm packages

var Twitter = require('twitter');
var spotify = require('spotify');
var Request = require('request');
var fs = require('fs');

var action = process.argv[2];

var actionArgument = process.argv[3];

switch (action) 
{
  case "my-tweets":
    getMyTweets();
    break;

	case "spotify-this-song":
    getSpotify(actionArgument);
    break;

    case "movie-this":
    getMovie(actionArgument);
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;
    
}

function getMyTweets() 
{
	
	// Grabs the bands variables
	var keys = require("./keys.js");

	// Gets all of myBands bands from the bands file.
	var keyList = keys.twitterKeys;


	var client = new Twitter(keyList);

	var params = {screen_name: 'Sunita_Girl'};
	//client.get('statuses/user_timeline', params, processTweets);

	client.get('statuses/user_timeline', {count: 20, trim_user: false, exclude_replies: true, include_rts: false}, processTweets)
}


function processTweets(error, tweets, response)
{
  if (!error) 
  {
  	for (var i=0; i<tweets.length; i++) 
  		{
			console.log(tweets[i].created_at);
			console.log(tweets[i].text);
		}
    
  }

  else 
  {
  	console.log("Twitter Server Error " + error);
  }
}


function getSpotify(searchSong)
{

	var userSong = searchSong ? searchSong : 'The Sign Ace of Base';
 
	spotify.search({ type: 'track', query: userSong }, function(err, data) 
	{

	
		if (err) return console.log('Spotify Error: ' + err);

		// if the song is not found in the Spotify database, log that and exit the function
		if (data.tracks.items.length == 0) return (console.log('No results found!'));


		// log out the song details of index 0
		console.log('Artist Name: ' + data.tracks.items[0].artists[0].name);
		console.log('Song Name: ' + data.tracks.items[0].name);
		console.log('Preview Link: ' + data.tracks.items[0].preview_url);
		console.log('Album Title: ' + data.tracks.items[0].album.name);

	
	});

}

function getMovie(searchMovie) {


	
	// used ternary function 
	var userMovie = searchMovie ? searchMovie : 'Mr. Nobody';

	Request("http://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) 
	{

		// If the request is successful 
		if (!error && response.statusCode === 200) {


    		// Parse the returned data (body) and display movie info
    		console.log('Movie Title: ' + JSON.parse(body).Title);
    		console.log('Release Year: ' + JSON.parse(body).Year);
    		console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
    		console.log('Production Country: ' + JSON.parse(body).Country);
    		console.log('Language: ' + JSON.parse(body).Language);
    		console.log('Plot: ' + JSON.parse(body).Plot);
    		console.log('Actors/Actresses: ' + JSON.parse(body).Actors);
    		console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating);
    		console.log('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
  		}

	});


}

function doWhatItSays()
{
	//read file
	fs.readFile('random.txt', 'utf8', function(error, data)
	{
		if (error)
		return console.log('Read error: ' + error);

		//split dat to array
		var fileObject = data.split(',');

		var userFunction = fileObject[0];
		var userArgument = fileObject[1];

		switch (userFunction)
		{
			case 'my-tweets':
			userFunction = 'getMyTweets';
			break;

			case 'spotify-this-song':
			userFunction = 'getSpotify';
			break;

			case 'movie-this':
			userFunction = 'getMovie';
			break;

		}

		eval(userFunction)(userArgument);
	});
}

