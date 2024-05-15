const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const btn = document.getElementById("btn")
const colour = document.querySelector(".color")

btn.addEventListener("click", function() {
    const randNum = Math.floor(Math.random() * 4);
    document.body.style.backgroundColor = colors[randNum];
    colour.textContent = colors[randNum];
})