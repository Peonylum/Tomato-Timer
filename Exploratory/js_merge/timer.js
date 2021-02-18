
export function timer (pomoSession) {
  let timerLen = pomoSession.pomoLen * 60 * 1000 /* pomoLen in miliseconds */
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
    document.getElementById('time-display').innerHTML = mins + ':' + seconds
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
    if (pomoSession.state === 'work') {
      pomoSession.count++
      if (pomoSession.count === 4) {
        pomoSession.state = 'longBreak'
        document.getElementById('pomo-state').innerHTML = 'longBreak'
        document.getElementById('pomo-count').innerHTML = 'pomos: ' + pomoSession.count
        document.getElementById('pomo-sets').innerHTML = 'pomo sets: ' + pomoSession.sets
        timerLen = pomoSession.longBreakLen * 60 * 1000
        updateTime()
        timerRef = setInterval(function () { updateTime() }, 1000)
      } else {
        pomoSession.state = 'shortBreak'
        document.getElementById('pomo-state').innerHTML = 'shortBreak'
        document.getElementById('pomo-count').innerHTML = 'pomos: ' + pomoSession.count
        document.getElementById('pomo-sets').innerHTML = 'pomo sets: ' + pomoSession.sets
        timerLen = pomoSession.shortBreakLen * 60 * 1000
        updateTime()
        timerRef = setInterval(function () { updateTime() }, 1000)
      }
    }
  }
}
