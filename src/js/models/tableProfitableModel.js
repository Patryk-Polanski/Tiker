const convertToLeader = function (data) {
  const ticker = data.ticker;
  const formattedLeader = {
    [ticker]: {
      totalTrades: data.trades.length,
      profitable: 0,
      totalProfit: 0,
      totalShares: 0,
      avgReturn: 0,
      avgWinPercent: 0,
      battingAvgPercent: 0,
      winLossRatio: 0,
    },
  };

  const current = formattedLeader[ticker];

  const tradeResults = data.trades.map(trade => trade.result);
  const totalProfit = tradeResults.reduce((acc, num) => acc + num, 0);
  const totalShares = data.trades
    .map(trade => trade.shares)
    .reduce((acc, num) => acc + num, 0);
  const winPercentTrades = data.trades
    .map(trade => trade.winPercentage)
    .filter(percent => percent >= 0);
  console.log(winPercentTrades);

  current.totalProfit = totalProfit;
  current.totalShares = totalShares;
  current.avgReturn = +(totalProfit / current.totalTrades).toFixed(0);
  current.avgWinPercent =
    winPercentTrades.reduce((acc, num) => acc + num) / winPercentTrades.length;
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

export const checkAgainstLeaders = function (leaders, data) {
  let newLeader;

  const avgWinPercent = (
    data.trades
      .map(trade => trade.winPercentage)
      .reduce((acc, num) => acc + num, 0) / data.trades.length
  ).toFixed(2);
  console.log(avgWinPercent);

  const leaderTickers = Object.keys(leaders);
  const leaderAvgReturn = [];
  let leaderSmallestAvg;

  if (leaderTickers.length > 5) {
    leaderTickers.forEach(ticker => {
      leaderAvgReturn.push(leaders[ticker].avgWinPercent);
    });
    leaderSmallestAvg = Math.min(leaderAvgReturn);
    if (avgWinPercent > leaderSmallestAvg) newLeader = convertToLeader(data);
  }

  if (leaderTickers.length < 6) {
    newLeader = convertToLeader(data);
    console.log(newLeader);
  }

  return newLeader;
};
