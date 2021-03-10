
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
const setButton = document.getElementById('settings')
const setOverlay = document.getElementById('settings-overlay')
const adjustPomoTime = document.getElementById('pomo-time')
const adjustSbTime = document.getElementById('short-break-time')
const adjustLbTime = document.getElementById('long-break-time')
const playButton = document.getElementById('play')
const exitSettings = document.getElementById('close-settings')
const timeRunning = document.getElementById('stop')

describe('Test ShowSettings()', () => {
  test('Settings Should Open on Click', () => {
    setButton.click()
    expect(setOverlay.style.display).toBe('block')
  })

  test('Settings Should Close if Button is clicked again', () => {
    setButton.click()
    expect(setOverlay.style.display).toBe('none')
  })

  test('Mismatched Work Time', () => {
    settings.pomoSession.pomoLen = 2
    settings.showSettings()
    expect(adjustPomoTime.value).toBe('2')
  })

  test('Mismatched Short Break Time', () => {
    settings.pomoSession.shortBreakLen = 15
    settings.showSettings()
    expect(adjustSbTime.value).toBe('15')
  })

  test('Mismatched Long Break Time', () => {
    settings.pomoSession.longBreakLen = 30
    settings.showSettings()
    expect(adjustLbTime.value).toBe('30')
  })
})

describe('Test settingsTime()', () => {
  test('Disabled play button on negative work time', () => {
    setButton.click()
    adjustPomoTime.value = -1
    settings.settingsTime()
    expect(playButton.disabled).toBe(true)
  })

  test('Disabled exit button on negative work time', () => {
    expect(exitSettings.disabled).toBe(true)
  })

  test('Disabled play button on out of range work time', () => {
    adjustPomoTime.value = 100
    settings.settingsTime()
    expect(playButton.disabled).toBe(true)
  })

  test('Disabled exit button on out of range work time', () => {
    expect(exitSettings.disabled).toBe(true)
  })

  test('Disabled play button on negative short break time', () => {
    adjustPomoTime.value = 2
    adjustSbTime.value = -2
    settings.settingsTime()
    expect(playButton.disabled).toBe(true)
  })

  test('Disabled exit button on negative short break time', () => {
    expect(exitSettings.disabled).toBe(true)
  })

  test('Disabled play button on out of range short break time', () => {
    adjustPomoTime.value = 99
    adjustSbTime.value = 100
    settings.settingsTime()
    expect(playButton.disabled).toBe(true)
  })

  test('Disabled exit button on out of range short break time', () => {
    expect(exitSettings.disabled).toBe(true)
  })

  test('Disabled play button on negative long break time', () => {
    adjustPomoTime.value = 2
    adjustSbTime.value = 5
    adjustLbTime.value = -1
    settings.settingsTime()
    expect(playButton.disabled).toBe(true)
  })

  test('Disabled exit button on negative long break time', () => {
    expect(exitSettings.disabled).toBe(true)
  })

  test('Disabled play button on out of range long break time', () => {
    adjustPomoTime.value = 99
    adjustSbTime.value = 99
    adjustLbTime.value = 100
    settings.settingsTime()
    expect(playButton.disabled).toBe(true)
  })

  test('Disabled exit button on out of range long break time', () => {
    expect(exitSettings.disabled).toBe(true)
  })

  test('valid times', () => {
    adjustPomoTime.value = 50
    adjustSbTime.value = 20
    adjustLbTime.value = 30
    settings.settingsTime()
    expect(settings.pomoSession.pomoLen).toBe('50')
  })

  test('check valid short break', () => {
    expect(settings.pomoSession.shortBreakLen).toBe('20')
  })

  test('check valid long break', () => {
    expect(settings.pomoSession.longBreakLen).toBe('30')
  })

  test('play enabled', () => {
    expect(playButton.disabled).toBe(false)
  })

  test('exit settings enabled', () => {
    expect(exitSettings.disabled).toBe(false)
  })

})

describe('Testing disableTime()', () => {
  test('work time adjusting disabled', () => {
    timeRunning.style.display = 'block'
    settings.disableTime()
    expect(adjustPomoTime.disabled).toBe(true)
  })

  test('short break adjusting disabled', () => {
    expect(adjustSbTime.disabled).toBe(true)
  })

  test('long break adjusting disabled', () => {
    expect(adjustLbTime.disabled).toBe(true)
  })
})
