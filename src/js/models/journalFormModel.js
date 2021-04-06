import { createLongDate, createShortDate } from '../helpers';

export const validateJournalForm = function (inputData) {
  console.log(inputData);
  console.log('~@~@~@~@~@~@~@~@~@~');
  const dateFull = createLongDate(inputData.date);

  // dates validation
  if (dateFull === 'ERROR')
    return ['ERROR', 'date must be in the format of dd/mm/yy'];

  const dateShort = createShortDate(dateFull);

  // stock ticker validation
  let tickerRegex = /^[a-zA-Z]+$/;
  let stock;
  if (tickerRegex.test(inputData.stock)) stock = inputData.stock;

  // trade side
  const side = inputData.side;

  // id
  const id = Date.now();

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
  const entriesPrices = inputData.entriesPrices.map(entry => +entry);
  const entriesShares = inputData.entriesShares.map(entry => +entry);
  const exitsPrices = inputData.exitsPrices.map(exit => +exit);
  const exitsShares = inputData.exitsShares.map(exit => +exit);

  // check if the number of entry shares equals the number of exit shares
  const sharesAmount = entriesShares.reduce((acc, num) => acc + num, 0);
  if (sharesAmount !== exitsShares.reduce((acc, num) => acc + num, 0))
    return ['ERROR', 'Entry shares must be equal to exit shares'];

  const entryObj = {
    id,
    dateFull,
    dateShort,
    stock,
    side,
    entriesPrices,
    entriesShares,
    exitsPrices,
    exitsShares,
    sharesAmount,
  };

  // all validation checks passed
  console.log(entryObj);
  return ['PASS', 'THIS WILL BE THE OBJECT'];
};
