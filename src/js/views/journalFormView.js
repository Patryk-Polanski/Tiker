let journalFormEls = {};

const getElements = function (obj = {}) {
  obj.journalFormWrapper = document.querySelector('.js-journal-form-wrapper');
  return obj;
};

const toggleDisabledState = function (mode) {
  journalEls.entriesExitsDetails.forEach(input => {
    input.disabled = mode;
  });
};

const getTodayShortDate = function () {
  const [month, date, year] = new Date().toLocaleDateString('en-US').split('/');
  const joinedDate = date + '/' + month + '/' + year;
  return joinedDate;
};

const addKeyEventToDetailsInputs = function () {
  journalEls.journalForm
    .querySelectorAll('.js-form-details-input')
    .forEach(input => {
      if (input.getAttribute('data-input-event') === 'active') return;
      input.addEventListener('keyup', e => {
        e.target.setAttribute('data-input-event', 'active');
        console.log('EVENT LISTENER ADDED');
      });
    });
};

export const queryJournalFormEls = function () {
  journalFormEls = getElements();
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
      const formId = journalEls.journalForm.getAttribute('data-id');
      if (formId) {
        handler('cancel', formId);
      } else {
        handler(
          'cancel',
          journalEls.journalEntriesWrapper
            .querySelector('.c-journal-entry')
            .nextElementSibling.getAttribute('data-id')
        );
      }
    }

    if (e.target.classList.contains('js-form-swap-btn')) handler('swap');

    if (e.target.classList.contains('js-form-plus-btn'))
      handler('extra', '', e.target);
  });
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

export const renderExtraDetailsRows = function (targetEl) {
  const lastRow = targetEl.previousElementSibling;
  const rowClone = lastRow.cloneNode(true);
  lastRow.insertAdjacentElement('afterend', rowClone);
  addKeyEventToDetailsInputs();
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
              <button class="c-journal-form__plus-entry btn btn--icon c-journal-form__edit-mode-btn js-form-plus-btn">
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
              <button class="c-journal-form__plus-exit btn btn--icon c-journal-form__edit-mode-btn js-form-plus-btn">
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
              class="c-journal-form__entry c-input-text c-input-text--compact c-journal-form__manual-input  js-form-details-input"
              value="${transaction[0]}" disabled>
              <input type="number"
              class="c-journal-form__entry-size c-input-text c-input-text--compact c-journal-form__manual-input  js-form-details-input"
              value="${transaction[1]}" disabled>
          </div>
        `;
  });

  singleEntry.tradeExits.forEach(transaction => {
    exitsSection.innerHTML += `
          <div class="c-journal-form__exit-size-wrapper">
              <input type="number"
              class="c-journal-form__exit c-input-text c-input-text--compact c-journal-form__manual-input js-form-details-input"
              placeholder="${transaction[0]}" disabled>
              <input type="number"
              class="c-journal-form__exit-size c-input-text c-input-text--compact c-journal-form__manual-input  js-form-details-input"
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
  addKeyEventToDetailsInputs();
};
