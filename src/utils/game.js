import { ACTIONS, MODES, SCREENS } from "../constants";
import Bird from "../entities/bird";
import { isRectangleOverlapping } from "./helper";

export const getBestScore = () => {
  return localStorage.getItem("bestScore") || 0;
};

export const gameData = {
  score: 0,
  mode: MODES.STANDARD,
  activeScreen: SCREENS.MAIN,
  bestScore: getBestScore(),
  playerBird: new Bird(),
  clouds: [],
  pipes: []
};

export const setBestScore = (score) => {
  gameData.bestScore = score;
  localStorage.setItem("bestScore", score);
};

export const resetGameData = () => {
  gameData.score = 0;
  gameData.mode = MODES.STANDARD;
  gameData.playerBird.x = 50;
  gameData.playerBird.y = 50;
  gameData.playerBird.dy = 0;
  gameData.clouds = [];
  gameData.pipes = [];
};

export const isPlayerBirdDead = () => {
  // If bird fall down the screen
  if (gameData.playerBird.y > 410) {
    return true;
  }
  // Check if bird has collided with pipes
  for (let i = 0; i < gameData.pipes.length; i++) {
    if (
      isRectangleOverlapping(
        gameData.playerBird.x + 4,
        gameData.playerBird.y + 4,
        24,
        38,
        gameData.pipes[i].x,
        gameData.pipes[i].y,
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
      gameData.activeScreen = SCREENS.GAME;
      break;
    case ACTIONS.TOOGLE_MODE:
      gameData.mode =
        gameData.mode === MODES.STANDARD ? MODES.TRAINING : MODES.STANDARD;
      break;
    case ACTIONS.RESTART_GAME:
      resetGameData();
      gameData.activeScreen = SCREENS.GAME;
      break;
    case ACTIONS.QUIT_GAME:
      resetGameData();
      gameData.activeScreen = SCREENS.MAIN;
      break;
    case ACTIONS.FLAP_WING:
      gameData.playerBird.flap();
      break;

    default:
  }
};
