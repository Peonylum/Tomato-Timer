const myStorage = window.localStorage

/********************************
*  _____ _                      *
* |_   _(_)_ __ ___   ___ _ __  *
*   | | | | '_ ` _ \ / _ \ '__| *
*   | | | | | | | | |  __/ |    *
*   |_| |_|_| |_| |_|\___|_|    *
*                               *
*********************************/

/* Initialize all global variables */
const pomoSession = {
  count: 0 /* 4 to a set */,
  pomoPerSet: 4 /* The number of pomos per pomo set, default 4 */,
  sets: 0 /* Counts how many full pomo sets completed */,
  state: 'work' /* Can be work, shortBreak, or longBreak */,
  pomoLen: 25 /* These are all set low for testing */,
  shortBreakLen: 5,
  longBreakLen: 15,
  firstStart: true
}

const timer = {
  timerLen: 0,
  timerRef: 0
}

/* Add all EventListener when the DOM Loaded */
document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('play').addEventListener('click', startSession)
  document.getElementById('stop').addEventListener('click', stopSession)
  document.getElementById('settings').addEventListener('click', showSettings)
  document.getElementById('close-settings').addEventListener('click', showSettings)
  document.getElementById('pomo-time').addEventListener('input', settingsTime)
  document.getElementById('short-break-time').addEventListener('input', settingsTime)
  document.getElementById('long-break-time').addEventListener('input', settingsTime)
  document.getElementById('add-task').addEventListener('click', addToList)

  /* Update and display timer length */
  timer.timerLen = updateTimerLen()
  displayMinSecond(timer.timerLen)
})

/**
Function: settingsTime()
Description: Updates the timer to what is set by settings.
Input: None.
Output: None.
Result: Pomo length and break length adjusted to what's set in settings.
*/
function settingsTime () {
  const adjustPomoTime = document.getElementById('pomo-time')
  const adjustSbTime = document.getElementById('short-break-time')
  const adjustLbTime = document.getElementById('long-break-time')

  /* Alter time based on setting inputs */
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
    document.getElementById('settings').disabled = false
  } else {
    /* Out of range, disable play button and settings exit button */
    document.getElementById('play').disabled = true
    document.getElementById('close-settings').disabled = true
    document.getElementById('settings').disabled = true
  }
}

/**
Function: disableTime()
Description: Toggles whether settings can be adjusted while time is running.
Input: None.
Output: None.
Result: Settings changes disabled or enabled.
*/
function disableTime () {
  const timeRunning = document.getElementById('stop')
  const adjustPomoTime = document.getElementById('pomo-time')
  const adjustSbTime = document.getElementById('short-break-time')
  const adjustLbTime = document.getElementById('long-break-time')

  /* Disable/enable time adjustment based on running time */
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

/**
Function: showSettings()
Description: Display settings menu when 'settings' button is clicked.
Input: None.
Output: None.
Result: Settings displayed/hidden.
*/
function showSettings () {
  /* Settings button */
  const settingStatus = document.getElementById('settings-overlay')
  const adjustPomoTime = document.getElementById('pomo-time')
  const adjustSbTime = document.getElementById('short-break-time')
  const adjustLbTime = document.getElementById('long-break-time')

  if (parseInt(adjustPomoTime.value) !== pomoSession.pomoLen) {
    adjustPomoTime.value = pomoSession.pomoLen
  }

  if (parseInt(adjustSbTime.value) !== pomoSession.shortBreakLen) {
    adjustSbTime.value = pomoSession.shortBreakLen
  }

  if (parseInt(adjustLbTime.value) !== pomoSession.longBreakLen) {
    adjustLbTime.value = pomoSession.longBreakLen
  }

  /* Disable time adjustment */
  disableTime()

  /* Show/hide settings overlay based on current display */
  if (settingStatus.style.display === 'none') {
    settingStatus.style.display = 'block'
  } else {
    settingStatus.style.display = 'none'
  }
}

/**
Function: startSession()
Description: Starts the timer, updates button, and disables settings changes.
Input: None.
Output: None.
Result: Timer is running.
*/
function startSession () {
  /* Change Start button to Stop button */
  document.getElementById('play').style.display = 'none'
  document.getElementById('stop').style.display = 'block'

  /* Disable time adjustment */
  disableTime()

  /* Start the timer */
  runTimer(updateTimer)
}

/**
Function: stopSession()
Description: Hard stops the pomodoro session and resets all values.
Input: None.
Output: None.
Result: Session stopped.
*/
function stopSession () {
  /* Reset the pomoSession variable */
  pomoSession.state = 'work'
  pomoSession.count = 0
  pomoSession.sets = 1
  pomoSession.firstStart = true

  /* Change Stop button to Start button */
  document.getElementById('play').style.display = 'block'
  document.getElementById('stop').style.display = 'none'
  /* Display the timer in Pomotime */
  timer.timerLen = updateTimerLen()
  displayMinSecond(timer.timerLen)
  /* Stop the timer */
  clearInterval(timer.timerRef)
  /* Enable time adjustment */
  disableTime()
}

/**
Function: runTimer()
Description: Runs the timer every second.
Input: updateTimer.
Output: None.
Result: A second of timer functionality passes.
*/
function runTimer (updateTimer) {
  timer.timerLen = updateTimerLen()
  /* Special case for first time start a work state, we need to offet a delay when clicking start button */
  if (pomoSession.firstStart === true) {
    timer.timerLen -= 1000
    pomoSession.firstStart = false
  }
  timer.timerRef = setInterval(updateTimer, 1000)
}

/**
Function: updateSeedsImage()
Description: Checks the current proportion of time and updates seeds filename.
Input: None.
Output: None.
Result: Updates the seeds image to the correct value.
*/
function updateSeedsImage () {
  /* Set empty filename for later */
  let filename = './assets/seeds-'
  const fileext = '.svg'
  const emptySeedFileSrc = './assets/emptySeeds.svg'
  const seedsImage = document.getElementById('seeds')
  let seedNumber
  /* Compare to either pomoLen, shortbreaklen, or longbreaklen */
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
  if (parseInt(seedNumber) === 0) {
    filename = emptySeedFileSrc
  } else {
    filename = filename + parseInt(seedNumber) + fileext
  }
  /* Concatenate seedNumber to filename */
  seedsImage.src = filename
  seedsImage.setAttribute('src', filename)
}

/**
Function: updateProgressBar()
Description: Checks the current proportion of time and updates progress bars svg width.
Input: None.
Output: None.
Result: Updates the progress bars to correct length.
*/
function updateProgressBar () {
  /* Full progress bar width values */
  const fillerBar1MaxWidth = 215
  const fillerBar2MaxWidth = 44
  /* Filler bar HTML elements */
  const fillerBar1SvgId = 'filler-bar-1-svg'
  const fillerBar2SvgId = 'filler-bar-2-svg'
  const fillerBar1SvgElem = document.getElementById(fillerBar1SvgId)
  const fillerBar2SvgElem = document.getElementById(fillerBar2SvgId)
  const fillerBarMaxWidth = 420
  const fillerBarCurrentWidth = document.getElementById('progress-background').clientWidth
  const screenMultiplier = fillerBarCurrentWidth / fillerBarMaxWidth
  switch (pomoSession.state) {
    case 'work':
      /* Update bar 1 according to pomo progress */
      fillerBar1SvgElem.setAttribute(
        'width',
        ((1 - timer.timerLen / (pomoSession.pomoLen * 60000)) * fillerBar1MaxWidth) * screenMultiplier
      )
      /* Leave bar 2 empty */
      fillerBar2SvgElem.setAttribute('width', 0)
      break
    case 'shortBreak':
      /* Leave bar 1 full */
      fillerBar1SvgElem.setAttribute('width', fillerBar1MaxWidth * screenMultiplier)
      /* Update bar 2 according to short break progress */
      fillerBar2SvgElem.setAttribute(
        'width',
        ((1 - timer.timerLen / (pomoSession.shortBreakLen * 60000)) *
          fillerBar2MaxWidth) * screenMultiplier
      )
      break
    case 'longBreak':
      /* Leave bar 1 full */
      fillerBar1SvgElem.setAttribute('width', fillerBar1MaxWidth * screenMultiplier)
      /* Update bar 2 according to long break progress */
      fillerBar2SvgElem.setAttribute(
        'width',
        ((1 - timer.timerLen / (pomoSession.longBreakLen * 60000)) * fillerBar2MaxWidth) * screenMultiplier
      )
      break
  }
}

/**
Function: updateTimerLen()
Description: Sets the timer length based on the state.
Input: None.
Output: length in milliseconds.
Result: Timer length returned and updated.
*/
function updateTimerLen () {
  let length
  /* Set the timer length based on its state */
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
  /* Return length in milliseconds */
  return length * 60 * 1000
}

/**
Function: displayMinSecond()
Description: Updates the html to show the correct time.
Input: None.
Output: None.
Result: The display has the properly formatted time shown.
*/
function displayMinSecond (timerLen) {
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

/**
Function: updateTimer()
Description: Calls necessary functions every second, reduces timer length, updates time spent.
Input: None.
Output: None.
Result: State is changed if necessary, seeds and progress bars updated, and time updated.
*/
function updateTimer () {
  if (timer.timerLen <= 0) {
    clearInterval(timer.timerRef)
    stateChange(runTimer, displayMinSecond)
  }
  updateSeedsImage()
  updateProgressBar()
  displayMinSecond(timer.timerLen)
  timer.timerLen -= 1000

  /* Update the focused tasks time spent */
  if (pomoSession.state === 'work' && focusedTask.length > 0) {
    focusedTask[0].time += 1000
  }
}

/**
Function: stateChange (runTimer, displayMinSecond)
Description: State is changed, pomo count is updated, progress bar changed.
Input: runTimer, displayMinSecond
Output: None.
Result: State is changed to work, short, or long break.
*/
function stateChange (runTimer, displayMinSecond) {
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
      if (pomoSession.count === pomoSession.pomoPerSet) {
        document.getElementById('progress-bar-background').src =
          './assets/progressBarLongBreak.svg'
      } else {
        document.getElementById('progress-bar-background').src =
          './assets/backgroundProgressBar.svg'
      }
      timer.timerLen = updateTimerLen()
      /* Change Stop button to Start button */
      document.getElementById('play').style.display = 'block'
      document.getElementById('stop').style.display = 'none'
      break
    case 'longBreak':
      /* Change progress bar background back to short break */
      document.getElementById('progress-bar-background').src =
        './assets/backgroundProgressBar.svg'
      pomoSession.state = 'work'
      pomoSession.firstStart = true
      pomoSession.count = 0
      pomoSession.sets++
      timer.timerLen = updateTimerLen()
      /* Change Stop button to Start button */
      document.getElementById('play').style.display = 'block'
      document.getElementById('stop').style.display = 'none'
      break
  }
  displayMinSecond(timer.timerLen)
}

/************************************
 *  _____         _    _ _     _    *
 * |_   _|_ _ ___| | _| (_)___| |_  *
 *   | |/ _` / __| |/ / | / __| __| *
 *   | | (_| \__ \   <| | \__ \ |_  *
 *   |_|\__,_|___/_|\_\_|_|___/\__| *
 *                                  *
 ************************************/

const focusedTask = []
const masterList = []
const completedList = []

const list = document.getElementById('tasks')

/**
Function: buildNewTask()
Description: A new task object is created as a div, then it's buttons and text are
appended to it.
Input: None.
Output: newTask.
Result: New task DOM is created and returned to calling function
*/
function buildNewTask () {
  const taskInput = document.getElementById('pomo-task')
  const newTask = document.createElement('div')
  newTask.setAttribute('class', 'task-object')
  newTask.setAttribute('draggable', true)

  /* Fill task object with it's buttons and text elements */
  const focusButton = document.createElement('button')
  focusButton.setAttribute('class', 'focus-task-button')
  focusButton.innerHTML = '<img src="assets/focusTask.svg" alt="focus task" id="focus-task-icon">'
  focusButton.addEventListener('click', focusTask)
  newTask.appendChild(focusButton)

  const delButton = document.createElement('button')
  delButton.setAttribute('class', 'delete-task-button')
  delButton.innerHTML = '<img src="assets/minusSign.svg" alt="delete task" id="delete-task-icon">'
  delButton.addEventListener('click', delFromList)
  newTask.appendChild(delButton)

  const taskText = document.createElement('p')
  taskText.setAttribute('class', 'task-text')
  taskText.innerHTML = taskInput.value
  newTask.appendChild(taskText)

  const compButton = document.createElement('button')
  compButton.setAttribute('class', 'complete-task-button')
  compButton.innerHTML = '<img src="assets/checkTask.svg" alt="complete task" id="complete-task-icon">'
  compButton.addEventListener('click', completeTask)
  compButton.style.display = 'none'
  newTask.appendChild(compButton)

  taskInput.value = ''

  return newTask
}

/**
Function: addToList()
Description: buildNewTask is called; task is initialized with correct values, and added to task list.
Input: None.
Output: None.
Result: New task is built, initialized, and added to task list.
*/
function addToList () {
  const newTask = buildNewTask()
  const tmptask = {
    taskBody: newTask,
    time: 0
  }
  masterList.push(tmptask)

  redrawList()
}

/**
Function: focusTask()
Description: desired task is popped, moved to front of list, and set to being focused, then list is redrawn.
If there is already a focused task then it is moved to the general task list. A focused task has its focus
button disabled.
Input: None.
Output: None.
Result: desired task is moved to the top of the list and "focused"
*/
function focusTask () {
  const temp = focusedTask.pop()
  const index = masterList.findIndex(x => x.taskBody === this.parentElement)
  focusedTask.push(masterList[index])
  focusedTask[0].taskBody.setAttribute('class', 'focused-task')
  focusedTask[0].taskBody.children[0].disabled = true
  focusedTask[0].taskBody.children[0].innerHTML = '<img src="assets/focusTaskActive.svg" alt="focus task" id="focus-task-activeicon">'
  focusedTask[0].taskBody.children[3].style.display = 'block'

  /* Remove focused task from the list and if there was a previously
     focused task, add it back to the list */
  masterList.splice(index, 1)
  if (temp !== undefined) {
    temp.taskBody.setAttribute('class', 'task-object')
    temp.taskBody.children[0].disabled = false
    temp.taskBody.children[0].innerHTML = '<img src="assets/focusTask.svg" alt="focus task" id="focus-task-icon">'
    temp.taskBody.children[0].setAttribute('src', 'assets/focusTask.svg')
    temp.taskBody.children[3].style.display = 'none'
    masterList.splice(0, 0, temp)
  }

  redrawList()
}

/**
Function: delFromList()
Description: the focused task is removed and the list is updated.
Input: None.
Output: None.
Result: Item is removed from task list.
*/
function delFromList () {
  /* Figure out where the task came from, then get rid of it */
  if (focusedTask.length > 0 && this.parentElement === focusedTask[0].taskBody) {
    focusedTask.pop()
  } else {
    const index = masterList.findIndex(x => x.taskBody === this.parentElement)
    if (index === -1) {
      completedList.splice(completedList.findIndex(x => x.taskBody === this.parentElement), 1)
    } else {
      masterList.splice(index, 1)
    }
  }

  this.parentElement.remove()

  redrawList()
}

/**
Function: completeTask()
Description: Task is popped from list, a child html element is created to show the time taken on the task.
Input: None.
Output: None.
Result: Completed task is removed and page is updated to show time taken on task.
*/
function completeTask () {
  let temp
  if (focusedTask.length > 0 && this.parentElement === focusedTask[0].taskBody) {
    temp = focusedTask.pop()
  } else {
    const index = masterList.findIndex(x => x.taskBody === this.parentElement)
    temp = masterList[index]
    masterList.splice(index, 1)
  }
  temp.taskBody.setAttribute('class', 'completed-task')
  temp.taskBody.children[temp.taskBody.children.length - 1].remove()
  temp.taskBody.children[0].remove()

  const taskTime = document.createElement('p')
  taskTime.setAttribute('class', 'task-time')
  taskTime.innerHTML = 'Pomos: ' + (temp.time / (pomoSession.pomoLen * 60 * 1000)).toFixed(1)
  temp.taskBody.appendChild(taskTime)

  completedList.push(temp)

  redrawList()
}

/**
Function: redrawList()
Description: Deletes all children of task list and repopulates with the arrays that represent their contents.
Input: None.
Output: None.
Result: List is redrawn.
*/
function redrawList () {
  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }

  if (focusedTask.length > 0) {
    list.appendChild(focusedTask[0].taskBody)
  }

  for (let i = 0; i < masterList.length; i++) {
    list.appendChild(masterList[i].taskBody)
  }

  for (let i = 0; i < completedList.length; i++) {
    list.appendChild(completedList[i].taskBody)
  }
}

/**********************************************************
*   ___        _                         _ _              *
*  / _ \ _ __ | |__   ___   __ _ _ __ __| (_)_ __   __ _  *
* | | | | '_ \| '_ \ / _ \ / _` | '__/ _` | | '_ \ / _` | *
* | |_| | | | | |_) | (_) | (_| | | | (_| | | | | | (_| | *
*  \___/|_| |_|_.__/ \___/ \__,_|_|  \__,_|_|_| |_|\__, | *
*                                                  |___/  *
***********************************************************/

const onBoardingVars = {
  onboarding: document.getElementById('onboarding'),
  onboardingButton: document.getElementById('onboarding-button'),
  current: 1,
  textDivs: [...document.querySelectorAll('.otext')]
}

const addContent = e => {
  onBoardingVars.onboardingButton.addEventListener('click', onBoardingClick)
  restartSession()

  if (myStorage.getItem('firstTime') === null) {
    myStorage.setItem('firstTime', false)
    onBoardingVars.onboarding.setAttribute('class', 'active')
    hideOnClickOutside(document.getElementById('onboarding-background'), 'play-restart')
    return 1
  } else {
    myStorage.setItem('firstTime', false)
    onBoardingVars.onboarding.setAttribute('class', 'in-active')
    return 0
  }
}

window.addEventListener('DOMContentLoaded', addContent)
/* Function to cycle through onboarding pages */
const onBoardingClick = e => {
  let current = onBoardingVars.current
  document.getElementById(`o${current}`).style.display = 'none'
  current = current + 1
  onBoardingVars.current = current
  if (current > 6) {
    document.getElementById('onboarding').setAttribute('class', 'in-active')
    return 'closed'
  }
  document.getElementById('onboarding-progress-bar').src = `./assets/onboarding-${current}.svg`
  document.getElementById(`o${current}`).style.display = 'block'
  return 'continue'
}

const restartClick = function (e) {
  hideOnClickOutside(document.getElementById('onboarding-background'), 'play-restart')
  document.getElementById('onboarding').setAttribute('class', 'active')
  onBoardingVars.current = 1
  restartOnboarding()
}
/**
Function: restartSession()
Description: Resets session to original.
Input: None.
Output: None.
Result: Session is restarted.
*/
function restartSession () {
  document.getElementById('play-restart').addEventListener('click', restartClick)
}

const restartOnboarding = () => {
  onBoardingVars.textDivs.forEach(item => {
    item.style.display = 'none'
  })
  document.getElementById(`o${onBoardingVars.current}`).style.display = 'block'
  document.getElementById('onboarding-progress-bar').src = `./assets/onboarding-${onBoardingVars.current}.svg`
}

/* Hides onboarding menu */
const hideOnClickOutside = (element, buttonId) => {
  const outsideClickListener = e => {
    if (e.target.id !== buttonId && !element.contains(e.target) && !document.getElementById(buttonId).contains(e.target)) {
      document.getElementById('onboarding').setAttribute('class', 'in-active')
      removeClickListener()
    }
  }
  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }
  setTimeout(document.addEventListener('click', outsideClickListener), 0)
}

try {
  module.exports = {
    pomoSession: pomoSession,
    timer: timer,
    startSession: startSession,
    stopSession: stopSession,
    runTimer: runTimer,
    updateTimerLen: updateTimerLen,
    displayMinSecond: displayMinSecond,
    stateChange: stateChange,
    updateTimer: updateTimer,
    settingsTime: settingsTime,
    disableTime: disableTime,
    showSettings: showSettings,
    addContent,
    onBoardingClick,
    onBoardingVars,
    restartSession,
    hideOnClickOutside,
    restartClick,
    restartOnboarding,
    myStorage,
    updateProgressBar,
    updateSeedsImage,
    buildNewTask,
    addToList,
    focusTask,
    delFromList,
    completeTask,
    redrawList,
    focusedTask
  }
} catch (e) {
  /* Browsers need not set module exports. */
}
