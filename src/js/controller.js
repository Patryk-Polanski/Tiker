import {
  fetchUserFromJSON,
  checkIfJournalEmpty,
  passData,
  passNestedData,
  updateCapital,
  updateCalendarData,
  findJournalEntry,
  updateJournalData,
} from './models/dataModel';
import {
  addNavigationHandler,
  queryCoreEls,
  toggleSections,
  removeLoadingScreen,
  showNoDataScreens,
  hideNoDataScreens,
  showSingleBtnPopup,
  addPopupHandler,
  hidePopup,
} from './views/coreView';
import {
  queryCalcEls,
  addCalcCapitalHandler,
  addCalcPositionHandler,
  addCalcRatioHandler,
  renderCapitalMessage,
  renderCalcResult,
  clearCalcResult,
} from './views/calculatorsView';
import { calcPositionResult, calcRatioResult } from './models/calculatorsModel';
import { queryMonthlyEls, renderMonthlyTable } from './views/tableMonthlyView';
import {
  queryProfitableEls,
  renderProfitableTable,
} from './views/tableProfitableView';
import {
  queryOverallEls,
  renderStreaks,
  renderLongShortStats,
  renderLongShortPie,
  clearLongShortCanvas,
} from './views/chartOverallView';
import { computeMonthlyData } from './models/tableMonthlyModel';
import { computeProfitableData } from './models/tableProfitableModel';
import {
  queryPerformanceEls,
  renderPerformanceChart,
  addPerformanceRenderHandler,
  clearPerformanceCanvas,
} from './views/chartPerformanceView';
import { formatPerformanceData } from './models/chartPerformanceModel';
import {
  queryBestWorstEls,
  renderWorstBestChart,
  clearWorstBestCanvas,
  addWorstBestRenderHandler,
} from './views/chartWorstBestView';
import { formatWorstBestData } from './models/chartWorstBestModel';
import {
  queryDetailsEls,
  updateCapitalOutput,
} from './views/accountDetailsView';
import {
  queryJournalEntriesEls,
  addJournalEntriesHandler,
  renderJournalEntries,
  removeEmptyJournalCard,
  addJournalPaginationHandler,
} from './views/journalEntriesView';
import {
  queryJournalFilterEls,
  addJournalFiltersHandler,
} from './views/journalFiltersView';
import {
  queryJournalFormEls,
  addJournalFormEventsHandler,
  renderJournalForm,
  switchJournalFormModes,
  checkFormMode,
  switchPositionSide,
  renderExtraDetailsRows,
  removeJournalFormDetailsRow,
  grabAllUserInputs,
  updateFormValidationError,
  clearFormValidationError,
} from './views/journalFormView';
import { validateJournalForm } from './models/journalFormModel';
import { querySettingsEls, addAppResetHandler } from './views/settingsView';

// ZONE - controllers

const controlLoading = function () {
  removeLoadingScreen();
};

const controlNoDataScreens = function () {
  const outcome = checkIfJournalEmpty();
  if (outcome === 'empty') showNoDataScreens();
  if (outcome === 'full') hideNoDataScreens();
};

const controlNavigation = function (targetEl) {
  toggleSections(targetEl);
};

const controlPopups = function () {
  hidePopup();
};

const controlCalcCapital = function (amount, action) {
  const capitalData = updateCapital(amount, action);
  renderCapitalMessage(capitalData);
  updateCapitalOutput(capitalData[2]);
};

const controlCalcPosition = function (data) {
  if (!data) return clearCalcResult('positionResult');
  const positionResult = calcPositionResult(passData('capital'), data);
  if (isNaN(positionResult)) return;
  renderCalcResult(positionResult, 'positionResult');
};

const controlCalcRatio = function (data) {
  if (!data) return clearCalcResult('ratioResult');
  const ratioResult = calcRatioResult(data);
  if (isNaN(ratioResult) || !ratioResult) return clearCalcResult('ratioResult');
  renderCalcResult(ratioResult, 'ratioResult');
};

const controlMonthlyRender = function () {
  const computedData = computeMonthlyData(passData('calendarData'));
  // renderMonthlyTable(updateCalendarData(computedData));
  renderMonthlyTable(computedData);
};

const controlProfitableRender = function () {
  const profitableStocks = computeProfitableData(passData('tickers'));
  renderProfitableTable(profitableStocks);
};

const controlOverallRender = function () {
  renderLongShortStats(passData('overall'));
  renderStreaks(passData('streaks'));
};

const controlPerformanceRender = function (type = 'day') {
  renderPerformanceChart(
    formatPerformanceData(passData('calendarData'), passData('capital'), type)
  );
};

const controlWorstBestRender = function (type = 'worst') {
  if (type === 'worst') {
    renderWorstBestChart(formatWorstBestData(type, passData('worstTrades')));
  }
  if (type === 'best')
    renderWorstBestChart(formatWorstBestData(type, passData('bestTrades')));
};

const controlLongShortPieRender = function () {
  renderLongShortPie(passData('overall').proportions);
};

const controlJournalRender = function () {
  const activeEntryID = renderJournalEntries(passData('journal'));
  if (!activeEntryID) return;
  renderJournalForm(findJournalEntry(activeEntryID));
};

const controlJournalFormEvents = function (action, id = '', targetEl = '') {
  if (action === 'edit') {
    clearFormValidationError();
    switchJournalFormModes();
  }
  if (action === 'cancel') {
    removeEmptyJournalCard();
    switchJournalFormModes();
    renderJournalForm(findJournalEntry(+id));
  }
  if (action === 'swap') switchPositionSide();
  if (action === 'extra') renderExtraDetailsRows(targetEl);
  if (action === 'pop') removeJournalFormDetailsRow(targetEl);
  if (action === 'save') {
    clearFormValidationError();
    const validationOutcome = validateJournalForm(
      grabAllUserInputs(),
      passData('capital')
    );
    if (validationOutcome[0] === 'ERROR')
      updateFormValidationError(validationOutcome[1]);
    if (validationOutcome[0] === 'PASS') {
      clearFormValidationError();
      const updatedCapital = updateJournalData(validationOutcome[1]);
      showSingleBtnPopup(
        `% return: ${validationOutcome[1].returnPercent}, cash return: ${validationOutcome[1].returnCash}`,
        `stock: ${validationOutcome[1].ticker}, date: ${validationOutcome[1].dateShort}`,
        'Journal Updated'
      );
      switchJournalFormModes('read-only');
      controlJournalRender();
      updateCapitalOutput(updatedCapital);
      // re-render visualisations
      controlNoDataScreens();
      controlOverallRender();
      controlLongShortPieRender();
      controlWorstBestRender('best');
      controlWorstBestRender();
      controlProfitableRender();
      controlPerformanceRender();
      controlMonthlyRender();
    }
  }
};

const controlJournalActiveEntries = function (id = '') {
  if (!id) return;
  removeEmptyJournalCard();
  switchJournalFormModes('read-only');
  renderJournalForm(findJournalEntry(+id));
};

const controlJournalFilters = function (action, id = '') {
  if (action === 'new') {
    switchJournalFormModes('read-only');
    renderJournalEntries(passData('dummyJournal'), '', false);
    renderJournalForm(passData('dummyJournal'));
    checkFormMode();
  }
};

const controlJournalPagination = function (paginationBtn) {
  const activeEntryID = renderJournalEntries(
    passData('journal'),
    paginationBtn
  );
  switchJournalFormModes('read-only');
  renderJournalForm(findJournalEntry(activeEntryID));
};

const controlAppReset = function () {
  console.log('reset initiated');
};

const queryDOM = function () {
  queryCoreEls();
  queryProfitableEls();
  queryOverallEls();
  queryPerformanceEls();
  queryDetailsEls();
  queryBestWorstEls();
  queryMonthlyEls();
  queryJournalEntriesEls();
  queryJournalFilterEls();
  queryJournalFormEls();
  queryCalcEls();
  querySettingsEls();
};

// ZONE - event listeners

window.addEventListener('DOMContentLoaded', e => {
  console.log('DOM app is loaded');
  fetchUserFromJSON();
  queryDOM();
  controlNoDataScreens();
  addNavigationHandler(controlNavigation);
  updateCapitalOutput(passData('capital'));
  addCalcPositionHandler(controlCalcPosition);
  addCalcRatioHandler(controlCalcRatio);
  addCalcCapitalHandler(controlCalcCapital);
  addPerformanceRenderHandler(controlPerformanceRender);
  addWorstBestRenderHandler(controlWorstBestRender);
  addJournalFiltersHandler(controlJournalFilters);
  addJournalEntriesHandler(controlJournalActiveEntries);
  addJournalFormEventsHandler(controlJournalFormEvents);
  addJournalPaginationHandler(controlJournalPagination);
  addPopupHandler(controlPopups);
  addAppResetHandler(controlAppReset);
  setTimeout(() => {
    controlLoading();
    controlProfitableRender();
    controlOverallRender();
    controlPerformanceRender();
    controlWorstBestRender();
    controlMonthlyRender();
    controlLongShortPieRender();
    controlJournalRender();
  }, 700);
});

let resizeTimer;
window.addEventListener('resize', e => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    clearPerformanceCanvas();
    clearWorstBestCanvas();
    clearLongShortCanvas();
    renderPerformanceChart();
    renderWorstBestChart();
    renderLongShortPie();
  }, 1000);
});
