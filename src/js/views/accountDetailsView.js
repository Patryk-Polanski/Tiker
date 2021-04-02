let detailsEls = {};

const getElements = function (obj = {}) {
  obj.capitalOutput = document.querySelector('.js-capital-output span');
  return obj;
};

export const queryDetailsEls = function () {
  detailsEls = getElements();
};

export const updateCapitalOutput = function (capitalData) {
  const [action, amount, newCapital] = capitalData;
  detailsEls.capitalOutput.textContent = newCapital;
};
