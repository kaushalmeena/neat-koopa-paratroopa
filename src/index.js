import { ACTIONS, FRAME_DELAY, SCREENS } from "./constants/app";
import drawDeathScreen from "./screens/death";
import drawMainScreen from "./screens/main";
import drawPauseScreen from "./screens/pause";
import drawTitleScreen from "./screens/title";
import { state } from "./state";
import { canvas } from "./utils/canvas";
import { performAction } from "./utils/app";
import { isPointInside } from "./utils/helper";

import "./index.css";

function setup() {
  // Attach keyboard listener for spacebar key
  document.body.onkeyup = function (e) {
    switch (state.current.activeScreen) {
      case SCREENS.MAIN:
        if (e.code === "Space") {
          performAction(ACTIONS.FLAP_WING);
        } else if (e.code === "Escape") {
          performAction(ACTIONS.PAUSE_GAME);
        }
        break;
      default:
    }
  };
  // Attach click listeners for various screens
  canvas.onclick = function (e) {
    const x = (e.offsetX / canvas.offsetWidth) * canvas.width;
    const y = (e.offsetY / canvas.offsetHeight) * canvas.height;
    switch (state.current.activeScreen) {
      case SCREENS.TITLE:
        // When 'MODE' is clicked
        if (isPointInside(x, y, 132, 230, 224, 36)) {
          performAction(ACTIONS.TOGGLE_MODE);
        }
        // When 'START' is clicked
        else if (isPointInside(x, y, 190, 300, 120, 24)) {
          performAction(ACTIONS.START_GAME);
        }
        break;
      case SCREENS.MAIN:
        // When 'PAUSE' is clicked
        if (isPointInside(x, y, 420, 10, 80, 14)) {
          performAction(ACTIONS.PAUSE_GAME);
        } else {
          performAction(ACTIONS.FLAP_WING);
        }
        break;
      case SCREENS.DEATH:
        // When 'RESTART' is clicked
        if (isPointInside(x, y, 166, 250, 168, 24)) {
          performAction(ACTIONS.RESTART_GAME);
        }
        // When 'QUIT' is clicked
        else if (isPointInside(x, y, 202, 290, 96, 24)) {
          performAction(ACTIONS.QUIT_GAME);
        }
        break;
      case SCREENS.PAUSE:
        // When 'RESUME' is clicked
        if (isPointInside(x, y, 178, 180, 144, 24)) {
          performAction(ACTIONS.RESUME_GAME);
        }
        // When 'SAVE STATE' is clicked
        else if (isPointInside(x, y, 130, 220, 240, 24)) {
          performAction(ACTIONS.SAVE_STATE);
        }
        // When 'LOAD STATE' is clicked
        else if (isPointInside(x, y, 130, 260, 240, 24)) {
          performAction(ACTIONS.LOAD_STATE);
        }
        // When 'QUIT' is clicked
        else if (isPointInside(x, y, 202, 296, 96, 24)) {
          performAction(ACTIONS.QUIT_GAME);
        }
        break;
      default:
    }
  };
}

function draw() {
  switch (state.current.activeScreen) {
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
    default:
  }
}

function animate() {
  setTimeout(function () {
    requestAnimationFrame(animate);
    draw();
  }, FRAME_DELAY);
}

function start() {
  // Wait for font to load
  document.fonts
    .load("44px PressStart2P")
    .then(() => {
      setup();
      animate();
    })
    .catch(() => {
      alert("Couldn't load font!");
    })
    .finally(() => {
      document.querySelector("#loaderContainer").remove();
    });
}

start();
