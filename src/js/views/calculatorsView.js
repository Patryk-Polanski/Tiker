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
  return obj;
};

export const queryCalcEls = function () {
  calculatorEls = getElements();
};

const checkFieldsForData = function (el1, el2, el3) {
  if (!el1.value || !el2.value || !el3.value) return;
  return [+el1.value, +el2.value, +el3.value];
};

export const addCalcCapitalHandler = function (handler) {
  calculatorEls.capitalUpdateBtn.addEventListener('click', e => {
    const amount = +calculatorEls.capitalInput.value;
    if (!amount || isNaN(amount)) return;
    handler(amount, calculatorEls.capitalSign.getAttribute('data-action'));
  });
  calculatorEls.capitalSignBtn.addEventListener('click', e => {
    if (
      e.target.previousElementSibling.getAttribute('data-action') === 'plus'
    ) {
      calculatorEls.capitalSign.innerHTML = `
      <svg class="svg svg--minus" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
        <rect y="5" width="13" height="3" fill="#C4C4C4"/>
      </svg>
      `;
      calculatorEls.capitalSign.setAttribute('data-action', 'minus');
    } else {
      calculatorEls.capitalSign.innerHTML = `
      <svg class="svg svg--plus" viewBox="0 0 13 13"
        xmlns="http://www.w3.org/2000/svg">
        <rect y="5" width="13" height="3" fill="#C4C4C4" />
        <rect x="8" width="13" height="3" transform="rotate(90 8 0)" fill="#C4C4C4" />
      </svg>
      `;
      calculatorEls.capitalSign.setAttribute('data-action', 'plus');
    }
  });
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

export const renderCapitalMessage = function (arr) {
  const spanEls = calculatorEls.capitalMessage.querySelectorAll('span');
  spanEls[0].textContent = arr[0] === 'plus' ? 'added' : 'removed';
  spanEls[1].textContent = arr[1];
  spanEls[2].textContent = arr[2];
  calculatorEls.capitalMessage.classList.add(
    'c-calculator-capital__message--is-active'
  );
  setTimeout(() => {
    calculatorEls.capitalMessage.classList.remove(
      'c-calculator-capital__message--is-active'
    );
    calculatorEls.capitalInput.value = '';
  }, 6000);
};

export const renderCalcResult = function (result, el) {
  calculatorEls[el].value = result;
};

export const clearCalcResult = function (el) {
  calculatorEls[el].value = '';
};
