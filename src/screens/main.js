import { BIRD_LIMIT } from "../constants/bird";
import { CLOUD_LIMIT } from "../constants/cloud";
import { MODES, SCREENS } from "../constants/app";
import { PIPE_LIMIT } from "../constants/pipe";
import { resetState, state } from "../state";
import { drawBird, think, updateBird } from "../utils/bird";
import { canvas, context } from "../utils/canvas";
import { createCloud, drawCloud, updateCloud } from "../utils/cloud";
import { nextGeneration } from "../utils/ga";
import { getRandomInteger } from "../utils/helper";
import { isBirdDead, setBestScore } from "../utils/app";
import { createPipe, drawPipe, updatePipe } from "../utils/pipe";

function drawBackground() {
  context.fillStyle = "#3cbcfc";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawClouds() {
  // Add new cloud if limit is not reached
  if (state.clouds.length < CLOUD_LIMIT) {
    const newCloud = createCloud();
    state.clouds.push(newCloud);
  }
  for (let i = 0; i < state.clouds.length; i++) {
    // Draw and update x position of clouds
    drawCloud(state.clouds[i]);
    updateCloud(state.clouds[i]);
    // Remove cloud if it is not visible
    if (state.clouds[i].x < -50) {
      state.clouds.splice(i, 1);
    }
  }
}

function drawPipes() {
  // Add new pipe if limit is not reached
  if (state.pipes.length < PIPE_LIMIT) {
    let pipeX = undefined;
    // In order to maintain some distance between pipes
    if (state.pipes.length > 0) {
      pipeX =
        state.pipes[state.pipes.length - 1].x + getRandomInteger(200, 400);
    }
    const newPipe = createPipe({ x: pipeX });
    state.pipes.push(newPipe);
  }
  for (let i = 0; i < state.pipes.length; i++) {
    // Draw and update x position of pipes
    drawPipe(state.pipes[i]);
    updatePipe(state.pipes[i]);
    // Remove pipe if it is not visible
    if (state.pipes[i].x < -50) {
      state.score += 1;
      state.pipes.splice(i, 1);
    }
  }
}

function drawPlayerBird() {
  drawBird(state.playerBird);
  updateBird(state.playerBird);
  // If player bird has died then navigate to death screen
  if (isBirdDead(state.playerBird)) {
    state.activeScreen = SCREENS.DEATH;
    // If high-score is achieved then save the score
    if (state.score > state.bestScore) {
      setBestScore(state.score);
    }
  }
}

function drawBirds() {
  for (let i = 0; i < state.liveBirds.length; i++) {
    drawBird(state.liveBirds[i]);
    updateBird(state.liveBirds[i]);
    think(state.liveBirds[i], state.pipes);

    // If bird has died then remove that bird from liveBirds add it to deadBirds list
    if (isBirdDead(state.liveBirds[i])) {
      state.deadBirds.push(...state.liveBirds.splice(i, 1));
    }

    // When all birds are dead create new population
    if (state.liveBirds.length === 0) {
      state.generation += 1;
      state.bestDistance = Math.max(
        ...state.deadBirds.map((bird) => bird.distance),
        state.bestDistance
      );
      state.liveBirds = nextGeneration(state.deadBirds);
      state.deadBirds = [];
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
  context.fillText(`SCORE:${state.score}`, 10, 10);
}

function drawTrainingText() {
  context.font = "14px PressStart2P";
  context.fillStyle = "white";
  context.fillText(`BEST-DISTANCE:${state.bestDistance}`, 10, 26);
  context.fillText(`GENERATION:${state.generation}`, 10, 42);
  context.fillText(`ALIVE:${state.liveBirds.length}/${BIRD_LIMIT}`, 10, 58);
}

function drawMainScreen() {
  drawBackground();
  drawClouds();
  drawPipes();
  drawScoreText();
  drawPauseButton();
  if (state.mode === MODES.STANDARD) {
    drawPlayerBird();
  } else {
    drawTrainingText();
    drawBirds();
  }
}

export default drawMainScreen;
