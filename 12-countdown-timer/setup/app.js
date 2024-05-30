const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function() {
    preloader.classList.add("hide-preloader");
}) // Preloader hides when page finishes loading

// Index on months begins with 0 (January) not 1
// e.g. for June, use 5 (not 6)
let futureDate = new Date(2024, 5, 2, 9, 0); 
console.log(futureDate);

let year = futureDate.getFullYear();
let hours = futureDate.getHours();
let mins = futureDate.getMinutes();

let month = months[futureDate.getMonth()];
let days = futureDate.getDate();

let weekday = weekdays[futureDate.getDay()];

if (hours < 10) {
  newVar = JSON.stringify(hours);
  hours = "0" + newVar;
}
if (mins < 10) {
  minVar = JSON.stringify(mins);
  mins = "0" + minVar;
}
giveaway.textContent = `Giveway ends on ${weekday}, ${days} ${month} ${year} ${hours}:${mins}`;

const futureTime = futureDate.getTime();


function getRemainTime() {
  const today = new Date().getTime(); // again this value is in milliseconds
  console.log(new Date().getTime());
  console.log(futureTime)
  const t = futureTime - today;
  console.log(t)
  const oneDay = 24*60*60*1000; // ms in one day
  const oneHour = 60*60*1000;
  const oneMin = 60*1000;
  const oneSec = 1000;
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour); // % is remainder operator
  let minutes = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);
  
  function format(item) {
    if(item < 10) {
      return item = `0${item}`;
    }
    return item;
  }
  const values = [days, hours, minutes, seconds];
  console.log(values)
  items.forEach(function(item,index) {
    item.innerHTML = format(values[index]);
  });
  if(t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has ended.</h4>`
  }
}

// countdown function
let countdown = setInterval(getRemainTime,1000);

getRemainTime();