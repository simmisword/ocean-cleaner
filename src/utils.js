const map = (value, x1, y1, x2, y2) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const MIN_YEAR = 1950;
const MAX_YEAR = 2050;

export { random, map, MAX_YEAR, MIN_YEAR };
