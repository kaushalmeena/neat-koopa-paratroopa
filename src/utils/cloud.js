import { CLOUD_SPEED, CLOUD_TYPES } from "../constants/cloud";
import { canvas, context } from "../utils/canvas";
import { getRandomInteger, getRandomItem } from "../utils/helper";
import { cloudSprites } from "../utils/sprites";

export function createCloud({ x, y, type } = {}) {
  const cloud = {};
  // Coordinates of cloud
  cloud.x = x || canvas.width + getRandomInteger(10, 500);
  cloud.y = y || getRandomInteger(30, canvas.height - 30);
  // Type of cloud
  cloud.type =
    type ||
    getRandomItem([CLOUD_TYPES.TYPE_1, CLOUD_TYPES.TYPE_2, CLOUD_TYPES.TYPE_3]);
  return cloud;
}

export function updateCloud(cloud) {
  cloud.x -= CLOUD_SPEED;
}

export function drawCloud(cloud) {
  context.drawImage(cloudSprites[cloud.type], cloud.x, cloud.y);
}
