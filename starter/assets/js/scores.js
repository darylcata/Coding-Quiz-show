var viewHighScores = document.querySelector("#highscores");
var listOfHighScores = JSON.parse(localStorage.getItem("initials"));
var clearButton = document.querySelector("#clear");

// this is run once highscores.hmtl is called
// contains a for loop that displays the lists
//saved at local storage
function seeHighscores() {

    for (var i = 0; i < listOfHighScores.length; i++) {
        var createLi = document.createElement("li")
        createLi.textContent = (listOfHighScores[i].userInitials + " - " + listOfHighScores[i].score);
        viewHighScores.appendChild(createLi);
        console.log(listOfHighScores);
    }
}


// triggers to clear local storage when clear button is clicked
// also removes the textcontent on the li
clearButton.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear("intials");
    viewHighScores.textContent = "";
});


//triggers to see available highscores on local storage
seeHighscores();

