$(document.body).ready(function() {
	var deleteComment;
	var deleteSavedArticle;

	function displaySavedNews(newsCollection) {
	  $("articles").empty();

	  newsCollection.forEach(function(news) {
	    $("#saved-articles").append("<div class='container-fluid'><div class='row'" + news.Title + "</div>" +
	                         "<div class='row'>" + news.imgLink + "</div>" +
	                         "<div class='row'>" + news.articleLink + "</div>" +
	                         "<div class='row'>" + saveButton + "</div></div>");
	  });
	};

	// to display saved news articles with comments
	$.getJSON("/saved", function(data) {
		displaySavedNews(data);
	});

	var commentArticle = {};
	var updating = false;

	$(".comment-on-article").on('click', function(event) {
		event.preventDefault();
		// modal trigger here
	});

	// function to update previous comments on saved articles
	$("#submit-update").on("click", function() {
		title: $(this).find("title").text(),
		commentArticle.comment = $("#comment-form").val().trim();

		$.ajax({
			method: "PUT",
			url: "/saved",
			data: commentArticle
		}).done(function() {
			location.reload();    		
		});
	});


	$(".delete-saved-article").on("click", function() {
		$.ajax({
			method: "DELETE",
			url: "/saved"
		}).done(function() {
			console.log("It has been deleted");
		});
	});
});	
