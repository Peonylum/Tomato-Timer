
// Initialize all global variables.
const pomoSession = {
  count: 0, /* 4 to a set */
  sets: 0, /* counts how many full pomo sets completed */
  state: 'work', /* can be work, shortBreak, or longBreak */
  pomoLen: 0.5, /* these are all set low for testing */
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
})

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

  /* update the focused tasks time spent */
  if (pomoSession.state === 'work') {
    focusedTask[0].time += 1000
  }
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

document.getElementById('add-task').addEventListener('click', addToList)

const list = document.getElementById('tasks')

function buildNewTask () {
  const taskInput = document.getElementById('pomo-task')
  const newTask = document.createElement('div')
  newTask.setAttribute('class', 'task-object')
  newTask.setAttribute('draggable', true)

  /* fill task object with it's buttons and text elements */
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
  newTask.appendChild(compButton)

  taskInput.value = ''

  return newTask
}

function addToList () {
  const newTask = buildNewTask()
  const tmptask = {
    taskBody: newTask,
    time: 0
  }
  masterList.push(tmptask)

  redrawList()
}

function focusTask () {
  const temp = focusedTask.pop()
  const index = masterList.findIndex(x => x.taskBody === this.parentElement)
  focusedTask.push(masterList[index])
  focusedTask[0].taskBody.setAttribute('class', 'focused-task')
  focusedTask[0].taskBody.children[0].disabled = true
  focusedTask[0].taskBody.children[0].innerHTML = '<img src="assets/focusTaskActive.svg" alt="focus task" id="focus-task-activeicon">'

  /* remove focused task from the list and if there was a previously
     focused task, add it back to the list */
  masterList.splice(index, 1)
  if (temp !== undefined) {
    temp.taskBody.setAttribute('class', 'task-object')
    temp.taskBody.children[0].disabled = false
    temp.taskBody.children[0].innerHTML = '<img src="assets/focusTask.svg" alt="focus task" id="focus-task-icon">'
    temp.taskBody.children[0].setAttribute('src', 'assets/focusTask.svg')
    masterList.splice(0, 0, temp)
  }

  redrawList()
}

/* removes an item from our task list */
function delFromList () {
  /* figure out where the task came from, then get rid of it */
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

function completeTask () {
  let temp
  if (focusedTask.length > 0) {
    if (this.parentElement === focusedTask[0].taskBody) {
      temp = focusedTask.pop()
    }
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

/* this deletes all of the children of the task list and repopulates them
   using the arrays that represent their contents */
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

module.exports = {
  buildNewTask,
  addToList,
  focusTask,
  delFromList,
  completeTask,
  redrawList
}
