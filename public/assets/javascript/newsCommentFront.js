$(document.body).ready(function() {	
	var saveButton = $("button");
	// savedArticle is an object
	var savedArticle = {};

	function displayNews(newsCollection) {
	  	$("articles").empty();

	  newsCollection.forEach(function(news) {
	    $("#articles").append("<div class='container-fluid'><div class='row title'" + news.Title + "</div>" +
	                         "<div class='row imgLink'>" + news.imgLink + "</div>" +
	                         "<div class='row articleLink'>" + news.articleLink + "</div>" +
	                         "<div class='row saveButton'>" + saveButton + "</div></div>");
	  });
	};
	function scrape() {
		$.getJSON("/scrape", function(scrape) {
			console.log(scrape);
		})
	}

	// to display news articles
	$("#find-new-articles").on("click", function() {
		scrape();
		$.getJSON("/all/news", function(data) {
			displayNews(data);
		})
	});

	$(".save-this-article").on("click", function() {
		savedArticle = { 
			title: $(this).find("title").text(),
			imgLink: $(this).find("imgLink").text(),
			articleLink: $(this).find("articleLink").text(),
			comments: [];
		};

		$.ajax({
			method: "PUT",
			url: "/saved",
			data: savedArticle
		}).done(function() {
	    // set updating to false
		location.reload();    		
		});
	})
});
