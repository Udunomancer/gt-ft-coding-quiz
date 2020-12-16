// ===DOM VARIABLES===
var scorePane = document.getElementById("score-pane");
var clearBtn = document.getElementById("clear-btn");

// ===JAVASCRIPT VARIABLES===
var highScores = JSON.parse(localStorage.getItem("storedScoresLS"));

// ===FUNCTION DEFINITIONS===
function init() {
  //Function to run on page load to display high scores
  //Input: none
  //Output: none
  if (highScores) {
    for (var i = 0; i < highScores.length; i++) {
      var scoreEl = document.createElement("p");
      scoreEl.textContent =
        i + 1 + ". " + highScores[i].initials + " - " + highScores[i].score;
      scoreEl.setAttribute("class", "text-white rounded w-25 p-1");
      scoreEl.setAttribute("style", "background-color: #67ace7");
      scorePane.appendChild(scoreEl);
    }
  }
}

function clearHighScores() {
  //Function to clear high scores from JS Variables and local storage and clear currently displayed scores from page
  //Input: none
  //Output: none
  highScores = [];
  localStorage.removeItem("storedScoresLS");
  scorePane.textContent = "";
}

// ===FUNCTION CALLS===
init();

// ===EVENT LISTENERS===
clearBtn.addEventListener("click", function (event) {
  event.preventDefault();
  clearHighScores();
});
