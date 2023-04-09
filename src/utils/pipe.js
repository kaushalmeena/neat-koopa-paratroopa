import { CANVAS_WIDTH } from "../constants/app";
import {
  LOWER_PIPE_MAX_Y_POSITION,
  LOWER_PIPE_MIN_Y_POSITION,
  PIPE_CREATE_LIMIT,
  PIPE_HEIGHT,
  PIPE_MAX_X_POSITION,
  PIPE_MIN_X_POSITION,
  PIPE_SPEED,
  PIPE_TYPES,
  PIPE_WIDTH,
  UPPER_PIPE_MAX_Y_POSITION,
  UPPER_PIPE_MIN_Y_POSITION
} from "../constants/pipe";
import { context } from "./canvas";
import { getRandomInteger, getRandomItem } from "./helper";
import { pipeSprites } from "./sprites";

export function createPipe({ x, y, type } = {}) {
  const pipe = {};
  // Type of pipe (upper or lower)
  pipe.type = type || getRandomItem([PIPE_TYPES.UPPER, PIPE_TYPES.LOWER]);
  // Coordinates of pipe
  pipe.x = x || 0;
  pipe.y = y || 0;
  // Determines if pipe available for rendering
  pipe.active = false;
  return pipe;
}

export function createPipes() {
  const pipes = [];
  for (let i = 0; i < PIPE_CREATE_LIMIT; i += 1) {
    const newPipe = createPipe();
    pipes.push(newPipe);
  }
  return pipes;
}

export function makePipeActive(pipe, xPosition) {
  pipe.type = getRandomItem([PIPE_TYPES.UPPER, PIPE_TYPES.LOWER]);
  pipe.x =
    xPosition ||
    CANVAS_WIDTH + getRandomInteger(PIPE_MIN_X_POSITION, PIPE_MAX_X_POSITION);
  const minY =
    pipe.type === PIPE_TYPES.LOWER
      ? LOWER_PIPE_MIN_Y_POSITION
      : UPPER_PIPE_MIN_Y_POSITION;
  const maxY =
    pipe.type === PIPE_TYPES.LOWER
      ? LOWER_PIPE_MAX_Y_POSITION
      : UPPER_PIPE_MAX_Y_POSITION;
  pipe.y = getRandomInteger(minY, maxY);
  pipe.active = true;
}

export function makePipeInactive(pipe) {
  pipe.x = 0;
  pipe.y = 0;
  pipe.active = false;
}

export function updatePipe(pipe) {
  pipe.x -= PIPE_SPEED;
}

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
