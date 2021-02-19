import { MODES, SCREENS } from "../constants/main";
import { createBird } from "../utils/bird";
import { createPopulation } from "../utils/ga";
import { getBestScore } from "../utils/main";

export let state = {
  score: 0,
  generation: 1,
  bestScore: getBestScore(),
  bestDistance: 0,
  mode: MODES.STANDARD,
  activeScreen: SCREENS.TITLE,
  playerBird: createBird(),
  liveBirds: createPopulation(),
  deadBirds: [],
  clouds: [],
  pipes: []
};

export function resetState() {
  state.score = 0;
  state.playerBird.x = 50;
  state.playerBird.y = 50;
  state.playerBird.dy = 0;
  state.clouds = [];
  state.pipes = [];
}

export function saveState() {
  const stringifiedState = JSON.stringify(state);
  localStorage.setItem("state", stringifiedState);
  alert("State successfully saved!");
}

export function loadState() {
  const stringifiedState = localStorage.getItem("state");
  if (stringifiedState) {
    state = JSON.parse(stringifiedState);
    alert("State successfully loaded!");
  } else {
    alert("State was not found!");
  }
}
