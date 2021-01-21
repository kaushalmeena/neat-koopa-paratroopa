import { context } from "../utils/canvas";
import { birdImages } from "../utils/images";
import { GRAVITY } from "../constants";

class Bird {
  constructor(x, y, dy, color, type) {
    this.x = x || 50;
    this.y = y || 50;
    this.dy = dy || 0;
    this.color = color || "green";
    this.type = type || "lower-flap";
  }

  draw() {
    context.drawImage(
      birdImages[this.color][this.type],
      this.x,
      this.y,
      28,
      42
    );
  }

  flap() {
    this.dy = -5;
    this.type = "upper-flap";
    setTimeout(() => {
      this.type = "lower-flap";
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
