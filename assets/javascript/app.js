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
        //show  answers in html
        $("#question-options").append("<li class=\"list-group-item bg-dark text-white\">" + `${answers[i]}` + " <i class=\"fas fa-angle-left text-secondary\"></i></li>");
    }
});