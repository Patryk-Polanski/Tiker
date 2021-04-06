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

  // trade details validation

  const entryObj = {
    dateFull,
    dateShort,
  };

  // all validation checks passed
  console.log(entryObj);
  return ['PASS', 'THIS WILL BE THE OBJECT'];
};
