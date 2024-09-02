function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

var QuizUI = {
    displayNext: function() {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;
        for (var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2>Your score is " + quiz.score + " /5</h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },
    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        var totalQuestions = quiz.questions.length;
        document.getElementById('current').textContent = currentQuestionNumber;
        document.getElementById('total_qns').textContent = totalQuestions;
    }
};


var questions = [
    new Question("Which planet has the most nearest to the moon?", ["Jupiter", "Uranus", "Saturn", "Mars"], "Saturn"),
    new Question("Which is the largest animal in the World?", ["Elephant", "Blue Whale", "Giraffe", "Camel"], "Blue Whale"),
    new Question("How many days are there in a week?", ["7 days", "8 days", "9 days", "12 days"], "7 days"),
    new Question("How many hours are there in a day?", ["24 hr", "25 hrs", "23 hrs", "26 hrs"], "24 hr"),
    new Question("How many letters are there in the English alphabet?", ["26", "27", "28", "29"], "26"),
    new Question("Rainbow consists of how many colors?", ["7", "8", "9", "10"], "7")
];

var quiz = new Quiz(questions);

QuizUI.displayNext();
