document.addEventListener("DOMContentLoaded", function () {
    let input = document.querySelector(".input");
    let box = document.querySelector(".box-search");
    let expanded = false;

    box.addEventListener("mouseenter", function () {
        if (!expanded) {
            input.style.width = "350px";
            input.style.background = document.querySelector(".player-box").style.getPropertyValue("background-color");
            input.style.borderRadius = "10px";
            expanded = true;
        }
    });
});
let isVis = false;

function dropQueue() {
    console.log("q");   

    let queueCunt = document.querySelector(".queue-holder");
    
    if (isVis) {
        queueCunt.style.transform = "translateX(358px)";   
        isVis = false;
    }
    else {
        queueCunt.style.transform = "translateX(30px)";
        isVis = true;
    }
}
