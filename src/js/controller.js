import {
  queryCalcEls,
  addCalcCapitalHandler,
  addCalcPositionHandler,
  addCalcRatioHandler,
  renderCapitalMessage,
  renderCalcResult,
  clearCalcResult,
} from './views/calculatorsView';
import {
  passData,
  passNestedData,
  updateCapital,
  updateMonthlyData,
  updateProfitableData,
  findJournalEntry,
} from './models/dataModel';
import { calcPositionResult, calcRatioResult } from './models/calculatorsModel';
import { queryMonthlyEls, renderMonthlyTable } from './views/tableMonthlyView';
import {
  queryProfitableEls,
  renderProfitableTable,
} from './views/tableProfitableView';
import {
  queryOverallEls,
  renderStreaks,
  renderLongShortPie,
  clearLongShortCanvas,
} from './views/chartOverallView';
import { computeMonthlyData } from './models/tableMonthlyModel';
import { checkAgainstLeaders } from './models/tableProfitableModel';
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
} from './views/journalFormView';

// ZONE - controllers

const controlCalcCapital = function (amount, action) {
  const capitalData = updateCapital(amount, action);
  renderCapitalMessage(capitalData);
  updateCapitalOutput(capitalData);
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
  renderMonthlyTable(updateMonthlyData(computedData));
};

const controlProfitableRender = function () {
  const newProfitable = checkAgainstLeaders(passData('profitable'), [
    passNestedData('tickers', ''),
  ]);
  const tableData = updateProfitableData(newProfitable);
  renderProfitableTable(tableData);
};

const controlOverallRender = function () {
  renderStreaks(passData('streaks'));
};

const controlPerformanceRender = function (type = 'day') {
  renderPerformanceChart(formatPerformanceData(type));
};

const controlWorstBestRender = function (type = 'worst') {
  renderWorstBestChart(formatWorstBestData(type));
};

const controlLongShortPieRender = function () {
  renderLongShortPie(passData('overall').proportions);
};

const controlJournalRender = function () {
  const activeEntryID = renderJournalEntries(passData('journal'));
  renderJournalForm(findJournalEntry(activeEntryID));
};

const controlJournalFormEvents = function (action, id = '', targetEl = '') {
  if (action === 'edit') switchJournalFormModes();
  if (action === 'cancel') {
    removeEmptyJournalCard();
    switchJournalFormModes();
    renderJournalForm(findJournalEntry(id));
  }
  if (action === 'swap') switchPositionSide();
  if (action === 'extra') renderExtraDetailsRows(targetEl);
  if (action === 'pop') removeJournalFormDetailsRow(targetEl);
};

const controlJournalActiveEntries = function (id = '') {
  if (!id) return;
  removeEmptyJournalCard();
  switchJournalFormModes('read-only');
  renderJournalForm(findJournalEntry(id));
};

const controlJournalFilters = function (action, id = '') {
  if (action === 'new') {
    renderJournalEntries(passData('dummyJournal'));
    renderJournalForm(passData('dummyJournal'));
    checkFormMode();
  }
};

const controlJournalPagination = function (paginationBtn) {
  const activeEntryID = renderJournalEntries(
    passData('journal'),
    paginationBtn
  );
  renderJournalForm(findJournalEntry(activeEntryID));
};

const queryDOM = function () {
  queryCalcEls();
  queryMonthlyEls();
  queryProfitableEls();
  queryOverallEls();
  queryPerformanceEls();
  queryBestWorstEls();
  queryDetailsEls();
  queryJournalEntriesEls();
  queryJournalFilterEls();
  queryJournalFormEls();
};

// ZONE - event listeners

window.addEventListener('DOMContentLoaded', e => {
  console.log('DOM app is loaded');
  queryDOM();
  controlMonthlyRender();
  controlProfitableRender();
  controlOverallRender();
  controlPerformanceRender();
  controlWorstBestRender();
  controlLongShortPieRender();
  controlJournalRender();
  addCalcPositionHandler(controlCalcPosition);
  addCalcRatioHandler(controlCalcRatio);
  addCalcCapitalHandler(controlCalcCapital);
  addPerformanceRenderHandler(controlPerformanceRender);
  addWorstBestRenderHandler(controlWorstBestRender);
  addJournalFiltersHandler(controlJournalFilters);
  addJournalEntriesHandler(controlJournalActiveEntries);
  addJournalFormEventsHandler(controlJournalFormEvents);
  addJournalPaginationHandler(controlJournalPagination);
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
