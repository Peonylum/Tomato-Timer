// This is an example test using JEST
const sum = require('../js/exampleTest')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
