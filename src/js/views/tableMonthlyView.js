let monthlyEls = {};

const getElements = function (obj = {}) {
  obj.monthlyTable = document.querySelector('.js-monthly-table');
  return obj;
};

export const queryMonthlyEls = function () {
  monthlyEls = getElements();
};
