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

  const tradeResults = data.trades.map(trade => trade.returnCash);
  const totalProfit = tradeResults.reduce((acc, num) => acc + num, 0);
  const totalShares = data.trades
    .map(trade => trade.shares)
    .reduce((acc, num) => acc + num, 0);
  const winPercentTrades = data.trades
    .map(trade => trade.returnPercent)
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
  if (!isFinite(current.winLossRatio)) current.winLossRatio = 1;
  return formattedLeader;
};

export const computeProfitableData = function (tickerData) {
  const sortedTickers = Object.values(tickerData).sort(
    (a, b) => a.avgReturn - b.avgReturn
  );

  const topSix = sortedTickers
    .filter(ticker => ticker.trades.length > 2)
    .splice(0, 7);
  console.log(topSix);

  let leadersArray = {};
  topSix.forEach(leader => {
    if (leader.avgReturn > 0) {
      const leaderFormat = convertToLeader(leader);
      leadersArray[leader.ticker] = leaderFormat;
    }
  });
  return leadersArray;
};
