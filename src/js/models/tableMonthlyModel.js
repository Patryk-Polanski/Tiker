export const computeMonthlyData = function (rawData) {
  const formattedMonths = [];
  const keys = Object.keys(rawData);
  keys.forEach(key => {
    console.log(rawData[key]);
    const currentKey = rawData[key];
    let tableUnit = {};
    tableUnit.month = key;
    tableUnit.totalTrades = currentKey.length;

    tableUnit.avgReturn = [];
    tableUnit.avgWinPercentage = [];
    tableUnit.avgLossPercentage = [];
    tableUnit.battingAvg;
    tableUnit.winLossRatio;

    currentKey.forEach(trade => {
      tableUnit.avgReturn.push(trade.result);
      if (trade.resultPercentage > 0)
        tableUnit.avgWinPercentage.push(trade.resultPercentage);
      else tableUnit.avgLossPercentage.push(trade.resultPercentage);
    });

    tableUnit.battingAvg = (
      (tableUnit.avgWinPercentage.length / tableUnit.totalTrades) *
      100
    ).toFixed(2);
    tableUnit.winLossRatio = (
      tableUnit.avgWinPercentage.length / tableUnit.avgLossPercentage.length
    ).toFixed(2);

    tableUnit.avgReturn = currentKey
      .map(trade => trade.result)
      .reduce((acc, cur) => acc + cur, 0);
    console.log(tableUnit);
  });
};
