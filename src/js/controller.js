import {
  queryCalcEl,
  addCalcPositionHandler,
  addCalcRatioHandler,
} from './views/calculatorsView';
import { passData } from './models/dataModel';
import { calcPositionResult } from './models/calculatorsModel';

// ZONE - controllers
const controlCalcPosition = function (data) {
  if (!data) return;
  console.log('this is the data for the position calc');
  calcPositionResult(passData('capital'), data);
};

const controlCalcRatio = function (data) {
  if (!data) return;
  console.log('this is the data for the position ratio');
  console.log(data);
  const test = passData('capital');
};

// ZONE - event listeners

window.addEventListener('DOMContentLoaded', e => {
  console.log('DOM app is loaded');
  queryCalcEl();
  addCalcPositionHandler(controlCalcPosition);
  addCalcRatioHandler(controlCalcRatio);
});
