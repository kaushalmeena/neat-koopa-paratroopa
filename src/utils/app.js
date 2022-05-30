import { ACTIONS, MODES, SCREENS } from "../constants/app";
import { loadState, resetState, saveState, state } from "../state";
import { flap } from "./bird";
import { canvas } from "./canvas";
import { isRectangleOverlapping } from "./helper";

export function isBirdDead(bird) {
  // If bird fall down the screen
  if (bird.y > canvas.height + 10) {
    return true;
  }
  // Check if bird has collided with pipes
  for (let i = 0; i < state.current.pipes.length; i += 1) {
    if (
      isRectangleOverlapping(
        bird.x + 4,
        bird.y + 4,
        24,
        38,
        state.current.pipes[i].x,
        state.current.pipes[i].y,
        32,
        272
      )
    ) {
      return true;
    }
  }
  return false;
}

export function performAction(action) {
  switch (action) {
    case ACTIONS.START_GAME:
      state.current.activeScreen = SCREENS.MAIN;
      break;
    case ACTIONS.RESTART_GAME:
      resetState();
      state.current.activeScreen = SCREENS.MAIN;
      break;
    case ACTIONS.QUIT_GAME:
      resetState();
      state.current.activeScreen = SCREENS.TITLE;
      break;
    case ACTIONS.PAUSE_GAME:
      state.current.activeScreen = SCREENS.PAUSE;
      break;
    case ACTIONS.RESUME_GAME:
      state.current.activeScreen = SCREENS.MAIN;
      break;
    case ACTIONS.SAVE_STATE:
      saveState();
      break;
    case ACTIONS.LOAD_STATE:
      loadState();
      break;
    case ACTIONS.TOGGLE_MODE:
      state.current.mode =
        state.current.mode === MODES.STANDARD ? MODES.TRAINING : MODES.STANDARD;
      break;
    case ACTIONS.FLAP_WING:
      flap(state.current.playerBird);
      break;
    default:
  }
}
