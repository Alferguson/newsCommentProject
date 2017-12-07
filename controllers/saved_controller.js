// // Dependencies
// var express = require("express");
// var mongojs = require("mongojs");
// var request = require("request");
// var cheerio = require("cheerio");
// var router = express.Router();

// // var app = express();

// // Database configuration
// var databaseUrl = "newsdb";
// var savedCollection = ["savedCollection"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, savedCollection);
// db.on("error", function(error) {
//   	console.log("Database Error:", error);
// });

// router.get("/saved", function(req, res) {
// 	db.savedCollection.find({}, function(err, get) {
// 		if (err) {
// 	      	console.log(err);
// 	    }
// 	    // Otherwise, send the result of this query to the browser
// 	    else {
// 	      	res.json(get);
// 	    }
// 	});
// });

// // add a comment 
// router.put("/saved", function(req, res) {
// 	db.savedCollection.update({title: req.body.title}, {$push: {comments: req.body.comment}}, function(err, commented) {
// 		if (err) {
// 	      	console.log(err);
// 	    }
// 	    // Otherwise, send the result of this query to the browser
// 	    else {
// 	      	res.json(commented);
// 	    }
// 	});
// });

// // delete a saved 
// router.delete("/saved", function(req, res) {
// 	db.savedCollection.remove({title: req.body.title}, function(err, deleted) {
// 		if (err) {
// 	      	console.log(err);
// 	    }
// 	    // Otherwise, send the result of this query to the browser
// 	    else {
// 	      	res.json(deleted);
// 	    }
// 	});
// });

// module.exports = router;