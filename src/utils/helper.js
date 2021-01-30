// Returns random integer between min and max (inclusive)
export const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Returns random array item from array
export const getRandomItem = (arr) => {
  let randomItem;
  if (Array.isArray(arr)) {
    const randomIndex = getRandomInteger(0, arr.length - 1);
    randomItem = arr[randomIndex];
  }
  return randomItem;
};

// Checks if point lies inside rectangle
export const isPointInside = (pX, pY, rectX, rectY, rectW, rectH) =>
  pX > rectX && pX < rectX + rectW && pY > rectY && pY < rectY + rectH;

// Checks if two rectangle overlap each other
export const isRectangleOverlapping = (
  rect1X,
  rect1Y,
  rect1W,
  rect1H,
  rect2X,
  rect2Y,
  rect2W,
  rect2H
) =>
  !(
    rect1X + rect1W < rect2X ||
    rect2X + rect2W < rect1X ||
    rect1Y + rect1H < rect2Y ||
    rect2Y + rect2H < rect1Y
  );

export const throttle = (func, wait = 100) => {
  let timer = null;
  return (...args) => {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
};

// Returns normalized value between 0 and 1
export const normalize = (value, minValue, maxValue) =>
  (value - minValue) / (maxValue - minValue);
