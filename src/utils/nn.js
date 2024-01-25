import { getRandomItem } from "./helper";
import {
  createMatrix,
  arrayToMatrix,
  multiplyMatrix,
  subtractMatrix,
  matrixToArray,
  addMatrix,
  mapMatrix,
  transposeMatrix
} from "./matrix";

const LEARNING_RATE = 0.1;

// Activation function
function sigmoidFunc(x) {
  return 1 / (1 + Math.exp(-x));
}

// Derivative of the activation function
function sigmoidDerivativeFunc(x) {
  return x * (1 - x);
}

// Random function to generate values between -1 and 1
function randomFunc() {
  return Math.random() * 2 - 1;
}

// Function to create NeuralNetwork with specified layers
export function createNeuralNetwork(...args) {
  const [inputNodes, hiddenNodes, outputNodes] = args;
  return {
    inputNodes,
    hiddenNodes,
    outputNodes,
    weightsIH: createMatrix(hiddenNodes, inputNodes, randomFunc),
    weightsHO: createMatrix(outputNodes, hiddenNodes, randomFunc),
    biasH: createMatrix(hiddenNodes, 1, randomFunc),
    biasO: createMatrix(outputNodes, 1, randomFunc)
  };
}

// Function to mutate of NeuralNetwork weights
export function mutateNeuralNetwork(nn, func) {
  ["weightsIH", "weightsHO", "biasH", "biasO"].forEach((key) => {
    nn[key] = mapMatrix(nn[key], func);
  });
}

// Function to crossover of weights two NeuralNetworks
export function crossoverNeuralNetworks(a, b) {
  if (
    a.inputNodes !== b.inputNodes ||
    a.hiddenNodes !== b.hiddenNodes ||
    a.outputNodes !== b.outputNodes
  ) {
    throw new Error("Number of nodes in A and B must match");
  }

  const crossoverMatrix = (key) =>
    mapMatrix(a[key], (val, i, j) => getRandomItem([val, b[key].data[i][j]]));

  return {
    inputNodes: a.inputNodes,
    hiddenNodes: a.hiddenNodes,
    outputNodes: a.outputNodes,
    weightsIH: crossoverMatrix("weightsIH"),
    weightsHO: crossoverMatrix("weightsHO"),
    biasH: crossoverMatrix("biasH"),
    biasO: crossoverMatrix("biasO")
  };
}

// Function to predict using NeuralNetwork model
export function predict(nn, inputArr) {
  // Convert input array to a matrix
  const inputMatrix = arrayToMatrix(inputArr);
  // Forward pass - calculate hidden and output matrices using current weights and biases
  const hiddenMatrix = mapMatrix(
    addMatrix(multiplyMatrix(nn.weightsIH, inputMatrix), nn.biasH),
    sigmoidFunc
  );
  const outputMatrix = mapMatrix(
    addMatrix(multiplyMatrix(nn.weightsHO, hiddenMatrix), nn.biasO),
    sigmoidFunc
  );
  // Convert the output matrix to a 1D array for the final prediction
  return matrixToArray(outputMatrix);
}

// Function to train using NeuralNetwork model
export function train(nn, inputArr, targetArr) {
  // Convert input and target arrays to matrices
  const inputMatrix = arrayToMatrix(inputArr);
  const targetMatrix = arrayToMatrix(targetArr);
  // Forward pass - calculate hidden and output matrices using current weights and biases
  const hiddenMatrix = mapMatrix(
    addMatrix(multiplyMatrix(nn.weightsIH, inputMatrix), nn.biasH),
    sigmoidFunc
  );
  const outputMatrix = mapMatrix(
    addMatrix(multiplyMatrix(nn.weightsHO, hiddenMatrix), nn.biasO),
    sigmoidFunc
  );
  // Calculate output layer errors and gradients
  const outputErrors = subtractMatrix(targetMatrix, outputMatrix);
  const outputGradients = multiplyMatrix(
    multiplyMatrix(
      mapMatrix(outputMatrix, sigmoidDerivativeFunc),
      outputErrors
    ),
    LEARNING_RATE
  );
  // Calculate hidden layer errors and gradients
  const hiddenErrors = multiplyMatrix(
    transposeMatrix(nn.weightsHO),
    outputErrors
  );
  const hiddenGradients = multiplyMatrix(
    multiplyMatrix(
      mapMatrix(hiddenMatrix, sigmoidDerivativeFunc),
      hiddenErrors
    ),
    LEARNING_RATE
  );
  // Update weights and biases using gradients and input data
  nn.weightsIH = addMatrix(
    nn.weightsIH,
    multiplyMatrix(hiddenGradients, transposeMatrix(inputMatrix))
  );
  nn.weightsHO = addMatrix(
    nn.weightsHO,
    multiplyMatrix(outputGradients, transposeMatrix(hiddenMatrix))
  );
  nn.biasH = addMatrix(nn.biasH, hiddenGradients);
  nn.biasO = addMatrix(nn.biasO, outputGradients);
}
