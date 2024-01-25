import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/app";
import {
  BIRD_COLORS,
  BIRD_FLAP_TIMEOUT,
  BIRD_FALL_SPEED,
  BIRD_HEIGHT,
  BIRD_FLAP_LIFT,
  BIRD_WIDTH,
  BIRD_WINGS
} from "../constants/bird";
import { PIPE_HEIGHT, PIPE_TYPES, PIPE_WIDTH } from "../constants/pipe";
import { context } from "./canvas";
import {
  createCopy,
  getRandomItem,
  isRectangleOverlapping,
  normalizeValue
} from "./helper";
import {
  createNeuralNetwork,
  crossoverNeuralNetworks,
  mutateNeuralNetwork,
  predict
} from "./nn";
import { birdSprites } from "./sprites";

// Function to create a bird object with specified or default properties
export function createBird({ x, y, dy, color, wing, brain } = {}) {
  const bird = {};
  // Color of bird (default to green)
  bird.color = color || BIRD_COLORS.GREEN;
  // Wing of bird (default to down)
  bird.wing = wing || BIRD_WINGS.DOWN;
  // Coordinates of bird (default to (50, 50))
  bird.x = x || 50;
  bird.y = y || 50;
  // Vertical velocity of bird (default to 0)
  bird.dy = dy || 0;
  // Brain of bird (contains Neural Network data)
  if (brain) {
    // Create copy of brain to avoid reference problems
    bird.brain = createCopy(brain);
  } else {
    bird.brain = createNeuralNetwork(5, 8, 2);
  }
  // Distance is how many frames it's been alive
  bird.distance = 0;
  // Fitness is normalized version of distance
  bird.fitness = 0;
  return bird;
}

// Function to apply mutation to a bird's brain
export function mutateBird(bird, func) {
  mutateNeuralNetwork(bird.brain, func);
}

// Function to update the position of a bird based on its velocity
export function updateBird(bird) {
  bird.dy += BIRD_FALL_SPEED;
  // Prevent bird going offscreen by flapping
  if (bird.y + bird.dy > 0) {
    bird.y += bird.dy;
  }
  // Every frame it is alive increases the distance
  bird.distance += 1;
}

// Function to draw a bird on the canvas
export function drawBird(bird) {
  const sprite = birdSprites[bird.color][bird.wing];
  context.drawImage(
    sprite.image,
    sprite.sx,
    sprite.sy,
    sprite.sWidth,
    sprite.sHeight,
    bird.x,
    bird.y,
    BIRD_WIDTH,
    BIRD_HEIGHT
  );
}

// Function to create a new bird through crossover of two parent birds
export function crossoverBirds(a, b) {
  return createBird({
    brain: crossoverNeuralNetworks(a.brain, b.brain),
    color: getRandomItem([a.color, b.color])
  });
}

let timeout;

// Function to simulate the bird flapping its wings
export function flap(bird) {
  clearTimeout(timeout);
  bird.dy = BIRD_FLAP_LIFT;
  bird.wing = BIRD_WINGS.UP;
  timeout = setTimeout(() => {
    bird.wing = BIRD_WINGS.DOWN;
  }, BIRD_FLAP_TIMEOUT);
}

// Function for the bird to make decisions based on the current environment (pipes)
export function think(bird, pipes) {
  // Find the closest pipe
  let closestPipe = null;
  let minDistance = Number.POSITIVE_INFINITY;
  for (let i = 0; i < pipes.length; i += 1) {
    // Check if pipe is active
    if (pipes[i].active) {
      const diff = pipes[i].x - bird.x;
      if (diff > 0 && diff < minDistance) {
        minDistance = diff;
        closestPipe = pipes[i];
      }
    }
  }
  if (closestPipe) {
    const inputs = [];
    const relativeX = closestPipe.x - bird.x;
    const relativeY = closestPipe.y - bird.y;
    // Distance in the Y axis from the bird to the top of the screen
    inputs[0] = normalizeValue(bird.y, 0, CANVAS_HEIGHT);
    // Distance in the Y axis from the bird to the bottom of the screen
    inputs[1] = 1 - inputs[0];
    // Distance in the X axis from the bird to the next pipe
    inputs[2] = normalizeValue(relativeX, 0, CANVAS_WIDTH);
    // Distance in the Y axis from the bird to the highest point of the pipe in the top
    inputs[3] =
      closestPipe.type === PIPE_TYPES.LOWER
        ? inputs[0]
        : normalizeValue(relativeY + PIPE_HEIGHT, 0, CANVAS_HEIGHT);
    // Distance in the Y axis form the bird to the lowest point of the pipe in the bottom
    inputs[4] =
      closestPipe.type === PIPE_TYPES.LOWER
        ? normalizeValue(relativeY, 0, CANVAS_HEIGHT)
        : inputs[1];
    // Get the outputs from the network
    const action = predict(bird.brain, inputs);
    // Decide to flap or not!
    if (action[1] > action[0]) {
      flap(bird);
    }
  }
}

// Function to check if bird is out of bounds or collided
export function isBirdDead(bird, pipes) {
  // If bird fall down the screen
  if (bird.y > CANVAS_HEIGHT + BIRD_HEIGHT) {
    return true;
  }
  // Check if bird has collided with active pipes
  for (let i = 0; i < pipes.length; i += 1) {
    if (
      pipes[i].active &&
      isRectangleOverlapping(
        bird.x + 4,
        bird.y + 4,
        BIRD_WIDTH,
        BIRD_HEIGHT,
        pipes[i].x,
        pipes[i].y,
        PIPE_WIDTH,
        PIPE_HEIGHT
      )
    ) {
      return true;
    }
  }
  return false;
}
