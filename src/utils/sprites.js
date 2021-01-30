import cloud1 from "../assets/sprites/cloud-1.png";
import cloud2 from "../assets/sprites/cloud-2.png";
import cloud3 from "../assets/sprites/cloud-3.png";
import pipe1 from "../assets/sprites/pipe-1.png";
import pipe2 from "../assets/sprites/pipe-2.png";
import greenKoopa1 from "../assets/sprites/green-koopa-1.png";
import greenKoopa2 from "../assets/sprites/green-koopa-2.png";
import redKoopa1 from "../assets/sprites/red-koopa-1.png";
import redKoopa2 from "../assets/sprites/red-koopa-2.png";

const cloudSprite1 = new Image();
cloudSprite1.src = cloud1;
const cloudSprite2 = new Image();
cloudSprite2.src = cloud2;
const cloudSprite3 = new Image();
cloudSprite3.src = cloud3;

const pipeSprite1 = new Image();
pipeSprite1.src = pipe1;
const pipeSprite2 = new Image();
pipeSprite2.src = pipe2;

const greenKoopaSprite1 = new Image();
greenKoopaSprite1.src = greenKoopa1;
const greenKoopaSprite2 = new Image();
greenKoopaSprite2.src = greenKoopa2;

const redKoopaSprite1 = new Image();
redKoopaSprite1.src = redKoopa1;
const redKoopaSprite2 = new Image();
redKoopaSprite2.src = redKoopa2;

const cloudSprites = {
  "cloud-1": cloudSprite1,
  "cloud-2": cloudSprite2,
  "cloud-3": cloudSprite3
};

const pipeSprites = {
  "upper-pipe": pipeSprite1,
  "lower-pipe": pipeSprite2
};

const birdSprites = {
  green: {
    "upper-wing": greenKoopaSprite1,
    "lower-wing": greenKoopaSprite2
  },
  red: {
    "upper-wing": redKoopaSprite1,
    "lower-wing": redKoopaSprite2
  }
};

export { cloudSprites, pipeSprites, birdSprites };
