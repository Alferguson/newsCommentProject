$(document.body).ready(function() {	

	var saveButton = $("button");
	// savedArticle is an object
	var savedArticle = {};

	function findArticles() {
		$.getJSON("/all/news", function(data) {
		  	for (var i = 0; i < data.length; i++) {
		    	$("#news").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br/>" + data[i].summary + "<br/>" + data[i].articleLink + " " + saveButton + "</p>");
		  	}
		});
	};
	findArticles();

	function scrape() {
		$.getJSON("/scrape", function(scrape) {
			console.log(scrape);
		})
	}

	// to display news articles
	$("#find-new-articles").on("click", function() {
		scrape();
		findArticles();
	});

	$(".save-this-article").on("click", function() {

		var id = $(this).data("id")
		$.ajax({
			method: "PUT",
			url: "/save-article/" + id,
		}).done(function() {
			location.reload();    		
		});
	})
});