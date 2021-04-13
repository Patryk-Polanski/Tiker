import {
  fetchUserFromJSON,
  checkIfJournalEmpty,
  passData,
  passNestedData,
  updateCapital,
  updateCalendarData,
  findJournalEntry,
  updateJournalData,
  clearUserObject,
  targetSelectedEntry,
  saveToLocalStorage,
} from './models/dataModel';
import {
  addNavigationHandler,
  queryCoreEls,
  toggleSections,
  removeLoadingScreen,
  showNoDataScreens,
  hideNoDataScreens,
  addPopupHandler,
  showSingleBtnPopup,
  showDoubleBtnPopup,
  hidePopup,
  redirectToLogin,
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
  clearJournalEntries,
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
  grabEntryFormID,
  renderExtraDetailsRows,
  removeJournalFormDetailsRow,
  grabAllUserInputs,
  updateFormValidationError,
  clearFormValidationError,
  clearJournalForm,
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
  const furtherAction = toggleSections(targetEl);
  if (furtherAction === 'rerender') {
    clearPerformanceCanvas();
    clearWorstBestCanvas();
    clearLongShortCanvas();
    renderPerformanceChart();
    renderWorstBestChart();
    renderLongShortPie();
  }
};

const controlPopups = function (action, dataAttr, entryID) {
  if (action === 'hide') hidePopup();
  if (action === 'proceed') {
    if (dataAttr === 'logoff') {
      redirectToLogin();
    }
    if (dataAttr === 'reset') {
      clearUserObject();
      controlNoDataScreens();
      controlProfitableRender();
      controlOverallRender();
      controlPerformanceRender();
      controlWorstBestRender();
      controlMonthlyRender();
      controlLongShortPieRender();
      controlJournalRender();
      hidePopup();
      showSingleBtnPopup(
        'You can do so in the capital management section',
        'Your account capital is now 0 and needs to be updated',
        'Application has been reset'
      );
    }
    if (dataAttr === 'delete') {
      hidePopup();
      targetSelectedEntry(+entryID);
      controlNoDataScreens();
      controlProfitableRender();
      controlOverallRender();
      controlPerformanceRender();
      controlWorstBestRender();
      controlMonthlyRender();
      controlLongShortPieRender();
      controlJournalRender();
      showSingleBtnPopup('Entry has been deleted');
      updateCapital();
      updateCapitalOutput(passData('capital'));
    }
  }
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
    formatPerformanceData(
      passData('calendarData'),
      passData('capital'),
      passData('journal'),
      type
    )
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
  if (!activeEntryID) {
    clearJournalEntries();
    clearJournalForm();
    return;
  }
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
  if (action === 'delete') {
    const currentEntryID = grabEntryFormID();
    if (currentEntryID) {
      showDoubleBtnPopup(
        currentEntryID,
        'delete',
        'Are you sure you want to delete this existing entry?'
      );
    } else {
      showDoubleBtnPopup(
        '',
        'delete',
        'Are you sure you want to delete this new entry?'
      );
    }
  }

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
        'Journal has been updated and sorted'
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
      saveToLocalStorage();
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
    if (passData('capital') < 1) {
      showSingleBtnPopup(
        'You can do so in the capital management section',
        'Please add more capital to your account',
        'Your account capital has fallen below 0'
      );
      return;
    }
    switchJournalFormModes('read-only');
    renderJournalEntries(passData('dummyJournal'), '', false);
    renderJournalForm(passData('dummyJournal'));
    checkFormMode();
  }
  if (action === 'filter')
    showSingleBtnPopup(
      'Unfortunately the filters feature is not available in the current version'
    );
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
  showDoubleBtnPopup(
    '',
    'reset',
    'All user data will be deleted',
    'Are you sure you want to reset the application?'
  );
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
