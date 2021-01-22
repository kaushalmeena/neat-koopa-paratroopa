import { context } from "../utils/canvas";
import { birdImages } from "../utils/images";
import { GRAVITY } from "../constants";

class Bird {
  constructor({ x, y, dy, type, wing } = {}) {
    this.x = x || 50;
    this.y = y || 50;
    this.dy = dy || 0;
    this.type = type || "green";
    this.wing = wing || "lower-wing";
  }

  draw() {
    context.drawImage(birdImages[this.type][this.wing], this.x, this.y, 28, 42);
  }

  flap() {
    this.dy = -5;
    this.wing = "upper-wing";
    setTimeout(() => {
      this.wing = "lower-wing";
    }, 80);
  }

  update() {
    this.dy += GRAVITY;
    // Prevent bird going offscreen by flapping
    if (this.y + this.dy > 0) {
      this.y += this.dy;
    }
  }
}

export default Bird;
