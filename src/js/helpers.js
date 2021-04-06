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

export const kFormatter = function (num, decimal = 999) {
  if (!num) return 0;
  return Math.abs(num) > decimal
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(2) + 'k'
    : Math.sign(num) * Math.abs(num);
};

export const createShortDate = function (specifiedDate = '') {
  let joinedDate;
  if (specifiedDate) {
    const [month, date, year] = new Date(specifiedDate)
      .toLocaleDateString('en-US')
      .split('/');
    joinedDate = date + '/' + month + '/' + year;
  } else {
    const [month, date, year] = new Date()
      .toLocaleDateString('en-US')
      .split('/');
    joinedDate = date + '/' + month + '/' + year;
  }
  return joinedDate;
};

export const createLongDate = function (shortDate) {
  let [year, month, day] = shortDate.split('/').reverse();

  // check if each data has the correct length
  if (
    year.length !== 2 ||
    (month.length > 2 && month.length < 1) ||
    day.length > 2 ||
    day.length < 1
  )
    return 'ERROR';

  // coerce the string into numbers
  year = +('20' + year);
  month = +month;
  day = +day;

  // check if day, month or year failed the coercion due to incorrect format
  if (!year || !month || !day) return 'ERROR';

  // get current year
  const currentYear = new Date().getFullYear();

  // run year, day and month range validation
  if (year < 2010 ?? year > currentYear) return 'ERROR';
  if (month < 0 || month > 12) return 'ERROR';
  if (day < 1 || day > 31) return 'ERROR';

  const fullDate = new Date(year, month - 1, day);
  return String(fullDate);
};
