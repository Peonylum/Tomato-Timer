/* script for modifying the task list via drag-and-drop
 * this file may later absorb all of the task list functionality */

/* TODO:
   create event listeners and functions for each of the buttons here
   modify delfromList to work with new modifications
*/
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

    /* const pomoNum = document.createElement('p')
       pomoNum.setAttribute('class', 'task-pomo-num')
       pomoNum.innerHTML = '0'
       newTask.appendChild(pomoNum) */

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

    /* this sets listeners for our drop areas to let us drop tasks into other spots */
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

    /* these are listeners for when we drag a task item */
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

    /* also get rid of the drop zone below the element being deleted */
    // dropZones.splice(delBtns.indexOf(this), 1)

    redrawList()
  }

  /* removes an item from our task list */
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

    /* also get rid of the drop zone below the element being deleted */
    // dropZones.splice(delBtns.indexOf(this), 1)

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

    /* also get rid of the drop zone below the element being deleted */
    // dropZones.splice(delBtns.indexOf(this), 1)

    redrawList()
  }

  /* highlights valid drop zones when the dragged item moves over them */
  function dragIn (zone) {
    zone.setAttribute('class', 'active')
  }

  /* removes highlight on drop zones when dragged item leaves */
  function dragOut (zone) {
    zone.setAttribute('class', '')
  }

  /* dragover default needs to be overridden for proper dropping */
  function dragOn (event) {
    event.preventDefault()
  }

  /* this just helps us keep track of which bullet point is being moved */
  function dragTask (item) {
    curr = item
  }

  /* rearranges the list when an item is dropped */
  function dropMove (event, item) {
    /* NOTE: there is definitely a more clever way of doing this
       involving the indexOf function
       these weird for loops basically find out where the item
       and dropzone is in their respective arrays */
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

    /* then we rearrange their array positions and re-draw the task list */
    movePos(bulletIndex, dropIndex)
    redrawList()

    dropEnd()
  }

  /* this is for manually removing the highlights, similar to dragOut function
     but when we rearrange it only fires a dragend event and not
     a dragleave so the highlight stays haha */
  function dropEnd () {
    for (const i of dropZones) {
      i.setAttribute('class', '')
    }
  }

  /* take our bullet point and drop zone and use them to rewrite the array */
  function movePos (bullet, drop) {
    const tmpB = listItems[bullet]
    const tmpD = delBtns[bullet]

    /* delete old bullet then put it in new spot in array */
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

  /* this deletes all of the children of the task list and repopulates them
     using the arrays that represent their contents */
  function redrawList () {
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }

    /* this is the first dropZone, then every bullet point also has an
       associated dropZone below it so we have coverage above and below
       every bullet */
    // list.appendChild(dropZones[0])

    /* for (let i = 1; i < dropZones.length; i++) {
       list.appendChild(listItems[i - 1])
       list.appendChild(dropZones[i])
       } */

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
