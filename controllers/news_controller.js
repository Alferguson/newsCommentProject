// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

var app = express();

// Database configuration
var databaseUrl = "newsdb";
var collections = ["newscollection"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  	console.log("Database Error:", error);
});

// shows latest wsj articles
app.get("/api/news", function(req, res) {
	request("https://www.wsj.com/", function(error, response, html) {

		var $ = cheerio.load(html);
		var results = [];

		$("div.wsj-card").each(function(i, element) {

		  	var imgLink = $(element).children().children().children().attr("src");
		  	var articleLink = $(element).children().children().attr("href");
		  	var title = $(element).find("h3").find("a").text();

		  	db.collections.insert({imgLink: imgLink, articleLink: articleLink, title: title});
		});

		// After looping through each element found, log the results to the console
		console.log(results);
	});
	res.json("api/news");
});

app.get("/home", function(req, res) {
	db.collections.find({}, function(error, found) {
		res.json(found);
	})
});

app.get("/scrape", function(req, res) {


});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});