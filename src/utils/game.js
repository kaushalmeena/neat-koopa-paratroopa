import { SCREENS } from "../constants";
import Bird from "../entities/bird";

export const gameData = {
  activeScreen: SCREENS.MAIN,
  score: 0,
  playerBird: new Bird(),
  clouds: [],
  pipes: []
};
