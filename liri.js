var fs = require("fs");
var twitterKeys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var spotify = new Spotify({
  	id: '68fbdc7969b34b258faeeb45b8019904',
  	secret: '97ccb1eddd904979906b5132defc045d',
});


var params = {screen_name: 'edog231'};
var client = new Twitter({
	consumer_key: twitterKeys.consumer_key,
	consumer_secret: twitterKeys.consumer_secret,
	access_token_key: twitterKeys.access_token_key,
	access_token_secret: twitterKeys.access_token_secret,
});




var action = process.argv[2];

// console.log("process argv: " + process.argv);
// console.log("action: " + action);
// console.log("songName: " + songName);


switch(action) {
	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		spotifySong();
		break;

	case "movie-this": 
		movieThis();
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;
}

function myTweets() {
	// console.log("myTweets function");
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(error) {
			console.log(error);
		} else {
			var tweetArr = [];
			// console.log("tweets: " + tweets[2].text);
			// console.log("tweets Created at: " + tweets[2].created_at);
			for(var i = 0; i < tweets.length; i++) {
				tweetArr.push({
					"Latest Tweets: " : tweets[i].text,
					"Created at: " : tweets[i].created_at,				
				});
			}
			console.log(tweetArr);
		}
	 })

	// This is all for the Twit package. 
	// var Twit = require("twit");
	// var T = new Twit({
	// 	consumer_key: twitterKeys.consumer_key,
	// 	consumer_secret: twitterKeys.consumer_secret,
	// 	access_token: twitterKeys.access_token_key,
	// 	access_token_secret: twitterKeys.access_token_secret,
	// 	timeout_ms: 60*1000,
	// });

	// This posts to Twitter
	// client.post('statuses/update', {status: 'tweet from node using twitter npm package'}, function(err, data, response) {
	// 	console.log(data);
	// })

	client.get('search/tweets', { q: 'tweet from node using twitter npm package', count:20 }, function(err, data, response) {
		// console.log(data);
	})
	// console.log("twitterKeys: " + twitterKeys);

	
	function searchedData(err, data, response) {
		// console.log(data);
	}

	// console.log()
	// console.log(twitterKeys.consumer_key);

	// this does the same thing as console.log(twitterKeys);
	// fs.readFile("keys.js", "utf8", function(error, data) {
	// 	if(error) {
	// 		return console.log(error);
	// 	}

	// 	console.log(data);
	// });

}

function spotifySong(songName) {
	// console.log("spotifySong function");
	
	
	// console.log("songName: " + songName);
	// console.log("process.argv[2]: " + process.argv[2]);
	// console.log("process.argv[3]: " + process.argv[3]);


	// checks to see if 3rd command line argument is defined
	if (typeof process.argv[3] !== 'undefined' && process.argv[3]) {
		songName = process.argv[3];
	}




	// var songName = process.argv[3];
	if (typeof songName !== 'undefined' && songName) {
		if(process.argv[2] === "do-what-it-says") {
			// songName = process.argv[3];
		}
	} else {
			songName = "Ace of Base The Sign";
	}

	// console.log("songName2: " + songName);
	params = songName;
	// console.log("params: " + params);
	spotify.search(
		{
			type: "track",
			query: params
		},
		function(err, data) {
			// console.log("params2: " + params);
			if(err) {
				console.log(err);
				return;
			} else {
				var songInfo = data.tracks.items;
				// console.log("songinfo: " , songInfo);
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n";
						console.log(spotifyResults);
						// log(spotifyResults); // calling log function
					}
				}
			}
			// console.log("data: " + data);
			
			// console.log("data: " , data);
		}
	);

}

function movieThis() {
	// console.log("movieThis function");
	var movie = process.argv[3];
	if(movie === undefined) {
		movie = "Mr. Nobody";
	}
	var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
	console.log("movie: " + movie);

	request(queryURL, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				//console.log(movieObject); // Show the text in the terminal
				var movieResults =
				"Title: " + movieObject.Title+"\r\n"+
				"Year: " + movieObject.Year+"\r\n"+
				"Imdb Rating: " + movieObject.imdbRating+"\r\n"+
				"Country: " + movieObject.Country+"\r\n"+
				"Language: " + movieObject.Language+"\r\n"+
				"Plot: " + movieObject.Plot+"\r\n"+
				"Actors: " + movieObject.Actors+"\r\n"+
				"Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
				"Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n";
				console.log(movieResults);
				// log(movieResults); // calling log function
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
}

function doWhatItSays() {
	// console.log("doWhatItSays function");
	fs.readFile("random.txt", "utf8", function(error, data) {
		if(!error) {
			var fileContents = data.split(",");
			// console.log("fileContents: " + fileContents);
			spotifySong(fileContents[1]);
		} else {
			console.log(error);
		}
	});
}