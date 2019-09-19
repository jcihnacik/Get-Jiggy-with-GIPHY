

var topics = ["foxtrot", "cha cha slide", "disco", "breakdance", "waltz", "macarena", "nae nae", "tango", "square dance", "salsa"];



function renderButtons() {
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gif-topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#button-container").append(a);
    }
}

renderButtons();


$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var newTopic = $("#user-input").val().trim();
    if (newTopic == "") {
        alert("Please specify which move you'd like to bust out on the floor!")
    } else {
        topics.push(newTopic)
        $("#button-container").empty();
        renderButtons();
    }
});


function getGIPHY() {
    $("#gifs-appear-here").empty();
    var queryTopic = $(this).attr("data-name");
    console.log(queryTopic);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryTopic + "&api_key=EVTOFSC74nifb3laQy7JCgO9eswgZ6WQ&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var topicImage = $("<img>");
                    topicImage.attr("src", animated);
                    topicImage.attr("data-still", still);
                    topicImage.attr("data-animate", animated);
                    topicImage.attr("class", "gif");
                    gifDiv.append(p);
                    gifDiv.append(topicImage);
                    $("#gifs-appear-here").append(gifDiv);
                }
            }
            $("#user-input").empty();

        })
};

$(".gif-topic").on("click", getGIPHY);

function startAndStop(){
    $(".gif").on("click", startAndStop())
}

$(document).on('click', '.gif', function () {
    console.log("startandstop called");
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillGIF = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", stillGIF);
        $(this).attr("data-state", "still");
    }
});




