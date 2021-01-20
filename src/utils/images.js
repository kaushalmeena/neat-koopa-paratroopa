import cloud1 from "../assets/sprites/cloud-1.png";
import cloud2 from "../assets/sprites/cloud-2.png";
import cloud3 from "../assets/sprites/cloud-3.png";
import pipe1 from "../assets/sprites/pipe-1.png";
import pipe2 from "../assets/sprites/pipe-2.png";
import greenKoopa1 from "../assets/sprites/green-koopa-1.png";
import greenKoopa2 from "../assets/sprites/green-koopa-2.png";
import redKoopa1 from "../assets/sprites/red-koopa-1.png";
import redKoopa2 from "../assets/sprites/red-koopa-2.png";

const cloudImage1 = new Image();
cloudImage1.src = cloud1;
const cloudImage2 = new Image();
cloudImage2.src = cloud2;
const cloudImage3 = new Image();
cloudImage3.src = cloud3;

const pipeImage1 = new Image();
pipeImage1.src = pipe1;
const pipeImage2 = new Image();
pipeImage2.src = pipe2;

const greenKoopaImage1 = new Image();
greenKoopaImage1.src = greenKoopa1;
const greenKoopaImage2 = new Image();
greenKoopaImage2.src = greenKoopa2;

const redKoopaImage1 = new Image();
redKoopaImage1.src = redKoopa1;
const redKoopaImage2 = new Image();
redKoopaImage2.src = redKoopa2;

const cloudImages = {
  "1": cloudImage1,
  "2": cloudImage2,
  "3": cloudImage3
};

const pipeImages = {
  "upper-pipe": pipeImage1,
  "lower-pipe": pipeImage2
};

const birdImages = {
  green: {
    "upper-flap": greenKoopaImage1,
    "lower-flap": greenKoopaImage2
  },
  red: {
    "upper-flap": redKoopaImage1,
    "lower-flap": redKoopaImage2
  }
};

export { cloudImages, pipeImages, birdImages };
