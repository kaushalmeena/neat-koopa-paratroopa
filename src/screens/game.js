import { CLOUD_LIMIT, PIPE_LIMIT, SCREENS } from "../constants";
import Cloud from "../entities/cloud";
import Pipe from "../entities/pipe";
import { canvas, context } from "../utils/canvas";
import { gameState, setBestScore, isPlayerBirdDead } from "../utils/game";
import { getRandomInteger } from "../utils/helper";

const drawBackground = () => {
  context.fillStyle = "#3cbcfc";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

const drawClouds = () => {
  // Add new cloud if limit is not reached
  if (gameState.clouds.length < CLOUD_LIMIT) {
    const cloud = new Cloud();
    gameState.clouds.push(cloud);
  }
  for (let i = 0; i < gameState.clouds.length; i++) {
    // Draw and update x postion of clouds
    gameState.clouds[i].draw();
    gameState.clouds[i].update();
    // Remove cloud if it is not visible
    if (gameState.clouds[i].x < -50) {
      gameState.clouds.splice(i, 1);
    }
  }
};

const drawPipes = () => {
  // Add new pipe if limit is not reached
  if (gameState.pipes.length < PIPE_LIMIT) {
    let pipeX = undefined;
    // In order to maintain some distance between pipes
    if (gameState.pipes.length > 0) {
      pipeX =
        gameState.pipes[gameState.pipes.length - 1].x +
        getRandomInteger(100, 200);
    }
    const pipe = new Pipe({ x: pipeX });
    gameState.pipes.push(pipe);
  }
  for (let i = 0; i < gameState.pipes.length; i++) {
    // Draw and update x postion of pipes
    gameState.pipes[i].draw();
    gameState.pipes[i].update();
    // Remove pipe if it is not visible
    if (gameState.pipes[i].x < -50) {
      gameState.score += 1;
      gameState.pipes.splice(i, 1);
    }
  }
};

const drawPlayerBird = () => {
  gameState.playerBird.draw();
  gameState.playerBird.update();
};

const drawScoreText = () => {
  context.font = "14px PressStart2P";
  context.fillStyle = "white";
  context.fillText(`SCORE:${gameState.score}`, 10, 10);
};

const drawGameScreen = () => {
  drawBackground();
  drawClouds();
  drawPipes();
  drawPlayerBird();
  drawScoreText();
  // If bird has died then navigate to death screen
  if (isPlayerBirdDead()) {
    gameState.activeScreen = SCREENS.DEATH;
    // If high-score is achieved then save the score
    if (gameState.score > gameState.bestScore) {
      setBestScore(gameState.score);
    }
  }
};

export default drawGameScreen;
