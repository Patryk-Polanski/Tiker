export const stringifyNum = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const makeAbsolute = num => Math.abs(num);
