let calculatorEls = {};

const getElements = function (obj = {}) {
  obj.calcPosition = document.querySelector('.js-calc-position');
  obj.positionEntryPrice = obj.calcPosition.querySelector(
    '.js-calc-position-entry'
  );
  obj.positionRiskPercentage = obj.calcPosition.querySelector(
    '.js-calc-position-percentage'
  );
  obj.positionStopPrice = obj.calcPosition.querySelector(
    '.js-calc-position-stop'
  );
  obj.positionResult = obj.calcPosition.querySelector(
    '.js-calc-position-result'
  );
  obj.calcRatio = document.querySelector('.js-calc-ratio');
  obj.ratioEntryPrice = obj.calcRatio.querySelector('.js-calc-ratio-entry');
  obj.ratioExitPrice = obj.calcRatio.querySelector('.js-calc-ratio-exit');
  obj.ratioStopPrice = obj.calcRatio.querySelector('.js-calc-ratio-stop');
  obj.ratioResult = obj.calcRatio.querySelector('.js-calc-ratio-result');
  obj.calcCapital = document.querySelector('.js-calc-capital');
  obj.capitalSign = obj.calcCapital.querySelector('.js-calc-capital-sign');
  obj.capitalSignBtn = obj.calcCapital.querySelector(
    '.js-calc-capital-sign-btn'
  );
  obj.capitalInput = obj.calcCapital.querySelector('.js-calc-capital-input');
  obj.capitalUpdateBtn = obj.calcCapital.querySelector(
    '.js-calc-capital-update-btn'
  );
  obj.capitalMessage = obj.calcCapital.querySelector(
    '.js-calc-capital-message'
  );
  console.log(obj);
  return obj;
};

export const queryCalcEl = function () {
  calculatorEls = getElements({});
};

const checkFieldsForData = function (el1, el2, el3) {
  if (!el1.value || !el2.value || !el3.value) return;
  return [+el1.value, +el2.value, +el3.value];
};

export const addCalcPositionHandler = function (handler) {
  [
    calculatorEls.positionEntryPrice,
    calculatorEls.positionRiskPercentage,
    calculatorEls.positionStopPrice,
  ].forEach(input => {
    input.addEventListener('keyup', e => {
      if (e.key === 'Tab' || (!isFinite(e.key) && e.key !== 'Backspace'))
        return;

      const formattedData = checkFieldsForData(
        calculatorEls.positionEntryPrice,
        calculatorEls.positionRiskPercentage,
        calculatorEls.positionStopPrice
      );
      handler(formattedData);
    });
  });
};

export const addCalcRatioHandler = function (handler) {
  [
    calculatorEls.ratioEntryPrice,
    calculatorEls.ratioExitPrice,
    calculatorEls.ratioStopPrice,
  ].forEach(input => {
    input.addEventListener('keyup', e => {
      if (e.key === 'Tab' || (!isFinite(e.key) && e.key !== 'Backspace'))
        return;

      const formattedData = checkFieldsForData(
        calculatorEls.ratioEntryPrice,
        calculatorEls.ratioExitPrice,
        calculatorEls.ratioStopPrice
      );
      handler(formattedData);
    });
  });
};

export const renderCalcResult = function (result, el) {
  calculatorEls[el].value = result;
};

export const clearCalcResult = function (el) {
  calculatorEls[el].value = '';
};
