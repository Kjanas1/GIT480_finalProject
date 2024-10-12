var questions = [];
var info = {};

function setQuizChoice() {
    if ((localStorage.getItem("quizChoice") == 0) || !(localStorage.getItem("quizChoice"))) {
        console.log("error");
        //load redirect function
    }
    else {
        sessionStorage.setItem("quizChoice", localStorage.getItem("quizChoice"));
        localStorage.setItem("quizChoice", 0);
        getQuizData();
    }
};

function getQuizData() {
    //retrieve JSON
    // endpoint address & variable
    let serverEndpoint = "https://8d2fa16d-4e87-4f8d-8a22-5a5beac16b80.mock.pstmn.io/quizData";
    let endpoint = `${serverEndpoint}`;

    // XMLHttp Resquest
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function (data) {
        if (this.status === 200) {
            loadQuiz(this.response);

        } else {
            // display an error message 
            // document.getElementById("facts").innerHTML = "<p>Our website encountered an issue retrieving today's Bearded Dragon Facts, but rest assured, Beared dragons are still great.</p>";
        }
    });

    // set the expected response type
    xhr.responseType = "json";

    // open a connection to the endpoint
    xhr.open("GET", endpoint);

    // send the request
    xhr.send();
};

//load the corresponding quiz from the JSON file
function loadQuiz(quizData) {
    console.log(quizData);
    if (sessionStorage.getItem("quizChoice") == 1) {
        info = quizData.quiz1.info;
        questions = quizData.quiz1.questions;
        app.start();
    }
    else if (sessionStorage.getItem("quizChoice") == 2) {
        info = quizData.quiz2.info;
        questions = quizData.quiz2.questions;
        app.start();
    }
    else if (sessionStorage.getItem("quizChoice") == 3) {
        info = quizData.quiz3.info;
        questions = quizData.quiz3.questions;
        app.start();
    }
    else if (sessionStorage.getItem("quizChoice") == 4) {
        let customQuizJson = JSON.parse(localStorage.getItem("customQuiz"));

        info = customQuizJson.info;
        questions = customQuizJson.questions;
        app.start();
    }
    else {
        console.log("error");
    }
}


let app = {
    start: function () {

        this.currPosition = 0;
        this.score = 0;

        let quizTitle = document.getElementById('quizTitle');
        quizTitle.textContent = info.title;

        let quizImgDiv = document.getElementById('quizImg');
        let quizImg = info.img;
        quizImgDiv.innerHTML= `<img src="${quizImg}">`

        let answerButtons = document.querySelectorAll('.ansButton');
        answerButtons.forEach(function (element, index) {
            element.addEventListener("click", function () {
                //check for correct answer
                this.checkAnswer(index);

            }.bind(this));
        }.bind(this)); //needed to pass context along to the object

        // display score
        this.updateStats();

        //show first question
        this.showQuestion(questions[this.currPosition]);
    },
    showQuestion: function (q) {

        //show question
        let questionDesc = document.getElementById("questionText")
        questionDesc.textContent = q.title;

        //show answers
        let answers = document.querySelectorAll('.ansButton');
        answers.forEach(function (element, index) {
            element.textContent = q.alternatives[index];
        })
    },
    checkAnswer: function (userSelected) {

        let currQuestion = questions[this.currPosition];

        if (currQuestion.correctAnswer == userSelected) {
            this.score++;
            this.showresult(true);
        }
        else {
            this.showresult(false);
        }

        //refresh stats
        this.updateStats();

        //increase position
        this.increasePosition();

        //if position > array length, then results screen.
        if (this.currPosition == questions.length) {
            console.log("quiz complete");
            this.completeQuiz(); // results screen?
        }
        else {
            //else, show next question
            this.showQuestion(questions[this.currPosition]);
        }

    },
    increasePosition: function () {
        this.currPosition++;
    },

    updateStats: function () {
        let scoreDiv = document.getElementById("score");
        scoreDiv.textContent = `Your Score: ${this.score}`;
    },

    showresult: function (isCorrect) {
        let resultDiv = document.getElementById("result");
        let result = "";

        //checks
        if (isCorrect) {
            result = "Correct Answer!";
        }
        else {
            //get current question
            let currQuestion = questions[this.currPosition];

            //get correct answer index
            let correctAnsIndex = currQuestion.correctAnswer;

            //get correct answer
            let correctAnsText = currQuestion.alternatives[correctAnsIndex]


            result = `Wrong Answer!
            The correct answer was: ${correctAnsText}`;
        }

        resultDiv.textContent = result;

    },
    completeQuiz: function () {
        let resultsDiv = document.getElementById("resultsScreen");
        resultsDiv.classList.remove("hidden")

        document.getElementById("quizResults").textContent = `Your score: ${this.score} out of ${questions.length}`;

        //if taking custom quiz, change the "return" option to the Custom Quiz Selection page
        if (sessionStorage.getItem("quizChoice") == 4) {
            document.getElementById("redirectEditBtn").classList.remove("hidden")
            document.getElementById("redirectBtn").classList.add("hidden")
        }

        //retake button functionality
        let retakeButton = document.getElementById('retakeBtn');
        retakeButton.addEventListener("click", function () {
            localStorage.setItem("quizChoice", sessionStorage.getItem("quizChoice"));
            location.reload(); //a really blunt way to reset the quiz, but cheap to do under the circumstances.
        });
    }
};

setQuizChoice()