let coreEls = {};

const getElements = function (obj = {}) {
  obj.core = document.querySelector('.js-core');
  obj.nav = obj.core.querySelector('.js-nav');
  obj.sectionOverview = obj.core.querySelector('.js-section-overview');
  obj.sectionMonthly = obj.core.querySelector('.js-section-monthly');
  obj.sectionJournal = obj.core.querySelector('.js-section-journal');
  obj.sectionCalculators = obj.core.querySelector('.js-section-calculators');
  obj.sectionSettings = obj.core.querySelector('.js-section-settings');
  obj.sectionHelp = obj.core.querySelector('.js-section-help');
  return obj;
};

export const queryCoreEls = function () {
  coreEls = getElements();
  console.log('core els');
  console.log(coreEls);
};
