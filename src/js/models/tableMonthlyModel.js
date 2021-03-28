// import { reduce } from 'core-js/core/array';
import { crunchData, reduceData, filterNonStrings } from '../helpers';

export const computeMonthlyData = function (rawData) {
  console.log(rawData);
  const formattedMonths = {};
  const keys = Object.keys(rawData);
  keys.forEach(key => {
    // console.log(rawData[key]);
    const currentKey = rawData[key];
    let tableUnit = {
      total: {
        month: key,
        monthlyReturn: [0],
        totalTrades: currentKey.length,
        avgReturn: [],
        avgWinPercent: [],
        avgLossPercent: [],
        profitableNumber: 0,
        battingAvg: 0,
        winLossRatio: [],
      },
      long: {
        side: 'long',
        monthlyReturn: [0],
        totalTrades: 0,
        avgReturn: [],
        avgWinPercent: [],
        avgLossPercent: [],
        battingAvg: [],
        winLossRatio: [],
      },
      short: {
        side: 'short',
        monthlyReturn: [0],
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
      if (trade.resultPercentage > 0) {
        currentSide.avgWinPercent.push(trade.resultPercentage);
        tableUnit.total.profitableNumber++;
      } else if (trade.resultPercentage <= 0) {
        currentSide.avgLossPercent.push(trade.resultPercentage);
      }
    });

    // batting avg %
    tableUnit.long.battingAvg =
      (tableUnit.long.avgWinPercent.length /
        (tableUnit.long.totalTrades !== 0 ? tableUnit.long.totalTrades : 1)) *
      100;

    tableUnit.short.battingAvg =
      (tableUnit.short.avgWinPercent.length /
        (tableUnit.short.totalTrades !== 0 ? tableUnit.short.totalTrades : 1)) *
      100;

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
    tableUnit.long.avgWinPercent = crunchData(tableUnit.long.avgWinPercent);
    tableUnit.long.avgLossPercent = crunchData(tableUnit.long.avgLossPercent);

    tableUnit.short.monthlyReturn = reduceData(tableUnit.short.avgReturn);
    tableUnit.short.avgReturn = crunchData(tableUnit.short.avgReturn);
    tableUnit.short.avgWinPercent = crunchData(tableUnit.short.avgWinPercent);
    tableUnit.short.avgLossPercent = crunchData(tableUnit.short.avgLossPercent);

    tableUnit.total.monthlyReturn = reduceData([
      tableUnit.long.monthlyReturn,
      tableUnit.short.monthlyReturn,
    ]);

    tableUnit.total.avgReturn = crunchData(
      filterNonStrings([tableUnit.long.avgReturn, tableUnit.short.avgReturn])
    );

    tableUnit.total.avgWinPercent = crunchData(
      filterNonStrings([
        tableUnit.long.avgWinPercent,
        tableUnit.short.avgWinPercent,
      ])
    );

    tableUnit.total.avgLossPercent = crunchData(
      filterNonStrings([
        tableUnit.long.avgLossPercent,
        tableUnit.short.avgLossPercent,
      ])
    );

    tableUnit.total.battingAvg = (
      (tableUnit.total.profitableNumber / tableUnit.total.totalTrades) *
      100
    ).toFixed(2);

    tableUnit.total.winLossRatio = (
      tableUnit.total.profitableNumber /
      (tableUnit.total.totalTrades - tableUnit.total.profitableNumber)
    ).toFixed(2);

    // console.log(tableUnit);
    formattedMonths[key] = tableUnit;
  });
  return formattedMonths;
};
