
//directs to quiz page with localstorage key value
function quiz4Direct(e) {
    // e.preventDefault(); //because I want it to redirect anyway
    localStorage.setItem("quizChoice", 4);
}

function editQuizDirect(){
    localStorage.setItem("edit", true);
}


document.getElementById("takeCustomQuiz").addEventListener("click", quiz4Direct);

document.getElementById("editQuiz").addEventListener("click", editQuizDirect);

window.onload = function () {
    localStorage.setItem("quizChoice", 0);
};