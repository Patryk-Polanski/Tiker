let journalFilterEls = {};

const getElements = function (obj = {}) {
  obj.journalFiltersWrapper = document.querySelector('.js-journal-filter');
  obj.journalEntriesWrapper = document.querySelector(
    '.js-journal-entries-wrapper'
  );
  return obj;
};

export const queryJournalFilterEls = function () {
  journalFilterEls = getElements();
};

export const addJournalFiltersHandler = function (handler) {
  journalFilterEls.journalFiltersWrapper.addEventListener('click', e => {
    const existingNewEntry = journalFilterEls.journalEntriesWrapper.querySelector(
      '.c-journal-entry--new'
    );
    if (e.target.classList.contains('js-new-trade-btn') && !existingNewEntry)
      handler('new');
    if (e.target.classList.contains('js-filter-btn') && !existingNewEntry)
      handler('filter');
  });
};
