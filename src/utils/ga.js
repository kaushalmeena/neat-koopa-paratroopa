import { BIRD_COLORS, BIRD_CREATE_LIMIT } from "../constants/bird";
import { createBird, crossoverBirds, mutateBird } from "./bird";
import { getRandomItem } from "./helper";

// Function to normalize the fitness values of birds in the population
function normalizeFitness(birds) {
  // Make distance exponentially better
  for (let i = 0; i < birds.length; i += 1) {
    birds[i].distance **= 2;
  }
  // Add up all the distance
  let sum = 0;
  for (let i = 0; i < birds.length; i += 1) {
    sum += birds[i].distance;
  }
  // Calculate fitness by dividing by the sum
  for (let i = 0; i < birds.length; i += 1) {
    birds[i].fitness = birds[i].distance / sum;
  }
}

// Function to select individuals for mating based on their fitness
function selectPopulation(birds) {
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
function mutationFunc(x) {
  // Apply mutation with a 10% probability
  if (Math.random() < 0.1) {
    // Generate a random offset between 0 and 0.5
    const offset = Math.random() * 0.5;
    // Apply mutation to the current value
    return x + offset;
  }
  return x;
}

// Function to generate a new population of birds through crossover and mutation
function generatePopulation(birds) {
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

// Function to create an initial population of birds
export function createPopulation() {
  const birds = [];
  for (let i = 0; i < BIRD_CREATE_LIMIT; i += 1) {
    const newBird = createBird({ color: BIRD_COLORS.RED });
    birds.push(newBird);
  }
  return birds;
}

// Function to generate the next generation of birds
export function nextGeneration(birds) {
  // Normalize the fitness values to a range of 0 to 1
  normalizeFitness(birds);
  // Select individuals for mating based on their fitness
  const matingPool = selectPopulation(birds);
  // Generate a new population through crossover and mutation
  return generatePopulation(matingPool);
}
