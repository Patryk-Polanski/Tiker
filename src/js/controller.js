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

// ZONE - controllers

const controlCalcCapital = function (amount, action) {
  renderCapitalMessage(updateCapital(amount, action));
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

const controlLongShortPie = function () {
  renderLongShortPie(passData('overall'));
};

const queryDOM = function () {
  queryCalcEls();
  queryMonthlyEls();
  queryProfitableEls();
  queryOverallEls();
  queryPerformanceEls();
  queryBestWorstEls();
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
  controlLongShortPie();
  addCalcPositionHandler(controlCalcPosition);
  addCalcRatioHandler(controlCalcRatio);
  addCalcCapitalHandler(controlCalcCapital);
  addPerformanceRenderHandler(controlPerformanceRender);
  addWorstBestRenderHandler(controlWorstBestRender);
});

let resizeTimer;
window.addEventListener('resize', e => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    clearPerformanceCanvas();
    clearWorstBestCanvas();
    renderPerformanceChart();
    renderWorstBestChart();
  }, 1000);
});
