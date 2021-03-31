let bestWorstEls = {};

const getElements = function (obj = {}) {
  obj.bestWorstCanvas = document.querySelector('.js-worst-best-canvas');
  return obj;
};

export const queryBestWorstEls = function () {
  bestWorstEls = getElements();
};

export const renderWorstBestChart = function () {};
