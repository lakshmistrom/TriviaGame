// trivia api: https://opentdb.com
var queryUrl = "https://opentdb.com/api.php?amount=1";

//represents access to api objects
var access;

//data from the api
//category
var category;

//question
var question;

//question count
var countQuestion = 0;

//correct answer
var correctAnswer;

//correct count
var countRightAnswers = 0;

//wrong answers
var wrongAnswers;

//wrong count
var countWrongAnswers = 0;

//unanswered count
var countUnansweredAnswers = 0;

//list of answers
var answers = [];

//random chosen answer
var randomAnswer;

//current answer
var currentAnswer

//  Variable that will hold the setInterval that runs the countdown
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

//requests data from the api
function getQuestion() {
    return $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
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
        answers = [];

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

        //empty questions
        $("#question-options").empty();

        //iterate over answers
        for (var i = 0; i < answers.length; i++) {
            //show answers in html
            $("#question-options").append("<li class=\"list-group-item bg-dark text-white answer\" onmouseover=\"mouseOver(this)\" onmouseout=\"mouseOut(this)\">" + `${answers[i]}` + " <i class=\"fas fa-angle-left text-secondary\"></i></li>");
        }

        //remove click handler
        $(".answer").off("click");

        //handles choosing the answer
        $(".answer").click(function () {
            //initialize value of the question from the current element
            currentAnswer = $(this).text().trim();

            //let the user know they chose the right answer
            if (currentAnswer === correctAnswer) {
                //sets the right answer check mark
                $(this).find(".fa-angle-left").addClass("fa-check text-success").removeClass("fa-angle-left text-white");

                //set the wrong answer x's
                $("#question-options").find(".fa-angle-left").addClass("fa-times text-danger").removeClass("fa-angle-left text-white");

                //stops countdown
                countdown.stop();

                //delaying showing the answer to the user and initialize the game again
                setTimeout(initGame, 2000);

                //keep track of every correctly answered question
                countRightAnswers++;

                //keep track of number of questions answered
                countQuestion++;

                //update the html with number of right answers
                $("#countCorrectAnswers").text(countRightAnswers);
                console.log("right answer: " + countRightAnswers);
            } else {
                //let the user know they chose the wrong answer
                //show the right and wrong answers
                rightAndWrong();

                //stops countdown
                countdown.stop();

                //delaying showing the answer to the user and initialize the game again
                setTimeout(initGame, 2000);

                //keep track of every uncorrectly answered question
                countWrongAnswers++;

                //keep track of number of questions answered
                countQuestion++;

                //update the html with number of wrong answers
                $("#countIncorrectAnswers").text(countWrongAnswers);
                console.log("wrong answer: " + countWrongAnswers);
            }
        });
    });
};
// coundown object
var countdown = {
    //countdown time initialized
    time: 59,

    //resets countdown
    reset: function () {
        //resets countdown time
        countdown.time = 59;

        //change the html to read the current countdown time
        $("#countDown").text("59");

    },
    //starts the countdown
    start: function () {
        // use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            //start countdown
            intervalId = setInterval(countdown.count, 1000);

            //the countdown has started
            clockRunning = true;
        }
    },
    //stops countdown
    stop: function () {
        // use clearInterval to stop the count here and set the clock to not be running.
        //reset interval
        clearInterval(intervalId);

        //stop the countdown
        clockRunning = false;
    },
    //keep track of the countdown
    count: function () {
        // decrease time by 1
        countdown.time--;

        // update html with the current countdown
        $("#countDown").text(countdown.time);

        //if count <= 0 then the countdown has reached the end, show the right/wrong answers and restart the timer
        if (countdown.time <= 0) {
            //stop countdown
            countdown.stop();

            //display the right and wrong answers
            rightAndWrong();

            //delaying showing the answer to the user and initialize the game again
            setTimeout(initGame, 2000);

            //keep track of the unanswered questions
            countUnansweredAnswers++;

            //keep track of number of questions answered
            countQuestion++;

            //update html with number of unanswered questions
            $("#countUnansweredAnswers").text(countUnansweredAnswers);
            console.log("unaswered: " + countUnansweredAnswers);
        }
    }
};

//remove click handler
$("#startBtn").off("click");

//initiate the game after clicking the start button
$("#startBtn").click(initGame);

//initialize the game
function initGame() {
    //loads question
    getQuestion().done(function () {
        //show restart button
        $("#game").removeClass("invisible");
        $("#startBtn").addClass("invisible");

        //if number of questions has reached 8 display that you are done
        if (countQuestion === 8) {
            //show results
            $("#overallResults").removeClass("invisible");

            //hide questions
            $("#timerAndQuestion").addClass("d-none");

            //remove click handler
            $("#startOver").off("click");

            //starover
            $("#startOver").click(function () {
                //reset count question
                countQuestion = 0;

                //reset right answer count
                countRightAnswers = 0;

                //reset wrong answer count
                countWrongAnswers = 0;

                //reset unanswered answers
                countUnansweredAnswers = 0;

                //hide results
                $("#overallResults").addClass("invisible");

                //unhide questions
                $("#timerAndQuestion").removeClass("d-none");

                //start the game again
                initGame();
            });
        } else {
            //handles countdown
            countdown.reset();
            countdown.start();
        }
    });
}
//displays the wrong and right answers
function rightAndWrong() {
    //reads each answer
    $("#question-options").find(".list-group-item").each(function (index, element) {
        //initializes the current answer
        currentAnswer = $(element).text().trim();

        //set the right answer with green check marks
        if (currentAnswer === correctAnswer) {
            $(this).find(".fa-angle-left").addClass("fa-check text-success").removeClass("fa-angle-left text-white");
        } else {
            //set the wrong answer with red x's
            $(this).find(".fa-angle-left").addClass("fa-times text-danger").removeClass("fa-angle-left text-white");
        }
        //console.log(element);
    });
}
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