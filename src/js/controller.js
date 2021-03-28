import {
  queryCalcEls,
  addCalcCapitalHandler,
  addCalcPositionHandler,
  addCalcRatioHandler,
  renderCapitalMessage,
  renderCalcResult,
  clearCalcResult,
} from './views/calculatorsView';
import { passData, updateCapital } from './models/dataModel';
import { calcPositionResult, calcRatioResult } from './models/calculatorsModel';
import { queryMonthlyEls } from './views/tableMonthlyView';
import { computeMonthlyData } from './models/tableMonthlyModel';

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
  computeMonthlyData(passData('monthlyData'));
};

// ZONE - event listeners

window.addEventListener('DOMContentLoaded', e => {
  console.log('DOM app is loaded');
  queryCalcEls();
  queryMonthlyEls();
  controlMonthlyRender();
  addCalcPositionHandler(controlCalcPosition);
  addCalcRatioHandler(controlCalcRatio);
  addCalcCapitalHandler(controlCalcCapital);
});
