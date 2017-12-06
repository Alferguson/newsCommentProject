// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();

// var app = express();

// Database configuration
var databaseUrl = "newsdb";
var newsCollection = ["newsCollection"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, newsCollection);
db.on("error", function(error) {
  	console.log("Database Error:", error);
});

// scrapes latest wsj articles
router.get("/scrape", function(req, res) {
	request("https://www.wsj.com/", function(error, response, html) {

		var $ = cheerio.load(html);
		var results = [];

		$("div.wsj-card").each(function(i, element) {

		  	var summary = $(element).find("p").find("span").text();
		  	var articleLink = $(element).children().children().attr("href");
		  	var title = $(element).find("h3").find("a").text();
		  	if (articleLink && title) {
		  		for (var i = 0; i< db.newsCollection.length; i++) {
		  			if (db.newsCollection[i].title == title) {
		  				return;
		  			}
		  		}
			  	db.newsCollection.insert({
			  		summary: summary, 
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

router.get("/all/news", function(req, res) {
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