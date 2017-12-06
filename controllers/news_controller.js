// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

var app = express();

// Database configuration
var databaseUrl = "newsdb";
var newsCollection = ["newsCollection"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, newsCollection);
db.on("error", function(error) {
  	console.log("Database Error:", error);
});

// scrapes latest wsj articles
app.get("/all", function(req, res) {
	request("https://www.wsj.com/", function(error, response, html) {

		var $ = cheerio.load(html);
		var results = [];

		$("div.wsj-card").each(function(i, element) {

		  	var imgLink = $(element).children().children().children().attr("src");
		  	var articleLink = $(element).children().children().attr("href");
		  	var title = $(element).find("h3").find("a").text();
		  	if (articleLink && title) {
			  	db.newsCollection.insert({
			  		imgLink: imgLink, 
			  		articleLink: articleLink, 
			  		title: title
			  	},
			  	function(err, scraped) {
			  		if(err) {
			  			console.log(err);
			  		}
			  		else {
			  			console.log(scraped);
			  		}
			  	});
			};  	
		});
	});
	res.send("The scrape is done");
});

app.get("/all/news", function(req, res) {
	db.newsCollection.find({}, function(err, get) {
		if (err) {
	      	console.log(err);
	    }
	    // Otherwise, send the result of this query to the browser
	    else {
	      	res.json(get);
	    }
	});
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});