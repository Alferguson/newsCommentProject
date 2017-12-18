$(document).ready(function() {
	function findSavedArticles() {
		$.getJSON("/all/news", function(data) {
		  	for (let i = 0; i < data.length; i++) {	
		  		if (data[i].saved) {
		    		$("#saved-articles").append("<p data-id='" + 
		    			data[i]._id + 
		    			"'>" + 
		    			data[i].title + 
		    			"<br/>" + 
		    			data[i].summary + 
		    			"<br/>" + 
		    			data[i].articleLink + 
		    			" " +
		    			"<button data-id='" + data[i]._id + "' id='comment-on-article'>leave a comment here</button>" +
		    			"<button data-id='" + data[i]._id + "' id='delete-saved-article'>delete this saved article</button></p>");
		  		}
		  	}
		});
	};
	findSavedArticles();
});

$(document).on("click", "#comment-on-article", function(event) {
	event.preventDefault();
	$("#comments").empty();
	var id = $(this).attr("data-id");
	$.getJSON("/all/news/" + id, function(data) {
		console.log(data);
      	$("#comments").append("<p id='display-comments'></p>");
      	$("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      	$("#comments").append("<button data-id='" + id + "' id='saveComment'>Save Comment</button>");
      	$("#comments").append("<button data-id='" + id + "' id='deleteComments'>Delete Comments</button>");
      	if (data) {
	      	data.forEach(function(comment) {
	      		console.log(comment);
	      		$("#display-comments").append(comment.body);
	      		$("#display-comments").append("<br>");
	      	})
	    }  	
	});
});

$(document).on("click", "#saveComment", function(event) {
	// function to save a new comment on saved articles
	event.preventDefault();
	var thisId = $(this).attr("data-id");

  	// Run a POST request to change the note, using what's entered in the inputs
  	$.ajax({
	    method: "PUT",
	    url: "/saveComment/" + thisId,
	    data: {
	      	body: $("#bodyinput").val(),
	      	id: thisId
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

$(document).on("click", "#deleteComments", function(event) {
	// function to delete a comment on saved articles
	event.preventDefault();
	var thisId = $(this).attr("data-id");
  	// Run a POST request to change the note, using what's entered in the inputs
  	$.ajax({
	    method: "DELETE",
	    url: "/deleteComment/" + thisId,
  	})
    .done(function(data) {
      	// Log the response
      	console.log(data);
      	// Empty the notes section
      	$("#comments").empty();
	});
	$("#bodyinput").val("");
});

$(document).on("click", "#delete-saved-article", function(event) {
	var thisId = $(this).attr("data-id");
	$.ajax({
		method: "PUT",
		url: "/unsave-article/" + thisId
	}).done(function() {
		console.log("It has been unsaved");
		location.reload();
	});
});