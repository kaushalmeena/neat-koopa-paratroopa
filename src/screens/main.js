import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  EXIT_X_POS,
  MODES,
  SCREENS
} from "../constants/app";
import { BIRD_CREATE_LIMIT } from "../constants/bird";
import { CLOUD_ACTIVE_LIMIT } from "../constants/cloud";
import {
  PIPE_ACTIVE_LIMIT,
  PIPE_MAX_DISTANCE,
  PIPE_MIN_DISTANCE
} from "../constants/pipe";
import { resetState, setBestScore, state } from "../state";
import { drawBird, isBirdDead, think, updateBird } from "../utils/bird";
import { context } from "../utils/canvas";
import { drawCloud, makeCloudActive, updateCloud } from "../utils/cloud";
import { nextGeneration } from "../utils/ga";
import { getRandomInteger } from "../utils/helper";
import { drawPipe, makePipeActive, updatePipe } from "../utils/pipe";

function drawBackground() {
  context.fillStyle = "#3cbcfc";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawClouds() {
  let activeCount = 0;
  for (let i = 0; i < state.current.clouds.length; i += 1) {
    // If cloud is active then only perform operations on it
    if (state.current.clouds[i].active) {
      // Increase activeCount
      activeCount += 1;
      // Draw and update x position of cloud
      drawCloud(state.current.clouds[i]);
      updateCloud(state.current.clouds[i]);
      // Mark cloud inactive, if it is not visible
      if (state.current.clouds[i].x < EXIT_X_POS) {
        state.current.clouds[i].active = false;
      }
    }
  }
  if (activeCount < CLOUD_ACTIVE_LIMIT) {
    // Check if any inactive cloud is available
    const cloudIndex = state.current.clouds.findIndex((cloud) => !cloud.active);
    if (cloudIndex > -1) {
      makeCloudActive(state.current.clouds[cloudIndex]);
    }
  }
}

function drawPipes() {
  let activeCount = 0;
  let farthestPosX = 0;
  for (let i = 0; i < state.current.pipes.length; i += 1) {
    // If cloud is active then only perform operations on it
    if (state.current.pipes[i].active) {
      // Increase activeCount
      activeCount += 1;
      // Update farthestPosX
      farthestPosX = Math.max(farthestPosX, state.current.pipes[i].x);
      // Draw and update x position of pipe
      drawPipe(state.current.pipes[i]);
      updatePipe(state.current.pipes[i]);
      // Mark pipe inactive, if it is not visible
      if (state.current.pipes[i].x < EXIT_X_POS) {
        state.current.pipes[i].active = false;
        state.current.score += 1;
      }
    }
  }
  if (activeCount < PIPE_ACTIVE_LIMIT) {
    // Check if any inactive pipe available
    const pipeIndex = state.current.pipes.findIndex((pipe) => !pipe.active);
    if (pipeIndex > -1) {
      const newPosX =
        farthestPosX + getRandomInteger(PIPE_MIN_DISTANCE, PIPE_MAX_DISTANCE);
      makePipeActive(state.current.pipes[pipeIndex], newPosX);
    }
  }
}

function drawPlayerBird() {
  drawBird(state.current.playerBird);
  updateBird(state.current.playerBird);
  // If player bird has died then navigate to death screen
  if (isBirdDead(state.current.playerBird, state.current.pipes)) {
    state.current.activeScreen = SCREENS.DEATH;
    // If high-score is achieved then save the score
    if (state.current.score > state.current.bestScore) {
      setBestScore(state.current.score);
    }
  }
}

function drawBirds() {
  for (let i = 0; i < state.current.liveBirds.length; i += 1) {
    drawBird(state.current.liveBirds[i]);
    updateBird(state.current.liveBirds[i]);
    think(state.current.liveBirds[i], state.current.pipes);

    // If bird has died then remove that bird from liveBirds add it to deadBirds list
    if (isBirdDead(state.current.liveBirds[i], state.current.pipes)) {
      state.current.deadBirds.push(...state.current.liveBirds.splice(i, 1));
    }

    // When all birds are dead create new population
    if (state.current.liveBirds.length === 0) {
      state.current.generation += 1;
      state.current.bestDistance = Math.max(
        ...state.current.deadBirds.map((bird) => bird.distance),
        state.current.bestDistance
      );
      state.current.liveBirds = nextGeneration(state.current.deadBirds);
      state.current.deadBirds = [];
      resetState();
    }
  }
}

function drawPauseButton() {
  context.font = "14px PressStart2P";
  context.fillStyle = "#f7dc6f";
  context.fillText("PAUSE", 420, 10);
}

function drawScoreText() {
  context.font = "14px PressStart2P";
  context.fillStyle = "white";
  context.fillText(`SCORE:${state.current.score}`, 10, 10);
}

function drawTrainingText() {
  context.font = "14px PressStart2P";
  context.fillStyle = "white";
  context.fillText(`BEST-DISTANCE:${state.current.bestDistance}`, 10, 26);
  context.fillText(`GENERATION:${state.current.generation}`, 10, 42);
  context.fillText(
    `ALIVE:${state.current.liveBirds.length}/${BIRD_CREATE_LIMIT}`,
    10,
    58
  );
}

function drawMainScreen() {
  drawBackground();
  drawClouds();
  drawPipes();
  drawScoreText();
  drawPauseButton();
  if (state.current.mode === MODES.STANDARD) {
    drawPlayerBird();
  } else {
    drawTrainingText();
    drawBirds();
  }
}

export default drawMainScreen;
