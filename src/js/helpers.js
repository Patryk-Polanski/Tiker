export const stringifyNum = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const makeAbsolute = num => Math.abs(num);

export const reduceData = arr => arr.reduce((acc, num) => acc + num, 0);

export const crunchData = function (arr) {
  if (!Array.isArray(arr) || arr.length < 1) return [];
  const singleNumber = reduceData(arr);
  return (singleNumber / arr.length).toFixed(2);
};

export const filterNonStrings = arr => {
  let filtered = arr
    .filter(item => typeof item === 'string' || typeof item === 'number')
    .map(item => +item);
  if (filtered.length < 1) filtered = [0];
  return filtered;
};
