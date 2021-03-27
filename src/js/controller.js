import {
  queryCalcEl,
  addCalcPositionHandler,
  addCalcRatioHandler,
  renderCalcResult,
  clearCalcResult,
} from './views/calculatorsView';
import { passData } from './models/dataModel';
import { calcPositionResult, calcRatioResult } from './models/calculatorsModel';

// ZONE - controllers
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

// ZONE - event listeners

window.addEventListener('DOMContentLoaded', e => {
  console.log('DOM app is loaded');
  queryCalcEl();
  addCalcPositionHandler(controlCalcPosition);
  addCalcRatioHandler(controlCalcRatio);
});
