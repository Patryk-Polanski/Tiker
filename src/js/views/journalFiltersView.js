let journalFiltersEls = {};

const getElements = function (obj = {}) {
  obj.journalFiltersWrapper = document.querySelector('.js-journal-filter');
  return obj;
};

export const queryJournalFilterEls = function () {
  journalFiltersEls = getElements();
};

export const addJournalFiltersHandler = function (handler) {
  journalEls.journalFiltersWrapper.addEventListener('click', e => {
    const existingNewEntry = journalEls.journalEntriesWrapper.querySelector(
      '.c-journal-entry--new'
    );
    if (e.target.classList.contains('js-new-trade-btn') && !existingNewEntry)
      handler('new');
  });
};
