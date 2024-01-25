// Function to create a matrix with specified dimensions
export function createMatrix(...args) {
  const [rows, cols, func = () => 0] = args;
  return {
    rows,
    cols,
    data: Array.from(
      {
        length: rows
      },
      (_, i) =>
        Array.from(
          {
            length: cols
          },
          (val, j) => func(val, i, j)
        )
    )
  };
}

// Generates new matrix by applying function to every element of matrix
export function mapMatrix(m, func) {
  return {
    rows: m.rows,
    cols: m.cols,
    data: m.data.map((row, i) => row.map((val, j) => func(val, i, j)))
  };
}

// Function to multiply two matrices or a matrix and a scalar
export function multiplyMatrix(a, b) {
  if (b instanceof Object) {
    // Check if matrices are compatible for multiplication
    if (a.cols !== b.rows) {
      throw Error("Columns of matrix A must match rows of matrix B");
    }
    // Perform matrix multiplication
    return createMatrix(a.rows, b.cols, (_, i, j) => {
      let sum = 0;
      for (let k = 0; k < a.cols; k += 1) {
        sum += a.data[i][k] * b.data[k][j];
      }
      return sum;
    });
  }
  // Perform element-wise multiplication with a scalar
  return mapMatrix(a, (val) => val * b);
}

// Function to add two matrices or a matrix and a scalar
export function addMatrix(a, b) {
  if (b instanceof Object) {
    // Check if matrices have the same dimensions for addition
    if (a.rows !== b.rows || a.cols !== b.cols) {
      throw Error(
        "Columns and Rows of matrix A must match Columns and Rows of matrix B"
      );
    }
    // Perform matrix addition
    return createMatrix(
      a.rows,
      b.cols,
      (_, i, j) => a.data[i][j] + b.data[i][j]
    );
  }
  // Perform element-wise addition with a scalar
  return mapMatrix(a, (val) => val + b);
}

// Function to subtract two matrices or a matrix and a scalar
export function subtractMatrix(a, b) {
  if (b instanceof Object) {
    // Check if matrices have the same dimensions for subtraction
    if (a.rows !== b.rows || a.cols !== b.cols) {
      throw Error("Columns and Rows of A must match Columns and Rows of B");
    }
    // Perform matrix subtraction
    return createMatrix(
      a.rows,
      b.cols,
      (_, i, j) => a.data[i][j] - b.data[i][j]
    );
  }
  // Perform matrix subtraction with a scalar
  return mapMatrix(a, (val) => val - b);
}

// Returns transpose of given matrix
export function transposeMatrix(m) {
  return createMatrix(m.cols, m.rows, (_, i, j) => m.data[j][i]);
}

// Converts matrix data to a 1D array
export function matrixToArray(m) {
  return m.data.flat();
}

// Generates a matrix from a 1D array
export function arrayToMatrix(arr) {
  return createMatrix(arr.length, 1, (_, i) => arr[i]);
}
