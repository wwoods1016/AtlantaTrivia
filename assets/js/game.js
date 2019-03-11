// List of trivia questions
const questions =
    [
        {
            question: "Which of these has the city NOT been officially named?",
            answers: ["Terminus", "Marthasville", "Greenville"],
            correct: "Greenville"
        },

        {
            question: "About how many streets have the name Peachtree in the name?",
            answers: ["0-19", "20-54", "55+"],
            correct: "55+"
        },
        {
            question: "What animal is the symbol of the city?",
            answers: ["Phoenix", "Falcon", "Hawk"],
            correct: "Phoenix"
        },
        {
            question: "Which of these cities was a previous capital of Georgia?",
            answers: ["Marietta", "Milledgeville", "Columbus"],
            correct: "Milledgeville"
        },
        {
            question: "It was once illegal to put an ice cream cone in your back pocket in Atlanta. True or False?",
            answers: ["True", "False", "You've got to be kidding me..."],
            correct: "True"
        },
        {
            question: "What is the name of the trail that allows a bicycle to go from Smyrna all the way into Alabama?",
            answers: ["The Beltline", "The Chief Ladiga Trail", "The Silver Comet Trail"],
            correct: "The Silver Comet Trail"
        },
        {
            question: "Georgia Tech is home to the greatest rout in the history of football. What was their final score against Yale?",
            answers: ["222-0", "121-7", "91-3"],
            correct: "222-0"
        },
        {
            question: "What year were the Olympics held in Atlanta?",
            answers: ["1992", "1988", "1996"],
            correct: "1996"
        },
        {
            question: "What famous Atlanta restaurant is older than Gone With The Wind?",
            answers: ["The Varsity", "Manuel's Tavern", "Pascal's Restaurant"],
            correct: "The Varsity"
        },
        {
            question: "Which of these teams really doesn't care for the Saints?",
            answers: ["Atlanta Hawks", "Atlanta Falcons", "Atlanta Braves"],
            correct: "Atlanta Falcons"
        }
    ]

$(document).ready(function () {

    // Game begins on click
    $("#start-button").on("click", game.startTimer);

});

let game = {

    timeRemaining: 60,

    // Begins countdown, hides start page and shows questions
    startTimer: function () {
        $("#timer").text("Time remaining: " + game.timeRemaining);
        setInterval(game.countdown, 1000);
        $("#start-page").hide();
        trivia.displayQuestions();
    },

    // Makes the timer count down by 1 second and stops it at 0
    countdown: function () {
        game.timeRemaining--;
        $("#timer").text("Time remaining: " + game.timeRemaining);
        if (game.timeRemaining === 0) {
            game.stopTimer();
            $("#timer").empty();
        }
    },

    // Checks answers when clock hits 0
    stopTimer: function () {
        clearInterval();
        trivia.checkAnswers();
    },

    // Shows results and hides questions
    showEndPage: function (totalCorrect, totalIncorrect, totalUnanswered) {
        $("#end-page").show();
        $("#questions-box").empty();
        $("#timer").empty();
        $("#timer").hide();
        $("#correct-answers").text("Correct: " + totalCorrect);
        $("#incorrect-answers").text("Incorrect: " + totalIncorrect);
        $("#unanswered").text("Skipped: " + totalUnanswered);
    }
}

let trivia = {

    // Gets questions from list, uses for loop to go through them and put them into divs with the ID of question
    displayQuestions: function () {
        let divContainer = $("#questions-box");
        let answerGroup = $(".form-check");
        divContainer.append('<h2>Answer the following questions:</h2>');

        for (let i = 0; i < questions.length; i++) {

            divContainer.append('<div id="question">' + questions[i].question + '</div>');

            let answer1 = questions[i].answers[0];
            let answer2 = questions[i].answers[1];
            let answer3 = questions[i].answers[2];

            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');
        }

        // Button to manually stop timer and runs stopTimer function
        let doneButton = '<button class="btn btn-light" id="done-button" type="submit">Done</button>';
        divContainer.append(doneButton);
        $("#done-button").on("click", game.stopTimer);
    },

    checkAnswers: function () {
        let correctAnswer;
        let userAnswer;
        let totalCorrect = 0;
        let totalIncorrect = 0;
        let totalUnanswered = 0;

        // For loop that checks answers and assigns them to the correct variable
        for (let i = 0; i < questions.length; i++) {
            correctAnswer = questions[i].correct;
            userAnswer = $('input[id=radio' + i + ']:checked + label').text();

            if (userAnswer === correctAnswer) {
                totalCorrect++;
            } else if (userAnswer === "") {
                totalUnanswered++;
            } else if (userAnswer !== correctAnswer) {
                {
                    totalIncorrect++;
                }
            }
        }

        // Shows totals
        game.showEndPage(totalCorrect, totalIncorrect, totalUnanswered);
    },
};