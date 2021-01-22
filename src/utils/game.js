import { ACTIONS, MODES, SCREENS } from "../constants";
import Bird from "../entities/bird";
import { isRectangleOverlapping } from "./helper";

export const getBestScore = () => {
  return localStorage.getItem("bestScore") || 0;
};

export const gameState = {
  score: 0,
  mode: MODES.STANDARD,
  activeScreen: SCREENS.MAIN,
  bestScore: getBestScore(),
  playerBird: new Bird(),
  clouds: [],
  pipes: []
};

export const setBestScore = (score) => {
  gameState.bestScore = score;
  localStorage.setItem("bestScore", score);
};

export const resetGameState = () => {
  gameState.score = 0;
  gameState.mode = MODES.STANDARD;
  gameState.playerBird.x = 50;
  gameState.playerBird.y = 50;
  gameState.playerBird.dy = 0;
  gameState.clouds = [];
  gameState.pipes = [];
};

export const saveGameState = () => {

}

export const loadGameState = () => {

}

export const isPlayerBirdDead = () => {
  // If bird fall down the screen
  if (gameState.playerBird.y > 410) {
    return true;
  }
  // Check if bird has collided with pipes
  for (let i = 0; i < gameState.pipes.length; i++) {
    if (
      isRectangleOverlapping(
        gameState.playerBird.x + 4,
        gameState.playerBird.y + 4,
        24,
        38,
        gameState.pipes[i].x,
        gameState.pipes[i].y,
        32,
        272
      )
    ) {
      return true;
    }
  }
  return false;
};

export const performAction = (action) => {
  switch (action) {
    case ACTIONS.START_GAME:
      gameState.activeScreen = SCREENS.GAME;
      break;
    case ACTIONS.RESTART_GAME:
      resetGameState();
      gameState.activeScreen = SCREENS.GAME;
      break;
    case ACTIONS.QUIT_GAME:
      resetGameState();
      gameState.activeScreen = SCREENS.MAIN;
      break;
    case ACTIONS.PAUSE_GAME:
      gameState.activeScreen = SCREENS.PAUSE;
      break;
    case ACTIONS.RESUME_GAME:
      gameState.activeScreen = SCREENS.GAME;
      break;
    case ACTIONS.SAVE_STATE:
      saveGameState();
      break;
    case ACTIONS.LOAD_STATE:
      loadGameState();
      break;
    case ACTIONS.TOOGLE_MODE:
      gameState.mode =
        gameState.mode === MODES.STANDARD ? MODES.TRAINING : MODES.STANDARD;
      break;
    case ACTIONS.FLAP_WING:
      gameState.playerBird.flap();
      break;
    default:
  }
};
