$(document).ready(function () {
  var scorePane = document.getElementById("score-pane");
  var highScores = JSON.parse(localStorage.getItem("storedScoresLS"));

  for (var i = 0; i < highScores.length; i++) {
    var scoreEl = document.createElement("p");
    scoreEl.textContent =
      i + 1 + ". " + highScores[i].initials + " - " + highScores[i].score;
    scorePane.appendChild(scoreEl);
  }
});
