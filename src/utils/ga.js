import { BIRD_LIMIT } from "../constants";
import Bird from "../entities/bird";
import { getRandomItem } from "./helper";

export function initialPopulation() {
  const birds = [];
  for (let i = 0; i < BIRD_LIMIT; i++) {
    birds.push(new Bird({ type: "red" }));
  }
  return birds;
}

export function nextGeneration(birds) {
  // Normalize the fitness values 0 - 1
  normalizeFitness(birds);
  // Select population based on fitness
  const matingPool = selectPopulation(birds);
  // Generate a new set of birds
  return generatePopulation(matingPool);
}

export function selectPopulation(birds) {
  const matingPool = [];
  for (let i = 0; i < birds.length; i++) {
    // N is equal to fitness times 100, which gives an integer between 0 and 100.
    const N = birds[i].fitness * 100;
    // Add each member of the population to the mating pool N times
    for (let j = 0; j < N; j++) {
      matingPool.push(birds[i]);
    }
  }
  return matingPool;
}

// Generate a new population of birds
export function generatePopulation(birds) {
  const newBirds = [];
  for (let i = 0; i < BIRD_LIMIT; i++) {
    // Select random partners from pool
    const partnerA = getRandomItem(birds);
    const partnerB = getRandomItem(birds);
    // Select a bird based on fitness
    const child = Bird.crossover(partnerA, partnerB);
    // Mutate child using mutation function
    child.mutate(mutationFunc);
    // Add child to new bird list
    newBirds.push(child);
  }
  return newBirds;
}

// Normalize the fitness of all birds
export function normalizeFitness(birds) {
  // Make distance exponentially better
  for (let i = 0; i < birds.length; i++) {
    birds[i].distance = Math.pow(birds[i].distance, 2);
  }
  // Add up all the distance
  let sum = 0;
  for (let i = 0; i < birds.length; i++) {
    sum += birds[i].distance;
  }
  // Divide by the sum
  for (let i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].distance / sum;
  }
}

// Mutation function to be passed into bird's brain
export function mutationFunc(x) {
  if (Math.random() < 0.1) {
    let offset = Math.random() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}
