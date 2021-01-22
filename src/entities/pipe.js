import { canvas, context } from "../utils/canvas";
import { PIPE_SPEED } from "../constants";
import { getRandomInteger } from "../utils/helper";
import { pipeImages } from "../utils/images";

class Pipe {
  constructor({ x, y, type } = {}) {
    if (type) {
      this.type = type;
    } else {
      // Randomly assign whether to use upper or lower pipe
      this.type = Math.random() > 0.5 ? "upper-pipe" : "lower-pipe";
    }
    if (x) {
      this.x = x;
    } else {
      this.x = canvas.width + getRandomInteger(10, 500);
    }
    if (y) {
      this.y = y;
    } else {
      const minY = this.type == "lower-pipe" ? canvas.height - 272 : -100;
      const maxY = this.type == "lower-pipe" ? canvas.height - 172 : 0;
      this.y = getRandomInteger(minY, maxY);
    }
  }

  draw() {
    context.drawImage(pipeImages[this.type], this.x, this.y);
  }

  update() {
    this.x = this.x - PIPE_SPEED;
  }
}

export default Pipe;
