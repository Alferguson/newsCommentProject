// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var exphbs = require("express-handlebars");
var Handlebars = require('handlebars');
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var newsRoutes = require("./controllers/news_controller");
var htmlRoutes = require("./controllers/html_controller");

var app = express();

// Database configuration
var databaseUrl = "newsdb";
var newsCollection = ["newsCollection"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, newsCollection);
db.on("error", function(error) {
  	console.log("Database Error:", error);
});

app.use(express.static("public"));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", newsRoutes);
app.use("/", htmlRoutes);

// // scrapes latest wsj articles
// app.get("/scrape", function(req, res) {
// 	request("https://www.wsj.com/", function(error, response, html) {

// 		var $ = cheerio.load(html);
// 		var results = [];

// 		$("div.wsj-card").each(function(i, element) {

		  	// var summary = $(element).find("p").find("span").text();
// 		  	var articleLink = $(element).children().children().attr("href");
// 		  	var title = $(element).find("h3").find("a").text();
// 		  	if (articleLink && title) {
// 		  		// summary doesn't work
// 			  	db.newsCollection.insert({
// 			  		summary: summary, 
// 			  		articleLink: articleLink, 
// 			  		title: title
// 			  	},
// 			  	function(err, scraped) {
// 			  		if(err) {
// 			  			console.log(err);
// 			  		}
// 			  		else {
// 			  			console.log(scraped);
// 			  		}
// 			  	});
// 			};  	
// 		});
// 	});
// 	res.send("The scrape is done");
// });

// app.get("/all/news", function(req, res) {
// 	db.newsCollection.find({}, function(err, get) {
// 		if (err) {
// 	      	console.log(err);
// 	    }
// 	    // Otherwise, send the result of this query to the browser
// 	    else {
// 	      	res.json(get);
// 	    }
// 	});
// });


app.listen(3000, function() {
  	console.log("App running on port 3000!");
});