import { ACTIONS, MODES, SCREENS } from "../constants";
import Bird from "../entities/bird";
import Serialize from "../lib/serializer";
import { initialGeneration } from "./ga";
import { isRectangleOverlapping } from "./helper";

export const getBestScore = () => {
  return localStorage.getItem("bestScore") || 0;
};

export let gameState = {
  score: 0,
  mode: MODES.STANDARD,
  activeScreen: SCREENS.MAIN,
  bestScore: getBestScore(),
  playerBird: new Bird(),
  liveBirds: initialGeneration(),
  deadBirds: [],
  clouds: [],
  pipes: []
};

export const serialize = new Serialize().addClass(Bird);

export const setBestScore = (score) => {
  gameState.bestScore = score;
  localStorage.setItem("bestScore", score);
};

export const resetGameState = () => {
  gameState.score = 0;
  gameState.playerBird.x = 50;
  gameState.playerBird.y = 50;
  gameState.playerBird.dy = 0;
  gameState.clouds = [];
  gameState.pipes = [];
};

export const saveGameState = () => {
  const stringifiedState = serialize.stringify(gameState);
  localStorage.setItem("gameState", stringifiedState);
  alert("Game state successfully saved!");
};

export const loadGameState = () => {
  const stringifiedState = localStorage.getItem("gameState");
  if (stringifiedState) {
    gameState = serialize.parse(stringifiedState);
    alert("Game state successfully loaded!");
  } else {
    alert("Game state was not found!");
  }
};

export const isBirdDead = (bird) => {
  // If bird fall down the screen
  if (bird.y > 410) {
    return true;
  }
  // Check if bird has collided with pipes
  for (let i = 0; i < gameState.pipes.length; i++) {
    if (
      isRectangleOverlapping(
        bird.x + 4,
        bird.y + 4,
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
