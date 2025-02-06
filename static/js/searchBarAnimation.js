document.addEventListener("DOMContentLoaded", function () {
    let input = document.querySelector(".input");
    let box = document.querySelector(".box-search");
    let expanded = false;

    box.addEventListener("mouseenter", function () {
        if (!expanded) {
            input.style.width = "350px";
            input.style.background = "#242424";
            input.style.borderRadius = "10px";
            expanded = true;
        }
    });
});
