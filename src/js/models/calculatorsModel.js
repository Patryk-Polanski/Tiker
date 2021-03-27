import { makeAbsolute } from '../helpers';

export const calcPositionResult = function (accountCapital, dataArr) {
  const [entry, risk, stop] = dataArr;
  const moneyRisk = accountCapital * (risk * 0.01);
  const stopDistance = makeAbsolute(entry - stop);
  return stopDistance !== 0 ? Math.round(moneyRisk / stopDistance) : 0;
};

export const calcRatioResult = function (dataArr) {
  console.log('fresh array', dataArr);
  const [entry, exit, stop] = dataArr;
  if (dataArr.sort((a, b) => a - b).indexOf(entry) !== 1) return;
  const exitDistance = makeAbsolute(exit - entry);
  const stopDistance = makeAbsolute(entry - stop);
  return (exitDistance / stopDistance).toFixed(2);
};
