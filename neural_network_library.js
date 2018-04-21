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

  static multiplyElementwise(A, B) {
    if(!(A instanceof Matrix) || !(B instanceof Matrix)) {
      console.error('Error in elementwise matrix multiplication, this method can only multiply matrices.');
      return;
    }
    if(A.ncols !== B.ncols || A.nrows !== B.nrows) {
      console.error('Error in elemntwise matrix multiplication, the rows and columns of the matrices do not match.');
      return;
    }
    let C = new Matrix(A.nrows, A.ncols);
    for(let i = 0; i < C.nrows; i++) {
      for(let j = 0; j < C.ncols; j++) {
        C.data[i][j] += A.data[i][j] * B.data[i][j];
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

  multiplyByScalar(a) {
    for(let i = 0; i < this.nrows; i++) {
      for(let j = 0; j < this.ncols; j++) {
        this.data[i][j] *= a;
      }
    }
  }

  static subtract(A, B) {
    if(!(A instanceof Matrix) || !(B instanceof Matrix)) {
      console.error('Error in matrix subtraction, this method can only subtract matrices.');
      return;
    }
    if(A.ncols !== B.ncols || A.nrows !== B.nrows) {
      console.error('Error in matrix subtraction, formats of matrices do not match.');
      return;
    }
    let C = new Matrix(A.nrows, B.ncols);
    for(let i = 0; i < A.nrows; i++) {
      for(let j = 0; j < A.ncols; j++) {
        C.data[i][j] = A.data[i][j] - B.data[i][j];
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

  static fromArray(input_array) {
    const A = new Matrix(input_array.length, 1);
    for(let i = 0; i < input_array.length; i++) {
      A.data[i] = [input_array[i]];
    }
    return A;
  }

  toArray() {
    if(this.ncols > 1) {
      console.error('Error in Matrix to Array method, can only accept n-by-1 matrices.');
      return;
    } else {
      let res = [];
      for(let i = 0; i < this.nrows; i++) {
       res.push(this.data[i][0]);
      }
      return res;
    }
  }

  copy() {
    let A = new Matrix(this.nrows, this.ncols);
    for(let i = 0; i < this.nrows; i++) {
      for(let j = 0; j < this.ncols; j++) {
        A.data[i][j] = this.data[i][j];
      }
    }
    return A;
  }

  static transpose(A) {
    let B = new Matrix(A.ncols, A.nrows);
    for(let i = 0; i < B.nrows; i++) {
      for(let j = 0; j < B.ncols; j++) {
        B.data[i][j] = A.data[j][i];
      }
    }
    return B;
  }

  randomize() {
    for(let i = 0; i < this.nrows; i++) {
      for(let j = 0; j < this.ncols; j++) {
        this.data[i][j] = 2*Math.random() - 1;
      }
    }
  }

  static allOneVector(l) {
    let I = new Matrix(l, 1);
    for (let i = 0; i < I.nrows; i++) {
      I.data[i][0] = 1;
    }
    return I;
  }
}

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    // Accepts as arguments a number of input and output nodes
    // and an array of a number of hidden nodes (number of nodes per layer).
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.learningRate = 0.1;

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

  copy() {
    let nn = new NeuralNetwork(this.input_nodes, this.hidden_nodes, this.output_nodes);
    for(let i = 0; i < this.weights.length; i++) {
      nn.weights[i] = this.weights[i].copy();
    }
    for(let i = 0; i < this.biases.length; i++) {
      nn.biases[i] = this.biases[i].copy();
    }
    return nn;
  }

  randomize() {
    this.weights.forEach(weightMatrix => {
      weightMatrix.randomize();
    });
    this.biases.forEach(biasMatrix => {
      biasMatrix.randomize();
    });
  }

  feedForward(input_array) {
    let current = Matrix.fromArray(input_array);
    for(let i = 0; i < this.weights.length; i++) {
      current = Matrix.multiply(this.weights[i], current);
      current = Matrix.add(current, this.biases[i]);
      current.map(sigmoid);
    }
    return current.toArray();
  }

  train(inputs, targets) {
    // This uses a backpropagation algorithm
    // Preparations
    
    // 1) Turn the targest into a matrix
    targets = Matrix.fromArray(targets);

    // 2) Save all the "hidden outputs"
    // Notice that the input and "real output" are also saved in this list as the first and last element, respectively
    let current = Matrix.fromArray(inputs);
    let hidden_outputs = [current];
    for(let i = 0; i < this.weights.length; i++) {
      current = Matrix.multiply(this.weights[i], current);
      current = Matrix.add(current, this.biases[i]);
      current.map(sigmoid);
      hidden_outputs.push(current);
    }
    //Save the "real output" as "guess"
    let guess = hidden_outputs[hidden_outputs.length - 1];

    // First, compute all the errors
    let errors = [];
    let currenterror = Matrix.subtract(targets, guess);
    errors.push(currenterror);
    for(let i = this.weights.length-1; i > 0; i--) {
      currenterror = Matrix.multiply(Matrix.transpose(this.weights[i]), currenterror);
      errors.push(currenterror);
    }

    // The errors are ordered from output to input, so let's just reverse them
    errors.reverse();
    
    // Now: gradient descent
    // The formula is the follwing
    /* **************************************************************
    dW = lr * E ° (O ° ([1]-O)) * H^T
    dW indicates the change in the weight matrix
    lr is the learning rate
    E is the error
    O is the output
    H is the input
    ° is used to denote elementwise matrix multiplication
    [1] is used to denote the all-one-vector
    We use O°(1-O) since the derivative of the sigmoid s is s' = s*(1-s).*/
    for(let i = 0; i < this.weights.length; i++) {
      let E = errors[i];
      let O = hidden_outputs[i+1];
      let H = hidden_outputs[i];
      O.map(y => y*(1-y));
      let leftSide = Matrix.multiplyElementwise(E, O);
      leftSide.multiplyByScalar(this.learningRate);
      let rightSide = Matrix.transpose(H);

      // Calculate change in weights and adjust weights
      let dW = Matrix.multiply(leftSide, rightSide);
      this.weights[i] = Matrix.add(this.weights[i], dW);

      // Adjust biases (they are simply adjusted by the gradients / "left side")
      //this.biases[i] = Matrix.add(this.biases[i], leftSide);
    }
  }
}

if(typeof module !== 'undefined') {
  module.exports = {NeuralNetwork, Matrix};
}

function sigmoid(x) {
  return 1/(1 + Math.exp(-x));
}