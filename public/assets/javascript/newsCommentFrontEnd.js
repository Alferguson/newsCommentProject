function findArticles() {
	// $("#news").empty();
	$.ajax({
		method: "GET",
		url: "/all/news"
	}).done(function(data) {
		console.log(data);
	  	for (var i = 0; i < data.length; i++) {
	    	$("#news").append("<p>Title: " + 
	    		data[i].title + "<br/>Summary: " + 
	    		data[i].summary + "<br/> Link to Article: <a href='" + 
	    		data[i].articleLink + 
	    		"'>Here's the linkydodah</a>" +  
	    		" " +
	    		"<button data-id='" + 
	    		data[i]._id +
	    		"' id='save-this-article'>save this article</button></p>");
	  	}
	});
};

$(document).ready(function() {	
	findArticles();
});
$(document).on("click", "#find-new-articles", function(event) {
	event.preventDefault();
	function scrape() {
		$.getJSON("/scrape")
			.done(function(scrape) {
				location.reload();
				// findArticles();
			})
	}
	// to display news articles
	scrape();
});
$(document).on("click", "#save-this-article", function(event) {
	event.preventDefault();
	var id = $(this).attr("data-id");
	console.log(id);
	$.ajax({
		method: "PUT",
		url: "/save-article/" + id,
	}).done(function() {
		location.reload();    		
	});
});

