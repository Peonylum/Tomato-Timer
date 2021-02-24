
// Initialize all global variables.
var pomoSession = {
  count: 0, /* 4 to a set */
  sets: 0, /* counts how many full pomo sets completed */
  state: 'work', /* can be work, shortBreak, or longBreak */
  pomoLen: 0.5, /* these are all set low for testing */
  shortBreakLen: 0.2,
  longBreakLen: 0.2,
  firstStart:true
}
  
var timerLen, timerRef, mins, seconds;
const listItems = []
const delBtns = []
let curr

// Add all EventListener when the DOM Loaded
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('play').addEventListener('click', startSession);
  document.getElementById('stop').addEventListener('click', stopSession);
});






