var fs = require("fs");
var twitterKeys = require("./keys.js");
var Twitter = require("twitter");

var params = {screen_name: 'edog231'};
var client = new Twitter({
	consumer_key: twitterKeys.consumer_key,
	consumer_secret: twitterKeys.consumer_secret,
	access_token_key: twitterKeys.access_token_key,
	access_token_secret: twitterKeys.access_token_secret,
});

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
console.log("twitterKeys: " + twitterKeys);

// T.get('search/tweets', params,searchedData);

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

var action = process.argv[2];
console.log("process argv: " + process.argv);
console.log("action: " + action);


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
	console.log("myTweets function");
}

function spotifySong() {
	console.log("spotifySong function");
}

function movieThis() {
	console.log("movieThis function");
}

function doWhatItSays() {
	console.log("doWhatItSays function");
}