import { ENTRIES_PER_PAGE } from '../config';

let journalEntriesEls = {};

const getElements = function (obj = {}) {
  obj.journalEntriesWrapper = document.querySelector(
    '.js-journal-entries-wrapper'
  );
  obj.journalPaginationWrapper = document.querySelector(
    '.js-journal-pagination'
  );
  obj.journalFormWrapper = document.querySelector('.js-journal-form-wrapper');
  return obj;
};

export const queryJournalEntriesEls = function () {
  journalEntriesEls = getElements();
};

export const addJournalEntriesHandler = function (handler) {
  journalEntriesEls.journalEntriesWrapper.addEventListener('click', e => {
    if (e.target.closest('.c-journal-entry')) {
      const clickedCard = e.target.closest('.c-journal-entry');
      journalEntriesEls.journalEntriesWrapper
        .querySelector('.c-journal-entry--active')
        .classList.remove('c-journal-entry--active');
      clickedCard.classList.add('c-journal-entry--active');
      return handler(clickedCard.getAttribute('data-id'));
    }

    return;
  });
};

export const addJournalPaginationHandler = function (handler) {
  journalEntriesEls.journalPaginationWrapper.addEventListener('click', e => {
    if (e.target.classList.contains('js-journal-pagination-btn')) {
      handler(+e.target.getAttribute('data-pagination-btn'));
    }
  });
};

export const removeEmptyJournalCard = function () {
  const emptyCard = journalEntriesEls.journalEntriesWrapper.querySelector(
    '.c-journal-entry--new'
  );
  if (emptyCard) {
    emptyCard.remove();
    activateEntry(selectFirstEntry());
  }
};

const selectFirstEntry = function () {
  return journalEntriesEls.journalEntriesWrapper.querySelector(
    '.c-journal-entry'
  );
};

const activateEntry = function (entryEl) {
  if (!entryEl) return;
  const previouslyActive = journalEntriesEls.journalEntriesWrapper.querySelector(
    '.c-journal-entry--active'
  );
  if (previouslyActive)
    previouslyActive.classList.remove('c-journal-entry--active');
  entryEl.classList.add('c-journal-entry--active');
};

const makePaginationBtnActive = function (paginationPage) {
  const priorPagination = journalEntriesEls.journalEntriesWrapper.querySelector(
    '.btn--pagination--active'
  );
  if (priorPagination)
    priorPagination.classList.remove('btn--pagination--active');

  journalEntriesEls.journalEntriesWrapper
    .querySelectorAll('.btn--pagination')
    [paginationPage - 1].classList.add('btn--pagination--active');
};

const renderJournalPagination = function (entriesNumber, paginationPage) {
  journalEntriesEls.journalPaginationWrapper.innerHTML = '';

  let html = '';
  const buttonsNumber = Math.ceil(entriesNumber / ENTRIES_PER_PAGE);
  for (let i = 1; i <= buttonsNumber; i++) {
    html += `
        <button class="c-journal-pagination__button btn btn--pagination js-journal-pagination-btn" data-pagination-btn="${i}">${i}</button>
    `;
  }
  journalEntriesEls.journalPaginationWrapper.insertAdjacentHTML(
    'afterbegin',
    html
  );
  makePaginationBtnActive(paginationPage);
};

export const renderJournalEntries = function (
  entriesData,
  paginationPage = 1,
  clear = true
) {
  const existingEls = journalEntriesEls.journalEntriesWrapper.querySelectorAll(
    '.c-journal-entry'
  );
  if (existingEls && clear) existingEls.forEach(el => el.remove());

  const entriesRange =
    paginationPage !== 1
      ? [
          paginationPage * -ENTRIES_PER_PAGE,
          paginationPage * -ENTRIES_PER_PAGE + ENTRIES_PER_PAGE,
        ]
      : [-ENTRIES_PER_PAGE];

  if (!entriesData) return;
  entriesData.slice(...entriesRange).forEach(entry => {
    const html = `
      <div class="c-journal-entry ${
        entry.id ? '' : 'c-journal-entry--new'
      }" data-id=${entry.id}>
          <div class="c-journal-entry__unit-wrapper">
              <span class="c-journal-entry__date">${entry.dateShort}</span>
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
                entry.returnCash
              }</span>
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
    journalEntriesEls.journalEntriesWrapper.insertAdjacentHTML(
      'afterbegin',
      html
    );
  });
  const entriesLength = clear
    ? entriesData.length
    : journalEntriesEls.journalEntriesWrapper.querySelector('.c-journal-entry')
        .length;
  activateEntry(selectFirstEntry());
  if (clear) renderJournalPagination(entriesLength, paginationPage);
  return +selectFirstEntry().getAttribute('data-id');
};
