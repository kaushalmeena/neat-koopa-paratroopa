import {
  BIRD_COLORS,
  BIRD_GRAVITY,
  BIRD_LIFT,
  BIRD_WINGS
} from "../constants/bird";
import { PIPE_TYPES } from "../constants/pipe";
import { canvas, context } from "./canvas";
import { createCopy, getRandomItem, normalizeValue } from "./helper";
import { birdSprites } from "./sprites";
import {
  createNeuralNetwork,
  crossoverNeuralNetworks,
  mutateNeuralNetwork,
  predict
} from "./nn";

export function createBird({ x, y, dy, color, wing, brain } = {}) {
  const bird = {};
  // Color of bird
  bird.color = color || BIRD_COLORS.GREEN;
  // Wing of bird
  bird.wing = wing || BIRD_WINGS.LOWER;
  // Coordinates of bird
  bird.x = x || 50;
  bird.y = y || 50;
  // Vertical velocity of bird
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

export function mutateBird(bird, func) {
  mutateNeuralNetwork(bird.brain, func);
}

export function updateBird(bird) {
  bird.dy += BIRD_GRAVITY;
  // Prevent bird going offscreen by flapping
  if (bird.y + bird.dy > 0) {
    bird.y += bird.dy;
  }
  // Every frame it is alive increases the distance
  bird.distance += 1;
}

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
    sprite.sWidth,
    sprite.sHeight
  );
}

export function crossoverBirds(a, b) {
  return createBird({
    brain: crossoverNeuralNetworks(a.brain, b.brain),
    color: getRandomItem([a.color, b.color])
  });
}

let timeout;

export function flap(bird) {
  clearTimeout(timeout);
  bird.dy = BIRD_LIFT;
  bird.wing = BIRD_WINGS.UPPER;
  timeout = setTimeout(() => {
    bird.wing = BIRD_WINGS.LOWER;
  }, 80);
}

export function think(bird, pipes) {
  // Find the closest pipe
  let closestPipe = null;
  let minDistance = Number.POSITIVE_INFINITY;
  for (let i = 0; i < pipes.length; i += 1) {
    const diff = pipes[i].x - bird.x;
    if (diff > 0 && diff < minDistance) {
      minDistance = diff;
      closestPipe = pipes[i];
    }
  }

  if (closestPipe != null) {
    const inputs = [];
    const relativeX = closestPipe.x - bird.x;
    const relativeY = closestPipe.y - bird.y;
    // Distance in the Y axis from the bird to the top of the screen
    inputs[0] = normalizeValue(bird.y, 0, canvas.height);
    // Distance in the Y axis from the bird to the bottom of the screen
    inputs[1] = 1 - inputs[0];
    // Distance in the X axis from the bird to the next pipe
    inputs[2] = normalizeValue(relativeX, 0, canvas.width);
    // Distance in the Y axis from the bird to the highest point of the pipe in the top
    inputs[3] =
      closestPipe.type === PIPE_TYPES.LOWER
        ? inputs[0]
        : normalizeValue(relativeY + 272, 0, canvas.height);
    // Distance in the Y axis form the bird to the lowest point of the pipe in the bottom
    inputs[4] =
      closestPipe.type === PIPE_TYPES.LOWER
        ? normalizeValue(relativeY, 0, canvas.height)
        : inputs[1];
    // Get the outputs from the network
    const action = predict(bird.brain, inputs);
    // Decide to flap or not!
    if (action[1] > action[0]) {
      flap(bird);
    }
  }
}
