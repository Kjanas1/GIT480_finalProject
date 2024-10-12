function quiz1Direct() {
    localStorage.setItem("quizChoice", 1);
}

function quiz2Direct() {
    localStorage.setItem("quizChoice", 2);
}

function quiz3Direct() {
    localStorage.setItem("quizChoice", 3);
}
function getQuizData() {
    //retrieve JSON
    // endpoint address & variable
    let serverEndpoint = "https://8d2fa16d-4e87-4f8d-8a22-5a5beac16b80.mock.pstmn.io/quizData";
    let endpoint = `${serverEndpoint}`;

    // XMLHttp Resquest
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function (data) {
        if (this.status === 200) {
            loadQuizData(this.response);

        } else {
            // display an error message 
        }
    });

    // set the expected response type
    xhr.responseType = "json";

    // open a connection to the endpoint
    xhr.open("GET", endpoint);

    // send the request
    xhr.send();
};

function loadQuizData(quizData) {
    //quiz 1 information
    let quizTitle = quizData.quiz1.info.title;
    document.getElementById("q1Title").textContent = quizTitle;
    let quizDesc = quizData.quiz1.info.desc;
    document.getElementById("q1Desc").textContent = quizDesc;
    let quizImg = quizData.quiz1.info.img;
    document.getElementById("q1ImgDiv").innerHTML = `<img src=${quizImg}>`

    //quiz 2 information
    quizTitle = quizData.quiz2.info.title;
    document.getElementById("q2Title").textContent = quizTitle;
    quizDesc = quizData.quiz2.info.desc;
    document.getElementById("q2Desc").textContent = quizDesc;
    quizImg = quizData.quiz2.info.img;
    document.getElementById("q2ImgDiv").innerHTML = `<img src=${quizImg}>`

    //quiz 3 information
    quizTitle = quizData.quiz3.info.title;
    document.getElementById("q3Title").textContent = quizTitle;
    quizDesc = quizData.quiz3.info.desc;
    document.getElementById("q3Desc").textContent = quizDesc;
    quizImg = quizData.quiz3.info.img;
    document.getElementById("q3ImgDiv").innerHTML = `<img src=${quizImg}>`
}

// document.getElementsByClassName("button").addEventListener("click", quizDirect);
document.getElementById("quiz1Button").addEventListener("click", quiz1Direct);
document.getElementById("quiz2Button").addEventListener("click", quiz2Direct);
document.getElementById("quiz3Button").addEventListener("click", quiz3Direct);

window.onload = function () {
    localStorage.setItem("quizChoice", 0);
};
getQuizData();