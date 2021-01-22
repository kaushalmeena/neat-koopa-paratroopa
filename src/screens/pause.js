import { context, canvas } from "../utils/canvas";

const drawPauseScreen = () => {
  context.textBaseline = "top";
  context.fillStyle = "#3196ca";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "white";
  context.font = "44px PressStart2P";
  context.fillText("PAUSED", 118, 100);
  context.fillStyle = "#f7dc6f";
  context.font = "24px PressStart2P";
  context.fillText("RESUME", 178, 180);
  context.fillText("SAVE STATE", 130, 220);
  context.fillText("LOAD STATE", 130, 260);
  context.fillText("QUIT", 202, 300);
};

export default drawPauseScreen;
