/* Kevin Janas
GIT480 – Senior Project
Professor Sohoni
October 11, 2024 */

"use strict";
function openNav(){
    let nav = document.getElementById("navList");
    nav.classList.add("visibleNav")
    nav.focus
}
function closeNav(){
    let nav = document.getElementById("navList");
    nav.classList.remove("visibleNav")
}

document.getElementById("hamburgerBtn").addEventListener("click",openNav);
document.getElementById("navList").addEventListener("mouseleave",closeNav);