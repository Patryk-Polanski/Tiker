const convertToLeader = function (data) {
  const ticker = data.ticker;
  const formattedLeader = {
    totalTrades: data.trades.length,
    profitable: 0,
    totalProfit: 0,
    totalShares: 0,
    avgReturn: 0,
    avgWinPercent: 0,
    battingAvgPercent: 0,
    winLossRatio: 0,
  };

  const current = formattedLeader;

  const tradeResults = data.trades.map(trade => trade.result);
  const totalProfit = tradeResults.reduce((acc, num) => acc + num, 0);
  const totalShares = data.trades
    .map(trade => trade.shares)
    .reduce((acc, num) => acc + num, 0);
  const winPercentTrades = data.trades
    .map(trade => trade.winPercentage)
    .filter(percent => percent >= 0);

  current.totalProfit = totalProfit;
  current.totalShares = totalShares;
  current.avgReturn = +(totalProfit / current.totalTrades).toFixed(0);
  current.avgWinPercent = (
    winPercentTrades.reduce((acc, num) => acc + num) / winPercentTrades.length
  ).toFixed(2);
  current.profitable = winPercentTrades.length;
  current.battingAvgPercent = +(
    (current.profitable / current.totalTrades) *
    100
  ).toFixed(2);
  current.winLossRatio = +(
    current.profitable /
    (current.totalTrades - current.profitable)
  ).toFixed(2);
  return formattedLeader;
};

export const computeProfitableData = function (tickerData) {
  console.log('this is the ticker data');
  console.log(tickerData);
  const sortedTickers = Object.values(tickerData).sort(
    (a, b) => b.avgReturn - a.avgReturn
  );
  const topSix = sortedTickers.splice(0, 6);
  console.log(topSix);

  let leadersArray = {};
  topSix.forEach(leader => {
    if (leader.avgReturn > 0) {
      const leaderFormat = convertToLeader(leader);
      leadersArray[leader.ticker] = leaderFormat;
    }
  });

  console.log('this is the leaders array');
  console.log(leadersArray);
  return leadersArray;
};
