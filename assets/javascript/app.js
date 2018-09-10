// https://opentdb.com/api.php?amount=10
var queryUrl = "https://opentdb.com/api.php?amount=10";
$.ajax({
    url: queryUrl,
    method: "GET",
}).then(function(response){
    console.log(response);
    //obtain reference to card text and load question
    console.log();
    //access questions from the api
    var access = response.results[0];
    //load question
    var question = access.question;
    //load correct answer
    var correctAnswer = access.correct_answer;
    //load wrong answers
    var wrongAnswers = access.incorrect_answers;
    //load category
    var category = access.category;
    
    //show question in html
    var qCategory = $("#category").html(`${category}`);
    var cardTextQuestion = $("#question").html(`${question}`);
    var answer  = $("#question-options").append("<li class=\"list-group-item bg-dark text-white\">" + `${correctAnswer}` + " <i class=\"fas fa-angle-left text-secondary\"></i></li>");
    for(var i = 0; i < wrongAnswers.length; i++){
        $("#question-options").append("<li class=\"list-group-item bg-dark text-white\">" + `${wrongAnswers[i]}` + " <i class=\"fas fa-angle-left text-secondary\"></i></li>");
    }
    
    // var question = cardText.text(response.question);
    console.log(question);
    console.log(question.correct_answer);
});