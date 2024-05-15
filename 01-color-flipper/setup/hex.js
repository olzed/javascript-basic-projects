const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn")
const color = document.getElementById("color")

btn.addEventListener("click", function() {
    let hexColor = '#'
    const randNum = Math.floor(Math.random() * 3) + 3
    for (let i = 0; i < randNum; i++) {
        hexColor += hex[getRandNum()]
    }
    color.textContent = hexColor;
    document.body.style.backgroundColor = hexColor;
})

function getRandNum() {
    return Math.floor(Math.random() * hex.length);
}
