import { BIRD_COLORS, BIRD_CREATE_LIMIT } from "../constants/bird";
import { createBird, crossoverBirds, mutateBird } from "./bird";
import { getRandomItem } from "./helper";

export function createPopulation() {
  const birds = [];
  for (let i = 0; i < BIRD_CREATE_LIMIT; i += 1) {
    const newBird = createBird({ color: BIRD_COLORS.RED });
    birds.push(newBird);
  }
  return birds;
}

// Normalize the fitness of all birds
export function normalizeFitness(birds) {
  // Make distance exponentially better
  for (let i = 0; i < birds.length; i += 1) {
    birds[i].distance **= 2;
  }
  // Add up all the distance
  let sum = 0;
  for (let i = 0; i < birds.length; i += 1) {
    sum += birds[i].distance;
  }
  // Divide by the sum
  for (let i = 0; i < birds.length; i += 1) {
    birds[i].fitness = birds[i].distance / sum;
  }
}

export function selectPopulation(birds) {
  const matingPool = [];
  for (let i = 0; i < birds.length; i += 1) {
    // N is equal to fitness times 100, which gives an integer between 0 and 100.
    const N = birds[i].fitness * 100;
    // Add each member of the population to the mating pool N times
    for (let j = 0; j < N; j += 1) {
      matingPool.push(birds[i]);
    }
  }
  return matingPool;
}

// Mutation function to be passed into bird's brain
export function mutationFunc(x) {
  if (Math.random() < 0.1) {
    const offset = Math.random() * 0.5;
    const newX = x + offset;
    return newX;
  }
  return x;
}

// Generate a new population of birds
export function generatePopulation(birds) {
  const newBirds = [];
  for (let i = 0; i < BIRD_CREATE_LIMIT; i += 1) {
    // Select random partners from pool
    const partnerA = getRandomItem(birds);
    const partnerB = getRandomItem(birds);
    // Select a bird based on fitness
    const child = crossoverBirds(partnerA, partnerB);
    // Mutate child using mutation function
    mutateBird(child, mutationFunc);
    // Add child to new bird list
    newBirds.push(child);
  }
  return newBirds;
}

export function nextGeneration(birds) {
  // Normalize the fitness values 0 - 1
  normalizeFitness(birds);
  // Select population based on fitness
  const matingPool = selectPopulation(birds);
  // Generate a new set of birds
  return generatePopulation(matingPool);
}
