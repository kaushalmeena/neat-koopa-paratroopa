import { canvas, context } from "../utils/canvas";
import { getRandomInteger, getRandomItem } from "../utils/helper";
import { pipeSprites } from "../utils/sprites";
import { PIPE_SPEED, PIPE_TYPES } from "../constants/pipe";

export function createPipe({ x, y, type } = {}) {
  const pipe = {};
  // Type of pipe (upper or lower)
  pipe.type = type || getRandomItem([PIPE_TYPES.UPPER, PIPE_TYPES.LOWER]);
  // Coordinates of pipe
  pipe.x = x || canvas.width + getRandomInteger(10, 500);
  if (y) {
    pipe.y = y;
  } else {
    // Init lower and upper bounds for y-coordinate
    const minY = pipe.type === PIPE_TYPES.LOWER ? canvas.height - 272 : -100;
    const maxY = pipe.type === PIPE_TYPES.LOWER ? canvas.height - 172 : 0;
    pipe.y = getRandomInteger(minY, maxY);
  }
  return pipe;
}

export function updatePipe(pipe) {
  pipe.x -= PIPE_SPEED;
}

export function drawPipe(pipe) {
  context.drawImage(pipeSprites[pipe.type], pipe.x, pipe.y);
}
