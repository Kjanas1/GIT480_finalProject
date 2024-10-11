//append additional questions
var questionCount = 0;

let questionx

// let question = document.getElementById('questionsForm');


function loadModule() {
    if (localStorage.getItem("edit") == "true") {
        localStorage.setItem("edit", "false");
        loadSavedQuiz();
        // console.log("load saved");
    }
    else {
        appendQuestion();
    }

}

function loadSavedQuiz() {
    //get questions array
    customQuiz = localStorage.getItem("customQuiz");
    customJson = JSON.parse(customQuiz);

    //load title
    let quizTitle = document.getElementById("name");
    quizTitle.value = customJson.info.title;

    //load questions in fields, one question at a time

    //get custom questions array
    let questionArr = customJson.questions;

    //set number of question fields based on custom question array length
    for (var i = 0; i < questionArr.length; i++) {
        appendQuestion();
    }

    //get question fields array
    indivQuestions = document.querySelectorAll(".question");

    for (var j = 0; j < indivQuestions.length; j++) {
        //fill question & answer fields
        indivQuestions[j][0].value = questionArr[j].title;
        indivQuestions[j][1].value = questionArr[j].alternatives[0];
        indivQuestions[j][2].value = questionArr[j].alternatives[1];
        indivQuestions[j][3].value = questionArr[j].alternatives[2];
        indivQuestions[j][4].value = questionArr[j].alternatives[3];

        //assign correct answer
        let correct = questionArr[j].correctAnswer

        if (indivQuestions[j][5].value == correct) {
            indivQuestions[j][5].checked = true;
        } else if (indivQuestions[j][6].value == correct) {
            indivQuestions[j][6].checked = true;
        } else if (indivQuestions[j][7].value == correct) {
            indivQuestions[j][7].checked = true;
        } else if (indivQuestions[j][8].value == correct) {
            indivQuestions[j][8].checked = true;
        }

    }

}

function appendQuestion() {
    questionCount++

    //create question number & Append
    let newQuestionNum = document.createElement("h2");
    newQuestionNum.textContent = "Question" + questionCount;

    // Get the parent element where you want to add the new paragraph
    let formDiv = document.getElementById('questionsContainer');

    // Append the new paragraph to the parent element
    formDiv.appendChild(newQuestionNum);

    //create question text & Append
    let newQuestionInput = document.createElement("div");

    newQuestionInput.innerHTML = " <form class='question'><label>Question</label><input type='text'><label>Answer 1: </label><input type='text'><label>Answer 2: </label><input type='text'><label>Answer 3: </label><input type='text'><label>Answer 4: </label><input type='text'><div class ='answerRadio'><h3>Correct Answer</h3><input type='radio' value=1><label>1</label><br><input type='radio'value=2><label>2</label><br><input type='radio' value=3><label>3</label><input type='radio' value=4><label>4</label><div></form>"

    // Get the parent element where you want to add the new paragraph
    formDiv = document.getElementById('questionsContainer');

    // Append the new paragraph to the parent element
    formDiv.appendChild(newQuestionInput);
    //create 4 answer boxes & Append

}

function saveQuiz() {
    let questions = []
    let questionCount = 0;
    let quizTitle = document.getElementById("name").value;
    //create array of form class=question
    let indivQuestions = document.querySelectorAll(".question");
    // console.log(indivQuestions);
    // console.log(indivQuestions[0]);
    // console.log(indivQuestions[0][0].value);

    //assign Quiz title to variable (or just to the customQuiz.info.title key)

    //for each, assign title,question,answers,correctAnswer to an object

    for (var i = 0; i < indivQuestions.length; i++) {
        let correct
        if (indivQuestions[i][5].checked) {
            correct = 0
        } else if (indivQuestions[i][6].checked) {
            correct = 1
        } else if (indivQuestions[i][7].checked) {
            correct = 2
        } else if (indivQuestions[i][8].checked) {
            correct = 3
        }

        let questionObj = {
            "title": indivQuestions[i][0].value,
            "alternatives": [
                indivQuestions[i][1].value,
                indivQuestions[i][2].value,
                indivQuestions[i][3].value,
                indivQuestions[i][4].value
            ],
            "correctAnswer": correct
        }
        // console.log(questionObj);
        questions.push(questionObj);
    }
    console.log(questions)
    console.log(document.getElementById("name").value)

    //append object to customQuiz.questions[]

    let customQuizData = {
        "info": {
            "title": quizTitle
        },
        "questions": questions
    };
    // console.log(customQuizData);
    console.log(indivQuestions[0][0]);
    console.log(indivQuestions[0][0].value);
    // console.log(indivQuestions[0][1]);
    // console.log(indivQuestions[0][1].value);

    //Strigify and save object customQuiz object to localstorage
    localStorage.setItem("customQuiz", JSON.stringify(customQuizData));

    //sett local storage flag for quiz to load
    localStorage.setItem("quizChoice", 4)
}

document.getElementById("addQuestion").addEventListener("click", appendQuestion);
document.getElementById("completeQuiz").addEventListener("click", saveQuiz);

loadModule();