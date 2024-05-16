let count = 0;

const value = document.querySelector("#value")
const btns = document.querySelectorAll(".btn")

btns.forEach(function(button) {
    button.addEventListener("click", function(e) {
        const styles = e.currentTarget.classList // gets the class of button clicked
        if(styles.contains('decrease')){
            count--;
        } else if(styles.contains('increase')) {
            count++;
        } else if (styles.contains('reset')) {
            count = 0;
        }
        if(count < 0) {
            value.style.color = "red";
        } else if(count > 0) {
            value.style.color = "green";
        } else if(count === 0) {
            value.style.color = "var(--clr-grey-1)"
        }
        value.textContent = count;
    });
});