import { SCREENS } from "./constants";
import drawDeathScreen from "./screens/death";
import drawGameScreen from "./screens/game";
import { canvas } from "./utils/canvas";
import { checkIfPointLiesInRectangle } from "./utils/helper";
import { gameData } from "./utils/game";

import "./index.css";

const setup = () => {
  // Attach keyboard listner for spacebar key
  document.body.onkeyup = (e) => {
    if (e.keyCode == 32) {
      gameData.playerBird.flap();
    }
  };
  // Attach click listners for various screens
  canvas.onclick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // console.log(x, y);

    switch (gameData.activeScreen) {
      case SCREENS.MAIN:
        if (checkIfPointLiesInRectangle(188, 224, 310, 248, x, y)) {
          console.log("Press s");
          gameData.activeScreen = SCREENS.GAME;
          return;
        }
        if (checkIfPointLiesInRectangle(188, 274, 310, 298, x, y)) {
          console.log("Press t");
          return;
        }
        break;
      case SCREENS.GAME:
        gameData.playerBird.flap();
        break;
    }
  };
};

const draw = () => {
  switch (gameData.activeScreen) {
    case SCREENS.GAME:
      drawGameScreen();
      break;
    case SCREENS.MAIN:
      drawDeathScreen();
  }
  requestAnimationFrame(draw);
};

setup();

draw();
