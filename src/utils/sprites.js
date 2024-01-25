import { BIRD_COLORS, BIRD_WINGS } from "../constants/bird";
import { CLOUD_TYPES } from "../constants/cloud";
import { PIPE_TYPES } from "../constants/pipe";
import spritesheet from "../assets/sprites/Spritesheet.png";

const spritesheetImage = new Image();
spritesheetImage.src = spritesheet;

export const cloudSprites = {
  [CLOUD_TYPES.SMALL]: {
    image: spritesheetImage,
    sx: 64,
    sy: 144,
    sWidth: 32,
    sHeight: 24
  },
  [CLOUD_TYPES.MEDIUM]: {
    image: spritesheetImage,
    sx: 64,
    sy: 120,
    sWidth: 48,
    sHeight: 24
  },
  [CLOUD_TYPES.LARGE]: {
    image: spritesheetImage,
    sx: 64,
    sy: 0,
    sWidth: 64,
    sHeight: 24
  }
};

export const pipeSprites = {
  [PIPE_TYPES.UPPER]: {
    image: spritesheetImage,
    sx: 32,
    sy: 0,
    sWidth: 32,
    sHeight: 272
  },
  [PIPE_TYPES.LOWER]: {
    image: spritesheetImage,
    sx: 0,
    sy: 0,
    sWidth: 32,
    sHeight: 272
  }
};

export const birdSprites = {
  [BIRD_COLORS.GREEN]: {
    [BIRD_WINGS.UP]: {
      image: spritesheetImage,
      sx: 96,
      sy: 24,
      sWidth: 32,
      sHeight: 48
    },
    [BIRD_WINGS.DOWN]: {
      image: spritesheetImage,
      sx: 96,
      sy: 72,
      sWidth: 32,
      sHeight: 48
    }
  },
  [BIRD_COLORS.RED]: {
    [BIRD_WINGS.UP]: {
      image: spritesheetImage,
      sx: 64,
      sy: 24,
      sWidth: 32,
      sHeight: 48
    },
    [BIRD_WINGS.DOWN]: {
      image: spritesheetImage,
      sx: 64,
      sy: 72,
      sWidth: 32,
      sHeight: 48
    }
  }
};
