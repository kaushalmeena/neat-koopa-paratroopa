import { CANVAS_HEIGHT, CANVAS_WIDTH, MODES } from "../constants/app";
import { state } from "../state";
import { context } from "../utils/canvas";

function drawTitleScreen() {
  context.textBaseline = "top";
  context.fillStyle = "#3196ca";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = "white";
  context.font = "72px PressStart2P";
  context.fillText("NEAT", 110, 60);
  context.font = "56px PressStart2P";
  context.fillText("KOOPA", 110, 128);
  context.font = "28px PressStart2P";
  context.fillText("PARATROOPA", 110, 182);
  context.fillStyle = "#f7dc6f";
  context.font = "16px PressStart2P";
  context.fillText(
    `${state.current.mode === MODES.STANDARD ? ">" : " "}STANDARD MODE`,
    130,
    230
  );
  context.fillText(
    `${state.current.mode === MODES.TRAINING ? ">" : " "}TRAINING MODE`,
    130,
    250
  );
  context.font = "24px PressStart2P";
  context.fillText("START", 190, 300);
}

export default drawTitleScreen;
