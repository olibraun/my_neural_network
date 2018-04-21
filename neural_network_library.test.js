const {Matrix, NeuralNetwork} = require('./neural_network_library.js');

// Unit tests for Matrix class

// Dummy test to check the test framework
test('Begin tests for Matrix class.', () => {
  expect(1).toBe(1);
});

// Test matrix constructor
test('test matrix class constructor', () => {
  let M = new Matrix(2, 3);
  expect(M.nrows).toBe(2);
  expect(M.ncols).toBe(3);
  expect(M.data[0][0]).toBe(0);
});

test('test extraction of object property', () => {
  const A = new Matrix(3, 3);
  const d = A.data;
  expect(d).toBeDefined();
});

// Test matrix multiplication
test('test that the multiply method is static', () => {
  let instance = new Matrix(1, 1);
  expect(instance.multiply).toBeUndefined();
  expect(Matrix.multiply).toBeDefined();
});

test('only multiply matrices', () => {
  //Replace console.error with a jest mock so we can see if it has been called
  global.console.error = jest.fn();

  let a = [1, 2];
  expect(Matrix.multiply(a, a)).toBeUndefined();

  //Check if the mock console.error has been called 
  expect(global.console.error).toHaveBeenCalledWith('Error in matrix multiplication, this method can only multiply matrices.');
});

test('only multiply matrices of appropriate formats', () => {
  //Replace console.error with a jest mock so we can see if it has been called
  global.console.error = jest.fn();
  
  let A = new Matrix(2, 3);
  expect(Matrix.multiply(A, A)).toBeUndefined();

  //Check if the mock console.error has been called 
  expect(global.console.error).toHaveBeenCalledWith('Error in matrix multiplication, the rows and columns of the matrices do not match.');
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

// Test matrix addition
test('test that the add method is static', () => {
  let instance = new Matrix(1, 1);
  expect(instance.add).toBeUndefined();
  expect(Matrix.add).toBeDefined();
});

test('only add matrices', () => {
  //Replace console.error with a jest mock so we can see if it has been called
  global.console.error = jest.fn();

  let a = [1, 2];
  expect(Matrix.add(a, a)).toBeUndefined;

  //Check if the mock console.error has been called 
  expect(global.console.error).toHaveBeenCalledWith('Error in matrix addition, this method can only add matrices.');
});

test('only add matrices of appropriate formats', () => {
  //Replace console.error with a jest mock so we can see if it has been called
  global.console.error = jest.fn();

  let A = new Matrix(2, 3);
  let B = new Matrix(3, 2);
  expect(Matrix.add(A, B)).toBeUndefined;

  //Check if the mock console.error has been called 
  expect(global.console.error).toHaveBeenCalledWith('Error in matrix addition, formats of matrices do not match.');
});

test('add zero matrix', () => {
  let A = new Matrix(2, 2);
  A.data = [[1, 2], [3, 4]];
  let B = new Matrix(2, 2);
  expect(Matrix.add(A, B)).toEqual(A);
  expect(Matrix.add(B, A)).toEqual(A);
  expect(Matrix.add(B, B)).toEqual(B);
});

test('add two non zero matrices', () => {
  let A = new Matrix(2, 2);
  let B = new Matrix(2, 2);
  A.data = [[1, 2], [3, 4]];
  B.data = [[5, 6], [7, 8]];
  expect(Matrix.add(A, B)).toEqual({
    nrows: 2,
    ncols: 2,
    data: [[6, 8], [10, 12]]
  });
  expect(Matrix.add(B, A)).toEqual({
    nrows: 2,
    ncols: 2,
    data: [[6, 8], [10, 12]]
  });
});

// Test the map method
test('add 1 to every matrix entry', () => {
  let A = new Matrix(2, 2);
  let B = new Matrix(2, 2);
  B.data = [[1, 2], [3, 4]];

  A.map(x => x+1);
  B.map(x => x+1);

  expect(A).toEqual({
    nrows: 2,
    ncols: 2,
    data: [[1, 1], [1, 1]]
  });

  expect(B).toEqual({
    nrows: 2,
    ncols: 2,
    data: [[2, 3], [4, 5]]
  });
});

test('map all entries to zero', () => {
  let A = new Matrix(2, 2);
  A.data = [[1, 2], [3, 4]];
  A.map(x => 0);

  expect(A).toEqual({
    nrows: 2,
    ncols: 2,
    data: [[0, 0], [0, 0]]
  });
});

test('test static fromArray method', () => {
  const a = [1, 2, 3];
  const A = Matrix.fromArray(a);
  expect(A).toEqual({
    nrows: 3,
    ncols: 1,
    data: [[1], [2], [3]]
  });
});

test('check input of toArray method', () => {
  //Replace console.error with a jest mock so we can see if it has been called
  global.console.error = jest.fn();

  const A = new Matrix(3, 3);
  A.toArray();

  //Check if the mock console.error has been called 
  expect(global.console.error).toHaveBeenCalledWith('Error in Matrix to Array method, can only accept n-by-1 matrices.');
});

test('test toArray method', () => {
  const A = new Matrix(3, 1);
  A.data = [[1], [2], [3]];
  expect(A.toArray()).toEqual([1, 2, 3]);
})

// Unit tests for NeuralNetwork class

// Dummy test to check the test framework
test('Begin tests for NeuralNetwork class.', () => {
  expect(1).toBe(1);
});

// Test constructor
test('test if constructor can be run', () => {
  const nn1 = new NeuralNetwork(2, [1], 1);
  const nn2 = new NeuralNetwork(2, [1, 1], 1);
  const nn3 = new NeuralNetwork(2, [], 1);
  expect(nn1).toBeDefined();
  expect(nn2).toBeDefined();
  expect(nn3).toBeDefined();
});

test('test if weight matrices are of appropriate format', () => {
  const nn = new NeuralNetwork(1, [2], 1);
  const weights = nn.weights;
  expect(nn.weights[0].nrows).toBe(2);
  expect(weights[0].ncols).toBe(1);
  expect(weights[1].nrows).toBe(1);
  expect(weights[1].ncols).toBe(2);
});

test('test feedforward', () => {
  let nn1 = new NeuralNetwork(4, [], 3);
  let nn2 = new NeuralNetwork(1, [1], 1);
  let nn3 = new NeuralNetwork(6, [5, 4, 3], 2);

  //These neural networks are in the "initial state", i.e. all weights and biases 0, and the Sigmoid activation function.
  expect(nn1.feedForward([1, 2, 3, 4])).toEqual([.5, .5, .5]);
  expect(nn1.feedForward([5, 6, 7, 8])).toEqual([.5, .5, .5]);

  expect(nn2.feedForward([1])).toEqual([.5]);
  expect(nn2.feedForward([0])).toEqual([.5]);

  expect(nn3.feedForward([1, 2, 3, 4, 5, 6])).toEqual([.5, .5]);
  expect(nn3.feedForward([7, 8, 9, 10, 11, 12])).toEqual([.5, .5]);
  expect(nn3.feedForward([0, 1, 0, 1, 0, 1])).toEqual([.5, .5]);
});