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
  return obj;
};

const checkFieldsForData = function (el1, el2, el3) {
  if (!el1.value || !el2.value || !el3.value) return;
  return [+el1.value, +el2.value, +el3.value];
};

export const addHandlerKeypress = function () {
  calculatorEl = getElements({});
  [
    calculatorEl.positionEntryPrice,
    calculatorEl.positionRiskPercentage,
    calculatorEl.positionStopPrice,
  ].forEach(input => {
    input.addEventListener('keyup', e => {
      if (e.key === 'Tab' || !isFinite(e.key)) return;

      const formattedData = checkFieldsForData(
        calculatorEl.positionEntryPrice,
        calculatorEl.positionRiskPercentage,
        calculatorEl.positionStopPrice
      );
      console.log(formattedData);
    });
  });
};
