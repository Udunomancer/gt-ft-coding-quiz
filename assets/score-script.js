  // ===DOM VARIABLES===
  var scorePane = document.getElementById("score-pane");
  var clearBtn = document.getElementById("clear-btn");

  // ===JAVASCRIPT VARIABLES===
  var highScores = JSON.parse(localStorage.getItem("storedScoresLS"));
  
  // ===FUNCTION DEFINITIONS===
  function init() {
    for (var i = 0; i < highScores.length; i++) {
        var scoreEl = document.createElement("p");
        scoreEl.textContent =
        i + 1 + ". " + highScores[i].initials + " - " + highScores[i].score;
        scorePane.appendChild(scoreEl);
    }
  }

  // ===FUNCTION CALLS===
  init();

  // ===EVENT LISTENERS===
  clearBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Clear");
  });