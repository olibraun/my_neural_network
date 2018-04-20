// Unit tests for Matrix class

const Matrix = require('./Matrix.js');

// Dummy test to check the test framework
test('dummy test', () => {
  expect(1).toBe(1);
});

// Test matrix constructor
test('test matrix class constructor', () => {
  let M = new Matrix(2, 3);
  expect(M.nrows).toBe(2);
  expect(M.ncols).toBe(3);
  expect(M.data[0][0]).toBe(0);
});