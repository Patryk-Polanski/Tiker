let calculatorEl = {};

const getElements = function (obj = {}) {
  obj.positionEntryPrice = document.querySelector(
    '.js-calculator-position-entry'
  );
  obj.positionRiskPercentage = document.querySelector(
    '.js-calculator-position-percentage'
  );
  obj.positionStopPrice = document.querySelector(
    '.js-calculator-position-stop'
  );
  obj.positionResult = document.querySelector('.js-calculator-position-result');
  obj.ratioEntryPrice = document.querySelector('.js-calculator-ratio-entry');
  obj.ratioExitPrice = document.querySelector('.js-calculator-ratio-exit');
  obj.ratioStopPrice = document.querySelector('.js-calculator-ratio-stop');
  obj.ratioResult = document.querySelector('.js-calculator-ratio-result');
  console.log(obj);
  return obj;
};

export const queryCalcEl = function () {
  calculatorEl = getElements({});
};

const checkFieldsForData = function (el1, el2, el3) {
  if (!el1.value || !el2.value || !el3.value) return;
  return [+el1.value, +el2.value, +el3.value];
};

export const addCalcPositionHandler = function (handler) {
  [
    calculatorEl.positionEntryPrice,
    calculatorEl.positionRiskPercentage,
    calculatorEl.positionStopPrice,
  ].forEach(input => {
    input.addEventListener('keyup', e => {
      if (e.key === 'Tab' || (!isFinite(e.key) && e.key !== 'Backspace'))
        return;

      const formattedData = checkFieldsForData(
        calculatorEl.positionEntryPrice,
        calculatorEl.positionRiskPercentage,
        calculatorEl.positionStopPrice
      );
      handler(formattedData);
    });
  });
};

export const addCalcRatioHandler = function (handler) {
  [
    calculatorEl.ratioEntryPrice,
    calculatorEl.ratioExitPrice,
    calculatorEl.ratioStopPrice,
  ].forEach(input => {
    input.addEventListener('keyup', e => {
      console.log(e.key);
      if (e.key === 'Tab' || !isFinite(e.key) || e.key !== 'Backspace') return;

      const formattedData = checkFieldsForData(
        calculatorEl.ratioEntryPrice,
        calculatorEl.ratioExitPrice,
        calculatorEl.ratioStopPrice
      );
      handler(formattedData);
    });
  });
};

export const renderCalcResult = function (result, el) {
  calculatorEl[el].value = result;
};
