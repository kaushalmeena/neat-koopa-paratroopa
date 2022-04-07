import { ACTIONS, SCREENS } from "./constants/main";
import drawDeathScreen from "./screens/death";
import drawMainScreen from "./screens/main";
import drawPauseScreen from "./screens/pause";
import drawTitleScreen from "./screens/title";
import { state } from "./state";
import { canvas } from "./utils/canvas";
import { isPointInside } from "./utils/helper";
import { performAction } from "./utils/main";

import "./index.css";

function setup() {
  // Attach keyboard listener for spacebar key
  document.body.onkeyup = function (e) {
    switch (state.activeScreen) {
      case SCREENS.MAIN:
        if (e.code == "Space") {
          return performAction(ACTIONS.FLAP_WING);
        }
        if (e.code == "Escape") {
          return performAction(ACTIONS.PAUSE_GAME);
        }
        break;
    }
  };
  // Attach click listeners for various screens
  canvas.onclick = function (e) {
    const x = (e.offsetX / canvas.offsetWidth) * canvas.width;
    const y = (e.offsetY / canvas.offsetHeight) * canvas.height;
    switch (state.activeScreen) {
      case SCREENS.TITLE:
        // When 'MODE' is clicked
        if (isPointInside(x, y, 132, 230, 224, 36)) {
          return performAction(ACTIONS.TOGGLE_MODE);
        }
        // When 'START' is clicked
        if (isPointInside(x, y, 190, 300, 120, 24)) {
          return performAction(ACTIONS.START_GAME);
        }
        break;
      case SCREENS.MAIN:
        // When 'PAUSE' is clicked
        if (isPointInside(x, y, 420, 10, 80, 14)) {
          return performAction(ACTIONS.PAUSE_GAME);
        }
        performAction(ACTIONS.FLAP_WING);
        break;
      case SCREENS.DEATH:
        // When 'RESTART' is clicked
        if (isPointInside(x, y, 166, 250, 168, 24)) {
          return performAction(ACTIONS.RESTART_GAME);
        }
        // When 'QUIT' is clicked
        if (isPointInside(x, y, 202, 290, 96, 24)) {
          return performAction(ACTIONS.QUIT_GAME);
        }
        break;
      case SCREENS.PAUSE:
        // When 'RESUME' is clicked
        if (isPointInside(x, y, 178, 180, 144, 24)) {
          return performAction(ACTIONS.RESUME_GAME);
        }
        // When 'SAVE STATE' is clicked
        if (isPointInside(x, y, 130, 220, 240, 24)) {
          return performAction(ACTIONS.SAVE_STATE);
        }
        // When 'LOAD STATE' is clicked
        if (isPointInside(x, y, 130, 260, 240, 24)) {
          return performAction(ACTIONS.LOAD_STATE);
        }
        // When 'QUIT' is clicked
        if (isPointInside(x, y, 202, 296, 96, 24)) {
          return performAction(ACTIONS.QUIT_GAME);
        }
        break;
    }
  };
}

function draw() {
  switch (state.activeScreen) {
    case SCREENS.TITLE:
      drawTitleScreen();
      break;
    case SCREENS.MAIN:
      drawMainScreen();
      break;
    case SCREENS.PAUSE:
      drawPauseScreen();
      break;
    case SCREENS.DEATH:
      drawDeathScreen();
      break;
  }
  requestAnimationFrame(draw);
}

setup();
draw();
