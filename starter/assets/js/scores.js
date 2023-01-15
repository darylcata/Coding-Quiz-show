var viewHighScores = document.querySelector("#highscores");
var listOfHighScores = JSON.parse(localStorage.getItem("initials"));
var clearButton = document.querySelector("#clear");

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

