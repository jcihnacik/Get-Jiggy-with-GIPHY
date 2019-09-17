

var topics = ["clowns", "balloons", "cake", "ice cream", "dancing", "feasting", "blow out candles", "musical chairs", "punchbowl", "pin the tail on the donkey",  "cheers",];



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


$("#add-topic").on("click", function(event){
    event.preventDefault();
    var newTopic = $("#user-input").val().trim();
  if(newTopic == ""){
   alert ("Please add something to the party!")
  } else 
    {topics.push(newTopic)
  $("#button-container").empty();
  renderButtons();
  buildQueryURL();}
    });

function buildQueryURL(){
  var queryTopic= $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/" + queryTopic + "?api_key=EVTOFSC74nifb3laQy7JCgO9eswgZ6WQ&limit=12";
   $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r") {
              // Creating a div for the gif
              var gifDiv = $("<div>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var topicImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
             topicImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(topicImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
     $("#user-input").empty();
  
   })};




