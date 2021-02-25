let myStorage = window.localStorage;

// Initialize all global variables.
const pomoSession = {
  count: 0, /* 4 to a set */
  sets: 0, /* counts how many full pomo sets completed */
  state: 'work', /* can be work, shortBreak, or longBreak */
  pomoLen: 25, /* these are all set low for testing */
  shortBreakLen: 0.2,
  longBreakLen: 0.2,
  firstStart: true
}

// pomoSession.pomoLen = 0.5

let timerLen
let timerRef
let mins
let seconds

// Add all EventListener when the DOM Loaded
document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('play').addEventListener('click', startSession)
  document.getElementById('stop').addEventListener('click', stopSession)
  document.getElementById('settings').addEventListener('click', showSettings)
  document.getElementById('close-settings').addEventListener('click', showSettings)
  document.getElementById('pomo-time').addEventListener('input', settingsTime)

  // Update and display timer length
  timerLen = updateTimerLen()
  displayMinSecond()
})

function settingsTime() {
  var adjustedTime = document.getElementById('pomo-time').value

  pomoSession.pomoLen = adjustedTime
  timerLen = updateTimerLen()
  displayMinSecond()
}

function showSettings() {
  // Settings button
  let settingStatus = document.getElementById('settings-overlay')

  // Show/hide settings overlay based on current display
  if(settingStatus.style.display === 'none') {
    settingStatus.style.display = 'block'
  }
  else {
    settingStatus.style.display = 'none'
  }
}

function startSession () {
  // Change Start button to Stop button
  document.getElementById('play').style.display = 'none'
  document.getElementById('stop').style.display = 'block'

  // Start the timer
  runTimer()
}

function stopSession () {
  // Reset the pomoSession variable
  pomoSession.state = 'work'
  pomoSession.count = 0
  pomoSession.sets = 1
  pomoSession.firstStart = true

  // Change Stop button to Start button
  document.getElementById('play').style.display = 'block'
  document.getElementById('stop').style.display = 'none'
  // Display the timer in Pomotime
  timerLen = updateTimerLen()
  displayMinSecond()
  // Stop the timer
  clearInterval(timerRef)
}


function runTimer () {
  timerLen = updateTimerLen()
  console.log(timerLen)
  // Special case for first time start a work state, we need to offet a delay when clicking start button
  if (pomoSession.firstStart === true) {
    timerLen -= 1000
    pomoSession.firstStart = false
  }
  timerRef = setInterval(updateTimer, 1000)
}

function updateTimerLen () {
  let length
  // Set the timer length based on its state
  switch (pomoSession.state) {
    case 'work':
      length = pomoSession.pomoLen
      break
    case 'shortBreak':
      length = pomoSession.shortBreakLen
      break
    case 'longBreak':
      length = pomoSession.longBreakLen
      break
  }
  return length * 60 * 1000 /* pomoLen in miliseconds */
}

function displayMinSecond () {
  console.log(timerLen)
  mins = Math.floor((timerLen / 1000) / 60)
  seconds = (timerLen / 1000) % 60
  if (mins < 10) {
    mins = '0' + mins
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  document.getElementById('time').innerHTML = mins + ':' + seconds
}
function updateTimer () {
  if (timerLen <= 0) {
    clearInterval(timerRef)
    stateChange()
  }
  displayMinSecond()
  timerLen -= 1000
}

/* this function does the actual changes to the document and our
   session object. it's a bit hefty right now */
function stateChange () {
  switch (pomoSession.state) {
    case 'work':
      if (pomoSession.count === 4) {
        pomoSession.state = 'longBreak'
      } else {
        pomoSession.state = 'shortBreak'
      }
      runTimer()
      break
    case 'shortBreak':
      pomoSession.state = 'work'
      pomoSession.firstStart = true
      pomoSession.count++
      timerLen = updateTimerLen()
      // Change Stop button to Start button
      document.getElementById('play').style.display = 'block'
      document.getElementById('stop').style.display = 'none'
      break
    case 'longBreak':
      pomoSession.state = 'work'
      pomoSession.firstStart = true
      pomoSession.count = 0
      pomoSession.set++
      updateTimerLen()
      // Change Stop button to Start button
      document.getElementById('play').style.display = 'block'
      document.getElementById('stop').style.display = 'none'
      break
  }
  displayMinSecond()
}


//Onboarding
// myStorage = window.localStorage
// firstTime = true initially.
let onboarding = document.getElementById('onboarding')
let onboardingButton = document.getElementById('onboarding-button')
let current = 1
let textDivs = [...document.querySelectorAll('.otext')]
console.log(textDivs)
window.addEventListener('DOMContentLoaded', e => {
  e.preventDefault();
  console.log('DOMContentLoaded')
  onboardingButton.addEventListener('click', onBoardingClick)
  document.getElementById('onboarding-black').addEventListener('click', blackClicked)
  restartSession()

  document.getElementById('o1').addEventListener('animationend', e => {

  })
  if (myStorage.getItem('firstTime') === null) {
    console.log('first time visiting')
    myStorage.setItem('firstTime', false)
    onboarding.setAttribute('class', 'active')
    hideOnClickOutside(document.getElementById('onboarding-background'), 'play-restart')
    return 1
  } else {
    console.log('not first time visiting')
    myStorage.setItem('firstTime', false)
    onboarding.setAttribute('class', 'in-active')
  }
  return 0
})

//function to cycle through onboarding pages
const onBoardingClick = e => {
  document.getElementById(`o${current}`).style.display = 'none';
  current = current + 1;
  if (current > 6){
    onboarding.setAttribute('class', 'in-active')
    return 'closed';
  }
  document.getElementById('onboarding-progress-bar').src = `./assets/onboarding-${current}.svg`
  document.getElementById(`o${current}`).style.display = 'block';
  return 'continue';
}

function restartSession () {
  document.getElementById('play-restart').addEventListener('click', function() {
    hideOnClickOutside(document.getElementById('onboarding-background'), 'play-restart')
      console.log('close');
      onboarding.setAttribute('class','active')
      current = 1;
      restartOnboarding();
  });
}

const restartOnboarding = () => {
  textDivs.forEach(item => item.style.display = 'none');
  document.getElementById(`o${current}`).style.display = 'block';
  document.getElementById('onboarding-progress-bar').src = `./assets/onboarding-${current}.svg`
}

const blackClicked = e => {
  e.preventDefault();
  console.log('clicked');
}

const showOnBoarding = () => {
  onboarding.setAttribute('class', 'active');
}
//hides onboarding menu
const hideOnClickOutside = (element, buttonId) => {
  const outsideClickListener = e => {
      if (e.target.id !== buttonId && !element.contains(e.target) && !document.getElementById(buttonId).contains(e.target)){
          document.getElementById('onboarding').setAttribute('class','in-active');
          removeClickListener();
      }
      console.log(element.contains(e.target))
      console.log(e.target);
  }
  console.log("removed by outside window");
  console.log(element);
  const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
  }

  setTimeout(document.addEventListener('click', outsideClickListener),0);
}

//testing for click on onboarding-black
