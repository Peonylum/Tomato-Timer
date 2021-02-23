/* imports */
// import { editSettings } from './settings.js'
// import { timer } from './timer.js'
function docID(id){
  return document.getElementById(id);
}

function main () {
  /* this object holds all the default settings we used,
     some of which will be by the settings menu */
  const pomoSession = {
    count: 0, /* 4 to a set */
    sets: 0, /* counts how many full pomo sets completed */
    state: 0, /* can be 0= work, 1=shortBreak, or 2=longBreak */
    pomoLen: 0.1, /* these are all set low for testing */
    shortBreakLen: 0.1,  // in minutes
    longBreakLen: 15
  }

  const startButton = document.getElementById('play')

  /* this will later be replaced by a more general purpose settings listener */
  document.getElementById('pomo-time').addEventListener('change', function (event) { runSettings(event) })

  function runSettings (event) {
    event.preventDefault();
    session.pomoLen = document.getElementById('pomo-time').value
    document.getElementById('time').innerHTML = session.pomoLen + ':00'
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
    pomoSession.state = 0;
    // document.getElementById('pomo-state').innerHTML = 'work'
    timer(pomoSession)
  }
}

main()

function timer (pomoSession) {
  let timerLen = pomoSession.pomoLen * 60 * 1000 /* pomoLen minutes -> miliseconds */
  timerLen -= 1000
  updateTime()

  let timerRef = setInterval(function () { updateTime() }, 1000)

  /* this function uses the timerLen to find our seconds and
     minutes to display on the clock. then when the timer runs out
     it determines what state to move to based on current state */
  function updateTime () {
    let mins = Math.floor((timerLen / 1000) / 60)
    let seconds = (timerLen / 1000) % 60

    /* these if statements tell us if we need to pad our mins/seconds
       numbers with an extra 0 */
    if (mins < 10) {
      mins = '0' + mins
    }

    if (seconds < 10) {
      seconds = '0' + seconds
    }

    /* update the time on the doc */
    document.getElementById('time').innerHTML = mins + ':' + seconds
    /* if timer hits 0 we make some changes */
    if (timerLen <= 0) {
      // debugger
      clearInterval(timerRef)
      stateChange()
      return
    }
    timerLen -= 1000
  }

  /* this function does the actual changes to the document and our
     session object. it's a bit hefty right now */
  function stateChange () {
    if (pomoSession.state === 0) {
      pomoSession.count++
      if (pomoSession.count === 4) {
        pomoSession.state = 2
        // document.getElementById('pomo-state').innerHTML = 'longBreak'
        // document.getElementById('pomo-count').innerHTML = 'pomos: ' + pomoSession.count
        // document.getElementById('pomo-sets').innerHTML = 'pomo sets: ' + pomoSession.sets
        timerLen = pomoSession.longBreakLen * 60 * 1000
        updateTime()
        timerRef = setInterval(function () { updateTime() }, 1000)
      } else {
        pomoSession.state = 1
        // document.getElementById('pomo-state').innerHTML = 'shortBreak'
        // document.getElementById('pomo-count').innerHTML = 'pomos: ' + pomoSession.count
        // document.getElementById('pomo-sets').innerHTML = 'pomo sets: ' + pomoSession.sets
        timerLen = pomoSession.shortBreakLen * 60 * 1000
        updateTime()
        timerRef = setInterval(function () { updateTime() }, 1000)
      }
    } else {
      timerLen = pomoSession.pomoLen * 60 * 1000
      updateTime()
    }
  }
}
