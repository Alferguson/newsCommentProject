var express = require('express');
var db = require("../models");
var router = express.Router();

// default route for index
router.get("/", function(req, res) {
  	res.render("index");
});

router.get("/saves", function(req, res) {
  	res.render("saves");
});

module.exports = router;