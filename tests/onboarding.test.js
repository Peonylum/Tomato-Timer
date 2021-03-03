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

describe('restartSession functionality', () => {
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
      const elementMock = { addEventListener: jest.fn()}
      jest.spyOn(document,'getElementById').mockImplementation(() => elementMock)
      jest.spyOn(global, window, 'get').mockImplementation(() => ({hideOnClickOutside: console.log('mock')}))
      main.onBoardingVars.onboarding = document.getElementById('onboarding')

      // onBoardingVars.onboarding = document.getElementById('onboarding')
      main.restartSession()
      const handler = elementMock.addEventListener.mock.calls[0][1]
      handler();
      expect(onBoardingVars.onboarding.getAttribute('class')).toBe('active')
      expect(onBoardingVars.current).toBe(1)
  })
})