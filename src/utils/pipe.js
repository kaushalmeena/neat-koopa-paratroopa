import { canvas, context } from "./canvas";
import { getRandomInteger, getRandomItem } from "./helper";
import { pipeSprites } from "./sprites";
import { PIPE_SPEED, PIPE_TYPES } from "../constants/pipe";

export function getFreePipeOrCreate(pipes) {
  return pipes.find((pipe) => pipe.free);
}

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
  const sprite = pipeSprites[pipe.type];
  context.drawImage(
    sprite.image,
    sprite.sx,
    sprite.sy,
    sprite.sWidth,
    sprite.sHeight,
    pipe.x,
    pipe.y,
    sprite.sWidth,
    sprite.sHeight
  );
}
