var gifArray = ["A Clockwork Orange","Full Metal Jacket","2001: A Space Odyssey","The Shining","Eyes Wide Shut","Dr. Strangelove","Spartacus"];
var gifAnimations = [];
var gifStills = [];
var extraCounts = 0;


function displayExtraGifs(){

    extraCounts = extraCounts + 10;
    var Gif = $(this).attr("data-name");
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=soccer+' + Gif +  '&api_key=tJbS1XHGNapeI741lrud2BENgDuM7E76&limit=' + (10 + extraCounts) + '"';
    $.get(queryURL).then(function(parameter){
        var figureHold = "";

        for(var i = extraCounts; i < (parameter.data.length); i++){

            gifStills.push(parameter.data[i].images.fixed_height_still.url);
            figureHold = $('<figure class="figure mx-2 my-2">')
            figureHold.append('<img src=' + parameter.data[i].images.fixed_height_still.url + ' class="figure-img rounded generated-gif" width=300px clicked=0 gif-index="' + i + '">');
            figureHold.append('<figcaption class="figure-caption text-center">Rating: ' + parameter.data[i].rating + '</figcaption>');
            $("#content").append(figureHold);
            gifAnimations.push(parameter.data[i].images.fixed_height.url);
            figureHold = null;

        
        }


    });



}


function displayGifs(){

    extraCounts = 0;
    $("#content").empty();
    $("#add-more").empty();
    gifAnimations = [];
    gifStills = [];
    var aGif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=soccer+" + aGif +  "&api_key=tJbS1XHGNapeI741lrud2BENgDuM7E76&limit=10";

    $.get(queryURL).then(function(parameter){

        console.log(parameter);
        var figureHold ="";

        for(var i = 0; i < parameter.data.length; i++){
            
            gifStills.push(parameter.data[i].images.fixed_height_still.url);
            figureHold = $('<figure class="figure mx-2 my-2">')
            figureHold.append('<img src=' + parameter.data[i].images.fixed_height_still.url + ' class="figure-img rounded generated-gif" width=300px clicked=0 gif-index="' + i + '">');
            figureHold.append('<figcaption class="figure-caption text-center">Rating: ' + parameter.data[i].rating + '</figcaption>');
            $("#content").append(figureHold);
            gifAnimations.push(parameter.data[i].images.fixed_height.url);
            figureHold = null;
        }

        $("#add-more").append('<button type="button" class="btn btn-primary my-2" data-name=' + aGif + ' id="more-GIFs">See more GIFS</button>');


    });
}

function animateGif() {
    var index = $(this).attr("gif-index");
    if($(this).attr("clicked") === "0") {
        $(this).attr("clicked",1);
        $(this).attr("src", gifAnimations[index]);

    } else {

        $(this).attr("clicked",0);
        $(this).attr("src", gifStills[index]);

    }

    

}

function setButtons() {
    $("#da-buttons").empty();
    for(var i = 0; i < gifArray.length; i++){
        $("#da-buttons").append('<button type="button" class="btn btn-primary mx-2 my-2 player" data-name="' + gifArray[i] + '">'+ gifArray[i] + '</button>');
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();

    var gifAdd = $("#gif-input").val().trim();

    gifArray.push(gifAdd);

    setButtons();
});


$(document).on("click", ".player", displayGifs);
$(document).on("click", ".generated-gif", animateGif);
$(document).on("click", "#more-GIFs", displayExtraGifs);

setButtons();