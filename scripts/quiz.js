function setQuizChoice() {
    if (localStorage.getItem("quizChoice") == 0) {
        console.log("error");
        //load redirect function
    }
    else {
        // sessionStorage.setItem("quizChoice",`quiz${localStorage.getItem("quizChoice")}`);
        sessionStorage.setItem("quizChoice", localStorage.getItem("quizChoice"));
        localStorage.setItem("quizChoice", 0);
        getQuiz();
    }
};

function getQuiz() {
    //retrieve JSON
    // endpoint address & variable
    let serverEndpoint = "https://f93a4022-8613-4164-b8f8-36749f0f90d4.mock.pstmn.io/quiz1";
    let endpoint = `${serverEndpoint}`;

    // XMLHttp Resquest
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function (data) {
        if (this.status === 200) {
            // display quiz

            //stores quiz data in SessionStorage
            sessionStorage.setItem("quizData", JSON.stringify(this.response))

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

let questions = [
    {
        title: 'gato',
        alternatives: ['dog', 'cat', 'bird', 'fish'],
        correctAnswer: 1
    },
    {
        title: 'ave',
        alternatives: ['mouse', 'hamster', 'lizard', 'bird'],
        correctAnswer: 3
    },
    {
        title: 'rata',
        alternatives: ['cat', 'fish', 'rat', 'shark'],
        correctAnswer: 2
    },
    {
        title: 'mosca',
        alternatives: ['fly', 'puma', 'fish', 'dog'],
        correctAnswer: 0
    }
];

let app = {
    start: function () {
        var quizJson = JSON.parse(sessionStorage.getItem("quizData"));

        this.currPosition = 0;
        this.score = 0;

        let titleDiv = document.getElementById('title');
        // titleDiv.textContent = quizJson.title;
        // titleDiv.textContent = question.title;

        let answerButtons = document.querySelectorAll('.button');
        answerButtons.forEach(function (element, index) {
            element.addEventListener("click", function () {
                //check for correct answer
                this.checkAnswer(index);

            }.bind(this));
        }.bind(this)); //needed to pass context along to the object

        // display score
        this.updateStats();

        //show first question
        // this.showQuestion(quizJson);
        this.showQuestion(questions[this.currPosition]);
    },
    showQuestion: function (q) {

        //show question
        let questionDesc = document.getElementById("questionText")
        // questionDesc.textContent = q.questions.q1.desc;
        questionDesc.textContent = q.title;

        //show answers
        let answers = document.querySelectorAll('.button');
        answers.forEach(function (element, index) {
            // element.textContent = q.questions.q1.answers[index];
            element.textContent = q.alternatives[index];
        })
    },
    checkAnswer: function (userSelected) {

        let currQuestion = questions[this.currPosition];

        if (currQuestion.correctAnswer == userSelected) {
            //correct
            console.log('correct');
            this.score++;
            this.showresult(true);
        }
        else {
            //incorrect
            console.log("wrong");
            this.showresult(false);
        }
        //refresh stats
        this.updateStats();

        //increase position
        this.increasePosition();

        //show next question
        this.showQuestion(questions[this.currPosition]);

    },
    increasePosition: function () {
        this.currPosition++;

        if (this.currPosition == questions.length) {
            this.currPosition = 0;
        }
    },
    updateStats: function () {
        let scoreDiv = document.getElementById("score");
        scoreDiv.textContent = `Your Score: ${this.score}`;
    },
    showresult: function (isCorrect) {
        let resultDiv = document.getElementById("result");
        let result = "";

        //checks
        if(isCorrect){
            result = "Correct Answer!";
        }
        else{
            //get current question
            let currQuestion= questions[this.currPosition];

            //get correct answer index
            let correctAnsIndex = currQuestion.correctAnswer;

            //get correct answer
            let correctAnsText = currQuestion.alternatives[correctAnsIndex]


            result = `Wrong Answer!
            The correct answer was: ${correctAnsText}`;
        }

        resultDiv.textContent = result;

    }

};

setQuizChoice()
app.start();