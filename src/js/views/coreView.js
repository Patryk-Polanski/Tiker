let coreEls = {};

const getElements = function (obj = {}) {
  obj.core = document.querySelector('.js-core');
  obj.nav = obj.core.querySelector('.js-nav');
  obj.loadingScreen = obj.core.querySelector('.js-loading');
  obj.singleBtnPopup = obj.core.querySelector('.js-single-btn-popup');
  obj.doubleBtnPopup = obj.core.querySelector('.js-double-btn-popup');
  obj.singleBtnPopupOkBtn = obj.core.querySelector('.js-popup-ok-btn');
  obj.doubleBtnPopupYesBtn = obj.core.querySelector('.js-popup-yes-btn');
  obj.doubleBtnPopupNoBtn = obj.core.querySelector('.js-popup-no-btn');
  obj.sectionOverview = obj.core.querySelector('.js-section-overview');
  obj.sectionMonthly = obj.core.querySelector('.js-section-monthly');
  obj.sectionJournal = obj.core.querySelector('.js-section-journal');
  obj.sectionCalculators = obj.core.querySelector('.js-section-calculators');
  obj.sectionSettings = obj.core.querySelector('.js-section-settings');
  obj.sectionHelp = obj.core.querySelector('.js-section-help');
  obj.performanceChart = obj.core.querySelector('.js-chart-performance');
  obj.overallChart = obj.core.querySelector('.js-chart-overall');
  obj.tableProfitable = obj.core.querySelector('.js-table-profitable');
  obj.worstBestChart = obj.core.querySelector('.js-chart-worst-best');
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

export const showSingleBtnPopup = function (...messages) {
  coreEls.singleBtnPopup.classList.add('s-content__popup--active');

  const popupContentWrapper = coreEls.singleBtnPopup.children[0];

  messages.forEach(message => {
    const html = `
      <p class="s-content__popup-text">${message}</p>
    `;
    popupContentWrapper.insertAdjacentHTML('afterbegin', html);
  });
};

export const showDoubleBtnPopup = function (
  entryID = '',
  source = '',
  ...messages
) {
  coreEls.doubleBtnPopup.classList.add('s-content__popup--active');
  coreEls.doubleBtnPopup.setAttribute('source', source);
  coreEls.doubleBtnPopup.setAttribute('entry-id', entryID);

  const popupContentWrapper = coreEls.doubleBtnPopup.children[0];

  messages.forEach(message => {
    const html = `
      <p class="s-content__popup-text">${message}</p>
    `;
    popupContentWrapper.insertAdjacentHTML('afterbegin', html);
  });
};

export const hidePopup = function () {
  const activePopup = coreEls.core.querySelector('.s-content__popup--active');
  if (activePopup) {
    activePopup.children[0]
      .querySelectorAll('p')
      .forEach(text => text.remove());
    activePopup.classList.remove('s-content__popup--active');
  }
};

export const removeLoadingScreen = function () {
  coreEls.loadingScreen.remove();
};

export const queryCoreEls = function () {
  coreEls = getElements();
};

export const addNavigationHandler = function (handler) {
  coreEls.nav.addEventListener('click', e => handler(e.target));
};

export const addPopupHandler = function (handler) {
  coreEls.singleBtnPopupOkBtn.addEventListener('click', e => {
    e.preventDefault();
    handler('hide');
  });
  coreEls.singleBtnPopup.children[0].addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
  });
  coreEls.singleBtnPopup.addEventListener('click', e => {
    e.preventDefault();
    handler('hide');
  });

  coreEls.doubleBtnPopupNoBtn.addEventListener('click', e => {
    e.preventDefault();
    handler('hide');
  });
  coreEls.doubleBtnPopupYesBtn.addEventListener('click', e => {
    e.stopPropagation();
    handler(
      'proceed',
      coreEls.doubleBtnPopup.getAttribute('source'),
      coreEls.doubleBtnPopup.getAttribute('entry-id')
    );
  });
  coreEls.doubleBtnPopup.children[0].addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
  });
  coreEls.doubleBtnPopup.addEventListener('click', e => {
    e.preventDefault();
    handler('hide');
  });
};

export const toggleSections = function (targetEl) {
  if (targetEl.classList.contains('js-nav-overview-btn')) {
    hidePopup();
    hideAllSections();
    coreEls.sectionOverview.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
    return 'rerender';
  }
  if (targetEl.classList.contains('js-nav-monthly-btn')) {
    hidePopup();
    hideAllSections();
    coreEls.sectionMonthly.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-journal-btn')) {
    hidePopup();
    hideAllSections();
    coreEls.sectionJournal.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-calculators-btn')) {
    hidePopup();
    hideAllSections();
    coreEls.sectionCalculators.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-settings-btn')) {
    hidePopup();
    hideAllSections();
    coreEls.sectionSettings.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-help-btn')) {
    hidePopup();
    hideAllSections();
    coreEls.sectionHelp.classList.remove('s-core-hidden-section');
    toggleActiveNavBtns(targetEl);
  }
  if (targetEl.classList.contains('js-nav-exit-btn')) {
    hidePopup();
    showDoubleBtnPopup(
      '',
      'logoff',
      'All unsaved progress will be lost',
      'Are you sure you want to log off?'
    );
  }
};

export const redirectToLogin = function () {
  hidePopup();
  window.location.href = '../../index.html';
};

export const showNoDataScreens = function () {
  [
    coreEls.performanceChart,
    coreEls.overallChart,
    coreEls.tableProfitable,
    coreEls.worstBestChart,
  ].forEach(card => card.classList.add('s-content__no-data'));
};

export const hideNoDataScreens = function () {
  [
    coreEls.performanceChart,
    coreEls.overallChart,
    coreEls.tableProfitable,
    coreEls.worstBestChart,
  ].forEach(card => card.classList.remove('s-content__no-data'));
};
