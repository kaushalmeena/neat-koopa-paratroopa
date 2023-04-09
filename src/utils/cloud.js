import { CANVAS_WIDTH } from "../constants/app";
import {
  CLOUD_CREATE_LIMIT,
  CLOUD_MAX_X_POSITION,
  CLOUD_MAX_Y_POSITION,
  CLOUD_MIN_X_POSITION,
  CLOUD_MIN_Y_POSITION,
  CLOUD_SPEED,
  CLOUD_TYPES
} from "../constants/cloud";
import { context } from "./canvas";
import { getRandomInteger, getRandomItem } from "./helper";
import { cloudSprites } from "./sprites";

export function createCloud({ x, y, type } = {}) {
  const cloud = {};
  // Type of cloud
  cloud.type =
    type ||
    getRandomItem([CLOUD_TYPES.SMALL, CLOUD_TYPES.MEDIUM, CLOUD_TYPES.LARGE]);
  // Coordinates of cloud
  cloud.x = x || 0;
  cloud.y = y || 0;
  // Determines if cloud available for drawing
  cloud.active = false;
  return cloud;
}

export function createClouds() {
  const clouds = [];
  for (let i = 0; i < CLOUD_CREATE_LIMIT; i += 1) {
    const newCloud = createCloud();
    clouds.push(newCloud);
  }
  return clouds;
}

export function makeCloudActive(cloud) {
  cloud.type = getRandomItem([
    CLOUD_TYPES.SMALL,
    CLOUD_TYPES.MEDIUM,
    CLOUD_TYPES.LARGE
  ]);
  cloud.x =
    CANVAS_WIDTH + getRandomInteger(CLOUD_MIN_X_POSITION, CLOUD_MAX_X_POSITION);
  cloud.y = getRandomInteger(CLOUD_MIN_Y_POSITION, CLOUD_MAX_Y_POSITION);
  cloud.active = true;
}

export function makeCloudInactive(cloud) {
  cloud.x = 0;
  cloud.y = 0;
  cloud.active = false;
}

export function updateCloud(cloud) {
  cloud.x -= CLOUD_SPEED;
}

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
