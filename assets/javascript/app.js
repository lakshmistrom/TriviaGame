// trivia api: https://opentdb.com
var queryUrl = "https://opentdb.com/api.php?amount=1";

//represents access to api objects
var access;

//data from the api
//category
var category;

//question
var question;

//correct answer
var correctAnswer;

//wrong answers
var wrongAnswers;

//list of answers
var answers = [];

//random chosen answer
var randomAnswer;

//current answer
var currentAnswer

//requests data from the api
$.ajax({
    url: queryUrl,
    method: "GET",
}).then(function (response) {
    console.log(response);
    //load data from the api to global variables

    //accesss all results
    access = response.results[0];
    //initialize category
    category = access.category;
    //initialize question
    question = access.question;
    //initialize correct answer
    correctAnswer = access.correct_answer;
    //initialize wrong answers
    wrongAnswers = access.incorrect_answers;
    //initialize answers array
    //add correct answer
    answers.push(correctAnswer);
    //add wrong answer
    answers = answers.concat(wrongAnswers);
    //shuffles the answers
    answers.sort(function () { return 0.5 - Math.random() });

    //show question category in html
    $("#category").html(`${category}`);

    //show question in html
    $("#question").html(`${question}`);

    //iterate over  answers
    for (var i = 0; i < answers.length; i++) {
        //show answers in html
        $("#question-options").append("<li class=\"list-group-item bg-dark text-white answer\" onmouseover=\"mouseOver(this)\" onmouseout=\"mouseOut(this)\">" + `${answers[i]}` + " <i class=\"fas fa-angle-left text-secondary\"></i></li>");

    }
    //remove click handler
    $(".answer").off("click");

    //handles choosing the answer
    $(".answer").click(function () {
        //console.log(this);
        //initialize value of the question from the current element
        currentAnswer = $(this).text().trim();

        //console.log(currentAnswer);
        //the user chooses a question
        //if the user chooses the right question let them know they chose the right answer,move onto the next question and restart the timer
        if (currentAnswer === correctAnswer) {
            //sets the right answer check mark
            $(this).find(".fa-angle-left").addClass("fa-check text-success").removeClass("fa-angle-left text-white");

            //set the wrong answer x's
            $("#question-options").find(".fa-angle-left").addClass("fa-times text-danger").removeClass("fa-angle-left text-white");
        } else {
            //the user chooses the wrong question let them know they chose the wrong answer, move onto the next question and restart the timer
            $("#question-options").find(".list-group-item").each(function(index, element){
                currentAnswer = $(element).text().trim();
                //set the right answer
                if (currentAnswer === correctAnswer) {
                    $(this).find(".fa-angle-left").addClass("fa-check text-success").removeClass("fa-angle-left text-white");
                } else {
                    //set the wrong answer x's
                    $("#question-options").find(".fa-angle-left").addClass("fa-times text-danger").removeClass("fa-angle-left text-white");
                }
                console.log(element);
            });

        }

        //if the there was no answer chosen move onto the next question and restart the timer
    });
});

//remove click handler
$("#startBtn").off("click");

//initiate the game
$("#startBtn").click(function () {
    //show restart button
    $("#game").removeClass("invisible");
    $("#startBtn").addClass("invisible")
});

//mouse over list of questions
function mouseOver(element) {
    //makes changes to the background color of the question when user places mouse over it
    $(element).addClass("bg-secondary").removeClass("bg-dark");
    //makes changes to the icons color next to the question when user places mouse over it
    $(element).find(".text-secondary").addClass("text-dark").removeClass("text-secondary");
}
//mouse over list of questions icons
function mouseOut(element) {
    //makes changes to the background color of the question when user removes mouse from it
    $(element).addClass("bg-dark").removeClass("bg-secondary");
    //makes changes to the icons color next to the question when user removes mouse from it
    $(element).find(".text-dark").addClass("text-secondary").removeClass("text-dark");
}