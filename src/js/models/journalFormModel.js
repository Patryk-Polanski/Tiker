import { createLongDate, createShortDate } from '../helpers';

export const validateJournalForm = function (inputData, accountCapital = 0) {
  if (accountCapital < 1)
    return ['ERROR', 'Account capital needs to be above zero'];
  console.log(inputData);
  console.log('~@~@~@~@~@~@~@~@~@~');

  let dateRegex = /^[0-9\/]+$/;
  console.log(dateRegex.test(inputData.date));

  const dateFull = createLongDate(inputData.date);

  // dates validation
  if (dateFull === 'ERROR')
    return ['ERROR', 'date must be in the format of dd/mm/yy'];

  const dateShort = createShortDate(dateFull);

  // stock ticker validation
  let tickerRegex = /^[a-zA-Z]+$/;
  let ticker;
  if (!tickerRegex.test(inputData.stock))
    return ['ERROR', 'Stock ticker field only accepts letters'];
  ticker = inputData.stock;

  // trade side
  const side = inputData.side;

  // id
  const id = Date.now() + '';

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

  console.log(
    [
      inputData.entriesPrices,
      inputData.entriesShares,
      inputData.exitsPrices,
      inputData.exitShares,
    ].flat()
  );

  const entriesPrices = inputData.entriesPrices.map(entry => +entry);
  const entriesShares = inputData.entriesShares
    .map(entry => +entry)
    .filter(shares => shares > 0);
  const exitsPrices = inputData.exitsPrices.map(exit => +exit);
  const exitsShares = inputData.exitsShares
    .map(exit => +exit)
    .filter(shares => shares > 0);

  if (
    entriesPrices.length !== entriesShares.length ||
    exitsPrices.length !== exitsShares.length
  )
    return [
      'ERROR',
      'All entries, exits and shares rows must be filled in or deleted',
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
  const returnCash = +(Math.abs(avgEntry - avgExit) * sharesAmount).toFixed(2);

  // calculate account % return
  const returnPercent = +Math.abs((returnCash / accountCapital) * 100).toFixed(
    2
  );

  const body = inputData.body;

  const entryObj = {
    id,
    dateFull,
    dateShort,
    ticker,
    side,
    tradeEntries,
    tradeExits,
    exitsPrices,
    sharesAmount,
    avgEntry,
    avgExit,
    returnCash,
    returnPercent,
    body,
  };

  // all validation checks passed
  console.log(entryObj);
  return ['PASS', entryObj];
};
