import { cross } from 'd3-array';
import { createShortDate } from '../helpers';

let journalFormEls = {};

const getElements = function (obj = {}) {
  obj.journalFormWrapper = document.querySelector('.js-journal-form-wrapper');
  obj.journalEntriesWrapper = document.querySelector(
    '.js-journal-entries-wrapper'
  );
  obj.detailsEntryPriceAvg;
  obj.detailsExitPriceAvg;
  obj.detailsEntrySharesTotal;
  obj.detailsExitSharesTotal;
  return obj;
};

const toggleDisabledState = function (mode) {
  journalFormEls.manualInputs.forEach(input => {
    input.disabled = mode;
  });
};

const recalculateDetailsPrice = function (targetElClass, siblingElClass) {
  const inputsArr = Array.from(
    journalFormEls.journalFormWrapper.querySelectorAll(targetElClass)
  );

  const weightedResultsArr = inputsArr.map(
    input =>
      +input.value *
      (input.nextElementSibling.value ? +input.nextElementSibling.value : 1)
  );

  const allShares = Array.from(
    journalFormEls.journalFormWrapper.querySelectorAll(siblingElClass)
  )
    .map(input => (input.value ? +input.value : 1))
    .reduce((acc, num) => acc + num, 0);

  const filteredWeightedResultsArr = weightedResultsArr.filter(
    num => num !== 0
  );

  return (
    filteredWeightedResultsArr.reduce((acc, num) => acc + num, 0) / allShares
  ).toFixed(2);
};

const recalculateDetailsShares = function (targetElClass) {
  return Array.from(
    journalFormEls.journalFormWrapper.querySelectorAll(targetElClass)
  )
    .map(input => +input.value)
    .reduce((acc, num) => acc + num, 0);
};

const calculateDetailsOutput = function (focusedEl) {
  journalFormEls.detailsEntryPriceAvg.textContent = recalculateDetailsPrice(
    '.c-journal-form__entry',
    '.c-journal-form__entry-size'
  );
  journalFormEls.detailsEntrySharesTotal.textContent = recalculateDetailsShares(
    '.c-journal-form__entry-size'
  );
  journalFormEls.detailsExitPriceAvg.textContent = recalculateDetailsPrice(
    '.c-journal-form__exit',
    '.c-journal-form__exit-size'
  );
  journalFormEls.detailsExitSharesTotal.textContent = recalculateDetailsShares(
    '.c-journal-form__exit-size'
  );
};

const addKeyEventToDetailsInputs = function () {
  let keystrokeTimer;
  journalFormEls.journalForm
    .querySelectorAll('.js-form-details-input')
    .forEach(input => {
      input.addEventListener('keyup', e => {
        clearTimeout(keystrokeTimer);
        keystrokeTimer = setTimeout(() => {
          calculateDetailsOutput(e.target);
        }, 2000);
      });
    });
};

const removeFirstCrossInstances = function () {
  journalFormEls.journalFormWrapper
    .querySelector(
      '.c-journal-form__entry-size-wrapper .js-form-remove-details-row-btn'
    )
    .classList.add('c-journal-form__entry-size-remove-wrapper--disabled');
  journalFormEls.journalFormWrapper
    .querySelector(
      '.c-journal-form__exit-size-wrapper .js-form-remove-details-row-btn'
    )
    .classList.add('c-journal-form__exit-size-remove-wrapper--disabled');
};

const addCrossIconToExtraRows = function (targetEl) {
  const crossBtn =
    targetEl.previousElementSibling.lastElementChild.lastElementChild;
  if (
    crossBtn.classList.contains(
      'c-journal-form__entry-size-remove-wrapper--disabled'
    )
  )
    crossBtn.classList.remove(
      'c-journal-form__entry-size-remove-wrapper--disabled'
    );
  if (
    crossBtn.classList.contains(
      'c-journal-form__exit-size-remove-wrapper--disabled'
    )
  )
    crossBtn.classList.remove(
      'c-journal-form__exit-size-remove-wrapper--disabled'
    );
};

export const queryJournalFormEls = function () {
  journalFormEls = getElements();
};

export const addJournalFormEventsHandler = function (handler) {
  journalFormEls.journalFormWrapper.addEventListener('click', e => {
    if (
      e.target.classList.contains('js-form-edit-btn') &&
      journalFormEls.journalFormWrapper.classList.contains(
        's-journal__form-wrapper--read-mode'
      )
    )
      handler('edit');

    if (e.target.classList.contains('js-form-cancel-btn')) {
      const formId = journalFormEls.journalForm.getAttribute('data-id');
      if (formId) {
        handler('cancel', formId);
      } else {
        handler(
          'cancel',
          journalFormEls.journalEntriesWrapper
            .querySelector('.c-journal-entry')
            .nextElementSibling.getAttribute('data-id')
        );
      }
    }

    if (e.target.classList.contains('js-form-swap-btn')) handler('swap');

    if (e.target.classList.contains('js-form-plus-btn'))
      handler('extra', '', e.target);

    if (e.target.classList.contains('js-form-remove-details-row-btn'))
      handler('pop', '', e.target);

    if (e.target.classList.contains('js-form-save-btn')) handler('save');

    if (e.target.classList.contains('js-form-delete-btn')) handler('delete');
  });
};

export const grabEntryFormID = function () {
  return journalFormEls.journalForm.getAttribute('data-id');
};

export const removeJournalFormDetailsRow = function (el) {
  el.parentElement.remove();
  el.remove();
  journalFormEls.detailsEntrySharesTotal.textContent = recalculateDetailsShares(
    '.c-journal-form__entry-size'
  );
  journalFormEls.detailsExitSharesTotal.textContent = recalculateDetailsShares(
    '.c-journal-form__exit-size'
  );
  journalFormEls.detailsEntryPriceAvg.textContent = recalculateDetailsPrice(
    '.c-journal-form__entry',
    '.c-journal-form__entry-size'
  );
  journalFormEls.detailsExitPriceAvg.textContent = recalculateDetailsPrice(
    '.c-journal-form__exit',
    '.c-journal-form__exit-size'
  );
};

export const switchJournalFormModes = function (instruction = '') {
  if (instruction === 'read-only') {
    journalFormEls.journalFormWrapper.classList.remove(
      's-journal__form-wrapper--edit-mode'
    );
    journalFormEls.journalFormWrapper.classList.add(
      's-journal__form-wrapper--read-mode'
    );
    return;
  }
  if (
    journalFormEls.journalFormWrapper.classList.contains(
      's-journal__form-wrapper--read-mode'
    )
  ) {
    journalFormEls.journalFormWrapper.classList.remove(
      's-journal__form-wrapper--read-mode'
    );
    journalFormEls.journalFormWrapper.classList.add(
      's-journal__form-wrapper--edit-mode'
    );
    journalFormEls.manualInputs.forEach(input => {
      input.disabled = false;
    });
  } else if (
    journalFormEls.journalFormWrapper.classList.contains(
      's-journal__form-wrapper--edit-mode'
    )
  ) {
    journalFormEls.journalFormWrapper.classList.remove(
      's-journal__form-wrapper--edit-mode'
    );
    journalFormEls.journalFormWrapper.classList.add(
      's-journal__form-wrapper--read-mode'
    );
    toggleDisabledState(true);
  }
};

export const renderExtraDetailsRows = function (targetEl) {
  const lastRow = targetEl.previousElementSibling.lastElementChild;
  const rowClone = lastRow.cloneNode(true);
  lastRow.insertAdjacentElement('afterend', rowClone);
  addKeyEventToDetailsInputs();
  addCrossIconToExtraRows(targetEl);
};

export const checkFormMode = function () {
  if (
    journalFormEls.journalFormWrapper.classList.contains(
      's-journal__form-wrapper--read-mode'
    )
  ) {
    switchJournalFormModes();
  }
};

export const switchPositionSide = function () {
  const sideValueEl =
    journalFormEls.swapBtn.previousElementSibling.firstElementChild;
  sideValueEl.value === 'long'
    ? (sideValueEl.value = 'short')
    : (sideValueEl.value = 'long');
};

export const grabAllUserInputs = function () {
  const formInputs = {
    id: journalFormEls.journalForm.getAttribute('data-id'),
    date: journalFormEls.journalFormWrapper.querySelector('.js-form-date-input')
      .value,
    stock: journalFormEls.journalFormWrapper.querySelector(
      '.js-form-stock-input'
    ).value,
    side: journalFormEls.journalFormWrapper.querySelector('.js-form-stock-side')
      .value,
    entriesPrices: Array.from(
      journalFormEls.journalFormWrapper.querySelectorAll('.js-form-entry-input')
    ).map(el => el.value),
    entriesShares: Array.from(
      journalFormEls.journalFormWrapper.querySelectorAll(
        '.js-form-entry-shares-input'
      )
    ).map(el => el.value),
    exitsPrices: Array.from(
      journalFormEls.journalFormWrapper.querySelectorAll('.js-form-exit-input')
    ).map(el => el.value),
    exitsShares: Array.from(
      journalFormEls.journalFormWrapper.querySelectorAll(
        '.js-form-exit-shares-input'
      )
    ).map(el => el.value),
    body: journalFormEls.journalFormWrapper.querySelector('.js-form-body-input')
      .value,
  };
  return formInputs;
};

export const updateFormValidationError = function (message = 'fail') {
  journalFormEls.formValidationError.textContent = message;
};

export const clearFormValidationError = function () {
  journalFormEls.formValidationError.textContent = '';
};

export const renderJournalForm = function (singleEntry) {
  journalFormEls.journalFormWrapper.innerHTML = '';
  [singleEntry] = singleEntry;

  const html = `
    <div class="c-journal-form js-journal-form" data-id="${singleEntry.id}">
      <div class="c-journal-form__upper-region">
          <div class="c-journal-form__unit-wrapper">
              <span class="c-journal-form__data">date: <input
                      class="c-input-text c-input-text--compact c-journal-form__manual-input js-form-date-input"
                       value="${
                         singleEntry.dateShort
                           ? singleEntry.dateShort
                           : createShortDate()
                       }" disabled>
              </span>
              <span class="c-journal-form__data">stock: <input
                      class="c-input-text c-input-text--compact c-journal-form__manual-input js-form-stock-input"
                      type="text" value="${singleEntry.ticker}" disabled></span>
          </div>
          <div class="c-journal-form__unit-wrapper">
              <div class="c-journal-form__trade-side-wrapper">
                  <span class="c-journal-form__data">side: <input
                          class="c-input-text c-input-text--compact c-journal-form__manual-input js-form-stock-side"
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
                      value="${singleEntry.returnCash}" disabled></span>
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
                          class="c-journal-form__entries-label-result js-details-entry-price-average">${
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
                          class="c-journal-form__entries-label-result js-details-entry-shares-result">${
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
                          class="c-journal-form__exits-label-result js-details-exit-price-average">${
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
                          class="c-journal-form__exits-label-result js-details-exit-shares-result">${
                            singleEntry.tradeExits[0][1]
                              ? singleEntry.tradeExits
                                  .map(single => single[1])
                                  .reduce((acc, num) => acc + num, 0)
                              : ''
                          }</span></span>
              </div>
          </div>
  
      </div>
      <p class="c-journal-form__error-message js-form-error-message"></p>
    <textarea class="c-journal-form__text-area c-journal-form__manual-input js-form-body-input" rows="10" disabled>${
      singleEntry.body
    }</textarea>
    </div>
    <div class="c-journal-form__buttons-wrapper">
        <button class="c-journal-from__button-delete btn btn--secondary js-form-delete-btn">delete</button>
        <div class="c-journal-form__buttons-inner-wrapper">
            <button class="c-journal-form__button-cancel btn btn--secondary c-journal-form__edit-mode-btn js-form-cancel-btn">cancel</button>
            <button class="c-journal-form__button-save btn btn--primary c-journal-form__edit-mode-btn js-form-save-btn">save</button>
        </div>
        <button class="c-journal-form__button-edit btn btn--primary js-form-edit-btn">edit</button>
    </div>
    `;

  journalFormEls.journalFormWrapper.insertAdjacentHTML('afterbegin', html);

  journalFormEls.journalForm = document.querySelector('.js-journal-form');
  journalFormEls.formValidationError = document.querySelector(
    '.js-form-error-message'
  );

  const entriesSection = document.querySelector('.js-entries-wrapper');
  const exitsSection = document.querySelector('.js-exits-wrapper');
  singleEntry.tradeEntries.forEach(transaction => {
    entriesSection.innerHTML += `
          <div class="c-journal-form__entry-size-wrapper">
              <input type="number"
              class="c-journal-form__entry c-input-text c-input-text--compact c-journal-form__manual-input  js-form-details-input js-form-entry-input"
              value="${transaction[0]}" disabled>
              <input type="number"
              class="c-journal-form__entry-size c-input-text c-input-text--compact c-journal-form__manual-input  js-form-details-input js-form-entry-shares-input"
              value="${transaction[1]}" disabled>
              <div class="c-journal-form__entry-size-remove-wrapper c-journal-form__edit-mode-btn js-form-remove-details-row-btn">
                <span class="c-journal-form__entry-size-remove-btn">x</span>
              </div>
          </div>
        `;
  });

  singleEntry.tradeExits.forEach(transaction => {
    exitsSection.innerHTML += `
          <div class="c-journal-form__exit-size-wrapper">
              <input type="number"
              class="c-journal-form__exit c-input-text c-input-text--compact c-journal-form__manual-input js-form-details-input js-form-exit-input"
              value="${transaction[0]}" disabled>
              <input type="number"
              class="c-journal-form__exit-size c-input-text c-input-text--compact c-journal-form__manual-input  js-form-details-input js-form-exit-shares-input"
              value="${transaction[1]}" disabled>
              <div class="c-journal-form__exit-size-remove-wrapper c-journal-form__edit-mode-btn js-form-remove-details-row-btn">
              <span class="c-journal-form__exit-size-remove-btn">x</span>
            </div>
          </div>
        `;
  });

  journalFormEls.swapBtn = journalFormEls.journalFormWrapper.querySelector(
    '.js-form-swap-btn'
  );
  journalFormEls.manualInputs = journalFormEls.journalFormWrapper.querySelectorAll(
    '.c-journal-form__manual-input'
  );

  journalFormEls.detailsExitPriceAvg = journalFormEls.journalFormWrapper.querySelector(
    '.js-details-exit-price-average'
  );
  journalFormEls.detailsExitSharesTotal = journalFormEls.journalFormWrapper.querySelector(
    '.js-details-exit-shares-result'
  );
  journalFormEls.detailsEntryPriceAvg = journalFormEls.journalFormWrapper.querySelector(
    '.js-details-entry-price-average'
  );
  journalFormEls.detailsEntrySharesTotal = journalFormEls.journalFormWrapper.querySelector(
    '.js-details-entry-shares-result'
  );
  addKeyEventToDetailsInputs();
  removeFirstCrossInstances();
};
