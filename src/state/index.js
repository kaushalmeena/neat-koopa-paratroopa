import { MODES, SCREENS } from "../constants/app";
import { createBird } from "../utils/bird";
import { createClouds } from "../utils/cloud";
import { createPopulation } from "../utils/ga";
import { createPipes, makePipeInactive } from "../utils/pipe";

export function getBestScore() {
  return localStorage.getItem("bestScore") || 0;
}

export const state = {
  current: {
    score: 0,
    generation: 1,
    bestScore: getBestScore(),
    bestDistance: 0,
    mode: MODES.STANDARD,
    activeScreen: SCREENS.TITLE,
    playerBird: createBird(),
    liveBirds: createPopulation(),
    deadBirds: [],
    clouds: createClouds(),
    pipes: createPipes()
  }
};

export function setBestScore(score) {
  state.current.bestScore = score;
  localStorage.setItem("bestScore", score);
}

export function resetState() {
  state.current.score = 0;
  state.current.playerBird.x = 50;
  state.current.playerBird.y = 50;
  state.current.playerBird.dy = 0;
  for (let i = 0; i < state.current.pipes.length; i += 1) {
    makePipeInactive(state.current.pipes[i]);
  }
}

export function saveState() {
  const stringifiedState = JSON.stringify(state.current);
  localStorage.setItem("state", stringifiedState);
  alert("State successfully saved!");
}

export function loadState() {
  const stringifiedState = localStorage.getItem("state");
  if (stringifiedState) {
    state.current = JSON.parse(stringifiedState);
    alert("State successfully loaded!");
  } else {
    alert("State was not found!");
  }
}
