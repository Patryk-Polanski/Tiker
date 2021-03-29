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
} from './models/dataModel';
import { calcPositionResult, calcRatioResult } from './models/calculatorsModel';
import { queryMonthlyEls, renderTable } from './views/tableMonthlyView';
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
  renderTable(updateMonthlyData(computedData));
};

const controlProfitableRender = function () {
  const newProfitable = checkAgainstLeaders(
    passData('profitable'),
    passNestedData('tickers', 'AAL')
  );
  // TODO - send new profitable to data model and check if not empty, then push to leaders object
};

// ZONE - event listeners

window.addEventListener('DOMContentLoaded', e => {
  console.log('DOM app is loaded');
  queryCalcEls();
  queryMonthlyEls();
  controlMonthlyRender();
  controlProfitableRender();
  addCalcPositionHandler(controlCalcPosition);
  addCalcRatioHandler(controlCalcRatio);
  addCalcCapitalHandler(controlCalcCapital);
});
