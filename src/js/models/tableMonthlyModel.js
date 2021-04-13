// import { reduce } from 'core-js/core/array';
import { crunchData, reduceData, filterNonStrings } from '../helpers';

const createPlaceholderObj = function (key) {
  return {
    dateLong: '',
    total: {
      month: key,
      monthlyReturn: [0],
      totalTrades: 0,
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
      profitableNumber: 0,
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
      profitableNumber: 0,
      battingAvg: [],
      winLossRatio: [],
    },
  };
};

const calcBattingAvg = function (profitable, total) {
  if (!profitable) profitable = 0;
  if (!total) total = 1;
  return Math.round((profitable / total) * 100);
};

const calcWinLossRatio = function (profitable, total) {
  if (!profitable) profitable = 0;
  if (!total) total = 1;
  if (profitable === total) total++;
  return (profitable / total).toFixed(2);
};

export const computeMonthlyData = function (rawData) {
  const formattedMonths = {};
  const keys = Object.keys(rawData);

  keys.forEach(key => {
    const currentMonth = rawData[key];
    let tableUnit = createPlaceholderObj(key);

    tableUnit.dateLong = currentMonth[0].dateLong;

    // grab all the trades from that month and flatten into one array
    const flattenedDays = currentMonth.map(day => day.trades).flat();
    tableUnit.total.totalTrades = flattenedDays.length;

    flattenedDays.forEach(trade => {
      let currentSide; // decides which object to add data to
      if (trade.side === 'long') currentSide = tableUnit.long;
      else if (trade.side === 'short') currentSide = tableUnit.short;
      currentSide.monthlyReturn.push(trade.returnCash); // monthly return
      currentSide.totalTrades++; // total trades
      currentSide.avgReturn.push(trade.returnCash); // avg Return
      // avg win and loss %
      if (trade.returnPercent >= 0) {
        currentSide.avgWinPercent.push(trade.returnPercent);
        tableUnit.total.profitableNumber++;
        currentSide.profitableNumber++;
      } else if (trade.returnPercent <= 0) {
        currentSide.avgLossPercent.push(trade.returnPercent);
      }
    });

    // crunch the array data into single numbers
    tableUnit.long.monthlyReturn = reduceData(tableUnit.long.monthlyReturn);
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

    // batting avg %
    tableUnit.long.battingAvg = calcBattingAvg(
      tableUnit.long.profitableNumber,
      tableUnit.long.totalTrades
    );

    tableUnit.short.battingAvg = calcBattingAvg(
      tableUnit.short.profitableNumber,
      tableUnit.short.totalTrades
    );

    tableUnit.total.battingAvg = calcBattingAvg(
      tableUnit.total.profitableNumber,
      tableUnit.total.totalTrades
    );

    // win loss ratio
    tableUnit.long.winLossRatio = calcWinLossRatio(
      tableUnit.long.profitableNumber,
      tableUnit.long.totalTrades
    );

    tableUnit.short.winLossRatio = calcWinLossRatio(
      tableUnit.short.profitableNumber,
      tableUnit.short.totalTrades
    );

    tableUnit.total.winLossRatio = calcWinLossRatio(
      tableUnit.total.profitableNumber,
      tableUnit.total.totalTrades
    );

    formattedMonths[key] = tableUnit;
  });
  return formattedMonths;
};
