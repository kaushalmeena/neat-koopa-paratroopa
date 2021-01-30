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
      let nn = args[0];
      this.inputNodes = nn.inputNodes;
      this.hiddenNodes = nn.hiddenNodes;
      this.outputNodes = nn.outputNodes;
      this.weightsIH = nn.weightsIH.copy();
      this.weightsHO = nn.weightsHO.copy();
      this.biasH = nn.biasH.copy();
      this.biasO = nn.biasO.copy();
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
    let inputMatrix = Matrix.fromArray(arr);
    let hiddenMatrix = Matrix.multiply(this.weightsIH, inputMatrix);
    hiddenMatrix.add(this.biasH);
    // Perform activation function
    hiddenMatrix.map(this.activationFunction.func);

    // Generating the output's output!
    let outputMatrix = Matrix.multiply(this.weightsHO, hiddenMatrix);
    outputMatrix.add(this.biasO);
    outputMatrix.map(this.activationFunction.func);

    // Return matrix's data as 1D array
    return outputMatrix.toArray();
  }

  train(inputArr, targetArr) {
    // Generating the Hidden Outputs
    let inputMatrix = Matrix.fromArray(inputArr);
    let hiddenMatrix = Matrix.multiply(this.weightsIH, inputMatrix);
    hiddenMatrix.add(this.biasH);
    // Perform activation function
    hiddenMatrix.map(this.activationFunction.func);

    // Generating the output's output!
    let outputMatrix = Matrix.multiply(this.weightsHO, hiddenMatrix);
    outputMatrix.add(this.biasO);
    outputMatrix.map(this.activation_function.func);

    // Convert array to matrix object
    let targetMatrix = Matrix.fromArray(targetArr);

    // Calculate the error
    // ERROR = TARGET - OUTPUT
    let outputErrors = Matrix.subtract(targetMatrix, outputMatrix);

    // gradient = Output * (1 - Output);
    // Calculate gradient
    let gradients = Matrix.map(outputMatrix, this.activation_function.dfunc);
    gradients.multiply(outputErrors);
    gradients.multiply(this.learningRate);

    // Calculate deltas
    let hiddenMatrix_T = Matrix.transpose(hiddenMatrix);
    let weightsHO_deltas = Matrix.multiply(gradients, hiddenMatrix_T);

    // Adjust the weights by deltas
    this.weightsHO.add(weightsHO_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.biasO.add(gradients);

    // Calculate the hidden layer errors
    let weightsHO_T = Matrix.transpose(this.weightsHO);
    let hiddenErrors = Matrix.multiply(weightsHO_T, outputErrors);

    // Calculate hidden gradient
    let hiddenGradient = Matrix.map(
      hiddenMatrix,
      this.activationFunction.dfunc
    );
    hiddenGradient.multiply(hiddenErrors);
    hiddenGradient.multiply(this.learningRate);

    // Calcuate input -> hidden deltas
    let inputMatrix_T = Matrix.transpose(inputMatrix);
    let weightsIH_deltas = Matrix.multiply(hiddenGradient, inputMatrix_T);

    this.weightsIH.add(weightsIH_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.biasH.add(hiddenGradient);

    // outputs.print();
    // targets.print();
    // error.print();
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
}

export default NeuralNetwork;
