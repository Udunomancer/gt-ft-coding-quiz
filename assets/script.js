var quizPane = document.getElementById("quiz-pane");

var questionPanel = [
  {
    question: "Commonly used data types DO NOT include:",
    responses: [
      { response: "strings", status: false },
      { response: "booleans", status: false },
      { response: "alerts", status: true },
      { response: "numbers", status: false },
    ], answer: ""
  }, {
    question: "The condition in an if / else statement is enclosed within ___.",
    responses: [
      { response: "quotes", status: false },
      { response: "curly brackets", status: false },
      { response: "parentheses", status: true },
      { response: "square brackets", status: false },
    ], answer: ""
  }, {
    question: "Arrays in JavaScript can be used to store ___.",
    responses: [
      { response: "numbers and strings", status: false },
      { response: "other arrays", status: false },
      { response: "booleans", status: false },
      { response: "all of the above", status: true },
    ], answer: ""
  }, {
    question: "String values must be enclosed within ___ when being assigned to variables.",
    responses: [
      { response: "commas", status: false },
      { response: "curly brackets", status: false },
      { response: "quotes", status: true },
      { response: "parentheses", status: false },
    ], answer: ""
  }, {
    question: "A very usefule tool used during development and debugging for printing content to the debugger is:",
    responses: [
      { response: "JavaScript", status: false },
      { response: "terminal / bash", status: false },
      { response: "for loops", status: false },
      { response: "console.log", status: true },
    ], answer: ""
  }
];
var questionNum = 0;
var quizTime = 0;
var scores = [];

function init() {
  var heading = document.createElement("h1");
  var text = document.createElement("p");
  var startButton = document.createElement("button");

  heading.textContent = "Coding Quiz Challenge";
  text.textContent =
    "Try to answer the following code related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  startButton.textContent = "Start Quiz";
  startButton.setAttribute("id", "start-btn");

  quizPane.appendChild(heading);
  quizPane.appendChild(text);
  quizPane.appendChild(startButton);
}

function btnClick() {
  if (event.target.matches("button")) {
    switch (event.target.id) {
        case "start-btn":
            clearQuizPane();
            populateQuestion(false);
            startTimer();
            break;
        case "0":
            responseButton(event.target.id);
            break;
        case "1":
            responseButton(event.target.id);
            break;
        case "2":
            responseButton(event.target.id);
            break;
        case "3":
            responseButton(event.target.id);
            break;
        case "initial-btn":
            submitHighScore();
            break;
        case "go-back-btn":
            console.log("Go Back");
            break;
        case "clear-btn":
            console.log("Clear Highscores");
            break;
    }
  }
}

function clearQuizPane() {
    quizPane.textContent = "";
}

function populateQuestion(next) {
    
    var heading = document.createElement("h2");
    heading.textContent = questionPanel[questionNum].question;
    quizPane.appendChild(heading);

    for (var i = 0; i < questionPanel[questionNum].responses.length; i++) {
        
        var responseBtn = document.createElement("button");
        responseBtn.setAttribute("id", i);
        responseBtn.textContent = (i + 1) + ". " + questionPanel[questionNum].responses[i].response;
        quizPane.appendChild(responseBtn);

        quizPane.appendChild(document.createElement("br"));
    }

    if(next) {
        var previousAnswer = document.createElement("h1");
        if (questionPanel[questionNum - 1].answer) {
            previousAnswer.textContent = "Correct!";
        } else {
            previousAnswer.textContent = "Wrong!";
        }
        quizPane.appendChild(previousAnswer);
    }
}

function startTimer() {
    quizTime = 10;
    var timerInterval = setInterval(function() {
        quizTime--;
        document.getElementById("timer").textContent = "Time Remaining: " + quizTime;

        if (quizTime === 0) {
          clearInterval(timerInterval);
          console.log("Game Over");
        }
    }, 1000);
}

function responseButton(selection) {
    evaluateAnswer(selection);
    questionNum++;
    clearQuizPane();
    if (questionNum < questionPanel.length) {
        populateQuestion(true);
    } else {
        populateScoreScreen();
    }
}

function evaluateAnswer(selection) {
    if (questionPanel[questionNum].responses[selection].status) {
        questionPanel[questionNum].answer = true;
    } else {
        questionPanel[questionNum].answer = false;
    }
}

function populateScoreScreen() {
    var heading = document.createElement("h2");
    heading.textContent = "All done!";
    quizPane.appendChild(heading);

    var score = 0;
    for (var i = 0; i < questionPanel.length; i++) {
        if (questionPanel[i].answer) {
            score++;
        }
    }
    
    var showScore = document.createElement("p");
    showScore.textContent = "Your final score is " + score + ".";
    quizPane.appendChild(showScore);

    var initialsSpan = document.createElement("span");
    initialsSpan.textContent = "Enter initials: ";
    quizPane.appendChild(initialsSpan);

    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    initialsSpan.appendChild(initialsInput);

    var initialsBtn = document.createElement("button");
    initialsBtn.setAttribute("id", "initial-btn");
    initialsBtn.textContent = "Submit";
    initialsSpan.appendChild(initialsBtn);

}

function submitHighScore() {
    clearQuizPane();

    var heading = document.createElement("h1");
    heading.textContent = "Highscores";
    quizPane.appendChild(heading);

    var span = document.createElement("span");
    quizPane.appendChild(span);

    var goBackBtn = document.createElement("button");
    goBackBtn.textContent = "Go Back";
    goBackBtn.setAttribute("id", "go-back-btn");
    span.appendChild(goBackBtn);

    var clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear Highscores";
    clearBtn.setAttribute("id", "clear-btn");
    span.appendChild(clearBtn);

    console.log("Yayyy!");
}

init();

quizPane.addEventListener("click", function (event) {
  event.preventDefault();
  btnClick(event);
});
