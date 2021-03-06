import { createLongDate, createShortDate } from '../helpers';

export const validateJournalForm = function (inputData, accountCapital = 0) {
  if (accountCapital < 1)
    return ['ERROR', 'Account capital needs to be above zero'];

  const dateLong = createLongDate(inputData.date);

  // dates validation
  let dateRegex = /^[0-9\/]+$/;
  if (dateLong === 'ERROR')
    return ['ERROR', 'date must be in the format of dd/mm/yy'];

  const dateShort = createShortDate(dateLong);

  // stock ticker validation
  let tickerRegex = /^[a-zA-Z]+$/;
  let ticker;
  if (!tickerRegex.test(inputData.stock))
    return ['ERROR', 'Stock ticker field only accepts letters'];
  ticker = inputData.stock.toUpperCase();

  // trade side
  const side = inputData.side;

  // id
  const id = inputData.id ? +inputData.id : Date.now();

  // validating trade details
  if (
    !inputData.entriesPrices ||
    !inputData.entriesShares ||
    !inputData.exitsPrices ||
    !inputData.exitsShares
  )
    return [
      'ERROR',
      'All entries, exits and shares rows must be filled in or deleted',
    ];

  const entriesPrices = inputData.entriesPrices
    .map(entry => +entry)
    .filter(entry => entry > 0);
  const entriesShares = inputData.entriesShares
    .map(entry => +entry)
    .filter(entry => entry > 0);
  const exitsPrices = inputData.exitsPrices
    .map(exit => +exit)
    .filter(entry => entry > 0);
  const exitsShares = inputData.exitsShares
    .map(exit => +exit)
    .filter(entry => entry > 0);

  // validating if prices and shares only have digits and dots
  let entriesRegex = /^\d+(\.\d+)*$/;
  let areEntriesValid = true;
  [...entriesPrices, ...entriesShares, ...exitsPrices, ...exitsShares].forEach(
    digit => {
      if (!entriesRegex.test(digit)) areEntriesValid = false;
    }
  );

  if (!areEntriesValid)
    return [
      'ERROR',
      'All entries, exits and shares must be positive and only contain digits and dots',
    ];

  if (
    entriesPrices.length !== entriesShares.length ||
    exitsPrices.length !== exitsShares.length
  )
    return [
      'ERROR',
      'All entries, exits and shares rows must be filled in or deleted. Only positive digits and dots are accepted',
    ];

  // check if the number of entry shares equals the number of exit shares
  const sharesAmount = entriesShares.reduce((acc, num) => acc + num, 0);
  if (sharesAmount !== exitsShares.reduce((acc, num) => acc + num, 0))
    return ['ERROR', 'Entry shares must be equal to exit shares'];

  // make one array for tradeEntries and one for tradeExits to match the format
  let tradeEntries = [];
  entriesPrices.forEach((price, index) => {
    tradeEntries.push([price, entriesShares[index]]);
  });

  let tradeExits = [];
  exitsPrices.forEach((price, index) => {
    tradeExits.push([price, exitsShares[index]]);
  });

  // calculate avg entry price
  const avgEntry = +(
    tradeEntries
      .map(row => row[0] * row[1])
      .reduce((acc, num) => acc + num, 0) / sharesAmount
  ).toFixed(2);

  // calculate avg exit price
  const avgExit = +(
    tradeExits.map(row => row[0] * row[1]).reduce((acc, num) => acc + num, 0) /
    sharesAmount
  ).toFixed(2);

  // calculate cash return
  let returnCash;
  if (side === 'long')
    returnCash = +((avgExit - avgEntry) * sharesAmount).toFixed(2);
  if (side === 'short')
    returnCash = +((avgEntry - avgExit) * sharesAmount).toFixed(2);

  // calculate account % return
  const returnPercent = +((returnCash / accountCapital) * 100).toFixed(2);

  const body = inputData.body;

  const entryObj = {
    id,
    dateLong,
    dateShort,
    ticker,
    side,
    tradeEntries,
    tradeExits,
    sharesAmount,
    avgEntry,
    avgExit,
    returnCash,
    returnPercent,
    body,
    previousTicker: '',
    previousDateShort: '',
    previousDateLong: '',
  };

  // all validation checks passed
  return ['PASS', entryObj];
};
