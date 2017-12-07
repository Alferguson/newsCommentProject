$(document.body).ready(function() {
	var deleteComment;
	var deleteSavedArticle;
	var commentArticleButton;

	function findSavedArticles() {
		$.getJSON("/all/news", function(data) {
		  	for (var i = 0; i < data.length; i++) {
		  		if (data[i].saved) {
		    		$("#news").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br/>" + data[i].summary + "<br/>" + data[i].articleLink + " " + saveButton + "</p>");
		  		}
		  	}
		});
	};
	findSavedArticles();

	function displayComments(data) {
		// modal trigger here and append buttons too
	}

	var commentArticle = {};
	var updating = false;

	$(".comment-on-article").on('click', function(event) {
		event.preventDefault();
		$("#comments").empty();
		var id = $(this).attr("data-id");
		$.getJSON("/all/news/" + id, function(data) {
			console.log(data);
		      $("#comments").append("<h2>" + data.title + "</h2>");
		      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
		      $("#comments").append("<button data-id='" + data._id + "' id='saveComment'>Save Comment</button>");

		      if (data.comment) {
		        $("#bodyinput").val(data.comment.body);
		    }
		});
	});

	// function to save a new comment on saved articles
	$("#saveComment").on("click", function() {
		var thisId = $(this).attr("data-id");

	  	// Run a POST request to change the note, using what's entered in the inputs
	  	$.ajax({
		    method: "POST",
		    url: "/articles/" + thisId,
		    data: {
		      body: $("#bodyinput").val()
	    	}
	  	})
	    .done(function(data) {
	      	// Log the response
	      	console.log(data);
	      	// Empty the notes section
	      	$("#comments").empty();
    	});
		$("#bodyinput").val("");
	});


	$(".delete-saved-article").on("click", function() {
		title = $(this).attr("title").text(),
		$.ajax({
			method: "DELETE",
			url: "/saved"
		}).done(function() {
			console.log("It has been deleted");
		});
	});
});	
