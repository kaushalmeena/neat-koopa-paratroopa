import { context, canvas } from "../utils/canvas";
import { gameData } from "../utils/game";

const drawDeathScreen = () => {
  context.save();
  context.fillStyle = "#3196ca";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "white";
  context.font = "44px PressStart2P";
  context.fillText("GAME OVER", 52, 150);
  context.font = "16px PressStart2P";
  context.fillText("YOUR SCORE", 58, 200);
  context.fillText(gameData.score, 58, 220);
  context.fillText("BEST SCORE", 280, 200);
  context.fillText(gameData.bestScore, 280, 220);
  context.fillStyle = "#f7dc6f";
  context.font = "24px PressStart2P";
  context.fillText("RESTART", 166, 280);
  context.fillText("QUIT", 202, 320);
  context.restore();
};

export default drawDeathScreen;
