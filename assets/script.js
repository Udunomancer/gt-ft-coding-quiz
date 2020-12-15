// ===DOM VARIABLES===
var quizPane = document.getElementById("quiz-pane");

// ===JAVASCRIPT VARIABLES===
// Variable to store all questions/responses/answers.  ARRAY of OBJECTS
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
// Variable to store current question #
var questionNum = 0;
// Variable to store quiz time
var quizTime = 0;
// Variable to store scores
var scores = [];

function init() {
  //Function to initialize page on load.  Creates and adds page content.
  //Input: None
  //Output: None

  //Create, add content, and add header to quiz-pane
  var heading = document.createElement("h1");
  heading.textContent = "Coding Quiz Challenge";
  quizPane.appendChild(heading);

  //Create, add content, and add text to quiz-pane
  var text = document.createElement("p");
  text.textContent =
    "Try to answer the following code related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  quizPane.appendChild(text);

  //Create, add content, and add start button to quiz-pane
  var startButton = document.createElement("button");  
  startButton.textContent = "Start Quiz";
  startButton.setAttribute("id", "start-btn");
  startButton.setAttribute("class", "btn btn-primary");  
  quizPane.appendChild(startButton);
}

function btnClick() {
  //Router function for button clicks.  Identifies clicked button id and routes accordingly.
  //Input: none
  //Output: none
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
            clearQuizPane();
            init();
            break;
        case "clear-btn":
            console.log("Clear Highscores");
            break;
    }
  }
}

function clearQuizPane() {
  //Function to clear quiz pane for new content
  //Input: none
  //Output: none
  quizPane.textContent = "";
}

function populateQuestion(next) {
  //Function to populate quiz pane with question elements
  //Input: (boolean) False if initiated from start button, True if initiated from a question response
  //Output: none
    
  //Create, add content, and add header to quiz-pane
  var heading = document.createElement("h2");
  heading.textContent = questionPanel[questionNum].question;
  quizPane.appendChild(heading);

  //For loop to create, add content, and add question response buttons to quiz-pane
  for (var i = 0; i < questionPanel[questionNum].responses.length; i++) {
        
    var responseBtn = document.createElement("button");
    responseBtn.textContent = (i + 1) + ". " + questionPanel[questionNum].responses[i].response;
    responseBtn.setAttribute("id", i);
    responseBtn.setAttribute("class", "btn btn-primary m-1");
    quizPane.appendChild(responseBtn);

    //Break to put each response button on a separate line
    quizPane.appendChild(document.createElement("br"));
  }

  //Show result of previous response (if applicable)
  if(next) {
    var previousAnswer = document.createElement("h4");
    if (questionPanel[questionNum - 1].answer) {
      previousAnswer.textContent = "Correct!";
    } else {
      previousAnswer.textContent = "Wrong!";
    }
    previousAnswer.setAttribute("class", "text-muted border-top mt-3");
    quizPane.appendChild(previousAnswer);
  }
}

function startTimer() {
  //Function to set the quiz timer and begin countdown
  //Input: none
  //Output: none
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
  //Function run when a question response is selected
  //Input: (string) ID of the selected answer
  //Output: none
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
  //Function to determine if selected answer is correct. Sets value of question answer key to true if match, and false if no match
  //Input: (string) ID of the selected answer
  //Output: none
    if (questionPanel[questionNum].responses[selection].status) {
        questionPanel[questionNum].answer = true;
    } else {
        questionPanel[questionNum].answer = false;
    }
}

function populateScoreScreen() {
  //Function to populate scorescreen
  //Input: none
  //Output: none
  //window.location.href='http://www.google.com/
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
