import Matrix from "./matrix";

class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

export const sigmoid = new ActivationFunction(
  (x) => 1 / (1 + Math.exp(-x)),
  (y) => y * (1 - y)
);

export const tanh = new ActivationFunction(
  (x) => Math.tanh(x),
  (y) => 1 - y * y
);

class NeuralNetwork {
  constructor(...args) {
    if (args[0] instanceof NeuralNetwork) {
      const nn = args[0];
      this.inputNodes = nn.inputNodes;
      this.hiddenNodes = nn.hiddenNodes;
      this.outputNodes = nn.outputNodes;
      this.weightsIH = nn.weightsIH.copy();
      this.weightsHO = nn.weightsHO.copy();
      this.biasH = nn.biasH.copy();
      this.biasO = nn.biasO.copy();
    } else if (args[0] instanceof Object) {
      const nn = args[0];
      this.inputNodes = nn.inputNodes;
      this.hiddenNodes = nn.hiddenNodes;
      this.outputNodes = nn.outputNodes;
      this.weightsIH = new Matrix(nn.weightsIH);
      this.weightsHO = new Matrix(nn.weightsHO);
      this.biasH = new Matrix(nn.biasH);
      this.biasO = new Matrix(nn.biasO);
    } else {
      this.inputNodes = args[0];
      this.hiddenNodes = args[1];
      this.outputNodes = args[2];
      this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes);
      this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes);
      this.weightsIH.randomize();
      this.weightsHO.randomize();
      this.biasH = new Matrix(this.hiddenNodes, 1);
      this.biasO = new Matrix(this.outputNodes, 1);
      this.biasH.randomize();
      this.biasO.randomize();
    }

    this.activationFunction = sigmoid;
    this.learningRate = 0.1;
  }

  setActivationFunction(func) {
    this.activationFunction = func;
  }

  setLearningRate(rate) {
    this.learningRate = rate;
  }

  predict(arr) {
    // Generating the Hidden Outputs
    const inputMatrix = Matrix.fromArray(arr);
    const hiddenMatrix = Matrix.multiply(this.weightsIH, inputMatrix);
    hiddenMatrix.add(this.biasH);
    // Perform activation function
    hiddenMatrix.map(this.activationFunction.func);

    // Generating the output's output!
    const outputMatrix = Matrix.multiply(this.weightsHO, hiddenMatrix);
    outputMatrix.add(this.biasO);
    outputMatrix.map(this.activationFunction.func);

    // Return matrix's data as 1D array
    return outputMatrix.toArray();
  }

  train(inputArr, targetArr) {
    // Generating the Hidden Outputs
    const inputMatrix = Matrix.fromArray(inputArr);
    const hiddenMatrix = Matrix.multiply(this.weightsIH, inputMatrix);
    hiddenMatrix.add(this.biasH);
    // Perform activation function
    hiddenMatrix.map(this.activationFunction.func);

    // Generating the output's output!
    const outputMatrix = Matrix.multiply(this.weightsHO, hiddenMatrix);
    outputMatrix.add(this.biasO);
    outputMatrix.map(this.activation_function.func);

    // Convert array to matrix object
    const targetMatrix = Matrix.fromArray(targetArr);

    // Calculate the error
    // ERROR = TARGET - OUTPUT
    const outputErrors = Matrix.subtract(targetMatrix, outputMatrix);

    // gradient = Output * (1 - Output);
    // Calculate gradient
    const gradients = Matrix.map(outputMatrix, this.activation_function.dfunc);
    gradients.multiply(outputErrors);
    gradients.multiply(this.learningRate);

    // Calculate deltas
    const hiddenMatrix_T = Matrix.transpose(hiddenMatrix);
    const weightsHO_deltas = Matrix.multiply(gradients, hiddenMatrix_T);

    // Adjust the weights by deltas
    this.weightsHO.add(weightsHO_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.biasO.add(gradients);

    // Calculate the hidden layer errors
    const weightsHO_T = Matrix.transpose(this.weightsHO);
    const hiddenErrors = Matrix.multiply(weightsHO_T, outputErrors);

    // Calculate hidden gradient
    const hiddenGradient = Matrix.map(
      hiddenMatrix,
      this.activationFunction.dfunc
    );
    hiddenGradient.multiply(hiddenErrors);
    hiddenGradient.multiply(this.learningRate);

    // Calcuate input -> hidden deltas
    const inputMatrix_T = Matrix.transpose(inputMatrix);
    const weightsIH_deltas = Matrix.multiply(hiddenGradient, inputMatrix_T);

    this.weightsIH.add(weightsIH_deltas);

    // Adjust the bias by its deltas (which is just the gradients)
    this.biasH.add(hiddenGradient);
  }

  // Returns copy of neural network
  copy() {
    return new NeuralNetwork(this);
  }

  // Accept an arbitrary function for mutation
  mutate(func) {
    this.weightsIH.map(func);
    this.weightsHO.map(func);
    this.biasH.map(func);
    this.biasO.map(func);
  }

  // Crossover weights of two neural networks
  static crossover(a, b) {
    a.weightsIH.map((elem, i, j) =>
      Math.random() > 0.5 ? elem : b.weightsIH.data[i][j]
    );
    a.weightsIH.map((elem, i, j) =>
      Math.random() > 0.5 ? elem : b.weightsIH.data[i][j]
    );
    a.biasH.map((elem, i, j) =>
      Math.random() > 0.5 ? elem : b.biasH.data[i][j]
    );
    a.biasO.map((elem, i, j) =>
      Math.random() > 0.5 ? elem : b.biasO.data[i][j]
    );
    return new NeuralNetwork(a);
  }
}

export default NeuralNetwork;
