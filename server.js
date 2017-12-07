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
var savedRoutes = require("./controllers/saved_controller");
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
// app.use("/", savedRoutes);
// app.use("/", htmlRoutes);

app.listen(3000, function() {
  	console.log("App running on port 3000!");
});