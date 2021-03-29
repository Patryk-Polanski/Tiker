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

export const checkAgainstLeaders = function (leaders, dataArr) {
  console.log('~~~~~~~~~~~~~');
  console.log(dataArr);
  console.log(leaders);
  const newLeadersArr = [];

  Object.keys(dataArr[0]).forEach(key => {
    const data = dataArr[0][key];
    let newLeader;
    let leaderSmallestAvg;
    console.log('this iS THE data');
    console.log(data);
    if (data.trades.length < 3) return { newLeader, leaderSmallestAvg }; // check if number of trades is greater than three

    const leaderTickers = Object.keys(leaders);
    const leaderAvgReturn = [];

    // calculate avg wi percentage on the new data
    const avgWinPercent = (
      data.trades
        .map(trade => trade.winPercentage)
        .reduce((acc, num) => acc + num, 0) / data.trades.length
    ).toFixed(2);

    // if the length of the leader tickers array is bigger than 6, push the avg return of each leader to an array
    // sort the array so that the leader with the smallest avgWinPercent is first
    // Compare the smallest leader to current data
    // if the avgWinPercent of the current data is larger than the smallest leader, create a new leader
    if (leaderTickers.length >= 6) {
      leaderTickers.forEach(ticker => {
        leaderAvgReturn.push([leaders[ticker].avgWinPercent, ticker]);
      });
      leaderSmallestAvg = leaderAvgReturn.sort((a, b) => a[0] - b[0])[0];
      if (avgWinPercent > leaderSmallestAvg) newLeader = convertToLeader(data);
    }

    // if the length of the leader tickers array is smaller than six, create a new leader
    if (leaderTickers.length < 6) {
      newLeader = convertToLeader(data);
      console.log(newLeader);
    }

    console.log('this is the new leader');
    console.log(newLeader);
    newLeadersArr.push([newLeader, leaderSmallestAvg]);
  });

  return newLeadersArr;
};
