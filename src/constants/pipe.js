import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./app";

export const PIPE_ACTIVE_LIMIT = 4;
export const PIPE_CREATE_LIMIT = 6;

export const PIPE_WIDTH = 32;
export const PIPE_HEIGHT = 272;

export const PIPE_MIN_GAP = 100;

export const PIPE_MIN_DISTANCE = 200;
export const PIPE_MAX_DISTANCE = 400;

export const PIPE_MIN_X_POSITION = 10;
export const PIPE_MAX_X_POSITION = CANVAS_WIDTH - 10;

export const LOWER_PIPE_MIN_Y_POSITION =
  CANVAS_HEIGHT - PIPE_HEIGHT + PIPE_MIN_GAP;
export const LOWER_PIPE_MAX_Y_POSITION = CANVAS_HEIGHT - PIPE_HEIGHT;
export const UPPER_PIPE_MIN_Y_POSITION = -PIPE_MIN_GAP;
export const UPPER_PIPE_MAX_Y_POSITION = 0;

export const PIPE_SPEED = 2;

export const PIPE_TYPES = {
  UPPER: "upper",
  LOWER: "lower"
};
