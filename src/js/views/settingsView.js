let settingsEls = {};

const getElements = function (obj = {}) {
  obj.settingsResetBtn = document.querySelector('.js-settings-reset-btn');
  return obj;
};

export const querySettingsEls = function () {
  settingsEls = getElements();
};

export const addAppResetHandler = function (handler) {
  settingsEls.settingsResetBtn.addEventListener('click', handler);
};
