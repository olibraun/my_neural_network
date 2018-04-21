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

if(typeof module !== 'undefined') {
  module.exports = Matrix;
}