//After DOM loaded, check if we have savedList
//Set the savedList if we do
$(document).ready(function() {
    if(localStorage["savedList"]) {
    	var list = JSON.parse(localStorage["savedList"]);
        if(list !== null) {
            $("#saveList").html(list);
        }
    }
});

//Handle enter key on search box
function keyPress(e) {
	if(e.keyCode === 13) {
		this.getTweets();
	}
}

//Function to send the API request to get tweets
function getTweets() {
	//Make sure no scripts get triggered ;_;
	var queryString = $("#searchBox").val().trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
	if(queryString == null || queryString === "") {
		alert("Empty query");
	} else {
		//As per requirement, encode the query string
		//This or encodeURIComponent need to decide later
		queryString = encodeURIComponent(queryString);
		//Second requirement of 1000 chars (before or after encoding? not sure)
		if(queryString.length > 1000) {
			alert("Query too long!");
		} else {
			console.log(queryString);
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "http://tweetsaver.herokuapp.com/?q="+queryString+"&callback=logTweets&count=10"
			});
		}
	}

}

//Helper function to show the tweets (for now)
function logTweets(json) {
	//Check if we already have a list (means we searched before)
	//Clear it out if we have
	if($('#searchList#nestList').length) {
		$('#searchList#nestList').empty();
	}

	//Temp list that we will push later (better for performance ::apparently::)
	//Rather than adding each tweet one by one
	var tweetList = '<div class="nestList">';
	if(json.tweets.length === 0) {
		alert('Your search returned nothing :(');
	} else {
		$.each(json.tweets, function(key, tweet) {
			console.log(tweet);

			//Get attributes for the tweet that we will
			//style and show
			var textBody = tweet.text;
			var createdAt = new Date(tweet.createdAt);
			var name = tweet.user.name;
			var handle = tweet.user.screenName;
			var profilePic = tweet.user.biggerProfileImageURLHttps;

			//Template for each tweet
			var style = "<div class='tweeterPic'><img src=" + profilePic + "/></div>" +
						"<h4 class='tweetName'>" + name + "</h4>" +
						"<h6 class='tweetHandle'>" + "@" + handle + "</h6>" +
						"<h6 class='tweetTime'>" + moment(createdAt).calendar() + "</h6>" +
						"<p class='tweetBody'>" + textBody + "</p>" +
						"<p class='removeButton' onclick='remove(this)'>X</p>";

			tweetList += "<li>" + style + "</li>";
		});
	}
	tweetList += '</div>';
	//Add our list to our div
	$('#searchList').html(tweetList);

	//Make the tweet list drag n droppable
    $( "#searchList li" ).draggable({ revert: "invalid" }); 
    $( "#saveList" ).droppable({
	    drop: function(ev, ui) {
	        $(ui.draggable)
	        .draggable({disabled: true})
	        .detach()
	        .css({
	        	top: 0,
	        	left: 0
	        }).appendTo(this);
	        //Save the current list that just got updated to localStorage
	        localStorage["savedList"] = JSON.stringify($("#saveList").html());
	    }
	});
}

//Remove the element, and re-save what is currently in list
function remove(el) {
	$(el).parent().remove();
	localStorage["savedList"] = JSON.stringify($("#saveList").html());
}





