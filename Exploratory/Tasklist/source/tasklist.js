/* script for modifying the task list via drag-and-drop
 * this file may later absorb all of the task list functionality */

document.getElementById('listEntry').addEventListener('submit', addToList)

const list = document.getElementById('taskQueue')
const listItems = []
const delBtns = []
let curr
const dropZones = [document.getElementById('dropZone')]

/* this function adds bullet points and drag spaces to our list
   there is a cleaner way to do this, will update next sprint :)
   involves just adding to array then redrawing list, like in the
   functions to remove or rearrange */
function addToList () {
  event.preventDefault()
  const newItem = document.getElementById('task')
  const li = document.createElement('li')

  /* here we set the id of new bullet point to 'task' followed its position in
     the list to give them each a unique id */
  li.setAttribute('draggable', true)
  const delBtn = document.createElement('BUTTON')
  delBtn.innerHTML = 'X'
  delBtn.setAttribute('id', 'delBtn')
  const dropZone = document.createElement('DIV')
  dropZone.setAttribute('id', 'dropZone')
  li.appendChild(document.createTextNode(newItem.value))
  li.appendChild(delBtn)
  listItems.push(li)
  list.appendChild(li)
  list.appendChild(dropZone)

  /* both of the below loops that set event listeners are done pretty
     primitively and create redundant listeners, I'll find a better way of
     doing it */

  /* this lets us set event listeners for all the buttons we create
     it doesn't seem to work if we set 1 listener for all buttons go figure */
  delBtns.push(delBtn)
  for (let i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener('click', delFromList)
  }

  /* this sets listeners for our drop areas to let us drop tasks into other spots */
  /* dragenter: when mouse enters boundary of drop area
     dragleave: when mouse leaves boundary of drop area
     dragover:  when element is being dragged over another
     drop:      when element is dropped */
  dropZones.push(dropZone)
  for (let i = 0; i < dropZones.length; i++) {
    dropZones[i].addEventListener('dragenter', function () { dragIn(this) })
    dropZones[i].addEventListener('dragleave', function () { dragOut(this) })
    dropZones[i].addEventListener('dragover', function () { dragOn(event) })
    dropZones[i].addEventListener('drop', function () { dropMove(event, this) })
  }

  /* these are listeners for when we drag a task item */
  /* dragstart: mouse is held and moved
     dragend:   when drag stops (seems similar to drop but follows the element
     being dragged instead of the drop zone) */
  li.addEventListener('dragstart', function () { dragTask(this) })
  li.addEventListener('dragend', function () { dropEnd() })
  newItem.value = ''
}

/* removes an item from our task list */
function delFromList () {
  /* get rid of the button and bullet from our arrays before deleting it */
  listItems.splice(delBtns.indexOf(this), 1)
  delBtns.splice(delBtns.indexOf(this), 1)

  /* also get rid of the drop zone below the element being deleted */
  dropZones.splice(delBtns.indexOf(this), 1)

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
  list.appendChild(dropZones[0])

  for (let i = 1; i < dropZones.length; i++) {
    list.appendChild(listItems[i - 1])
    list.appendChild(dropZones[i])
  }
}
