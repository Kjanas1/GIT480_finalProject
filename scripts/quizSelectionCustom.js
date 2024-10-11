//directs to quiz page with localstorage key value
function quiz4Direct(e) {
    // e.preventDefault(); //because I want it to redirect anyway
    e.stopPropagation();
    localStorage.setItem("quizChoice", 4);
}


document.getElementById("takeCustomQuiz").addEventListener("click", quiz4Direct);
window.onload = function () {
    localStorage.setItem("quizChoice", 0);
};