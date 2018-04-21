// Unit tests for NeuralNetwork class

const NeuralNetwork = require('./NeuralNetwork.js');
const Matrix = require('./Matrix.js');

// Dummy test to check the test framework
test('dummy test', () => {
  expect(1).toBe(1);
});

// Test constructor
const nn1 = new NeuralNetwork(2, [1], 1);
const nn2 = new NeuralNetwork(2, [1, 1], 1);