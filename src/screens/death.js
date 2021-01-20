import { context, canvas } from "../utils/canvas";

const drawDeathScreen = () => {
  context.save();
  context.fillStyle = "#3196ca";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "white";
  context.font = "48px PressStart2P";
  context.fillText("GAME OVER", 98, 150);
  context.font = "20px PressStart2P";
  context.fillText("NEURO-EVOLUTION", 98, 170);
  context.font = "24px PressStart2P";
  context.fillText("START", 190, 250);
  context.fillText("TRAIN", 188, 300);
  context.restore();
};

export default drawDeathScreen;
