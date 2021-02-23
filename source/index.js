// TASK MENU
/* document.getElementById("taskButton").addEventListener("click", e => {
    e.preventDefault;
    document.getElementById("tasks").classList.toggle("active");
    hideOnClickOutside(document.getElementById("tasks"), "taskButton");
}) */

// SETTINGS MENU JS
// opens settings menu
const openSettings = () => {
  document.getElementById('settingsOverlay').classList.toggle('active')
  hideOnClickOutside(document.getElementById('settingsOverlay'), 'settings')
}

document.getElementById('settings').addEventListener('click', openSettings)

// hides settings window (or any menu for that matter) when you click outside
const hideOnClickOutside = (element, buttonClass) => {
  const outsideClickListener = e => {
    if (e.target.id !== buttonClass && !element.contains(e.target) && element.classList.contains('active')) {
      element.classList.remove('active')
      removeClickListener()
    }
    console.log(e.target)
  }
  console.log('removed by outside window')
  console.log(element)
  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }

  setTimeout(document.addEventListener('click', outsideClickListener), 0)
}

// This adds checkmark
document.querySelectorAll('.selectButton').forEach(selectButton => {
  selectButton.addEventListener('click', () => {
    selectButton.nextElementSibling.classList.toggle('active')
    console.log('outputting ' + selectButton.nextElementSibling)
  })
})

// START BUTTON/TIMER JS
// Logistics, just variables to make the timer work, state has not been implemented
// yet and will be used to monitor which segment the person is on.
const startButton = document.getElementById('start')
let started = false
const state = 'work'
let timerID
console.log(startButton)

// audio function to play click sound.
const playAudio = () => {
  document.getElementById('click').play()
}

// starts timer, adds click event listener and changes text and calls startTimer.
startButton.addEventListener('click', e => {
  playAudio()
  e.preventDefault()
  started = !started
  if (started) {
    if (state === 'work') {
      startTimer()
    }
    e.target.classList.add('started')
    e.target.innerHTML = 'STOP'
  } else {
    clearInterval(timerID)
    e.target.classList.remove('started')
    e.target.innerHTML = 'START'
    document.getElementById('actualTime').innerHTML = '25:00'
  }
})

// what this is doing is setting a base time whenever it is called:
// countDownTime (base time) which is found by calling the current time
// and adding the correct length to it.  Then it compares a new time( the current time)
// from that base time and updates the interface based on that difference.
// (it subtracts current time from base time + length so it'll continually tick down)
// currently the interface updates every 200 ms a setInterval function.
const startTimer = () => {
  const workTime = 25 * 60 * 1000
  // const shortTime = 5 * 60 * 1000 // TODO
  // const longTime = 15 * 60 * 1000 // TODO
  if (state === 'work') {
    const countDownTime = new Date().getTime() + workTime
    timerID = setInterval(() => {
      const now = new Date().getTime()
      const timeLeft = countDownTime - now

      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

      if (timeLeft < 1000) {
        clearInterval(timerID)
      }
      console.log(countDownTime)
      console.log(minutes)
      console.log(seconds)
      console.log(timerID)
      if (seconds >= 10 && minutes >= 10) {
        document.getElementById('actualTime').innerHTML = minutes + ':' + seconds
      } else if (seconds < 10 && minutes < 10) {
        document.getElementById('actualTime').innerHTML = '0' + minutes + ':' + '0' + seconds
      } else if (seconds < 10) {
        document.getElementById('actualTime').innerHTML = minutes + ':' + '0' + seconds
      } else {
        document.getElementById('actualTime').innerHTML = '0' + minutes + ':' + seconds
      }
    }, 100)
  }
}

// TODO
/* const changeState = (state) => {
  if (state === 'work') {

  } else if (state === 'sBreak') {

  } else if (state === 'lBreak') {

  }
} */
