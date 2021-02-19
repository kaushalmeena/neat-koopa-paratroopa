import { context, canvas } from "../utils/canvas";
import { state } from "../state";

function drawDeathScreen() {
  context.textBaseline = "top";
  context.fillStyle = "#3196ca";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "white";
  context.font = "44px PressStart2P";
  context.fillText("GAME OVER", 52, 100);
  context.font = "16px PressStart2P";
  context.fillText("YOUR SCORE", 58, 170);
  context.fillText(state.score, 58, 190);
  context.fillText("BEST SCORE", 280, 170);
  context.fillText(state.bestScore, 280, 190);
  context.fillStyle = "#f7dc6f";
  context.font = "24px PressStart2P";
  context.fillText("RESTART", 166, 250);
  context.fillText("QUIT", 202, 290);
}

export default drawDeathScreen;
