export const calcPositionResult = function (accountCapital, dataArr) {
  const [entry, risk, stop] = dataArr;
  const moneyRisk = accountCapital * (risk * 0.01);
  const stopDistance = Math.abs(entry - stop);
  const shares = Math.round(moneyRisk / stopDistance);

  console.log('This is the money risk', moneyRisk);
  console.log('This is the stop Distance', stopDistance);
  console.log('This is the shares amount', shares);
  return shares;
};
