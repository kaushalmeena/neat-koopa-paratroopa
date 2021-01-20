class Matrix {
  constructor(...args) {
    if (Array.isArray(args[0] && Array.isArray(args[0][0]))) {
      this.rows = args[0].length;
      this.cols = args[0][0].length;
      this.data = args[0];
    } else {
      this.rows = args[0];
      this.cols = args[1];
      this.data = new Array(this.rows)
        .fill()
        .map(() => new Array(this.cols).fill(0));
    }
  }

  // Randomly sets matrix values
  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random();
      }
    }
  }

  // Muliplies scalar value or another matrix
  multiply(item) {
    let tempArr = [];
    let tempSum = 0;
    if (item instanceof Matrix) {
      // Check if columns of A don't equal rows of B
      if (this.cols != item.rows) {
        throw Error("Invalid matrix dimensions");
      }
      for (let i = 0; i < this.rows; i++) {
        tempArr[i] = [];
        for (let j = 0; j < item.cols; j++) {
          tempSum = 0;
          for (let k = 0; k < this.cols; k++) {
            tempSum += this.data[i][k] * item.data[k][j];
          }
          tempArr[i][j] = tempSum;
        }
      }
      // Set new dimenstions and result
      this.cols = item.cols;
      this.data = tempArr;
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= item;
        }
      }
    }
  }

  // Adds scalar value or another matrix
  add(item) {
    if (item instanceof Matrix) {
      if (this.rows != item.rows || this.cols != item.cols) {
        throw Error("Invalid matrix dimensions");
      }
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += item.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += item;
        }
      }
    }
  }

  // Subtracts scalar value or another matrix
  subtract(item) {
    if (item instanceof Matrix) {
      if (this.rows != item.rows || this.cols != item.cols) {
        throw Error("Invalid matrix dimensions");
      }
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] -= item.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] -= item;
        }
      }
    }
  }

  // Prints matrix's data
  print() {
    console.table(this.data);
  }
}

export default Matrix;
