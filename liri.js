var fs = require("fs");
var twitterKeys = require("./keys.js");

console.log(twitterKeys);
console.log(twitterKeys.consumer_key);
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