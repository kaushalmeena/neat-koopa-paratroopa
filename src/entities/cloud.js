import { CLOUD_SPEED } from "../constants";
import { canvas, context } from "../utils/canvas";
import { getRandomIntegerBetween } from "../utils/helper";
import { cloudImages } from "../utils/images";

class Cloud {
  constructor(x, y, type) {
    this.x = x || canvas.width + getRandomIntegerBetween(10, 500);
    this.y = y || getRandomIntegerBetween(30, canvas.height - 30);
    this.type = type || getRandomIntegerBetween(1, 3);
  }

  draw() {
    context.drawImage(cloudImages[this.type], this.x, this.y);
  }

  update() {
    this.x = this.x - CLOUD_SPEED;
  }
}

export default Cloud;
