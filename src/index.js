import { ACTIONS, SCREENS } from "./constants";
import drawDeathScreen from "./screens/death";
import drawGameScreen from "./screens/game";
import drawMainScreen from "./screens/main";
import { canvas } from "./utils/canvas";
import { gameData, performAction } from "./utils/game";
import { isPointInside } from "./utils/helper";

import "./index.css";

const setup = () => {
  // Attach keyboard listner for spacebar key
  document.body.onkeyup = (e) => {
    if (e.key == " ") {
      performAction(ACTIONS.FLAP_WING);
    }
  };
  // Attach click listners for various screens
  canvas.onclick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    switch (gameData.activeScreen) {
      case SCREENS.MAIN:
        // When 'MODE' is clicked
        if (isPointInside(x, y, 133, 222, 234, 18)) {
          performAction(ACTIONS.TOOGLE_MODE);
          return;
        }
        // When 'START' is clicked
        if (isPointInside(x, y, 190, 276, 120, 24)) {
          performAction(ACTIONS.START_GAME);
          return;
        }
        break;
      case SCREENS.GAME:
        performAction(ACTIONS.FLAP_WING);
        break;
      case SCREENS.DEATH:
        // When 'RESTART' is clicked
        if (isPointInside(x, y, 166, 256, 168, 24)) {
          performAction(ACTIONS.RESTART_GAME);
          return;
        }
        // When 'QUIT' is clicked
        if (isPointInside(x, y, 202, 296, 96, 24)) {
          performAction(ACTIONS.QUIT_GAME);
          return;
        }
        break;
    }
  };
};

const draw = () => {
  switch (gameData.activeScreen) {
    case SCREENS.MAIN:
      drawMainScreen();
      break;
    case SCREENS.GAME:
      drawGameScreen();
      break;
    case SCREENS.DEATH:
      drawDeathScreen();
      break;
  }
  requestAnimationFrame(draw);
};

setup();

draw();
