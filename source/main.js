const myStorage = window.localStorage

// Initialize all global variables.
const pomoSession = {
  count: 0 /* 4 to a set */,
  pomoPerSet: 2 /* the number of pomos per pomo set, default 4 */,
  sets: 0 /* counts how many full pomo sets completed */,
  state: 'work' /* can be work, shortBreak, or longBreak */,
  pomoLen: 1 /* these are all set low for testing */,
  shortBreakLen: 2,
  longBreakLen: 5,
  firstStart: true,
}

// pomoSession.pomoLen = 0.5
const timer = {
  timerLen: 0,
  timerRef: 0
}

// Add all EventListener when the DOM Loaded
document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('play').addEventListener('click', startSession)
  document.getElementById('stop').addEventListener('click', stopSession)
  document.getElementById('settings').addEventListener('click', showSettings)
  document.getElementById('close-settings').addEventListener('click', showSettings)
  document.getElementById('pomo-time').addEventListener('input', settingsTime)
  document.getElementById('short-break-time').addEventListener('input', settingsTime)
  document.getElementById('long-break-time').addEventListener('input', settingsTime)
  document.getElementById('volume-text').addEventListener('input', changeVolumeSlider)
  document.getElementById('volume-slider').addEventListener('input', changeVolumeText)

  // Update and display timer length
  timer.timerLen = updateTimerLen()
  displayMinSecond(timer.timerLen)
})

function changeVolumeText () {
  const slider = document.getElementById('volume-slider')
  const number = document.getElementById('volume-text')

  // Make volume slider and text adjustor the same value
  number.value = slider.value
}

function changeVolumeSlider () {
  const slider = document.getElementById('volume-slider')
  const number = document.getElementById('volume-text')

  // Set volume slider to be the same as text adjustor, 0 if empty text
  slider.value = (number.value) ? number.value : 0
}

function settingsTime () {
  const adjustPomoTime = document.getElementById('pomo-time')
  const adjustSbTime = document.getElementById('short-break-time')
  const adjustLbTime = document.getElementById('long-break-time')

  // Alter time based on setting inputs
  if ((adjustPomoTime.value >= 1 && adjustPomoTime.value <= 99) &&
  (adjustSbTime.value >= 1 && adjustSbTime.value <= 99) &&
  (adjustLbTime.value >= 1 && adjustLbTime.value <= 99)) {

    pomoSession.pomoLen = adjustPomoTime.value
    pomoSession.shortBreakLen = adjustSbTime.value
    pomoSession.longBreakLen = adjustLbTime.value
    timer.timerLen = updateTimerLen()
    displayMinSecond(timer.timerLen)

    document.getElementById('play').disabled = false
    document.getElementById('close-settings').disabled = false
  } else {
    // Out of range, disable play button and settings exit button
    document.getElementById('play').disabled = true
    document.getElementById('close-settings').disabled = true
  }
}

function disableTime () {
  const timeRunning = document.getElementById('stop')
  const adjustPomoTime = document.getElementById('pomo-time')
  const adjustSbTime = document.getElementById('short-break-time')
  const adjustLbTime = document.getElementById('long-break-time')

  // Disable/enable time adjustment based on running time
  if (timeRunning.style.display === 'block') {
    adjustPomoTime.disabled = true
    adjustSbTime.disabled = true
    adjustLbTime.disabled = true
  } else {
    adjustPomoTime.disabled = false
    adjustSbTime.disabled = false
    adjustLbTime.disabled = false
  }
}

function showSettings () {
  // Settings button
  const settingStatus = document.getElementById('settings-overlay')
  const adjustPomoTime = document.getElementById('pomo-time')
  const adjustSbTime = document.getElementById('short-break-time')
  const adjustLbTime = document.getElementById('long-break-time')

  if(adjustPomoTime.value != pomoSession.pomoLen) {
    adjustPomoTime.value = pomoSession.pomoLen
  }

  if(adjustSbTime.value != pomoSession.shortBreakLen) {
    adjustSbTime.value = pomoSession.shortBreakLen
  }

  if(adjustLbTime.value != pomoSession.longBreakLen) {
    adjustLbTime.value = pomoSession.longBreakLen
  }

  // disable time adjustment
  disableTime()

  // Show/hide settings overlay based on current display
  if (settingStatus.style.display === 'none') {
    settingStatus.style.display = 'block'
  } else {
    settingStatus.style.display = 'none'
  }
}

function startSession () {
  // Change Start button to Stop button
  document.getElementById('play').style.display = 'none'
  document.getElementById('stop').style.display = 'block'

  // disable time adjustment
  disableTime()

  // Start the timer
  runTimer(updateTimer)
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
  timer.timerLen = updateTimerLen()
  displayMinSecond(timer.timerLen)
  // Stop the timer
  clearInterval(timer.timerRef)
  // Enable time adjustment
  disableTime()
}

function runTimer (updateTimer) {
  timer.timerLen = updateTimerLen()
  console.log(timer.timerLen)
  // Special case for first time start a work state, we need to offet a delay when clicking start button
  if (pomoSession.firstStart === true) {
    timer.timerLen -= 1000
    pomoSession.firstStart = false
  }
  timer.timerRef = setInterval(updateTimer, 1000)
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
      seedNumber = (1 - timer.timerLen / (pomoSession.pomoLen * 60000)) * 25
      break
    case 'shortBreak':
      seedNumber = (1 - timer.timerLen / (pomoSession.shortBreakLen * 60000)) * 25
      break
    case 'longBreak':
      seedNumber = (1 - timer.timerLen / (pomoSession.longBreakLen * 60000)) * 25
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
        (1 - timer.timerLen / (pomoSession.pomoLen * 60000)) * fillerBar1MaxWidth
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
        (1 - timer.timerLen / (pomoSession.shortBreakLen * 60000)) *
          fillerBar2MaxWidth
      )
      break
    case 'longBreak':
      // leave bar 1 full
      fillerBar1SvgElem.setAttribute('width', fillerBar1MaxWidth)
      // update bar 2 according to long break progress
      fillerBar2SvgElem.setAttribute(
        'width',
        (1 - timer.timerLen / (pomoSession.longBreakLen * 60000)) * fillerBar2MaxWidth
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

function displayMinSecond (timerLen) {
  // console.log(timerLen)
  let mins = Math.floor((timerLen / 1000) / 60)
  let seconds = (timerLen / 1000) % 60
  if (mins < 10) {
    mins = '0' + mins
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  document.getElementById('time').innerHTML = mins + ':' + seconds
}
function updateTimer () {
  if (timer.timerLen <= 0) {
    clearInterval(timer.timerRef)
    stateChange()
  }
  console.log(timer.timerLen)
  updateSeedsImage()
  updateProgressBar()
  displayMinSecond(timer.timerLen)
  timer.timerLen -= 1000
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
      runTimer(updateTimer)
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
      timer.timerLen = updateTimerLen()
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
      pomoSession.sets++
      timer.timerLen = updateTimerLen()
      // Change Stop button to Start button
      document.getElementById('play').style.display = 'block'
      document.getElementById('stop').style.display = 'none'
      break
  }
  displayMinSecond(timer.timerLen)
}

// Onboarding
// myStorage = window.localStorage
// firstTime = true initially.
const onBoardingVars= {
  onboarding: document.getElementById('onboarding'),
  onboardingButton: document.getElementById('onboarding-button'),
  current: 1,
  textDivs: [...document.querySelectorAll('.otext')]
}
// const onboarding = document.getElementById('onboarding')
// const onboardingButton = document.getElementById('onboarding-button')
// let current = 1
// const textDivs = [...document.querySelectorAll('.otext')]
// console.log(textDivs)

const addContent = e => {
  e.preventDefault()
  onBoardingVars.onboardingButton.addEventListener('click', onBoardingClick)
  document.getElementById('onboarding-black').addEventListener('click', blackClicked)
  restartSession()

  if (myStorage.getItem('firstTime') === null) {
    console.log('first time visiting')
    myStorage.setItem('firstTime', false)
    onBoardingVars.onboarding.setAttribute('class', 'active')
    hideOnClickOutside(document.getElementById('onboarding-background'), 'play-restart')
    return 1
  } else {
    console.log('not first time visiting')
    myStorage.setItem('firstTime', false)
    onBoardingVars.onboarding.setAttribute('class', 'in-active')
    return 0
  }
}

window.addEventListener('DOMContentLoaded', addContent);
// function to cycle through onboarding pages
const onBoardingClick = e => {
  let current = onBoardingVars.current
  document.getElementById(`o${current}`).style.display = 'none'
  current = current + 1
  onBoardingVars.current = current;
  if (current > 6) {
    document.getElementById('onboarding').setAttribute('class', 'in-active')
    return 'closed'
  }
  document.getElementById('onboarding-progress-bar').src = `./assets/onboarding-${current}.svg`
  document.getElementById(`o${current}`).style.display = 'block'
  return 'continue'
}

function restartSession () {
  document.getElementById('play-restart').addEventListener('click', function () {
    hideOnClickOutside(document.getElementById('onboarding-background'), 'play-restart')
    onBoardingVars.onboarding.setAttribute('class', 'active')
    onBoardingVars.current = 1
    restartOnboarding()
  })
}

const restartOnboarding = () => {
  onBoardingVars.textDivs.forEach(item => {
    item.style.display = 'none'
    return 1
  })
  document.getElementById(`o${onBoardingVars.current}`).style.display = 'block'
  document.getElementById('onboarding-progress-bar').src = `./assets/onboarding-${onBoardingVars.current}.svg`
}

const blackClicked = e => {
  e.preventDefault()
  console.log('clicked')
}

// const showOnBoarding = () => {
//   onboarding.setAttribute('class', 'active')
// }
// hides onboarding menu
const hideOnClickOutside = (element, buttonId) => {
  const outsideClickListener = e => {
    if (e.target.id !== buttonId && !element.contains(e.target) && !document.getElementById(buttonId).contains(e.target)) {
      document.getElementById('onboarding').setAttribute('class', 'in-active')
      removeClickListener()
    }
    console.log(element.contains(e.target))
    console.log(e.target)
  }
  console.log('removed by outside window')
  console.log(element)
  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }

  setTimeout(document.addEventListener('click', outsideClickListener), 0)
}

module.exports = {
  pomoSession,
  timer,
  startSession,
  stopSession,
  runTimer,
  updateTimerLen,
  displayMinSecond,
  stateChange,
  updateTimer,
  addContent,
  onBoardingClick,
  onBoardingVars,
  restartSession,
  hideOnClickOutside
}