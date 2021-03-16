/* Script for modifying the task list via drag-and-drop */
function tasklist () {
  const focusedTask = []
  const masterList = []
  const completedList = []
  let timeTrackRef

  document.getElementById('add-task').addEventListener('click', addToList)

  const list = document.getElementById('tasks')
  const listItems = []
  const delBtns = []
  const dropZones = []
  let curr

  function buildNewTask () {
    const taskInput = document.getElementById('pomo-task')
    const newTask = document.createElement('div')
    newTask.setAttribute('class', 'task-object')

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

    const dropZone = document.createElement('div')
    dropZone.setAttribute('id', 'drop-zone')

    /* This sets listeners for our drop areas to let us drop tasks into other spots */
    /* dragenter: when mouse enters boundary of drop area
       dragleave: when mouse leaves boundary of drop area
       dragover:  when element is being dragged over another
       drop:      when element is dropped */
    dropZones.push(dropZone)
    for (let i = 0; i < dropZones.length; i++) {
      dropZones[i].addEventListener('dragenter', function () { dragIn(this) })
      dropZones[i].addEventListener('dragleave', function () { dragOut(this) })
      dropZones[i].addEventListener('dragover', function (event) { dragOn(event) })
      dropZones[i].addEventListener('drop', function (event) { dropMove(event, this) })
    }

    /* These are listeners for when we drag a task item */
    /* dragstart: mouse is held and moved
       dragend:   when drag stops (seems similar to drop but follows the element
       being dragged instead of the drop zone) */
    newTask.addEventListener('dragstart', function () { dragTask(this) })
    newTask.addEventListener('dragend', function () { dropEnd() })

    redrawList()
  }

  function focusTask () {
    const temp = focusedTask.pop()
    const index = masterList.findIndex(x => x.taskBody === this.parentElement)
    focusedTask.push(masterList[index])
    focusedTask[0].taskBody.setAttribute('class', 'focused-task')
    focusedTask[0].taskBody.children[0].disabled = true
    focusedTask[0].taskBody.children[0].innerHTML = '<img src="assets/focusTaskActive.svg" alt="focus task" id="focus-task-activeicon">'

    clearInterval(timeTrackRef)
    timeTrackRef = setInterval(trackTime, 1000)

    /* Remove focused task from the list and if there was a previously
       focused task, add it back to the list */
    masterList.splice(index, 1)
    if (temp !== undefined) {
      temp.taskBody.setAttribute('class', 'task-object')
      temp.taskBody.children[0].disabled = false
      temp.taskBody.children[0].innerHTML = '<img src="assets/focusTask.svg" alt="focus task" id="focus-task-icon">'
      temp.taskBody.children[0].setAttribute('src', 'assets/focusTask.svg')
      masterList.splice(0, 0, temp)
    }

    /* Also get rid of the drop zone below the element being deleted */
    redrawList()
  }

  /* Removes an item from our task list */
  function delFromList () {
    if (focusedTask.length > 0) {
      if (this.parentElement === focusedTask[0].taskBody) {
        focusedTask.pop()
        clearInterval(timeTrackRef)
      }
    } else {
      const index = masterList.findIndex(x => x.taskBody === this.parentElement)
      if (index === -1) {
        completedList.splice(completedList.findIndex(x => x.taskBody === this.parentElement), 1)
      } else {
        masterList.splice(index, 1)
      }
    }
    clearInterval(timeTrackRef)

    /* Also get rid of the drop zone below the element being deleted */

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
    taskTime.innerHTML = 'Pomos: ' + (temp.time / (1000 * 60 * 1)).toFixed(1)
    temp.taskBody.appendChild(taskTime)

    completedList.push(temp)
    clearInterval(timeTrackRef)

    /* Also get rid of the drop zone below the element being deleted */

    redrawList()
  }

  /* Highlights valid drop zones when the dragged item moves over them */
  function dragIn (zone) {
    zone.setAttribute('class', 'active')
  }

  /* Removes highlight on drop zones when dragged item leaves */
  function dragOut (zone) {
    zone.setAttribute('class', '')
  }

  /* Dragover default needs to be overridden for proper dropping */
  function dragOn (event) {
    event.preventDefault()
  }

  /* This just helps us keep track of which bullet point is being moved */
  function dragTask (item) {
    curr = item
  }

  /* Rearranges the list when an item is dropped */
  function dropMove (event, item) {
    let bulletIndex
    let dropIndex
    event.preventDefault()
    for (let i = 0; i < listItems.length; i++) {
      if (curr === listItems[i]) {
        bulletIndex = i
      }
    }

    for (let i = 0; i < dropZones.length; i++) {
      if (item === dropZones[i]) {
        dropIndex = i
      }
    }

    /* Then we rearrange their array positions and re-draw the task list */
    movePos(bulletIndex, dropIndex)
    redrawList()

    dropEnd()
  }

  /* This is for manually removing the highlights, similar to dragOut function
     but when we rearrange it only fires a dragend event and not
     a dragleave so the highlight stays */
  function dropEnd () {
    for (const i of dropZones) {
      i.setAttribute('class', '')
    }
  }

  /* Take our bullet point and drop zone and use them to rewrite the array */
  function movePos (bullet, drop) {
    const tmpB = listItems[bullet]
    const tmpD = delBtns[bullet]

    /* Delete old bullet then put it in new spot in array */
    listItems.splice(bullet, 1)
    delBtns.splice(bullet, 1)
    if (drop === 0) {
      listItems.splice(drop, 0, tmpB)
      delBtns.splice(drop, 0, tmpD)
    } else {
      listItems.splice(drop - 1, 0, tmpB)
      delBtns.splice(drop - 1, 0, tmpD)
    }
  }

  /* This deletes all of the children of the task list and repopulates them
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

  function trackTime () {
    focusedTask[0].time += 1000
  }
}

tasklist()
