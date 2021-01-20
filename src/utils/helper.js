export const getRandomIntegerBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const checkIfPointLiesInRectangle = (x1, y1, x2, y2, x, y) => {
  if (x > x1 && x < x2 && y > y1 && y < y2) {
    return true;
  }
  return false;
};
