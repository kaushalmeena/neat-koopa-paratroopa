import { BIRD_LIMIT } from "../constants/bird";
import { CLOUD_LIMIT } from "../constants/cloud";
import { MODES, SCREENS } from "../constants/app";
import { PIPE_LIMIT } from "../constants/pipe";
import { resetState, state, setBestScore } from "../state";
import { drawBird, think, updateBird } from "../utils/bird";
import { canvas, context } from "../utils/canvas";
import { createCloud, drawCloud, updateCloud } from "../utils/cloud";
import { nextGeneration } from "../utils/ga";
import { getRandomInteger } from "../utils/helper";
import { isBirdDead } from "../utils/app";
import { createPipe, drawPipe, updatePipe } from "../utils/pipe";

function drawBackground() {
  context.fillStyle = "#3cbcfc";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawClouds() {
  // Add new cloud if limit is not reached
  if (state.current.clouds.length < CLOUD_LIMIT) {
    const newCloud = createCloud();
    state.current.clouds.push(newCloud);
  }
  for (let i = 0; i < state.current.clouds.length; i += 1) {
    // Draw and update x position of clouds
    drawCloud(state.current.clouds[i]);
    updateCloud(state.current.clouds[i]);
    // Remove cloud if it is not visible
    if (state.current.clouds[i].x < -50) {
      state.current.clouds.splice(i, 1);
    }
  }
}

function drawPipes() {
  // Add new pipe if limit is not reached
  if (state.current.pipes.length < PIPE_LIMIT) {
    let pipeX;
    // In order to maintain some distance between pipes
    if (state.current.pipes.length > 0) {
      pipeX =
        state.current.pipes[state.current.pipes.length - 1].x +
        getRandomInteger(200, 400);
    }
    const newPipe = createPipe({ x: pipeX });
    state.current.pipes.push(newPipe);
  }
  for (let i = 0; i < state.current.pipes.length; i += 1) {
    // Draw and update x position of pipes
    drawPipe(state.current.pipes[i]);
    updatePipe(state.current.pipes[i]);
    // Remove pipe if it is not visible
    if (state.current.pipes[i].x < -50) {
      state.current.score += 1;
      state.current.pipes.splice(i, 1);
    }
  }
}

function drawPlayerBird() {
  drawBird(state.current.playerBird);
  updateBird(state.current.playerBird);
  // If player bird has died then navigate to death screen
  if (isBirdDead(state.current.playerBird)) {
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
    if (isBirdDead(state.current.liveBirds[i])) {
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
    `ALIVE:${state.current.liveBirds.length}/${BIRD_LIMIT}`,
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
