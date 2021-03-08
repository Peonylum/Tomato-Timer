
document.body.innerHTML =
'<div id="task-container">' +
'  <div id="task-list">' +
'    <!-- change color of text during breaks(in CSS file)-->' +
'    <p>TASK LIST </p>' +
'    <!-- switch with collapsed arrow on click: src="./assets/collapsedArrow.svg" alt="Collapsed Arrow"-->' +
'    <img src="./assets/arrrowDropdown.svg" alt="Dropdown">' +
'  </div>' +
'  <div id="empty-task-queue">' +
'    <div id="task-description">' +
'      <img id="task-icon" src="./assets/taskIcon.svg" alt="task icon">' +
'      <p>Add a new task and start working.</p>' +
'    </div>' +
'    <button id="task-add-button">' +
'      <img src="./assets/addButton.svg" alt="Plus Button" id="plus-image">' +
'      Add task' +
'    </button>' +
'  </div>' +
'  <!--Unhide when there are tasks-->' +
'  <div id="task-queue" style="display: flex;">' +
'    <!-- <div id="task-queue-header">' +
'         <p id="pomo-task-header">POMOS</p>' +
'         <p id="task-header">TASK</p>' +
'    </div> -->' +
'    <!-- Append tasks to this task body-->' +
'    <div id="task-body">' +
'      <!-- Adding a task-->' +
'      <div id="adding-task-object">' +
'        <div id="task-flex">' +
'          <div id="task-input">' +
'            <p id="task-header">TASK</p>' +
'            <input id="pomo-task" name="pomo-task" type="text">' +
'          </div>' +
'        </div>' +
'        <button id="add-task">' +
'          <img src="assets/addButton.svg" alt="add task" id="add-task-icon">' +
'        </button>' +
'      </div>' +
'      <!-- Actual Object to be appended-->' +
'      <div id="tasks">' +
'      </div>' +
'    </div>' +
'  </div>' +
'</div>'

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
