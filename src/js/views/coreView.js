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

const hideAllSections = function () {
  [
    coreEls.sectionOverview,
    coreEls.sectionMonthly,
    coreEls.sectionJournal,
    coreEls.sectionCalculators,
    coreEls.sectionSettings,
    coreEls.sectionHelp,
  ].forEach(section => section.classList.add('s-core-hidden-section'));
};

const toggleActiveNavBtns = function (targetEl) {
  coreEls.nav
    .querySelector('.btn--nav--active')
    .classList.remove('btn--nav--active');
  targetEl.classList.add('btn--nav--active');
};

export const queryCoreEls = function () {
  coreEls = getElements();
};

export const addNavigationHandler = function (handler) {
  coreEls.nav.addEventListener('click', e => handler(e.target));
};

export const toggleSections = function (targetEl) {
  if (targetEl.classList.contains('btn--nav')) hideAllSections();
  if (targetEl.classList.contains('js-nav-overview-btn')) {
    coreEls.sectionOverview.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-monthly-btn')) {
    coreEls.sectionMonthly.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-journal-btn')) {
    coreEls.sectionJournal.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-calculators-btn')) {
    coreEls.sectionCalculators.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-settings-btn')) {
    coreEls.sectionSettings.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-help-btn')) {
    coreEls.sectionHelp.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-exit-btn')) {
    window.location.href = '../../index.html';
  }
};