import { CLOUD_LIMIT, PIPE_LIMIT } from "../constants";
import Cloud from "../entities/cloud";
import Pipe from "../entities/pipe";
import { canvas, context } from "../utils/canvas";
import { gameData } from "../utils/game";
import { getRandomIntegerBetween } from "../utils/helper";

const drawBackground = () => {
  context.fillStyle = "#3cbcfc";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

const drawClouds = () => {
  // Add new cloud if limit is not reached
  if (gameData.clouds.length < CLOUD_LIMIT) {
    const cloud = new Cloud();
    gameData.clouds.push(cloud);
  }
  for (let i = 0; i < gameData.clouds.length; i++) {
    // Draw and update x postion of clouds
    gameData.clouds[i].draw();
    gameData.clouds[i].update();
    // Remove cloud if it is not visible
    if (gameData.clouds[i].x < -50) {
      gameData.clouds.splice(i, 1);
    }
  }
};

const drawPipes = () => {
  // Add new pipe if limit is not reached
  if (gameData.pipes.length < PIPE_LIMIT) {
    let pipeX = undefined;
    // In order to maintain some distance between pipes
    if (gameData.pipes.length > 0) {
      pipeX =
        gameData.pipes[gameData.pipes.length - 1].x +
        getRandomIntegerBetween(100, 200);
    }
    const pipe = new Pipe(pipeX);
    gameData.pipes.push(pipe);
  }
  for (let i = 0; i < gameData.pipes.length; i++) {
    // Draw and update x postion of pipes
    gameData.pipes[i].draw();
    gameData.pipes[i].update();
    // Remove pipe if it is not visible
    if (gameData.pipes[i].x < -50) {
      gameData.score += 1;
      gameData.pipes.splice(i, 1);
    }
  }
};

const drawPlayerBird = () => {
  gameData.playerBird.draw();
  gameData.playerBird.update();
};

const drawScoreText = () => {
  context.save();
  context.font = "10px PressStart2P";
  context.fillStyle = "white";
  context.fillText(`SCORE:${gameData.score}`, 10, 20);
  context.restore();
};

const drawGameScreen = () => {
  drawBackground();
  drawClouds();
  drawPipes();
  drawPlayerBird();
  drawScoreText();
};

export default drawGameScreen;
