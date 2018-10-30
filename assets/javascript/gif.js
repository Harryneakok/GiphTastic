//Array to hold animal inputs
var animals = [];
var input = null;
var typedAnimal = null;

//listner for the button to get user input to query from giphy
$(".btn").on("click", function(e) {
    // prevent submit form default
    e.preventDefault();
    //Store user input into a variable to use later
    input = $(".form-control").val().trim();
    //check to see if input is stored
    console.log(input);
    // Push input to animals[]
    animals.push(input)
        //check to see if input gets pushed to animals[]
    console.log(animals);

    //call renderButtons function
    renderButtons();
});
$("#button-holder").on("click", ".animal-button", callIt);

function renderButtons() {
    //empty gif holder div
    $("#button-holder").empty();

    for (var i = 0; i < animals.length; i++) {
        var buttons = $("<button>");
        buttons.addClass("animal-button");
        buttons.attr('data-name', animals[i]);
        buttons.text(animals[i]);
        $("#button-holder").append(buttons);
        callIt();
    }
}


function callIt() {
    //Giphy API query address
    var queryURL = "http://api.giphy.com/v1/gifs/search?&q=" + $(this).attr('data-name') + "&api_key=W5lv3Bew9X7EQibnyv59zUNelNPhqdMl&limit=10";
    //Jquery AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        console.log(results);

        for (var j = 0; j < results.length; j++) {
            var animalGif = $("<img>");
            animalGif.attr("src", results[j].images.fixed_height.url);
            $("gif-holder").append(animalGif);
        }
    });
};