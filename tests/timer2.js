document.body.innerHTML = '<div>' +
  '<button id="play">' +
  '<span id="play-button"></span>' +
  '</button>' +
  '<button id="stop">' +
  '<span id="stop-button"></span>' +
  '</button>' +
  '<p id="time">25:00</p>' +
  '</div>' +
  '<img id="seeds" src="./assets/emptySeeds.svg" alt="plain seed">' +
  '<img src="./assets/onboarding.svg" alt="" id="onboarding-progress-bar">' +
  '<img id="progress-bar-background" src="./assets/backgroundProgressBar.svg" alt="Progress Bar Background">' +
  '<svg id="filler-bar-1-svg" width="0" height="8">' +
  '<svg id="filler-bar-2-svg" width="0" height="8">'

const { pomoSession } = require('../source/main')
const main = require('../source/main')

describe('runTimer', () => {
  jest.useFakeTimers()
  test('The first time the timer starts', () => {
    const callback = jest.fn()
    main.pomoSession.firstStart = true
    main.runTimer(callback)
    jest.advanceTimersByTime(3000)
    expect(main.pomoSession.firstStart).toBe(false)
    expect(setInterval).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(3)
  })

  test('Not the first time the timer starts', () => {
    const callback = jest.fn()
    main.pomoSession.firstStart = false
    main.runTimer(callback)
    jest.advanceTimersByTime(6000)
    expect(main.pomoSession.firstStart).toBe(false)
    expect(setInterval).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(6)
  })
})

describe('updateTimeLen', () => {
  test('In work state', () => {
    main.pomoSession.state = 'work'
    main.pomoSession.pomoLen = 1

    expect(main.updateTimerLen()).toBe(60000)
  })

  test('In short break state', () => {
    main.pomoSession.state = 'shortBreak'
    main.pomoSession.shortBreakLen = 2

    expect(main.updateTimerLen()).toBe(120000)
  })

  test('In long break state', () => {
    main.pomoSession.state = 'longBreak'
    main.pomoSession.longBreakLen = 3

    expect(main.updateTimerLen()).toBe(180000)
  })
})

describe('displayMinSecond', () => {
  test('1 digit minutue and 1 digit second', () => {
    const timerLen = 121000
    main.displayMinSecond(timerLen)
    expect(document.getElementById('time').innerHTML).toBe('02:01')
  })

  test('1 digit minutue and 2 digit second', () => {
    const timerLen = 141000
    main.displayMinSecond(timerLen)
    expect(document.getElementById('time').innerHTML).toBe('02:21')
  })

  test('2 digit minutue and 1 digit second', () => {
    const timerLen = 725000
    console.log()
    main.displayMinSecond(timerLen)
    expect(document.getElementById('time').innerHTML).toBe('12:05')
  })

  test('2 digit minutue and 2 digit second', () => {
    const timerLen = 741000
    main.displayMinSecond(timerLen)
    expect(document.getElementById('time').innerHTML).toBe('12:21')
  })
})

describe('updateTimer', () => {
  test('timerLen greater than 0', () => {
    main.timer.timerLen = 10000
    main.updateTimer()
    expect(clearInterval).not.toBeCalled()
    expect(main.timer.timerLen).toBe(9000)
  })

  test('timerLen less than or equal 0', () => {
    main.timer.timerLen = 0
    main.updateTimer()
    expect(clearInterval).toBeCalled()
    expect(main.timer.timerLen).toBe(59000)
  })
})

describe('updateProgressBar, updateSeedsImage', () => { 
  it('updateProgressBar', () => {
    pomoSession.state = 'shortBreak'
    main.updateProgressBar()
    main.updateSeedsImage()
    main.timer.timerLen = 0
    console.log(document.getElementById('filler-bar-2-svg').getAttribute('width'))
    expect(document.getElementById('filler-bar-2-svg').getAttribute('width')).toBe('27.45')//TODO
  })
})

describe('stateChange', () => {
  test('In work state and number of count is less than Pomoset', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    main.pomoSession.state = 'work'
    main.pomoSession.pomoLen = 1
    main.pomoSession.count = 0
    main.pomoSession.pomoPerSet = 2
    main.stateChange(callback1, callback2)
    expect(main.pomoSession.state).toBe('shortBreak')
    expect(callback1).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })

  test('In work state and number of count equals Pomoset', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    main.pomoSession.state = 'work'
    main.pomoSession.pomoLen = 2
    main.pomoSession.count = 2
    main.pomoSession.pomoPerSet = 2
    main.stateChange(callback1, callback2)

    expect(main.pomoSession.state).toBe('longBreak')
    expect(callback1).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })

  test('In shortBreak state and ++count=pomoPerSet', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    const playBtn = document.getElementById('play')
    const stopBtn = document.getElementById('stop')
    const progressBar = document.getElementById('progress-bar-background')
    main.pomoSession.state = 'shortBreak'
    main.pomoSession.pomoLen = 5
    main.pomoSession.count = 1
    main.pomoSession.pomoPerSet = 2
    main.pomoSession.firstStart = false

    main.stateChange(callback1, callback2)

    expect(main.pomoSession.state).toBe('work')
    expect(main.pomoSession.count).toBe(2)
    expect(main.pomoSession.firstStart).toBe(true)

    expect((progressBar).getAttribute('src')).toBe('/source/assets/progressBarLongBreak.svg')

    expect(playBtn.style.display).toBe('block')
    expect(stopBtn.style.display).toBe('none')
    expect(main.timer.timerLen).toBe(300000)
    expect(callback1).toHaveBeenCalledTimes(0)
    expect(callback2).toHaveBeenCalledTimes(1)
  })

  test('In shortBreak state and ++count<pomoPerSet', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    const playBtn = document.getElementById('play')
    const stopBtn = document.getElementById('stop')
    const progressBar = document.getElementById('progress-bar-background')
    main.pomoSession.state = 'shortBreak'
    main.pomoSession.pomoLen = 5
    main.pomoSession.count = 0
    main.pomoSession.pomoPerSet = 3
    main.pomoSession.firstStart = false

    main.stateChange(callback1, callback2)

    expect(main.pomoSession.state).toBe('work')
    expect(main.pomoSession.count).toBe(1)
    expect(main.pomoSession.firstStart).toBe(true)

    expect((progressBar).getAttribute('src')).toBe('./assets/backgroundProgressBar.svg')

    expect(playBtn.style.display).toBe('block')
    expect(stopBtn.style.display).toBe('none')
    expect(main.timer.timerLen).toBe(300000)
    expect(callback1).toHaveBeenCalledTimes(0)
    expect(callback2).toHaveBeenCalledTimes(1)
  })

  test('In longBreak state', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    const playBtn = document.getElementById('play')
    const stopBtn = document.getElementById('stop')
    const progressBar = document.getElementById('progress-bar-background')
    main.pomoSession.state = 'longBreak'
    main.pomoSession.pomoLen = 3
    main.pomoSession.count = 1
    main.pomoSession.pomoPerSet = 4
    main.pomoSession.sets = 1
    main.pomoSession.firstStart = false

    main.stateChange(callback1, callback2)

    expect(main.pomoSession.state).toBe('work')
    expect(main.pomoSession.count).toBe(0)
    expect(main.pomoSession.sets).toBe(2)
    expect(main.pomoSession.firstStart).toBe(true)
    expect(main.timer.timerLen).toBe(180000)
    expect(playBtn.style.display).toBe('block')
    expect(stopBtn.style.display).toBe('none')
    
    expect(callback1).toHaveBeenCalledTimes(0)
    expect(callback2).toHaveBeenCalledTimes(1)
  })
})
