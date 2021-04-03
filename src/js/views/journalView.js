let journalEls = {};

const getElements = function (obj = {}) {
  obj.entriesContainer = document.querySelector('.js-journal-entries-wrapper');
  obj.journalFormWrapper = document.querySelector('.js-journal-form-wrapper');
  obj.journalForm = document.querySelector('.js-journal-form');
  return obj;
};

export const queryJournalEls = function () {
  journalEls = getElements();
};

const selectFirstEntry = function () {
  return journalEls.entriesContainer.querySelector('.c-journal-entry');
};

const activateEntry = function (entryEl) {
  if (!entryEl) return;
  entryEl.classList.add('c-journal-entry--active');
};

const renderJournalPagination = function (entriesNumber) {
  if (entriesNumber < 9) return;
};

export const renderJournalForm = function () {};

export const renderJournalEntries = function (entriesData) {
  console.log(entriesData);
  if (!entriesData) return;
  entriesData.forEach(entry => {
    const html = `
    <div class="c-journal-entry" data-id=${entry.id}>
        <div class="c-journal-entry__unit-wrapper">
            <span class="c-journal-entry__date">${entry.shortDate}</span>
            <span class="c-journal-entry__data">${entry.ticker}</span>
        </div>
        <div class="c-journal-entry__unit-wrapper">
            <span class="c-journal-entry__data">${entry.side} side</span>
            <span class="c-journal-entry__data">${entry.sharesAmount} shares</span>
        </div>
        <div class="c-journal-entry__unit-wrapper">
            <span class="c-journal-entry__data">avg.entry: ${entry.avgEntry}</span>
            <span class="c-journal-entry__data">return: ${entry.return}%</span>
        </div>
        <div class="c-journal-entry__unit-wrapper">
            <span class="c-journal-entry__data">avg.exit: ${entry.avgExit}</span>
            <span class="c-journal-entry__data">% return ${entry.returnPercent}</span>
        </div>
        <svg class="c-journal-entry__chevron svg svg--chevron" viewBox="0 0 31 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.5L15.5 16.5L29.5 1.5" stroke="#AAAAAA" stroke-width="4" />
        </svg>
    </div>
    `;
    journalEls.entriesContainer.insertAdjacentHTML('afterbegin', html);
  });
  activateEntry(selectFirstEntry());
  renderJournalPagination(entriesData.length);
};
