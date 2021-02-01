class Matrix {
  constructor(...args) {
    if (args[0] instanceof Matrix) {
      const m = args[0].copy();
      this.rows = m.rows;
      this.cols = m.cols;
      this.data = m.data;
    } else if (args[0] instanceof Object) {
      const m = args[0];
      this.rows = m.rows;
      this.cols = m.cols;
      this.data = m.data;
    } else {
      this.rows = args[0];
      this.cols = args[1];
      this.data = new Array(this.rows)
        .fill()
        .map(() => new Array(this.cols).fill(0));
    }
  }

  // Returns a copy of matrix
  copy() {
    const m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }

  // Randomly sets matrix values
  randomize() {
    this.map(() => Math.random() * 2 - 1);
  }

  // Returns matrix data as 1D array
  toArray() {
    const arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  // Apply a function to every element of matrix
  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }
    return this;
  }

  multiply(item) {
    if (item instanceof Matrix) {
      // Check if columns of A don't equal rows of B
      if (this.cols != item.rows) {
        throw Error("Columns and Rows of A must match Columns and Rows of B");
      }
      const m = Matrix.multiply(this, item);
      // Set new dimenstions and result
      this.rows = m.rows;
      this.cols = m.cols;
      this.data = m.data;
    } else {
      this.map((elem) => elem * item);
    }
  }

  add(item) {
    if (item instanceof Matrix) {
      if (this.rows != item.rows || this.cols != item.cols) {
        throw Error("Columns and Rows of A must match Columns and Rows of B");
      }
      this.map((elem, i, j) => elem + item.data[i][j]);
    } else {
      this.map((elem) => elem + item);
    }
  }

  subtract(item) {
    if (item instanceof Matrix) {
      if (this.rows != item.rows || this.cols != item.cols) {
        throw Error("Columns and Rows of A must match Columns and Rows of B");
      }
      this.map((elem, i, j) => elem - item.data[i][j]);
    } else {
      this.map((elem) => elem - item);
    }
  }

  print() {
    console.table(this.data);
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) {
      throw Error("Columns of A must match rows of B");
    }
    return new Matrix(a.rows, b.cols).map((_, i, j) => {
      let sum = 0;
      for (let k = 0; k < a.cols; k++) {
        sum += a.data[i][k] * b.data[k][j];
      }
      return sum;
    });
  }

  static add(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      throw Error("Columns and Rows of A must match Columns and Rows of B.");
    }
    // Return a new Matrix a + b
    return new Matrix(a.rows, a.cols).map(
      (_, i, j) => a.data[i][j] + b.data[i][j]
    );
  }

  static subtract(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      throw Error("Columns and Rows of A must match Columns and Rows of B.");
    }
    // Return a new Matrix a - b
    return new Matrix(a.rows, a.cols).map(
      (_, i, j) => a.data[i][j] - b.data[i][j]
    );
  }

  // Apply a function to every element of matrix
  static map(matrix, func) {
    return new Matrix(matrix.rows, matrix.cols).map((_, i, j) =>
      func(matrix.data[i][j], i, j)
    );
  }

  static transpose(matrix) {
    return new Matrix(matrix.cols, matrix.rows).map(
      (_, i, j) => matrix.data[j][i]
    );
  }

  // Generates matrix from 1D array
  static fromArray(arr) {
    return new Matrix(arr.length, 1).map((_, i) => arr[i]);
  }
}

export default Matrix;
