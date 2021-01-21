import { context, canvas } from "../utils/canvas";
import { gameData } from "../utils/game";

const drawMainScreen = () => {
  context.save();
  context.fillStyle = "#3196ca";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "white";
  context.font = "61px PressStart2P";
  context.fillText("KOOPA", 98, 150);
  context.font = "20px PressStart2P";
  context.fillText("NEURO-EVOLUTION", 98, 170);
  context.fillStyle = "#f7dc6f";
  context.font = "18px PressStart2P";
  context.fillText(`MODE:${gameData.mode}`, 133, 240);
  context.font = "24px PressStart2P";
  context.fillText("START", 190, 300);
  context.restore();
};

export default drawMainScreen;
