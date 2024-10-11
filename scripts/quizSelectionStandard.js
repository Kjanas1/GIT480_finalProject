console.log("hi")
let x = 50;



function quizDirect(e) {
    e.preventDefault();
    e.stopPropagation();

    // if (e === document.getElementById("quiz1Button")){
    // if (e === document.getElementById("quiz1Button")) {
    //     localStorage.setItem("quizChoice", 1);
    // }
    // else if (e == document.getElementById("quiz2Button")) {
    //     localStorage.setItem("quizChoice", 2);
    // }
    // else if (e == document.getElementById("quiz3Button")) {
    //     localStorage.setItem("quizChoice", 3);
    // }
    // else {
    //     localStorage.setItem("quizChoice", 0);
    // }

    //if e = specific element, then...
    //store specific variable in local
    // e = specific element 2, then...
    //etc.
    //else...
    // store non-quiz variable
    //"no quiz available, please select a quiz from the list, redirect back to page"

}
function quiz1Direct(e) {
    // e.preventDefault(); //because I want it to redirect anyway
    e.stopPropagation();
    localStorage.setItem("quizChoice", 1);
}
function quiz2Direct(e) {
    // e.preventDefault(); //because I want it to redirect anyway
    e.stopPropagation();
    localStorage.setItem("quizChoice", 2);
}
function quiz3Direct(e) {
    // e.preventDefault(); //because I want it to redirect anyway
    e.stopPropagation();
    localStorage.setItem("quizChoice", 3);
}

// document.getElementsByClassName("button").addEventListener("click", quizDirect);
document.getElementById("quiz1Button").addEventListener("click", quiz1Direct);
document.getElementById("quiz2Button").addEventListener("click", quiz2Direct);
document.getElementById("quiz3Button").addEventListener("click", quiz3Direct);

window.onload = function () {
    localStorage.setItem("quizChoice", 0);
};