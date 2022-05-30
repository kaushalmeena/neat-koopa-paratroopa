import { getRandomItem } from "./helper";
import {
  createMatrix,
  randomizeMatrix,
  arrayToMatrix,
  multiplyMatrix,
  subtractMatrix,
  matrixToArray,
  addMatrix,
  mapMatrix,
  transposeMatrix
} from "./matrix";

export const LEARNING_RATE = 0.1;

export function sigmoidFunc(x) {
  return 1 / (1 + Math.exp(-x));
}

export function sigmoidDerivativeFunc(x) {
  return x * (1 - x);
}

export function createNeuralNetwork(...args) {
  const neuralNetwork = {};
  if (args[0] instanceof Object) {
    const nn = args[0];
    neuralNetwork.inputNodes = nn.inputNodes;
    neuralNetwork.hiddenNodes = nn.hiddenNodes;
    neuralNetwork.outputNodes = nn.outputNodes;
    neuralNetwork.weightsIH = nn.weightsIH;
    neuralNetwork.weightsHO = nn.weightsHO;
    neuralNetwork.biasH = nn.biasH;
    neuralNetwork.biasO = nn.biasO;
  } else {
    [
      neuralNetwork.inputNodes,
      neuralNetwork.hiddenNodes,
      neuralNetwork.outputNodes
    ] = args;
    neuralNetwork.weightsIH = createMatrix(
      neuralNetwork.hiddenNodes,
      neuralNetwork.inputNodes
    );
    neuralNetwork.weightsHO = createMatrix(
      neuralNetwork.outputNodes,
      neuralNetwork.hiddenNodes
    );
    neuralNetwork.biasH = createMatrix(neuralNetwork.hiddenNodes, 1);
    neuralNetwork.biasO = createMatrix(neuralNetwork.outputNodes, 1);
    neuralNetwork.weightsIH = randomizeMatrix(neuralNetwork.weightsIH);
    neuralNetwork.weightsHO = randomizeMatrix(neuralNetwork.weightsHO);
    neuralNetwork.biasH = randomizeMatrix(neuralNetwork.biasH);
    neuralNetwork.biasO = randomizeMatrix(neuralNetwork.biasO);
  }
  return neuralNetwork;
}

// Accept an arbitrary function for mutation
export function mutateNeuralNetwork(neuralNetwork, func) {
  neuralNetwork.weightsIH = mapMatrix(neuralNetwork.weightsIH, func);
  neuralNetwork.weightsHO = mapMatrix(neuralNetwork.weightsHO, func);
  neuralNetwork.biasH = mapMatrix(neuralNetwork.biasH, func);
  neuralNetwork.biasO = mapMatrix(neuralNetwork.biasO, func);
}

// Crossover weights of two neural networks
export function crossoverNeuralNetworks(a, b) {
  if (
    a.inputNodes !== b.inputNodes ||
    a.hiddenNodes !== b.hiddenNodes ||
    a.outputNodes !== b.outputNodes
  ) {
    throw Error("Number of nodes in A and B must match");
  }
  return createNeuralNetwork({
    weightsIH: mapMatrix(a.weightsIH, (elem, i, j) =>
      getRandomItem([elem, b.weightsIH.data[i][j]])
    ),
    weightsHO: mapMatrix(a.weightsHO, (elem, i, j) =>
      getRandomItem([elem, b.weightsHO.data[i][j]])
    ),
    biasH: mapMatrix(a.biasH, (elem, i, j) =>
      getRandomItem([elem, b.biasH.data[i][j]])
    ),
    biasO: mapMatrix(a.biasO, (elem, i, j) =>
      getRandomItem([elem, b.biasO.data[i][j]])
    ),
    inputNodes: a.inputNodes,
    hiddenNodes: a.hiddenNodes,
    outputNodes: a.outputNodes
  });
}

export function predict(neuralNetwork, inputArray) {
  // Generating the Hidden Outputs
  const inputMatrix = arrayToMatrix(inputArray);
  let hiddenMatrix = multiplyMatrix(neuralNetwork.weightsIH, inputMatrix);
  hiddenMatrix = addMatrix(hiddenMatrix, neuralNetwork.biasH);
  // Perform activation function
  hiddenMatrix = mapMatrix(hiddenMatrix, sigmoidFunc);
  // Generating the output's output!
  let outputMatrix = multiplyMatrix(neuralNetwork.weightsHO, hiddenMatrix);
  outputMatrix = addMatrix(outputMatrix, neuralNetwork.biasO);
  outputMatrix = mapMatrix(outputMatrix, sigmoidFunc);
  // Return matrix's data as 1D array
  return matrixToArray(outputMatrix);
}

export function train(neuralNetwork, inputArray, targetArray) {
  // Generating the Hidden Outputs
  const inputMatrix = arrayToMatrix(inputArray);
  let hiddenMatrix = multiplyMatrix(neuralNetwork.weightsIH, inputMatrix);
  hiddenMatrix = addMatrix(hiddenMatrix, neuralNetwork.biasH);
  // Perform activation function
  hiddenMatrix = mapMatrix(hiddenMatrix, sigmoidFunc);
  // Generate the output's output
  let outputMatrix = multiplyMatrix(neuralNetwork.weightsHO, hiddenMatrix);
  outputMatrix = addMatrix(outputMatrix, neuralNetwork.biasO);
  outputMatrix = mapMatrix(outputMatrix, sigmoidFunc);
  // Convert array to matrix object
  const targetMatrix = arrayToMatrix(targetArray);
  // Calculate the error
  const outputErrors = subtractMatrix(targetMatrix, outputMatrix);
  // Calculate gradient
  let gradients = mapMatrix(outputMatrix, sigmoidDerivativeFunc);
  gradients = multiplyMatrix(gradients, outputErrors);
  gradients = multiplyMatrix(gradients, LEARNING_RATE);
  // Calculate deltas
  const hiddenMatrixTranposed = transposeMatrix(hiddenMatrix);
  const weightsHODeltas = multiplyMatrix(gradients, hiddenMatrixTranposed);
  // Adjust the weights by deltas
  neuralNetwork.weightsHO = addMatrix(neuralNetwork.weightsHO, weightsHODeltas);
  // Adjust the bias by its deltas (which is just the gradients)
  neuralNetwork.biasO = addMatrix(neuralNetwork.biasO, gradients);
  // Calculate the hidden layer errors
  const weightsHOTransposed = transposeMatrix(neuralNetwork.weightsHO);
  const hiddenErrors = multiplyMatrix(weightsHOTransposed, outputErrors);
  // Calculate hidden gradient
  let hiddenGradient = mapMatrix(hiddenMatrix, sigmoidDerivativeFunc);
  hiddenGradient = multiplyMatrix(hiddenGradient, hiddenErrors);
  hiddenGradient = multiplyMatrix(hiddenGradient, LEARNING_RATE);
  // Calculate input -> hidden deltas
  const inputMatrixTransposed = transposeMatrix(inputMatrix);
  const weightsIHDeltas = multiplyMatrix(hiddenGradient, inputMatrixTransposed);
  neuralNetwork.weightsIH = addMatrix(weightsIHDeltas);
  // Adjust the bias by its deltas (which is just the gradients)
  neuralNetwork.biasH = addMatrix(hiddenGradient);
}
