class Matrix {
  constructor(nrows, ncols) {
    this.nrows = nrows;
    this.ncols = ncols;
    this.data = [];

    for(let i = 0; i < this.nrows; i++) {
      this.data[i] = [];
      for(let j = 0; j < this.ncols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  static multiply(A, B) {
    if(!(A instanceof Matrix) || !(B instanceof Matrix)) {
      console.error('Error in matrix multiplication, this method can only multiply matrices.');
      return;
    }
    if(A.ncols !== B.nrows) {
      console.error('Error in matrix multiplication, the rows and columns of the matrices do not match.');
      return;
    }
    let C = new Matrix(A.nrows, B.ncols);
    for(let i = 0; i < C.nrows; i++) {
      for(let j = 0; j < C.ncols; j++) {
        for(let k = 0; k < A.ncols; k++) {
          C.data[i][j] += A.data[i][k] * B.data[k][j];
        }
      }
    }
    return C;
  }

  static add(A, B) {
    if(!(A instanceof Matrix) || !(B instanceof Matrix)) {
      console.error('Error in matrix addition, this method can only add matrices.');
      return;
    }
    if(A.ncols !== B.ncols || A.nrows !== B.nrows) {
      console.error('Error in matrix addition, formats of matrices do not match.');
      return;
    }
    let C = new Matrix(A.nrows, B.ncols);
    for(let i = 0; i < A.nrows; i++) {
      for(let j = 0; j < A.ncols; j++) {
        C.data[i][j] = A.data[i][j] + B.data[i][j];
      }
    }
    return C;
  }

  map(f) {
    for(let i = 0; i < this.nrows; i++) {
      for(let j = 0; j < this.ncols; j++) {
        this.data[i][j] = f(this.data[i][j]);
      }
    }
  }
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
      for(let i = 0; i < this.hidden_nodes.length - 1; i++) {
        this.weights.push(new Matrix(this.hidden_nodes[i+1], this.hidden_nodes[i]));
      }
      // Weight matrix for the output layer
      this.weights.push(new Matrix(this.output_nodes, this.hidden_nodes[this.hidden_nodes.length - 1]));
    } else {
      // This is the only weight matrix
      this.weights.push(new Matrix(this.output_nodes, this.input_nodes));
    }

    // Store the biases in the following array, ordered from the first hidden layer up to the output layer
    this.biases = [];
    for(let i = 0; i < this.hidden_nodes.length; i++) {
      this.biases.push(new Matrix(this.hidden_nodes[i], 1));
    }
    this.biases.push(new Matrix(this.output_nodes, 1));
  }
}

if(typeof module !== 'undefined') {
  module.exports = {NeuralNetwork, Matrix};
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}