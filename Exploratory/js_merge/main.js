/* imports */
import { editSettings } from './settings.js'
import { timer } from './timer.js'

function main () {
  /* this object holds all the default settings we used,
     some of which will be by the settings menu */
  const pomoSession = {
    count: 0, /* 4 to a set */
    sets: 0, /* counts how many full pomo sets completed */
    state: 'work', /* can be work, shortBreak, or longBreak */
    pomoLen: 0.1, /* these are all set low for testing */
    shortBreakLen: 0.1,
    longBreakLen: 0.1
  }

  const startButton = document.getElementById('start-button')

  /* this will later be replaced by a more general purpose settings listener */
  document.getElementById('length-entry').addEventListener('submit', function (event) { runSettings(event) })

  function runSettings (event) {
    event.preventDefault()
    editSettings(pomoSession)
  }

  startButton.addEventListener('click', function (event) { runSession(event) })

  /* when the start button is pressed this function runs
     it's purpose is to reset the state to working and
     call the timer function */
  function runSession (event) {
    /* TODO: in here we should also prevent start from being clickable
       until the end of the break times */
    event.preventDefault()
    // playAudio() /*if we choose to */

    if (pomoSession.count === 4) {
      pomoSession.sets++
      pomoSession.count = 0
      document.getElementById('pomo-count').innerHTML = 'pomos: 0'
      document.getElementById('pomo-sets').innerHTML = 'pomo sets: ' + pomoSession.sets
    }
    pomoSession.state = 'work'
    document.getElementById('pomo-state').innerHTML = 'work'
    timer(pomoSession)
  }
}

main()
