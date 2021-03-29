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
import { queryOverallEls, renderStreaks } from './views/chartOverallView';
import { computeMonthlyData } from './models/tableMonthlyModel';
import { checkAgainstLeaders } from './models/tableProfitableModel';

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

// ZONE - event listeners

window.addEventListener('DOMContentLoaded', e => {
  console.log('DOM app is loaded');
  queryCalcEls();
  queryMonthlyEls();
  queryProfitableEls();
  queryOverallEls();
  controlMonthlyRender();
  controlProfitableRender();
  controlOverallRender();
  addCalcPositionHandler(controlCalcPosition);
  addCalcRatioHandler(controlCalcRatio);
  addCalcCapitalHandler(controlCalcCapital);
});
