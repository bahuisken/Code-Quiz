
var secondsLeft = 0;
var currentQuestion = 0;
var timeEl = document.querySelector("#time");
var startQuizBtn = document.querySelector("#start-quiz-btn");
var quizContainer = document.querySelector("#quiz-container");
var quizIntro = document.querySelector("#quiz-intro");
var quizQuestion = document.querySelector("#quiz-question");
var quizAnswers = document.querySelector("#quiz-answers");
var quizAnswerA = document.querySelector("#answer-a");
var quizAnswerB = document.querySelector("#answer-b");
var quizAnswerC = document.querySelector("#answer-c");
var quizAnswerD = document.querySelector("#answer-d");
var quizAnswer = document.querySelectorAll(".answer");
var questionResult = document.querySelector("#question-result");
var quizEnd = document.querySelector("#quiz-end");
var timeFinal = document.querySelector("#final-time");
var initialsText = document.querySelector("#initials-text");
var submitInitials = document.querySelector("#submit-initials");
var highScores = [];

function init() {
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores !== null) {
        highScores = storedScores;
    }
}
//Start Button action
startQuizBtn.addEventListener("click", function () {
    console.log("Start me up")
    quizContainer.setAttribute("style", "display:block;");
    quizIntro.setAttribute("style", "display:none;");
    secondsLeft = 75;
    startQuiz();
});

function startQuiz() {
    startTimer()
    quizQuestion.textContent = quizQuestions[currentQuestion].question;
    quizAnswerA.innerHTML = quizQuestions[currentQuestion].answers.a;
    quizAnswerB.innerHTML = quizQuestions[currentQuestion].answers.b;
    quizAnswerC.innerHTML = quizQuestions[currentQuestion].answers.c;
    quizAnswerD.innerHTML = quizQuestions[currentQuestion].answers.d;
};

function startTimer() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (currentQuestion === quizQuestions.length || secondsLeft === 0) {
            console.log("GameOver");
            clearInterval(timerInterval);
            gameOver();
        }

    }, 1000);
}

var answerClick = function () {
    console.log(this.textContent + "\n" + quizQuestions[currentQuestion].correctAnswer);
    this.blur()
    if (this.textContent === quizQuestions[currentQuestion].correctAnswer) {
        console.log("correct");
        questionResult.textContent = "✅"
        nextQuestion();
    } else {
        secondsLeft -= 10;
        console.log("incorrect");
        questionResult.textContent = "❌"
        nextQuestion();
    }
};

for (var i = 0; i < quizAnswer.length; i++) {
    quizAnswer[i].addEventListener("click", answerClick, false);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion === quizQuestions.length) {
        console.log("Game Over");
        gameOver();
    } else {
        quizQuestion.textContent = quizQuestions[currentQuestion].question;
        quizAnswerA.innerHTML = quizQuestions[currentQuestion].answers.a;
        quizAnswerB.innerHTML = quizQuestions[currentQuestion].answers.b;
        quizAnswerC.innerHTML = quizQuestions[currentQuestion].answers.c;
        quizAnswerD.innerHTML = quizQuestions[currentQuestion].answers.d;
    }
};

function gameOver() {
    quizContainer.setAttribute("style", "display:none;");
    quizEnd.setAttribute("style", "display:block;");
    timeFinal.textContent = secondsLeft;
}

submitInitials.addEventListener("click", function () {
    event.preventDefault();
    if (!initialsText.value) {
        initialsText.setAttribute("style", "border: 2px solid #FF0000");
        return
    }
    // create user object from submission
    var user = {
        user: initialsText.value.trim(),
        score: secondsLeft
    };
    highScores.push(user);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
})

init();