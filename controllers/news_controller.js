// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var router = express.Router();

var db = require("./models");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/News", {
  useMongoClient: true
});

// scrapes latest wsj articles
router.get("/scrape", function(req, res) {
	request("https://www.wsj.com/", function(error, response, html) {
		var newArticlesCounter = 0;
		var $ = cheerio.load(html);
		var results = [];
		var compare = [];
		$("div.wsj-card").each(function(i, element) {
			var repeatArticle = false;

		  	var summary = $(element).find("p").find("span").text();
		  	var articleLink = $(element).children().children().attr("href");
		  	var title = $(element).find("h3").find("a").text();
		  	if (articleLink && title) {
		  		db.News
		  			.find({title: title})
		  			.then(function(dbNews) {
				  		console.log("Not good");
			  		})
			  		.catch(function(err) {

			  		})
			  	};
			  	console.log(repeatArticle);
			  	if (!repeatArticle) {
			  		db.News.insert({
				  		summary: summary, 
				  		articleLink: articleLink, 
				  		title: title
				  	}, function(err, scraped) {
				  		if(err) {
				  			console.log(err);
				  		}
				  		else {
				  			// console.log(scraped);
				  		}
				  	}); 	
			  	}
			  	
		});
	}); 
	res.send("boofer");
	console.log("Scrape is done");
});

router.get("/all/news", function(req, res) {
	db.News.find({}, function(err, get) {
		if (err) {
	      	console.log(err);
	    }
	    else {
	      	res.json(get);
	    }
	});
});

// to get one news article when comments want to be seen
router.get("/all/news/:id", function(req, res) {
	db.News
	    .findOne({ _id: req.params.id }, {saved: true})
	    .populate("comment")
	    .then(function(dbNews) {
	      res.json(dbNews);
	    })
	    .catch(function(err) {
	      res.json(err);
	    });
});

// when user saves an article, it changes boolean to true
router.post("/save-article/:id", function(req, res) {
	// target id
  	News.savesFunc();

});

// when user unsaves an articles, it changes boolean to false
router.post("/unsave-article/:id", function(req, res) {

  	News.unSavesFunc();

});

// to add comments to an article
router.post("/saveComment/:id", function(req, res) {
  	db.Comments
	    .create(req.body)
	    .then(function(dbComments) {
	      return db.News.findOneAndUpdate({ _id: req.params.id }, { comment: dbComments._id }, { new: true });
	    })
	    .then(function(dbNews) {
	      res.json(dbNews);
	    })
	    .catch(function(err) {
	      res.json(err);
	    });
});

// to add comments to an article
router.post("/deleteComment/:id", function(req, res) {
  	db.Comments
	    .remove({ _id: req.params.id })
	    .then(function(dbComments) {
	      res.json(dbComments);
	    })
	    .catch(function(err) {
	      res.json(err);
	    });
});
module.exports = router;