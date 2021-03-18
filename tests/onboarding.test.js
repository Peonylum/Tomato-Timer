const { hideOnClickOutside, addContent, onBoardingVars } = require('../source/main.js')
const main = require('../source/main.js')
const innerHTML = '<div class="active" id="onboarding">' +
'<div id="o1" class="otext">' +
'wow' +
'</div>' +
'<div id="o2" class="otext">' +
'wow' +
'</div>' +
'<div id="o3" class="otext">' +
'wow' +
'</div>' +
'<div id="o4" class="otext">' +
'wow' +
'</div>' +
'<div id="o5" class="otext">' +
'wow' +
'</div>' +
'<div id="o6" class="otext">' +
'wow' +
'</div>' +
'<div id="onboarding-progress">' +
'<img src="./assets/onboarding.svg" alt="" id="onboarding-progress-bar">' +
'<button id="onboarding-button">' +
'<span id="onboarding-button-img">' + '</span>' +
'</button>' +
'</div>' +
'</div>' +
'<button id="add-task">' +
'<img src="assets/addButton.svg" alt="add task" id="add-task-icon">' +
'</button>'

describe('onBoardingClick Functionality', () => {
  document.body.innerHTML = innerHTML

  for (let i = 1; i <= 6; i++) {
    it(`Correctly sets onboarding ${i} display to be none,`, () => {
      main.onBoardingVars.current = i
      document.getElementById(`o${i}`).style.display = 'block'
      main.onBoardingClick()
      expect(document.getElementById(`o${i}`).style.display).toBe('none')
    })
  }

  for (let i = 1; i <= 5; i++) {
    it(`Correctly sets onboarding-progress bar for current=${i} to be asset ${i + 1}`, () => {
      main.onBoardingVars.current = i
      document.getElementById('onboarding-progress-bar').src = 'wrong'
      main.onBoardingClick()
      expect(document.getElementById('onboarding-progress-bar').src).toBe(`http://localhost/assets/onboarding-${i + 1}.svg`)
    })
  }

  for (let i = 1; i <= 5; i++) {
    it(`If current = ${i}, onboarding ${i + 1} display is block`, () => {
      main.onBoardingVars.current = i
      document.getElementById(`o${i}`).style.display = 'block'
      main.onBoardingClick()
      expect(document.getElementById(`o${i + 1}`).style.display).toBe('block')
    })
  }
  it('if current (onboarding display) > 6, close', () => {
    main.onBoardingVars.current = 6
    expect(main.onBoardingClick()).toBe('closed')
    expect(document.getElementById('onboarding').classList.contains('in-active')).toBe(true)
  })
})

describe('restartSession, restartClick, restartOnBoarding functionality', () => {
  document.body.innerHTML = innerHTML
  it('Once function is called, adds eventListener', () => {
    const elementMock = { addEventListener: jest.fn() }
    jest.spyOn(document, 'getElementById').mockImplementation(() => elementMock)

    main.restartSession()
    expect(elementMock.addEventListener).toBeCalledWith('click', expect.any(Function))
  })

  it('Event Listener is functioning', () => {
    const mockElement = document.createElement('div')
    mockElement.setAttribute('id', 'onboarding')
    mockElement.setAttribute('class', 'active')
    jest.spyOn(document, 'getElementById').mockImplementation(() => mockElement)

    // onBoardingVars.onboarding = document.getElementById('onboarding')
    main.restartClick()
    expect(mockElement.getAttribute('class')).toBe('active')
    expect(main.onBoardingVars.current).toBe(1)
  })
  it('restartOnboarding correctly sets viewstyles to be none and has current as block', () => {
    main.onBoardingVars.current = 1
    main.onBoardingVars.textDivs = [...document.querySelectorAll('.otext')]
    main.onBoardingVars.textDivs.forEach(item => { item.style.display = 'block' })
    main.restartOnboarding()
    main.onBoardingVars.textDivs.forEach(item => {
      expect(item.style.display).toBe('none')
    })
    expect(document.getElementById(`o${main.onBoardingVars.current}`).style.display = 'block')
    expect(document.getElementById('onboarding-progress-bar').src).toBe(`./assets/onboarding-${main.onBoardingVars.current}.svg`)
  })
})

describe('hideOnClickOutside test', () => {
  document.body.innerHTML = innerHTML
  it('hideOnClickOutside adds eventlisteners and removes', () => {
    const elementMock = { addEventListener: jest.fn(), contains: jest.fn().mockReturnValue(false), setAttribute: jest.fn() }
    jest.spyOn(document, 'getElementById').mockImplementation(() => elementMock)
    jest.spyOn(elementMock, 'addEventListener')
    jest.spyOn(document, 'addEventListener').mockImplementation(() => jest.fn())
    let mockElement = document.createElement('div')
    mockElement.setAttribute('id', 'onboarding')
    mockElement.setAttribute('class', 'active')
    mockElement = { ...mockElement, contains: jest.fn().mockReturnValue(false) }
    const mockedFormEvent = { target: { id: 'hello' } }

    hideOnClickOutside(document.getElementById('onboarding'), 'play-restart')
    const handler = document.addEventListener.mock.calls[0][1]
    handler(mockedFormEvent)
    expect(elementMock.setAttribute).toBeCalledWith('class', 'in-active')
    expect(document.addEventListener).toBeCalledWith('click', expect.any(Function))
  })
  it('hideOnClickOutside else', () => {
    const elementMock = { addEventListener: jest.fn(), contains: jest.fn().mockReturnValue(true), setAttribute: jest.fn() }
    jest.spyOn(document, 'getElementById').mockImplementation(() => elementMock)//
    jest.spyOn(elementMock, 'addEventListener')//
    jest.spyOn(document, 'addEventListener').mockImplementation(() => jest.fn())//
    let mockElement = document.createElement('div')//
    mockElement.setAttribute('id', 'onboarding')//
    mockElement.setAttribute('class', 'active')//
    mockElement = { ...mockElement, contains: jest.fn().mockReturnValue(false) }//
    const mockedFormEvent = { target: { id: 'hello' } }//

    hideOnClickOutside(document.getElementById('onboarding'), 'play-restart')//
    const handler = document.addEventListener.mock.calls[0][1]//
    handler(mockedFormEvent)//
    expect(elementMock.setAttribute).not.toHaveBeenCalled()
  })
})

describe('addContent', () => {
  document.body.innerHTML = innerHTML
  onBoardingVars.onboardingButton = document.getElementById('onboarding-button')
  onBoardingVars.onboarding = document.getElementById('onboarding')
  it('addContent false test', () => {
    const myStorage = window.localStorage
    myStorage.setItem('firstTime', false)
    addContent()
    expect(onBoardingVars.onboarding.getAttribute('class')).toBe('in-active')
  })
})
