const { hideOnClickOutside } = require('../source/main.js')
const main = require('../source/main.js')
describe ('onBoardingClick Functionality', () => {
  // const windowSpy = jest.spyOn(global, "window", "get").mockImplementation(() => ({
  //   current: 6
  // }));

  document.body.innerHTML = 
  '<div class="active" id="onboarding">' +
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
  '<img src="./assets/onboarding.svg" alt="" id="onboarding-progress-bar">'+
  '<button id="onboarding-button">' +
  '<span id="onboarding-button-img">' + '</span>' +
  '</button>' +
  '</div>' +
  '</div>'

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
      document.getElementById(`onboarding-progress-bar`).src = 'wrong'
      main.onBoardingClick()
      expect(document.getElementById(`onboarding-progress-bar`).src).toBe(`http://localhost/assets/onboarding-${i + 1}.svg`)
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
  beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
  });
  afterEach(() => {
    windowSpy.mockRestore();
  });
  document.body.innerHTML = 
  '<div class="active" id="onboarding">' +
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
  '<img src="./assets/onboarding.svg" alt="" id="onboarding-progress-bar">'+
  '<button id="onboarding-button">' +
  '<span id="onboarding-button-img">' + '</span>' +
  '</button>' +
  '</div>' +
  '</div>' +
  '<button id="play-restart">' +
  '<span id="restart-button">' + '</span>' +
  '</button>'
  it ('Once function is called, adds eventListener', () => {
    const elementMock = { addEventListener: jest.fn()}
    jest.spyOn(document,'getElementById').mockImplementation(() => elementMock)

    main.restartSession()
    expect(elementMock.addEventListener).toBeCalledWith('click', expect.any(Function))
  })

  it( 'Event Listener is functioning', () => {
      let mockElement = document.createElement('div')
      mockElement.setAttribute('id', 'onboarding')
      mockElement.setAttribute('class','active')
      jest.spyOn(document,'getElementById').mockImplementation(() => mockElement)

      // onBoardingVars.onboarding = document.getElementById('onboarding')
      main.restartClick()
      expect(mockElement.getAttribute('class')).toBe('active')
      expect(main.onBoardingVars.current).toBe(1)
  })
  it( 'restartOnboarding correctly sets viewstyles to be none and has current as block', () => {
    main.onBoardingVars.current = 1
    main.onBoardingVars.textDivs = [...document.querySelectorAll('.otext')]
    main.onBoardingVars.textDivs.forEach(item => item.style.display = 'block')
    main.restartOnboarding()
    main.onBoardingVars.textDivs.forEach(item => {
      expect(item.style.display).toBe('none')
    })
    expect(document.getElementById(`o${main.onBoardingVars.current}`).style.display = 'block')
    expect(document.getElementById('onboarding-progress-bar').src).toBe(`./assets/onboarding-${main.onBoardingVars.current}.svg`)
  })
})

describe('hideOnClickOutside test', () => {
  document.body.innerHTML = 
  '<div class="active" id="onboarding">' +
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
  '<img src="./assets/onboarding.svg" alt="" id="onboarding-progress-bar">'+
  '<button id="onboarding-button">' +
  '<span id="onboarding-button-img">' + '</span>' +
  '</button>' +
  '</div>' +
  '</div>' +
  '<button id="play-restart">' +
  '<span id="restart-button">' + '</span>' +
  '</button>'
  it('hideOnClickOutside adds eventlisteners and removes', () => {
    const elementMock = { addEventListener: jest.fn()}
    jest.spyOn(document,'getElementById').mockImplementation(() => elementMock)
    jest.spyOn(elementMock, 'addEventListener')
    jest.spyOn(document, 'addEventListener').mockImplementation(() => jest.fn())
    hideOnClickOutside(document.getElementById('onboarding'),document.getElementById('play-restart'))

    expect(document.addEventListener).toBeCalledWith('click', expect.any(Function))
  })
})