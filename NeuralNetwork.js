if(typeof module !== 'undefined') {
  const Matrix = require('./Matrix.js');
}

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    // Accepts as arguments a number of input and output nodes
    // and an array of a number of hidden nodes (number of nodes per layer).
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    // Store the weight matrices in the following array, ordered from input to output
    this.weights = [];

    // Check if we have at least one hidden layer
    if(this.hidden_nodes.length >= 1) {
      // Weight matrix for the inputs
      this.weights.push(new Matrix(this.hidden_nodes[0], this.input_nodes));
      // Weight matrix for the hidden layers
      for(let i = 1; i < this.hidden_nodes.length - 1; i++) {
        this.weights.push(new Matrix(this.hidden_nodes[i+1], this.hidden_nodes[i]));
      }
      // Weight matrix for the output layer
      this.weights.push(new Matrix(this.output_nodes, this.hidden_nodes[this.hidden_nodes.length - 1]));
    } else {
      // This is the only weight matrix
      this.weights.push(new Matrix(this.output_nodes, this.input_nodes));
    }
  }
}

if(typeof module !== 'undefined') {
  module.exports = NeuralNetwork;
}