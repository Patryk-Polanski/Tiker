// import { reduce } from 'core-js/core/array';
import { crunchData, reduceData } from '../helpers';

export const computeMonthlyData = function (rawData) {
  console.log(rawData);
  const formattedMonths = [];
  const keys = Object.keys(rawData);
  keys.forEach(key => {
    // console.log(rawData[key]);
    const currentKey = rawData[key];
    let tableUnit = {
      total: {
        month: key,
        monthlyReturn: [],
        totalTrades: currentKey.length,
        avgReturn: [],
        avgWinPercent: [],
        avgLossPercent: [],
        battingAvg: [],
        winLossRatio: [],
      },
      long: {
        side: 'long',
        monthlyReturn: [],
        totalTrades: 0,
        avgReturn: [],
        avgWinPercent: [],
        avgLossPercent: [],
        battingAvg: [],
        winLossRatio: [],
      },
      short: {
        side: 'short',
        monthlyReturn: [],
        totalTrades: 0,
        avgReturn: [],
        avgWinPercent: [],
        avgLossPercent: [],
        battingAvg: [],
        winLossRatio: [],
      },
    };

    currentKey.forEach(trade => {
      let currentSide;
      if (trade.side === 'long') currentSide = tableUnit.long;
      else if (trade.side === 'short') currentSide = tableUnit.short;
      currentSide.monthlyReturn.push(trade.result); // monthly return
      currentSide.totalTrades++; // total trades
      currentSide.avgReturn.push(trade.result); // avg Return
      // avg win and loss %
      if (trade.resultPercentage > 0)
        currentSide.avgWinPercent.push(trade.resultPercentage);
      else if (trade.resultPercentage <= 0)
        currentSide.avgLossPercent.push(trade.resultPercentage);
    });
    // batting avg %
    tableUnit.long.avgWinPercent =
      (tableUnit.long.avgWinPercent / tableUnit.long.totalTrades) * 100;
    tableUnit.short.avgWinPercent =
      (tableUnit.short.avgWinPercent / tableUnit.short.totalTrades) * 100;

    // win loss ratio %
    tableUnit.long.winLossRatio =
      (tableUnit.long.avgWinPercent.length !== 0
        ? tableUnit.long.avgLossPercent.length
        : 1) /
      (tableUnit.long.avgLossPercent.length !== 0
        ? tableUnit.long.avgLossPercent.length
        : 1);

    tableUnit.short.winLossRatio =
      (tableUnit.short.avgWinPercent.length !== 0
        ? tableUnit.short.avgLossPercent.length
        : 1) /
      (tableUnit.short.avgLossPercent.length !== 0
        ? tableUnit.short.avgLossPercent.length
        : 1);

    tableUnit.long.monthlyReturn = reduceData(tableUnit.long.avgReturn);
    tableUnit.long.avgReturn = crunchData(tableUnit.long.avgReturn);
    console.log('this is the avg win % BEFORE');
    console.log(tableUnit.long.avgWinPercent);
    tableUnit.long.avgWinPercent = crunchData(tableUnit.long.avgWinPercent);
    console.log('this is the avg win % AFTER');
    console.log(tableUnit.long.avgWinPercent);
    tableUnit.long.avgLossPercent = crunchData(tableUnit.long.avgLossPercent);

    tableUnit.short.monthlyReturn = reduceData(tableUnit.short.avgReturn);
    tableUnit.short.avgReturn = crunchData(tableUnit.short.avgReturn);
    tableUnit.short.avgWinPercent = crunchData(tableUnit.short.avgWinPercent);
    tableUnit.short.avgLossPercent = crunchData(tableUnit.short.avgLossPercent);

    console.log(tableUnit);
  });
};
