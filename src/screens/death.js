import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/app";
import { state } from "../state";
import { context } from "../utils/canvas";

function drawDeathScreen() {
  context.textBaseline = "top";
  context.fillStyle = "#3196ca";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = "white";
  context.font = "44px PressStart2P";
  context.fillText("GAME OVER", 52, 100);
  context.font = "16px PressStart2P";
  context.fillText("YOUR SCORE", 58, 170);
  context.fillText(state.current.score, 58, 190);
  context.fillText("BEST SCORE", 280, 170);
  context.fillText(state.current.bestScore, 280, 190);
  context.fillStyle = "#f7dc6f";
  context.font = "24px PressStart2P";
  context.fillText("RESTART", 166, 250);
  context.fillText("QUIT", 202, 290);
}

export default drawDeathScreen;
