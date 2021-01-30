import { BIRD_LIMIT } from "../constants";
import Bird from "../entities/bird";
import { gameState } from "./game";
import { getRandomInteger } from "./helper";

export const initialGeneration = () => {
  const birds = [];
  for (let i = 0; i < BIRD_LIMIT; i++) {
    birds.push(new Bird());
  }
  return birds;
};

export const nextGeneration = () => {
  // Normalize the fitness values 0 - 1
  normalizeFitness(gameState.birds);
  // Generate a new set of birds
  gameState.birds = generatePopulation(gameState.birds);
  // Copy those birds to another array
};

// Generate a new population of birds
export const generatePopulation = (oldBirds) => {
  let newBirds = [];
  for (let i = 0; i < oldBirds.length; i++) {
    // Select a bird based on fitness
    let bird = poolSelection(oldBirds);
    newBirds[i] = bird;
  }
  return newBirds;
};

// Normalize the fitness of all birds
export const normalizeFitness = (birds) => {
  // Make score exponentially better?
  for (let i = 0; i < birds.length; i++) {
    birds[i].score = Math.pow(birds[i].score, 2);
  }
  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < birds.length; i++) {
    sum += birds[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].score / sum;
  }
};

// An algorithm for picking one bird from an array based on fitness
export const poolSelection = (birds) => {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = getRandomInteger(0, 1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= birds[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy! (this includes mutation)
  return birds[index].copy();
};

// Mutation function to be passed into bird.mutate
export const mutationFunc = (x) => {
  if (Math.random() < 0.1) {
    let offset = Math.random() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
};
