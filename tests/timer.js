// const main = require('../source/main')

document.head.innerHTML = '<style>' +
    '.in-active#onboarding {' +
    'display: none;' +
    '}' +
    '.active#onboarding {' +
    'display: block;' +
    '}' +
    '</style>'

document.body.innerHTML = '<div id="timer">' +
    '<div id="empty-seeds">' +
    '<img src="./assets/emptySeeds.svg" alt="plain seed">' +
    '</div>' +
    '<img id="timer-background" src="./assets/timerBackground.svg" alt="Timer background">' +
    '<button id="play">' +
    '<span id="play-button"></span>' +
    '</button>' +
    '<button id="stop">' +
    '<span id="stop-button"></span>' +
    '</button>' +
    '<p id="time">25:00</p>' +
    '</div>' +
    '<div id="settings"></div>' +
    '<div id="close-settings"></div>' +
    '<div id="pomo-time"></div>' +
    '<div id="volume-text"></div>' +
    '<div id="volume-slider"></div>' +
    '<div id="onboarding-black"></div>' +
    '<div id="onboarding-background">' +
    '<div id="o1"></div>' +
    '<div id="play-restart"></div>' +
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
    '<img src="./assets/onboarding.svg" alt="" id="onboarding-progress-bar">' +
    '<button id="onboarding-button">' +
    '<span id="onboarding-button-img">' + '</span>' +
    '</button>' +
    '</div>' +
    '</div>' +
    '<div id="adjust-time">' +
        '<div>' +
          '<label for="pomo-time">Pomo Time:</label>' +
          '<input class="time-input" id="pomo-time" type="number" step="1" min="1" value="25" max="60">' +
        '</div>' +
        '<div>' +
          '<label for="short-break-time">Short Break Time:</label>' +
          '<input class="time-input" id="short-break-time" type="number" step="1" min="1" value="25" max="60">' +
        '</div>' +
        '<div>' +
          '<label for="long-break-time">Long Break Time:</label>' +
          '<input class="time-input" id="long-break-time" type="number" step="1" min="1" value="25" max="60">' +
        '</div>' +
        '<!-- TODO: add interval to make sure can only put whole numbers -->' +
      '</div>'

const main = require('../source/main')

const evt = document.createEvent('Event')
evt.initEvent('DOMContentLoaded', true, true, document, '', '', '', 0)
document.dispatchEvent(evt)

describe('startSession', () => {
    test('Hide a start button and display a stop button', () => {
        const playBtn = document.getElementById('play')
        const stopBtn = document.getElementById('stop')

        playBtn.click()
        expect(playBtn.style.display).toBe('none')
        expect(stopBtn.style.display).toBe('block')
    })
})

describe('startSession', () => {
    test('Hide a start button and display a stop button', () => {
        const playBtn = document.getElementById('play')
        const stopBtn = document.getElementById('stop')

        stopBtn.click()

        expect(main.pomoSession.state).toBe('work')
        expect(main.pomoSession.count).toBe(0)
        expect(main.pomoSession.sets).toBe(1)
        expect(main.pomoSession.firstStart).toBe(true)
        expect(playBtn.style.display).toBe('block')
        expect(stopBtn.style.display).toBe('none')
    })
})