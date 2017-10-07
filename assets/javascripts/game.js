var oldGifs = ['lion','cat','dog','shark','dolphin','mouse','snake','deer','racoon','walmart'];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function display() {

        var person = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
        	console.log(results)
          	for (var i = 0; i < results.length; i++) {
              // var gifDiv = $("<div class='item'>");
              var personImage = $("<img>");
              personImage.attr("src", results[i].images.fixed_height_still.url);
              personImage.attr('data-still',results[i].images.fixed_height_still.url);
              personImage.attr('data-animate',results[i].images.fixed_height.url);
              personImage.attr('data-state','still');
              personImage.addClass('gifing');
              $("#gifs-appear-here").prepend(personImage);
	          }
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < oldGifs.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("gif");
          // Adding a data-attribute
          a.attr("data-name", oldGifs[i]);
          // Providing the initial button text
          a.text(oldGifs[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
      function animating(){
      	console.log(123)
      	var state = $(this).attr("data-state");
      	if (state === "still") {
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
	      } else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
	      }
      }
      // This function handles events where a movie button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newGif = $("#gif-input").val().trim();

        // Adding movie from the textbox to our array
        oldGifs.push(newGif);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".gif", display);
      $(document).on("click", ".gifing", animating);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();