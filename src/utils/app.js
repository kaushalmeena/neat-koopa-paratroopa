import { ACTIONS, MODES, SCREENS } from "../constants/app";
import { loadState, resetState, saveState, state } from "../state";
import { flap } from "./bird";

// Function to perform various game actions based on the provided action type
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
