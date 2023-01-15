var questionsdiv = document.querySelector("#questions");
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");
var choices = document.querySelector("#choices");
var timeSpan = document.querySelector("#time");

// start game variables
var feedBackdiv = document.querySelector("#feedback");
var currentQuestionIndex = 0;
var timer = 5;
var timerPenalty = 5;
var countDownTimer;

//end game variables
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var userInput =  document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var newInitials;


function displayQuestions() {
    startScreen.setAttribute("class", "hide");
    questionsdiv.setAttribute("class", "show");
    timeSpan.textContent = timer;
    startTimer();
    getQuestions();
};

function getQuestions() {
    var currentQuestion = allQuestions[currentQuestionIndex];
    questionsdiv.children[1].textContent = currentQuestion.question;

    for (i = 0; i < currentQuestion.choices.length; i++) {
        var choice = document.createElement("button");
        choice.textContent = currentQuestion.choices[i];
        console.log(choice);
        choice.onclick = handleClick;
        choices.appendChild(choice);
    }
};


function handleClick() {
    var choice = this.textContent;
    var answer = allQuestions[currentQuestionIndex].answer;
    currentQuestionIndex++;
    if (choice === answer) {
        correctFeedback()
    } else {
        wrongFeedback();
        timer = timer - timerPenalty;
    }
    if (currentQuestionIndex < (allQuestions.length)) {
        getQuestions();

    } else {
        console.log("game over");
        endGame();
    }
}

//function to make timer go down a second
function startTimer () {
    countDownTimer = setInterval(function(){
        timer--;
        timeSpan.textContent = timer;
        if (timer === 0) {
            clearInterval(countDownTimer);
            timeSpan.textContent = timer;
            endGame();
        }
    },1000)
    return;
}



// two functions depending on feedback if answer was correct or wrong
function correctFeedback() {
    feedBackdiv.setAttribute("class", "feedback show");
    feedBackdiv.textContent = "Correct!"
    clearFeedback;
}

function wrongFeedback() {
    feedBackdiv.setAttribute("class", "feedback show");
    feedBackdiv.textContent = "Wrong!"
    clearFeedback;
}


//setting my clearfeedback with timeout
var clearFeedback = setTimeout(function removeFeedback() {
    feedBackdiv.setAttribute("class", "feedback hide");
    feedBackdiv.textContent = "";
}, 3000)


// this function takes the user to the end game page 
// where a message will show and user will input initials
function endGame(){
    endScreen.setAttribute("class", "show");
    questionsdiv.setAttribute("class", "hide");
    finalScore.textContent = timer;
}




//this submit button saves the user's initial to the local storage


submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    var newInitials = {
        userInitials: userInput.value.trim(),
        score: timer
}
    var endGameInitials = JSON.parse(localStorage.getItem("initials")|| "[]");

    endGameInitials.push(newInitials);

    console.log(endGameInitials);
    
    localStorage.setItem("initials", JSON.stringify(endGameInitials));

// and takes the page to the highscores page
    window.location.href = "./starter/highscores.html";
})

//this start the quiz when the start button is clicked
startButton.addEventListener("click", () => displayQuestions());