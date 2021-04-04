let journalEls = {};

const getElements = function (obj = {}) {
  obj.entriesContainer = document.querySelector('.js-journal-entries-wrapper');
  obj.journalFormWrapper = document.querySelector('.js-journal-form-wrapper');
  obj.journalEntriesWrapper = document.querySelector(
    '.js-journal-entries-wrapper'
  );
  obj.journalFiltersWrapper = document.querySelector('.js-journal-filter');
  return obj;
};

export const queryJournalEls = function () {
  journalEls = getElements();
};

export const switchJournalFormModes = function () {
  if (
    journalEls.journalFormWrapper.classList.contains(
      's-journal__form-wrapper--read-mode'
    )
  ) {
    journalEls.journalFormWrapper.classList.remove(
      's-journal__form-wrapper--read-mode'
    );
    journalEls.journalFormWrapper.classList.add(
      's-journal__form-wrapper--edit-mode'
    );
    journalEls.entriesExitsDetails.forEach(input => {
      input.disabled = false;
    });
  } else if (
    journalEls.journalFormWrapper.classList.contains(
      's-journal__form-wrapper--edit-mode'
    )
  ) {
    journalEls.journalFormWrapper.classList.remove(
      's-journal__form-wrapper--edit-mode'
    );
    journalEls.journalFormWrapper.classList.add(
      's-journal__form-wrapper--read-mode'
    );
    toggleDisabledState(true);
  }
};

const toggleDisabledState = function (mode) {
  journalEls.entriesExitsDetails.forEach(input => {
    input.disabled = mode;
  });
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

export const addJournalFormEventsHandler = function (handler) {
  journalEls.journalFormWrapper.addEventListener('click', e => {
    if (
      e.target.classList.contains('js-form-edit-btn') &&
      journalEls.journalFormWrapper.classList.contains(
        's-journal__form-wrapper--read-mode'
      )
    )
      handler('edit');

    if (e.target.classList.contains('js-form-cancel-btn')) {
      handler('cancel', journalEls.journalForm.getAttribute('data-id'));
    }

    if (e.target.classList.contains('js-form-swap-btn')) handler('swap');
  });
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

export const checkFormMode = function () {
  if (
    journalEls.journalFormWrapper.classList.contains(
      's-journal__form-wrapper--read-mode'
    )
  ) {
    switchJournalFormModes();
  }
};

export const switchPositionSide = function () {
  const sideValueEl =
    journalEls.swapBtn.previousElementSibling.firstElementChild;
  sideValueEl.value === 'long'
    ? (sideValueEl.value = 'short')
    : (sideValueEl.value = 'long');
};

const selectFirstEntry = function () {
  return journalEls.entriesContainer.querySelector('.c-journal-entry');
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

const getTodayShortDate = function () {
  const [month, date, year] = new Date().toLocaleDateString('en-US').split('/');
  const joinedDate = date + '/' + month + '/' + year;
  return joinedDate;
};

export const renderJournalForm = function (singleEntry) {
  journalEls.journalFormWrapper.innerHTML = '';
  [singleEntry] = singleEntry;

  const html = `
  <div class="c-journal-form js-journal-form" data-id="${singleEntry.id}">
    <div class="c-journal-form__upper-region">
        <div class="c-journal-form__unit-wrapper">
            <span class="c-journal-form__data">date: <input
                    class="c-input-text c-input-text--compact c-journal-form__manual-input"
                     value="${
                       singleEntry.shortDate
                         ? singleEntry.shortDate
                         : getTodayShortDate()
                     }" disabled>
            </span>
            <span class="c-journal-form__data">stock: <input
                    class="c-input-text c-input-text--compact c-journal-form__manual-input"
                    type="text" value="${singleEntry.ticker}" disabled></span>
        </div>
        <div class="c-journal-form__unit-wrapper">
            <div class="c-journal-form__trade-side-wrapper">
                <span class="c-journal-form__data">side: <input
                        class="c-input-text c-input-text--compact c-journal-form__manual-input"
                        type="text" value="${
                          singleEntry.side ? singleEntry.side : 'long'
                        }" disabled></span>
                <button class="c-journal-form__swap btn btn--form-icon c-journal-form__edit-mode-btn js-form-swap-btn">
                    <svg class="svg svg--swap" viewBox="0 0 17 29"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 0L15.8612 12.75L1.13878 12.75L8.5 0Z"
                            fill="#C4C4C4" />
                        <path d="M8.5 29L1.13879 16.25L15.8612 16.25L8.5 29Z"
                            fill="#C4C4C4" />
                    </svg>

                </button>
            </div>
            <span class="c-journal-form__data">%return: <input
                    class="c-input-text c-input-text--compact" type="number"
                    value="${singleEntry.returnPercent}" disabled></span>
        </div>
        <div class="c-journal-form__unit-wrapper">
            <span class="c-journal-form__data">shares: <input
                    class="c-input-text c-input-text--compact" type="number"
                    value="${singleEntry.sharesAmount}" disabled></span>
            <span class="c-journal-form__data">return: <input
                    class="c-input-text c-input-text--compact" type="number"
                    value="${singleEntry.return}" disabled></span>
        </div>
    </div>
    <div class="c-journal-form__middle-region">
        <div class="c-journal-form__entries-wrapper">
            <div class="c-journal-form__entries-labels-wrapper">
                <span class="c-journal-form__entries-label">entries</span>
                <span class="c-journal-form__entries-label">shares</span>
            </div>
            <div class="c-journal-form__entries-inner-wrapper js-entries-wrapper">
                
            </div>
            <button class="c-journal-form__plus-entry btn btn--icon c-journal-form__edit-mode-btn">
                <svg class="svg svg--plus-circle" viewBox="0 0 17 17"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="8.5" fill="#29242A" />
                    <path d="M14 7H3V10H14V7Z" fill="#C4C4C4" />
                    <path d="M10 14V3H7L7 14H10Z" fill="#C4C4C4" />
                </svg>

            </button>
            <div class="c-journal-form__entries-labels-wrapper">
                <span class="c-journal-form__entries-label">average: <br><span
                        class="c-journal-form__entries-label-result">${
                          singleEntry.tradeEntries[0][0]
                            ? (
                                singleEntry.tradeEntries
                                  .map(single => single[0] * single[1])
                                  .reduce((acc, num) => acc + num, 0) /
                                singleEntry.tradeEntries
                                  .map(single => single[1])
                                  .reduce((acc, num) => acc + num, 0)
                              ).toFixed(2)
                            : ''
                        }</span></span>
                <span class="c-journal-form__average-entry">shares: <br><span
                        class="c-journal-form__entries-label-result">${
                          singleEntry.tradeExits[0][1]
                            ? singleEntry.tradeExits
                                .map(single => single[1])
                                .reduce((acc, num) => acc + num, 0)
                            : ''
                        }</span></span>
            </div>
        </div>
        <div class="c-journal-form__exits-wrapper">
            <div class="c-journal-form__exits-labels-wrapper">
                <span class="c-journal-form__exits-label">exits</span>
                <span class="c-journal-form__exits-label">shares</span>
            </div>
            <div class="c-journal-form__exits-inner-wrapper js-exits-wrapper">
              
            </div>
            <button class="c-journal-form__plus-exit btn btn--icon c-journal-form__edit-mode-btn">
                <svg class="svg svg--plus-circle" viewBox="0 0 17 17"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="8.5" fill="#29242A" />
                    <path d="M14 7H3V10H14V7Z" fill="#C4C4C4" />
                    <path d="M10 14V3H7L7 14H10Z" fill="#C4C4C4" />
                </svg>

            </button>
            <div class="c-journal-form__exits-labels-wrapper">
                <span class="c-journal-form__exits-label">average: <br><span
                        class="c-journal-form__exits-label-result">${
                          singleEntry.tradeExits[0][0]
                            ? (
                                singleEntry.tradeExits
                                  .map(single => single[0] * single[1])
                                  .reduce((acc, num) => acc + num, 0) /
                                singleEntry.tradeExits
                                  .map(single => single[1])
                                  .reduce((acc, num) => acc + num, 0)
                              ).toFixed(2)
                            : ''
                        }</span></span>
                <span class="c-journal-form__average-exit">shares: <br><span
                        class="c-journal-form__exits-label-result">${
                          singleEntry.tradeExits[0][1]
                            ? singleEntry.tradeExits
                                .map(single => single[1])
                                .reduce((acc, num) => acc + num, 0)
                            : ''
                        }</span></span>
            </div>
        </div>

    </div>
  <textarea class="c-journal-form__text-area" name="" id="" rows="10"></textarea>
  </div>
  <div class="c-journal-form__buttons-wrapper">
      <button class="c-journal-from__button-delete btn btn--secondary">delete</button>
      <div class="c-journal-form__buttons-inner-wrapper">
          <button class="c-journal-form__button-cancel btn btn--secondary c-journal-form__edit-mode-btn js-form-cancel-btn">cancel</button>
          <button class="c-journal-form__button-save btn btn--primary c-journal-form__edit-mode-btn">save</button>
      </div>
      <button class="c-journal-form__button-edit btn btn--primary js-form-edit-btn">edit</button>
  </div>
  `;

  journalEls.journalFormWrapper.insertAdjacentHTML('afterbegin', html);

  journalEls.journalForm = document.querySelector('.js-journal-form');

  const entriesSection = document.querySelector('.js-entries-wrapper');
  const exitsSection = document.querySelector('.js-exits-wrapper');
  singleEntry.tradeEntries.forEach(transaction => {
    entriesSection.innerHTML += `
        <div class="c-journal-form__entry-size-wrapper">
            <input type="number"
            class="c-journal-form__entry c-input-text c-input-text--compact c-journal-form__manual-input"
            value="${transaction[0]}" disabled>
            <input type="number"
            class="c-journal-form__size c-input-text c-input-text--compact c-journal-form__manual-input"
            value="${transaction[1]}" disabled>
        </div>
      `;
  });

  singleEntry.tradeExits.forEach(transaction => {
    exitsSection.innerHTML += `
        <div class="c-journal-form__entry-size-wrapper">
            <input type="number"
            class="c-journal-form__entry c-input-text c-input-text--compact c-journal-form__manual-input"
            placeholder="${transaction[0]}" disabled>
            <input type="number"
            class="c-journal-form__size c-input-text c-input-text--compact c-journal-form__manual-input"
            placeholder="${transaction[1]}" disabled>
        </div>
      `;
  });

  journalEls.swapBtn = journalEls.journalFormWrapper.querySelector(
    '.js-form-swap-btn'
  );
  journalEls.entriesExitsDetails = journalEls.journalFormWrapper.querySelectorAll(
    '.c-journal-form__manual-input'
  );
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
            <span class="c-journal-entry__data">return: ${entry.return}%</span>
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
    journalEls.entriesContainer.insertAdjacentHTML('afterbegin', html);
  });
  activateEntry(selectFirstEntry());
  renderJournalPagination(entriesData.length);
  return selectFirstEntry().getAttribute('data-id');
};
