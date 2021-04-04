let journalEntriesEls = {};

const getElements = function (obj = {}) {
  obj.journalEntriesWrapper = document.querySelector(
    '.js-journal-entries-wrapper'
  );
  return obj;
};

export const queryJournalEntriesEls = function () {
  journalEntriesEls = getElements();
};

export const addJournalEntriesHandler = function (handler) {
  journalEls.journalEntriesWrapper.addEventListener('click', e => {
    if (e.target.closest('.c-journal-entry')) {
      const clickedCard = e.target.closest('.c-journal-entry');
      journalEls.journalEntriesWrapper
        .querySelector('.c-journal-entry--active')
        .classList.remove('c-journal-entry--active');
      clickedCard.classList.add('c-journal-entry--active');
      return handler(clickedCard.getAttribute('data-id'));
    }
    return;
  });
};

export const removeEmptyJournalCard = function () {
  const emptyCard = journalEls.journalEntriesWrapper.querySelector(
    '.c-journal-entry--new'
  );
  if (emptyCard) {
    emptyCard.remove();
    activateEntry(selectFirstEntry());
  }
};

const selectFirstEntry = function () {
  return journalEls.journalEntriesWrapper.querySelector('.c-journal-entry');
};

const activateEntry = function (entryEl) {
  if (!entryEl) return;
  const previouslyActive = journalEls.journalEntriesWrapper.querySelector(
    '.c-journal-entry--active'
  );
  if (previouslyActive)
    previouslyActive.classList.remove('c-journal-entry--active');
  entryEl.classList.add('c-journal-entry--active');
};

const renderJournalPagination = function (entriesNumber) {
  if (entriesNumber < 9) return;
};

export const renderJournalEntries = function (entriesData) {
  if (!entriesData) return;
  entriesData.forEach(entry => {
    const html = `
      <div class="c-journal-entry ${
        entry.id ? '' : 'c-journal-entry--new'
      }" data-id=${entry.id}>
          <div class="c-journal-entry__unit-wrapper">
              <span class="c-journal-entry__date">${entry.shortDate}</span>
              <span class="c-journal-entry__data">${entry.ticker}</span>
          </div>
          <div class="c-journal-entry__unit-wrapper">
              <span class="c-journal-entry__data">${entry.side} side</span>
              <span class="c-journal-entry__data">${
                entry.sharesAmount
              } shares</span>
          </div>
          <div class="c-journal-entry__unit-wrapper">
              <span class="c-journal-entry__data">avg.entry: ${
                entry.avgEntry
              }</span>
              <span class="c-journal-entry__data">return: ${
                entry.return
              }%</span>
          </div>
          <div class="c-journal-entry__unit-wrapper">
              <span class="c-journal-entry__data">avg.exit: ${
                entry.avgExit
              }</span>
              <span class="c-journal-entry__data">% return ${
                entry.returnPercent
              }</span>
          </div>
          <svg class="c-journal-entry__chevron svg svg--chevron" viewBox="0 0 31 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 1.5L15.5 16.5L29.5 1.5" stroke="#AAAAAA" stroke-width="4" />
          </svg>
      </div>
      `;
    journalEls.journalEntriesWrapper.insertAdjacentHTML('afterbegin', html);
  });
  activateEntry(selectFirstEntry());
  renderJournalPagination(entriesData.length);
  return selectFirstEntry().getAttribute('data-id');
};
