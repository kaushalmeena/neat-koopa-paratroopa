import { MODES } from "../constants";
import { canvas, context } from "../utils/canvas";
import { gameState } from "../utils/game";

const drawMainScreen = () => {
  context.textBaseline = "top";
  context.fillStyle = "#3196ca";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "white";
  context.font = "56px PressStart2P";
  context.fillText("KOOPA", 110, 100);
  context.font = "28px PressStart2P";
  context.fillText("PARATROOPA", 110, 154);
  context.font = "20px PressStart2P";
  context.fillText("NEUROEVOLUTION", 110, 182);
  context.fillStyle = "#f7dc6f";
  context.font = "16px PressStart2P";
  context.fillText(
    `${gameState.mode === MODES.STANDARD ? ">" : " "}STANDARD MODE`,
    130,
    230
  );
  context.fillText(
    `${gameState.mode === MODES.TRAINING ? ">" : " "}TRAINING MODE`,
    130,
    250
  );
  context.font = "24px PressStart2P";
  context.fillText("START", 190, 300);
};

export default drawMainScreen;
