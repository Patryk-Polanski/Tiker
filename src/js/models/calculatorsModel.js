export const calcPositionResult = function (accountCapital, dataArr) {
  const [entry, risk, stop] = dataArr;
  const moneyRisk = accountCapital * (risk * 0.01);
  const stopDistance = Math.abs(entry - stop);
  const shares = stopDistance !== 0 ? Math.round(moneyRisk / stopDistance) : 0;
  return shares;
};
