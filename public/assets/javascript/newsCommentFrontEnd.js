$(document).ready(function() {	
	
	var saveButton = $("button");
	var savedArticle = {};

	function findArticles() {
		// $("#news").empty();
		$.ajax({
			method: "GET",
			url: "/all/news"
		}).done(function(data) {
			console.log(data);
		  	for (var i = 0; i < data.length; i++) {
		    	$("#news").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br/>" + data[i].summary + "<br/>" + data[i].articleLink + " " + saveButton + "</p>");
		  	}
		});
	};


	function scrape() {
		$.getJSON("/scrape")
			.done(function(scrape) {
				console.log("sdgsfgsdfg");
				console.log(scrape);
				console.log("heyo");
				findArticles();
			})
	}

	// to display news articles
	$("#find-new-articles").on("click", function(event) {
		event.preventDefault();
		scrape();
		// location.reload(); 
		// findArticles();
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
	findArticles();
});