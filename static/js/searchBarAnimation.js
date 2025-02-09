let divSelected = document.getElementById("player-box");
let divStyle = divSelected.style;
let colorChosen = divStyle.getPropertyValue("background-color");
console.log(colorChosen);
console.log("heyy");

document.addEventListener("DOMContentLoaded", function () {
    let input = document.querySelector(".input");
    let box = document.querySelector(".box-search");
    let expanded = false;

    box.addEventListener("mouseenter", function () {
        if (!expanded) {
            input.style.width = "350px";
            input.style.background = `${colorChosen}`;
            input.style.borderRadius = "10px";
            expanded = true;
        }
    });
});