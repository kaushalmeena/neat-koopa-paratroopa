import { canvas, context } from "../utils/canvas";
import { birdSprites } from "../utils/sprites";
import { BIRD_LIFT, GRAVITY } from "../constants";
import NeuralNetwork from "../lib/nn";
import { getRandomItem, normalize } from "../utils/helper";

class Bird {
  constructor({ x, y, dy, type, wing, brain } = {}) {
    // Position of bird
    this.x = x || 50;
    this.y = y || 50;
    // Vertical velocity of bird
    this.dy = dy || 0;

    this.type = type || "green";
    this.wing = wing || "lower-wing";

    // Is this a copy of another Bird or a new one?
    // The Neural Network is the bird's "brain"
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }

    // Distance is how many frames it's been alive
    this.distance = 0;
    // Fitness is normalized version of distance
    this.fitness = 0;
  }

  // Mutate bird's brain using mutation function
  mutate(func) {
    this.brain.mutate(func);
  }

  draw() {
    context.drawImage(
      birdSprites[this.type][this.wing],
      this.x,
      this.y,
      28,
      42
    );
  }

  flap() {
    this.dy = BIRD_LIFT;
    this.wing = "upper-wing";
    setTimeout(() => {
      this.wing = "lower-wing";
    }, 80);
  }

  // Think decides if bird should flap or not
  think(pipes) {
    // Find the closest pipe
    let closestPipe = null;
    let record = Number.POSITIVE_INFINITY;

    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closestPipe = pipes[i];
      }
    }

    if (closestPipe != null) {
      const inputs = [];

      // Distance in the Y axis from the bird to the top of the screen
      inputs[0] = normalize(this.y, 0, canvas.height);

      // Distance in the Y axis from the bird to the bottom of the screen
      inputs[1] = 1 - inputs[0];

      // Distance in the X axis from the bird to the next pipe
      inputs[2] = normalize(
        Math.max(closestPipe.x - this.x, canvas.width),
        0,
        canvas.width
      );

      // Distance in the Y axis from the bird to the highest point of the pipe in the top
      inputs[3] =
        closestPipe.type === "lower-pipe"
          ? inputs[0]
          : normalize(this.y - closestPipe.y + 272, 0, canvas.height);

      // Distance in the Y axis form the bird to the lowest point of the pipe in the bottom
      inputs[4] =
        closestPipe.type === "lower-pipe"
          ? normalize(canvas.height - this.y - closestPipe.y, 0, canvas.height)
          : inputs[1];

      // Get the outputs from the network
      const action = this.brain.predict(inputs);

      // Decide to flap or not!
      if (action[1] > action[0]) {
        this.flap();
      }
    }
  }

  update() {
    this.dy += GRAVITY;
    // Prevent bird going offscreen by flapping
    if (this.y + this.dy > 0) {
      this.y += this.dy;
    }
    // Every frame it is alive increases the distance
    this.distance += 1;
  }

  static crossover(a, b) {
    return new Bird({
      brain: NeuralNetwork.crossover(a.brain, b.brain),
      type: getRandomItem([a.type, b.type])
    });
  }
}

export default Bird;
