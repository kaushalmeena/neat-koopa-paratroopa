import { CANVAS_WIDTH } from "../constants/app";
import {
  CLOUD_CREATE_LIMIT,
  CLOUD_MAX_X_POS,
  CLOUD_MAX_Y_POS,
  CLOUD_MIN_X_POS,
  CLOUD_MIN_Y_POS,
  CLOUD_SPEED,
  CLOUD_TYPES
} from "../constants/cloud";
import { context } from "./canvas";
import { getRandomInteger, getRandomItem } from "./helper";
import { cloudSprites } from "./sprites";

// Function to create a cloud object with specified or random properties
export function createCloud({ x, y, type } = {}) {
  const cloud = {};
  // Type of cloud (default to random type)
  cloud.type =
    type ||
    getRandomItem([CLOUD_TYPES.SMALL, CLOUD_TYPES.MEDIUM, CLOUD_TYPES.LARGE]);
  // Coordinates of cloud (default to origin)
  cloud.x = x || 0;
  cloud.y = y || 0;
  // Make cloud initially inactive for drawing
  cloud.active = false;
  return cloud;
}

// Function to create an array of clouds
export function createClouds() {
  const clouds = [];
  for (let i = 0; i < CLOUD_CREATE_LIMIT; i += 1) {
    const newCloud = createCloud();
    clouds.push(newCloud);
  }
  return clouds;
}

// Function to make a cloud active by updating its properties
export function makeCloudActive(cloud) {
  cloud.type = getRandomItem([
    CLOUD_TYPES.SMALL,
    CLOUD_TYPES.MEDIUM,
    CLOUD_TYPES.LARGE
  ]);
  cloud.x = CANVAS_WIDTH + getRandomInteger(CLOUD_MIN_X_POS, CLOUD_MAX_X_POS);
  cloud.y = getRandomInteger(CLOUD_MIN_Y_POS, CLOUD_MAX_Y_POS);
  cloud.active = true;
}

// Function to make a cloud inactive by resetting its properties
export function makeCloudInactive(cloud) {
  cloud.x = 0;
  cloud.y = 0;
  cloud.active = false;
}

// Function to update the position of a cloud based on its speed
export function updateCloud(cloud) {
  cloud.x -= CLOUD_SPEED;
}

// Function to draw a cloud on the canvas
export function drawCloud(cloud) {
  const sprite = cloudSprites[cloud.type];
  context.drawImage(
    sprite.image,
    sprite.sx,
    sprite.sy,
    sprite.sWidth,
    sprite.sHeight,
    cloud.x,
    cloud.y,
    sprite.sWidth,
    sprite.sHeight
  );
}
