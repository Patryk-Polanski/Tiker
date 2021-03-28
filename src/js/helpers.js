export const stringifyNum = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const makeAbsolute = num => Math.abs(num);

export const reduceData = arr => arr.reduce((acc, num) => acc + num, 0);

export const crunchData = function (arr) {
  if (!Array.isArray(arr) || arr.length < 1) return [];
  const singleNumber = reduceData(arr);
  return (singleNumber / arr.length).toFixed(2);
};
