export function createMatrix(...args) {
  const matrix = {};
  if (args[0] instanceof Object) {
    const m = args[0];
    matrix.rows = m.rows;
    matrix.cols = m.cols;
    matrix.data = m.data;
  } else {
    [matrix.rows, matrix.cols] = args;
    matrix.data = new Array(matrix.rows)
      .fill()
      .map(() => new Array(matrix.cols).fill(0));
  }
  return matrix;
}

// Apply a function to every element of matrix
export function mapMatrix(matrix, func) {
  for (let i = 0; i < matrix.rows; i += 1) {
    for (let j = 0; j < matrix.cols; j += 1) {
      const val = matrix.data[i][j];
      matrix.data[i][j] = func(val, i, j);
    }
  }
  return matrix;
}

export function multiplyMatrix(a, b) {
  if (b instanceof Object) {
    if (a.cols !== b.rows) {
      throw Error("Columns of A must match rows of B");
    }
    const tempMatrix = createMatrix(a.rows, b.cols);
    return mapMatrix(tempMatrix, (_, i, j) => {
      let sum = 0;
      for (let k = 0; k < a.cols; k += 1) {
        sum += a.data[i][k] * b.data[k][j];
      }
      return sum;
    });
  }
  const tempMatrix = createMatrix(a.rows, a.cols);
  return mapMatrix(tempMatrix, (_, i, j) => a.data[i][j] * b);
}

export function addMatrix(a, b) {
  if (b instanceof Object) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      throw Error("Columns and Rows of A must match Columns and Rows of B");
    }
    const tempMatrix = createMatrix(a.rows, b.cols);
    return mapMatrix(tempMatrix, (_, i, j) => a.data[i][j] + b.data[i][j]);
  }
  const tempMatrix = createMatrix(a.rows, a.cols);
  return mapMatrix(tempMatrix, (_, i, j) => a.data[i][j] + b);
}

export function subtractMatrix(a, b) {
  if (b instanceof Object) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      throw Error("Columns and Rows of A must match Columns and Rows of B");
    }
    const tempMatrix = createMatrix(a.rows, b.cols);
    return mapMatrix(tempMatrix, (_, i, j) => a.data[i][j] - b.data[i][j]);
  }
  const tempMatrix = createMatrix(a.rows, a.cols);
  return mapMatrix(tempMatrix, (_, i, j) => a.data[i][j] - b);
}

export function transposeMatrix(matrix) {
  const tempMatrix = createMatrix(matrix.cols, matrix.rows);
  return mapMatrix(tempMatrix, (_, i, j) => matrix.data[j][i]);
}

// Randomly sets matrix values
export function randomizeMatrix(matrix) {
  return mapMatrix(matrix, () => Math.random() * 2 - 1);
}

// Returns matrix data as 1D array
export function matrixToArray(matrix) {
  const array = [];
  for (let i = 0; i < matrix.rows; i += 1) {
    for (let j = 0; j < matrix.cols; j += 1) {
      array.push(matrix.data[i][j]);
    }
  }
  return array;
}

// Generates matrix from 1D array
export function arrayToMatrix(array) {
  const tempMatrix = createMatrix(array.length, 1);
  return mapMatrix(tempMatrix, (_, i) => array[i]);
}
