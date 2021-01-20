import { context } from "../utils/canvas";
import { birdImages } from "../utils/images";
import { GRAVITY } from "../constants";

class Bird {
  constructor(color) {
    this.x = 50;
    this.y = 50;
    this.dy = 0;
    this.color = color || "green";
    this.type = "lower-flap";
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
    this.y += this.dy;
  }
}

export default Bird;
