// Initialize all global variables.
const pomoSession = {
  count: 0 /* 4 to a set */,
  pomoPerSet: 2 /* the number of pomos per pomo set, default 4 */,
  sets: 0 /* counts how many full pomo sets completed */,
  state: 'work' /* can be work, shortBreak, or longBreak */,
  pomoLen: 0.1 /* these are all set low for testing */,
  shortBreakLen: 0.05,
  longBreakLen: 0.1,
  firstStart: true,
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
})

function startSession() {
  // Change Start button to Stop button
  document.getElementById('play').style.display = 'none'
  document.getElementById('stop').style.display = 'block'

  // Start the timer
  runTimer()
}

function stopSession() {
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

function runTimer() {
  timerLen = updateTimerLen()

  console.log(timerLen)
  // Special case for first time start a work state, we need to offet a delay when clicking start button
  if (pomoSession.firstStart === true) {
    timerLen -= 1000
    pomoSession.firstStart = false
  }
  timerRef = setInterval(updateTimer, 1000)
}

function updateSeedsImage() {
  // set empty filename for later
  let filename = '/source/assets/seeds-'
  const fileext = '.svg'
  const emptySeedFileSrc = '/source/assets/emptySeeds.svg'
  // get the original image source from html
  const seedsImage = document.getElementById('seeds')
  let seedNumber
  // get timerLen
  // compare to either pomoLen, shortbreaklen, or longbreaklen
  // NOTE THAT TIME IN POMOSESSION IS STORED IN MINUTES AND TIMERLEN IS IN MILLISECONDS
  switch (pomoSession.state) {
    case 'work':
      seedNumber = (1 - timerLen / (pomoSession.pomoLen * 60000)) * 25
      break
    case 'shortBreak':
      seedNumber = (1 - timerLen / (pomoSession.shortBreakLen * 60000)) * 25
      break
    case 'longBreak':
      seedNumber = (1 - timerLen / (pomoSession.longBreakLen * 60000)) * 25
      break
  }
  // get the correct seedNumber int (  (timerLen / pomoLen) * 25 )
  // console.log('seedNumber='+seedNumber)
  if (parseInt(seedNumber) == 0) {
    filename = emptySeedFileSrc
  } else {
    filename = filename + parseInt(seedNumber) + fileext
  }

  // console.log(filename)
  // concatenate seedNumber to filename
  seedsImage.src = filename
  seedsImage.setAttribute('src', filename) // FALLBACK SET SRC
}

function updateProgressBar() {
  // eyeballed svg width
  const fillerBar1MaxWidth = 249
  const fillerBar2MaxWidth = 54
  // filler bar HTML elements
  const fillerBar1SvgId = 'filler-bar-1-svg'
  const fillerBar2SvgId = 'filler-bar-2-svg'
  const fillerBar1SvgElem = document.getElementById(fillerBar1SvgId)
  const fillerBar2SvgElem = document.getElementById(fillerBar2SvgId)

  // check pomo session state
  switch (pomoSession.state) {
    case 'work':
      // update bar 1 according to pomo progress
      fillerBar1SvgElem.setAttribute(
        'width',
        (1 - timerLen / (pomoSession.pomoLen * 60000)) * fillerBar1MaxWidth
      )
      // leave bar 2 empty
      fillerBar2SvgElem.setAttribute('width', 0)
      break
    case 'shortBreak':
      // leave bar 1 full
      fillerBar1SvgElem.setAttribute('width', fillerBar1MaxWidth)
      // update bar 2 according to short break progress
      fillerBar2SvgElem.setAttribute(
        'width',
        (1 - timerLen / (pomoSession.shortBreakLen * 60000)) *
          fillerBar2MaxWidth
      )
      break
    case 'longBreak':
      // leave bar 1 full
      fillerBar1SvgElem.setAttribute('width', fillerBar1MaxWidth)
      // update bar 2 according to long break progress
      fillerBar2SvgElem.setAttribute(
        'width',
        (1 - timerLen / (pomoSession.longBreakLen * 60000)) * fillerBar2MaxWidth
      )
      break
  }
}

function updateTimerLen() {
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

function displayMinSecond() {
  console.log(timerLen)
  mins = Math.floor(timerLen / 1000 / 60)
  seconds = (timerLen / 1000) % 60
  if (mins < 10) {
    mins = '0' + mins
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  document.getElementById('time').innerHTML = mins + ':' + seconds
}

function updateTimer() {
  if (timerLen <= 0) {
    clearInterval(timerRef)
    stateChange()
  }
  updateSeedsImage()
  updateProgressBar()
  displayMinSecond()
  timerLen -= 1000
}

/* this function does the actual changes to the document and our
   session object. it's a bit hefty right now */
function stateChange() {
  console.log('inStateChange')
  switch (pomoSession.state) {
    case 'work':
      if (pomoSession.count === pomoSession.pomoPerSet) {
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
      if (pomoSession.count === pomoSession.pomoPerSet - 1) {
        document.getElementById('progress-bar-background').src =
          './assets/backgroundProgressBarLongBreak.svg'
        //document.getElementById('progress-bar').setAttribute('bottom',24)
        console.log('imageChangedToLongBreak')
      } else {
        document.getElementById('progress-bar-background').src =
          './assets/backgroundProgressBar.svg'
        //document.getElementById('progress-bar').setAttribute('bottom','5')
        console.log('imageChangedBack')
      }
      timerLen = updateTimerLen()
      // Change Stop button to Start button
      document.getElementById('play').style.display = 'block'
      document.getElementById('stop').style.display = 'none'
      break
    case 'longBreak':
      // change progress bar background back to short break
      document.getElementById('progress-bar-background').src =
        './assets/backgroundProgressBar.svg'
      console.log('imageChangedBack')
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
