/* Opens settings menu */
const openSettings = () => {
  document.getElementById('settingsOverlay').classList.toggle('active')
  hideOnClickOutside(document.getElementById('settingsOverlay'), 'settings')
}

document.getElementById('settings').addEventListener('click', openSettings)

/* Hides settings window (or any menu for that matter) when you click outside */
const hideOnClickOutside = (element, buttonClass) => {
  const outsideClickListener = e => {
    if (e.target.id !== buttonClass && !element.contains(e.target) && element.classList.contains('active')) {
      element.classList.remove('active')
      removeClickListener()
    }
  }
  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }
  setTimeout(document.addEventListener('click', outsideClickListener), 0)
}

/* Adds checkmark */
document.querySelectorAll('.selectButton').forEach(selectButton => {
  selectButton.addEventListener('click', () => {
    selectButton.nextElementSibling.classList.toggle('active')
  })
})

/* Start button / Timer JS */
const startButton = document.getElementById('start')
let started = false
const state = 'work'
let timerID

/* Audio function to play click sound. */
const playAudio = () => {
  document.getElementById('click').play()
}

/* Starts timer, adds click event listener and changes text and calls startTimer. */
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

/* what this is doing is setting a base time whenever it is called:
countDownTime (base time) which is found by calling the current time
and adding the correct length to it.  Then it compares a new time( the current time)
from that base time and updates the interface based on that difference.
(it subtracts current time from base time + length so it'll continually tick down)
currently the interface updates every 200 ms a setInterval function. */
const startTimer = () => {
  const workTime = 25 * 60 * 1000
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
