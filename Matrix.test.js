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

// Test matrix multiplication
test('test that the multiply method is static', () => {
  let instance = new Matrix(1, 1);
  expect(instance.multiply).toBeUndefined;
  expect(Matrix.multiply).toBeDefined;
});

test('only multiply matrices', () => {
  let a = [1, 2];
  expect(Matrix.multiply(a, a)).toBeUndefined;
});

test('only multiply matrices of appropriate formats', () => {
  let A = new Matrix(2, 3);
  expect(Matrix.multiply(A, A)).toBeUndefined;
});

test('multiply by unit matrix', () => {
  let A = new Matrix(2, 2);
  let I = new Matrix(2, 2);
  A.data = [[1, 2], [3, 4]];
  I.data = [[1, 0], [0, 1]];
  expect(Matrix.multiply(A, I)).toEqual(A);
  expect(Matrix.multiply(I, A)).toEqual(A);
  expect(Matrix.multiply(I, I)).toEqual(I);
});

test('multiply by inverse matrix', () => {
  let A = new Matrix(2, 2);
  let AI = new Matrix(2, 2);
  let I = new Matrix(2, 2);
  A.data = [[1, 2], [3, 4]];
  AI.data = [[-2, 1], [1.5, -0.5]];
  I.data = [[1, 0], [0, 1]];
  expect(Matrix.multiply(A, AI)).toEqual(I);
  expect(Matrix.multiply(AI, A)).toEqual(I);
});