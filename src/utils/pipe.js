import { CANVAS_WIDTH } from "../constants/app";
import {
  LOWER_PIPE_MAX_Y_POS,
  LOWER_PIPE_MIN_Y_POS,
  PIPE_CREATE_LIMIT,
  PIPE_HEIGHT,
  PIPE_MAX_X_POS,
  PIPE_MIN_X_POS,
  PIPE_SPEED,
  PIPE_TYPES,
  PIPE_WIDTH,
  UPPER_PIPE_MAX_Y_POS,
  UPPER_PIPE_MIN_Y_POS
} from "../constants/pipe";
import { context } from "./canvas";
import { getRandomInteger, getRandomItem } from "./helper";
import { pipeSprites } from "./sprites";

// Function to create a pipe object with specified or random properties
export function createPipe({ x, y, type } = {}) {
  const pipe = {};
  // Type of pipe (default to random type)
  pipe.type = type || getRandomItem([PIPE_TYPES.UPPER, PIPE_TYPES.LOWER]);
  // Coordinates of pipe (default to origin)
  pipe.x = x || 0;
  pipe.y = y || 0;
  // Make pipe initially inactive for drawing
  pipe.active = false;
  return pipe;
}

// Function to create an array of pipes
export function createPipes() {
  const pipes = [];
  for (let i = 0; i < PIPE_CREATE_LIMIT; i += 1) {
    const newPipe = createPipe();
    pipes.push(newPipe);
  }
  return pipes;
}

// Function to make a pipe active by updating its properties
export function makePipeActive(pipe, xPos) {
  pipe.type = getRandomItem([PIPE_TYPES.UPPER, PIPE_TYPES.LOWER]);
  pipe.x =
    xPos || CANVAS_WIDTH + getRandomInteger(PIPE_MIN_X_POS, PIPE_MAX_X_POS);
  // Set y position of the pipe based on type
  if (pipe.type === PIPE_TYPES.LOWER) {
    pipe.y = getRandomInteger(LOWER_PIPE_MIN_Y_POS, LOWER_PIPE_MAX_Y_POS);
  } else {
    pipe.y = getRandomInteger(UPPER_PIPE_MIN_Y_POS, UPPER_PIPE_MAX_Y_POS);
  }
  pipe.active = true;
}

// Function to make a pipe inactive by resetting its properties
export function makePipeInactive(pipe) {
  pipe.x = 0;
  pipe.y = 0;
  pipe.active = false;
}

// Function to update the position of a pipe based on its speed
export function updatePipe(pipe) {
  pipe.x -= PIPE_SPEED;
}

// Function to draw a pipe on the canvas
export function drawPipe(pipe) {
  const sprite = pipeSprites[pipe.type];
  context.drawImage(
    sprite.image,
    sprite.sx,
    sprite.sy,
    sprite.sWidth,
    sprite.sHeight,
    pipe.x,
    pipe.y,
    PIPE_WIDTH,
    PIPE_HEIGHT
  );
}
