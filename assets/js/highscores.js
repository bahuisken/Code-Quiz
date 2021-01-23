var storedScores = JSON.parse(localStorage.getItem("highScores"));
var scoresList = document.querySelector("#scores-list");
var clearScores = document.querySelector("#clear-scores");

function renderScores() {
    scoresList.innerHTML = "";
    if (storedScores) {
        storedScores.sort(function (a, b) {
            return b.score - a.score;
        });
        for (var i = 0; i < storedScores.length; i++) {
            console.log(storedScores[i].user)
            var li = document.createElement("li");
            li.textContent = i + 1 + ". " + storedScores[i].user + " " + storedScores[i].score;
            li.setAttribute("data-index", i, "class", "text-left list-group-item");
            scoresList.appendChild(li);
        }
    }
}

renderScores()

clearScores.addEventListener("click", function () {
    scoresList.innerHTML = ""
    this.blur();
    localStorage.clear();

})
