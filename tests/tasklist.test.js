document.body.innerHTML =
'  <body>' +
'    <script src="./main.js" defer></script>' +
'    <section id="nav-bar">' +
'      <div class="container"> <!--white rectangle behind -->' +
'        <a id="logo">' +
'          XVSoft' +
'          <img src="./assets/logo-image.svg" alt="" id="logo-image">' +
'        </a>' +
'        <div id="page-title">' +
'          <img src="./assets/title-image.svg" alt="" id="title-image">' +
'          TOMATO' +
'        </div>' +
'        <button id="settings">' +
'          Settings' +
'        </button>' +
'      </div>' +
'    </div>' +
'  </section>' +
'  <section id="main">' +
'    <div id="settings-overlay" style="display: none;">' +
'      <div id="settings-header">' +
'        <button id="close-settings">' +
'          <img id="settings-exit" src="assets/exitButton.svg" alt="exit">' +
'        </button>' +
'        <p>Settings</p>' +
'      </div>' +
'      <hr>' +
'      <p>Adjust Time</p>' +
'      <div id="adjust-time">' +
'        <div>' +
'          <label for="pomo-time">Pomo Time:</label>' +
'          <input class="time-input" id="pomo-time" type="number" step="1" min="1" value="25" max="60">' +
'        </div>' +
'        <div>' +
'          <label for="short-break-time">Short Break Time:</label>' +
'          <input class="time-input" id="short-break-time" type="number" step="1" min="1" value="25" max="60">' +
'        </div>' +
'        <div>' +
'          <label for="long-break-time">Long Break Time:</label>' +
'          <input class="time-input" id="long-break-time" type="number" step="1" min="1" value="25" max="60">' +
'        </div>' +
'      </div>' +
'    </div>' +
'    <div id="progress-bar">' +
'      <div id="progress-background">' +
'        <img id="progress-bar-background" src="./assets/backgroundProgressBar.svg" alt="Progress Bar Background">' +
'      </div>' +
'      <div id="filler-bar-1">' +
'        <svg id="filler-bar-1-svg" width="0" height="8">' +
'          <rect width="100000" height="6" style="fill:red;" />' +
'        </svg>' +
'      </div>' +
'      <div id="filler-bar-2">' +
'        <svg id="filler-bar-2-svg" width="0" height="8">' +
'          <rect width="100000" height="6" style="fill:red;" />' +
'        </svg>' +
'      </div>' +
'      <div>' +
'        <img id="progress-tomato-1" src="./assets/progressBarTomato.svg" alt="progress bar work tomato">' +
'      </div>' +
'      <div>' +
'        <img id="progress-tomato-2" src="./assets/progressBarTomato.svg" alt="progress bar break tomato">' +
'      </div>' +
'      <div>' +
'        <img id="progress-tomato-3" src="./assets/progressBarTomato.svg" alt="progress bar next! tomato">' +
'      </div>' +
'    </div>' +
'    <div id="timer">' +
'      <div id="empty-seeds">' +
'        <img id="seeds" src="./assets/emptySeeds.svg" alt="plain seed">' +
'      </div>' +
'      <img id="timer-background" src="./assets/timerBackground.svg" alt="Timer background">' +
'      <button id="play">' +
'        <span id="play-button"></span>' +
'      </button>' +
'      <button id="stop">' +
'        <span id="stop-button"></span>' +
'      </button>' +
'      <p id="time">25:00</p>' +
'    </div>' +
'    <div id="task-container">' +
'      <div id="task-list">' +
'	<p>TASK LIST </p>' +
'	<img src="./assets/arrrowDropdown.svg" alt="Dropdown">' +
'      </div>' +
'      <div id="empty-task-queue">' +
'	<div id="task-description">' +
'	  <img id="task-icon" src="./assets/taskIcon.svg" alt="task icon">' +
'	  <p>Add a new task and start working.</p>' +
'	</div>' +
'	<button id="task-add-button">' +
'	  <img src="./assets/addButton.svg" alt="Plus Button" id="plus-image">' +
'	  Add task' +
'	</button>' +
'      </div>' +
'      <div id="task-queue" style="display: flex;">' +
'	<div id="task-body">' +
'	  <!-- Adding a task-->' +
'	  <div id="adding-task-object">' +
'	    <div id="task-flex">' +
'	      <div id="task-input">' +
'		<p id="task-header">TASK</p>' +
'		<input id="pomo-task" name="pomo-task" type="text">' +
'	      </div>' +
'	    </div>' +
'	    <button id="add-task">' +
'	      <img src="assets/addButton.svg" alt="add task" id="add-task-icon">' +
'	    </button>' +
'	  </div>' +
'	  ' +
'	  <!-- Actual Object to be appended-->' +
'	  <div id="tasks">' +
'	  </div>' +
'	</div>' +
'      </div>' +
'    </div>' +
'    <div id="restart-wrapper">' +
'      <button id="play-restart">' +
'	<span id="restart-button"></span>' +
'      </button>' +
'    </div>' +
'    <div class="active" id="onboarding">' +
'      <div id="onboarding-black"></div>' +
'      <div id="onboarding-background">' +
'        <div id="wrapper">' +
'          <!-- use arrow on leftto hide all this text -->' +
'          <div>' +
'            <div id="o1" class="otext">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image1">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image2">' +
'              <div class="onboarding-text">' +
'                <h1>The Pomodoro Technique</h1>' +
'                <p>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.' +
'                  <br>' +
'                  <br>' +
'                  The technique uses a timer to break down work into intervals, traditionally 25 minutes in length,' +
'                  separated by short breaks.' +
'                  <br>' +
'                  <br>' +
'                  It is named the pomodoro technique after the round tomato timer he used during university, as Pomodoro' +
'                  means tomato in Italian.' +
'                </p>' +
'              </div>' +
'            </div>' +
'            <div id="o2" class="otext">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image1">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image2">' +
'              <div class="onboarding-text">' +
'                <h1>How to use our Pomodoro Timer</h1>' +
'                <p>We made this pomodoro timer to facilitate productivity.' +
'                  <br>' +
'                  <br>' +
'                  ...' +
'                </p>' +
'              </div>' +
'            </div>' +
'            <div id="o3" class="otext">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image1">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image2">' +
'              <div class="onboarding-text">' +
'                <h1>Step 1</h1>' +
'                <p>...</p>' +
'              </div>' +
'            </div>' +
'            <div id="o4" class="otext">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image1">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image2">' +
'              <div class="onboarding-text">' +
'                <h1>Step 2</h1>' +
'                <p>...</p>' +
'              </div>' +
'            </div>' +
'            <div id="o5" class="otext">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image1">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image2">' +
'              <div class="onboarding-text">' +
'                <h1>Step 3</h1>' +
'                <p>...</p>' +
'              </div>' +
'            </div>' +
'            <div id="o6" class="otext">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image1">' +
'              <img src="./assets/image1.png" alt="" id="onboarding-image2">' +
'              <div class="onboarding-text">' +
'                <h1>Start working!</h1>' +
'                <p>...</p>' +
'              </div>' +
'            </div>' +
'          </div>' +
'          <div id="onboarding-progress">' +
'            <img src="./assets/onboarding.svg" alt="" id="onboarding-progress-bar">' +
'            <button id="onboarding-button">' +
'              <span id="onboarding-button-img"></span>' +
'            </button>' +
'          </div>' +
'        </div>' +
'      </div>' +
'    </div>' +
'  </section>' +
'</body>'

const main = require('../source/main')

describe('create a new task', () => {
  test('building a task element', () => {
    const task_input = document.getElementById('pomo-task')
    task_input.value = 'test text for our task!'
    const elem = main.buildNewTask()

    expect(elem.className).toBe('task-object')

    /* check that each child of the task object is properly set */
    expect(elem.children[0].className).toBe('focus-task-button')
    expect(elem.children[1].className).toBe('delete-task-button')
    expect(elem.children[2].className).toBe('task-text')
    expect(elem.children[2].innerHTML).toBe('test text for our task!')
    expect(elem.children[3].className).toBe('complete-task-button')

    elem.children[1].click()
  })

  test('adding the task to default list', () => {
    /* create two tasks and add them to the task list */
    const task_input = document.getElementById('pomo-task')
    task_input.value = 'test text for our task!'
    main.addToList()
    task_input.value = 'here is our other task'
    main.addToList()
    const list = document.getElementsByClassName('task-object')

    expect(list[0].children[0].className).toBe('focus-task-button')
    expect(list[0].children[1].className).toBe('delete-task-button')
    expect(list[0].children[2].className).toBe('task-text')
    expect(list[0].children[2].innerHTML).toBe('test text for our task!')
    expect(list[0].children[3].className).toBe('complete-task-button')

    expect(list[1].children[0].className).toBe('focus-task-button')
    expect(list[1].children[1].className).toBe('delete-task-button')
    expect(list[1].children[2].className).toBe('task-text')
    expect(list[1].children[2].innerHTML).toBe('here is our other task')
    expect(list[1].children[3].className).toBe('complete-task-button')

    list[0].children[1].click()
    list[0].children[1].click()
  })
})

describe('moving tasks between lists', () => {
  test('focus a task', () => {
    let task_input = document.getElementById('pomo-task')
    task_input.value = 'test text for our task!'
    main.addToList()
    let list = document.getElementsByClassName('task-object')
    list[0].children[0].click()
    let focused = document.getElementsByClassName('focused-task')

    expect(focused[0].children[0].className).toBe('focus-task-button')
    expect(focused[0].children[1].className).toBe('delete-task-button')
    expect(focused[0].children[2].className).toBe('task-text')
    expect(focused[0].children[2].innerHTML).toBe('test text for our task!')
    expect(focused[0].children[3].className).toBe('complete-task-button')

    focused[0].children[1].click()
    expect(list.length).toBe(0)
    expect(focused.length).toBe(0)
  })

  test('focus one task, remove another', () => {
    let task_input = document.getElementById('pomo-task')
    task_input.value = 'task 1'
    main.addToList()
    task_input.value = 'task 2'
    main.addToList()
    let list = document.getElementsByClassName('task-object')
    /* focus top task then the remaining one */
    list[0].children[0].click()
    list[0].children[0].click()
    expect(list.length).toBe(1)
    /* task 2 should now be the focused one */
    let focused = document.getElementsByClassName('focused-task')

    expect(list[0].children[2].innerHTML).toBe('task 1')
    expect(focused[0].children[2].innerHTML).toBe('task 2')

    list[0].children[1].click()
    list = document.getElementsByClassName('task-object')
    focused[0].children[1].click()
    expect(list.length).toBe(0)
  })

  test('complete a task in normal list', () => {
    let task_input = document.getElementById('pomo-task')
    task_input.value = 'test text for our task!'
    main.addToList()
    let list = document.getElementsByClassName('task-object')
    list[0].children[3].click()

    let completed = document.getElementsByClassName('completed-task')
    expect(completed[0].className).toBe('completed-task')
    completed[0].children[0].click()
    expect(list.length).toBe(0)
    expect(completed.length).toBe(0)

  })

  test('complete a focused task', () => {
    let task_input = document.getElementById('pomo-task')
    task_input.value = 'task 1'
    main.addToList()
    let list = document.getElementsByClassName('task-object')

    /* focus then complete task */
    list[0].children[0].click()
    let focused = document.getElementsByClassName('focused-task')
    focused[0].children[3].click()
    let completed = document.getElementsByClassName('completed-task')

    expect(list.length).toBe(0)
    expect(focused.length).toBe(0)
    expect(completed.length).toBe(1)
    expect(completed[0].children[1].innerHTML).toBe('task 1')
    completed[0].children[0].click()
  })
})

  
describe('deleting tasks', () => {
  test('delete a regular task', () => {
    let task_input = document.getElementById('pomo-task')
    task_input.value = 'task 1'
    main.addToList()
    let list = document.getElementsByClassName('task-object')

    expect(list.length).toBe(1)
    list[0].children[1].click()
    expect(list.length).toBe(0)
  })

  test('delete a task between other tasks', () => {
    let task_input = document.getElementById('pomo-task')
    task_input.value = 'task 1'
    main.addToList()
    task_input.value = 'task 2'
    main.addToList()
    task_input.value = 'task 3'
    main.addToList()
    let list = document.getElementsByClassName('task-object')

    expect(list.length).toBe(3)
    /* delete middle task */
    list[1].children[1].click()
    expect(list.length).toBe(2)
    expect(list[0].children[2].innerHTML).toBe('task 1')
    expect(list[1].children[2].innerHTML).toBe('task 3')
    
    list[0].children[1].click()
    list[0].children[1].click()
  })

  test('delete a focused task', () => {
    let task_input = document.getElementById('pomo-task')
    task_input.value = 'task 1'
    main.addToList()
    let list = document.getElementsByClassName('task-object')
    list[0].children[0].click()
    let focused = document.getElementsByClassName('focused-task')

    focused[0].children[1].click()
    expect(list.length).toBe(0)
    expect(focused.length).toBe(0)
  })

  test('delete a completed task', () => {
    let task_input = document.getElementById('pomo-task')
    task_input.value = 'task 1'
    main.addToList()
    let list = document.getElementsByClassName('task-object')
    list[0].children[3].click()
    let comp = document.getElementsByClassName('completed-task')

    comp[0].children[0].click()
    expect(list.length).toBe(0)
    expect(comp.length).toBe(0)
  })
})

describe('updating focused task time', () => {
  test('call updateTimer to add to focused task time', () => {
    main.pomoSession.state = 'work'
    main.timer.timerLen = 1

    let task_input = document.getElementById('pomo-task')
    task_input.value = 'test text for our task!'
    main.addToList()
    let list = document.getElementsByClassName('task-object')
    list[0].children[0].click()
    let focused = document.getElementsByClassName('focused-task')
    expect(main.focusedTask[0].time).toBe(0)

    main.updateTimer()
    expect(main.focusedTask[0].time).toBe(1000)
    focused[0].children[1].click()
  })

  test('call updateTimer while state is not work', () => {
    main.timer.timerLen = 0
    let task_input = document.getElementById('pomo-task')
    task_input.value = 'test text for our task!'
    main.addToList()
    let list = document.getElementsByClassName('task-object')
    list[0].children[0].click()
    let focused = document.getElementsByClassName('focused-task')
    expect(main.focusedTask[0].time).toBe(0)

    main.updateTimer()
    expect(main.focusedTask[0].time).toBe(0)
    focused[0].children[1].click()
  })
})
