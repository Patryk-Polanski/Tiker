export const calcPositionResult = function (accountCapital, dataArr) {
  const [entry, risk, stop] = dataArr;
  const moneyRisk = accountCapital * (risk * 0.01);
  const stopDistance = Math.abs(entry - stop);
  return stopDistance !== 0 ? Math.round(moneyRisk / stopDistance) : 0;
};

export const calcRatioResult = function (dataArr) {
  console.log('fresh array', dataArr);
  const [entry, exit, stop] = dataArr;
  if (dataArr.sort((a, b) => a - b).indexOf(entry) !== 1) return;
  const exitDistance = Math.abs(exit - entry);
  const stopDistance = Math.abs(entry - stop);
  return (exitDistance / stopDistance).toFixed(2);
};
