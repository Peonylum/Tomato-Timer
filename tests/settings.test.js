
document.head.innerHTML = '<style>' +
    '.in-active#onboarding {' +
    'display: none;' +
    '}' +
    '.active#onboarding {' +
    'display: block;' +
    '}' +
    '</style>'
document.body.innerHTML =
    '<button id="settings">' +
    '<div id="settings-overlay" style="display: none;">' +
    '<div id="settings-header">' +
    '<button id="close-settings">' +
    '<img id="settings-exit" src="assets/exitButton.svg" alt="exit">' +
    '</button>' +
    '<p>Settings</p>' +
    '</div>' +
    '<hr>' +
    '<p>Adjust Time</p>' +
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
    '</div>' +
    '<hr>' +
    '<p>Adjust Volume</p>' +
    '<div id="adjust-volume">' +
    '<div>' +
    '<label for="volume-text">Volume:</label>' +
    '<input id="volume-text" name="volume-text" type="number" value="100" step="1" min="0" max="100">' +
    '</div>' +
    '<input id="volume-slider" name="volume-slider" type="range" step="1" min="0" max="100" value="100">' +
    '</div>' +
    '</div>' +
    '<div id="timer">' +
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
    '</div>'

const settings = require('../source/main')

const evt = document.createEvent('Event')
evt.initEvent('DOMContentLoaded', true, true, document, '', '', '', 0)
document.dispatchEvent(evt)
describe('Test Volume Change', () => {

    test('Volume Text Should Change with Slider Change', () => {

        const slider = document.getElementById('volume-slider')
        const number = document.getElementById('volume-text')
        number.value = 50
        settings.changeVolumeSlider()
        expect(slider.value).toBe('50')
    })
})
