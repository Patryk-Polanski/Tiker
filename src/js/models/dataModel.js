import { stringifyNum } from './../helpers';

const user = {
  capital: 7000,
  overall: {
    total: 0,
    proportions: [
      { side: 'long', total: 0 },
      { side: 'short', total: 0 },
    ],
  },
  streaks: {
    wins: {
      trades: [
        //   {
        //     id: 1150,
        //     ticker: 'NFLX',
        //     date: '14/06/21',
        //     returnCash: 253,
        //   },
        //   {
        //     id: 115,
        //     ticker: 'VREZ',
        //     date: '15/06/21',
        //     returnCash: 312,
        //   },
      ],
    },
    losses: {
      trades: [
        //   {
        //     id: 'liJ56D3',
        //     ticker: 'AMZN',
        //     date: '12/08/21',
        //     returnCash: -90,
        //   },
        //   {
        //     id: 'Y58P1M',
        //     ticker: 'X',
        //     date: '21/07/21',
        //     returnCash: -112,
        //   },
      ],
    },
    current: {
      trades: [
        // {
        //   id: 'ZYRwa5z',
        //   ticker: 'NFLX',
        //   date: '14/06/21',
        //   returnCash: 253,
        // },
      ],
    },
  },
  worstTrades: [
    // {
    //   id: 300,
    //   ticker: 'NFLX',
    //   date: '14/06/21',
    //   returnCash: -234,
    // },
    // {
    //   id: 250,
    //   ticker: 'BMBL',
    //   date: '15/06/21',
    //   returnCash: -151,
    // },
    // {
    //   id: 115,
    //   ticker: 'GME',
    //   date: '7/7/21',
    //   returnCash: -180,
    // },
  ],
  bestTrades: [
    // {
    //   id: 600,
    //   ticker: 'NFLX',
    //   date: '14/06/21',
    //   returnCash: 253,
    // },
    // {
    //   id: 900,
    //   ticker: 'BMBL',
    //   date: '15/06/21',
    //   returnCash: 312,
    // },
    // {
    //   id: 450,
    //   ticker: 'SNAP',
    //   date: '13/08/21',
    //   returnCash: 187,
    // },
  ],
  tickers: {
    // AAL: {
    //   ticker: 'AAL',
    //   avgReturn: 0.58,
    //   trades: [
    //     {
    //       id: '7Ft7s4w',
    //       shares: 60,
    //       result: 121,
    //       winPercentage: 1.44,
    //     },
    //     {
    //       id: 'p8Hi52N',
    //       shares: 72,
    //       result: 118,
    //       winPercentage: 1.32,
    //     },
    //     {
    //       id: 'Jk6sDew',
    //       shares: 70,
    //       result: -82,
    //       winPercentage: -1,
    //     },
    //   ],
    // },
    // AAPL: {
    //   ticker: 'AAPL',
    //   avgReturn: 0.59,
    //   trades: [
    //     {
    //       id: 'QHnv65t',
    //       shares: 40,
    //       result: 175,
    //       winPercentage: 1.54,
    //     },
    //     {
    //       id: 'kG24s8i',
    //       shares: 50,
    //       result: 125,
    //       winPercentage: 1.23,
    //     },
    //     {
    //       id: 'Vz9qA1k',
    //       shares: 42,
    //       result: -102,
    //       winPercentage: -1.1,
    //     },
    //   ],
    // },
  },
  calendarData: {
    // jul21: [
    //   {
    //     dateLong: 'Mon Mar 06 2021 23:14:58 GMT+0000 (Greenwich Mean Time)',
    //     dateShort: '6/3/21',
    //     trades: [
    //       { id: 730, side: 'short', returnCash: -90, returnPercent: -0.9 },
    //       { id: 820, side: 'long', returnCash: 120, returnPercent: 1.6 },
    //     ],
    //   },
    //   {
    //     dateLong: 'Mon Mar 04 2021 23:14:58 GMT+0000 (Greenwich Mean Time)',
    //     dateShort: '4/3/21',
    //     trades: [
    //       { id: 2140, side: 'short', returnCash: 100, returnPercent: 1.3 },
    //       { id: 820, side: 'short', returnCash: -50, returnPercent: -0.7 },
    //     ],
    //   },
    // ],
    // aug21: [
    //   {
    //     dateLong: 'Mon Apr 02 2021 23:14:58 GMT+0000 (Greenwich Mean Time)',
    //     dateShort: '2/4/21',
    //     trades: [
    //       { id: 854, side: 'long', returnCash: 110, returnPercent: 1.3 },
    //       { id: 820, side: 'long', returnCash: -30, returnPercent: -0.45 },
    //     ],
    //   },
    //   {
    //     dateLong: 'Mon Apr 07 2021 23:14:58 GMT+0000 (Greenwich Mean Time)',
    //     dateShort: '7/4/21',
    //     trades: [
    //       { id: 652, side: 'long', returnCash: -111, returnPercent: -1.2 },
    //       { id: 1167, side: 'short', returnCash: -70, returnPercent: -1.1 },
    //     ],
    //   },
    // ],
  },
  journal: [
    // {
    //   id: 115,
    //   ticker: 'ROKU',
    //   dateShort: '28/07/21',
    //   side: 'short',
    //   sharesAmount: 100,
    //   avgEntry: 180.84,
    //   avgExit: 181.9,
    //   returnCash: 112.52,
    //   returnPercent: 1.63,
    //   tradeEntries: [
    //     [180.75, 40],
    //     [180.9, 60],
    //   ],
    //   tradeExits: [
    //     [181.15, 20],
    //     [181.42, 20],
    //     [182.69, 60],
    //   ],
    //   body:
    //     'Commodo ullamcorper a lacus vestibulum sed. Non odio euismod lacinia at quis risus. Ultrices tincidunt arcu non sodales neque sodales. Sodales neque sodales ut etiam sit amet. Viverra orci sagittis eu volutpat. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Ultrices in iaculis nunc sed augue lacus viverra.',
    // },
    // {
    //   id: 11500,
    //   ticker: 'RIOT',
    //   dateShort: '29/07/21',
    //   side: 'long',
    //   sharesAmount: 100,
    //   avgEntry: 180.84,
    //   avgExit: 181.9,
    //   returnCash: 112.52,
    //   returnPercent: 1.63,
    //   tradeEntries: [
    //     [180.75, 40],
    //     [180.9, 60],
    //   ],
    //   tradeExits: [
    //     [181.15, 20],
    //     [181.42, 20],
    //     [182.69, 60],
    //   ],
    //   body:
    //     'Commodo ullamcorper a lacus vestibulum sed. Non odio euismod lacinia at quis risus. Ultrices tincidunt arcu non sodales neque sodales. Sodales neque sodales ut etiam sit amet. Viverra orci sagittis eu volutpat. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Ultrices in iaculis nunc sed augue lacus viverra.',
    // },
    // {
    //   id: 1150,
    //   ticker: 'MSFT',
    //   dateShort: '30/07/21',
    //   side: 'short',
    //   sharesAmount: 110,
    //   avgEntry: 180.84,
    //   avgExit: 181.9,
    //   returnCash: 112.52,
    //   returnPercent: 1.63,
    //   tradeEntries: [
    //     [180.75, 50],
    //     [180.9, 60],
    //   ],
    //   tradeExits: [
    //     [181.15, 20],
    //     [181.42, 20],
    //     [182.69, 70],
    //   ],
    //   body:
    //     'In hac habitasse platea dictumst. Diam donec adipiscing tristique risus. Velit scelerisque in dictum non consectetur. Vel pretium lectus quam id leo in vitae. Urna porttitor rhoncus dolor purus. Ultrices gravida dictum fusce ut placerat. Vel quam elementum pulvinar etiam non quam lacus suspendisse. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Luctus accumsan tortor posuere ac ut consequat.',
    // },
  ],
  dummyJournal: [
    {
      id: '',
      ticker: '',
      dateShort: '',
      side: '',
      sharesAmount: '',
      avgEntry: '',
      avgExit: '',
      returnCash: '',
      returnPercent: '',
      tradeEntries: [['', '']],
      tradeExits: [['', '']],
      body: '',
    },
  ],
};

console.log(user);

const sortJournal = data => data.sort((a, b) => a.id - b.id);

const addToOverall = function (newEntry, newEntryIndex, previousSide) {
  if (newEntryIndex === -1) user.overall.total++;

  if (previousSide === 'short' && newEntry.side === 'long') {
    user.overall.proportions[0].total++;
    user.overall.proportions[1].total--;
    return;
  }

  if (previousSide === 'long' && newEntry.side === 'short') {
    user.overall.proportions[0].total--;
    user.overall.proportions[1].total++;
    return;
  }

  if (newEntry.side === 'long') {
    user.overall.proportions[0].total++;
  }

  if (newEntry.side === 'short') {
    user.overall.proportions[1].total++;
  }
};

const compareToStreaks = function (newEntry) {
  const streakObj = {
    id: newEntry.id,
    ticker: newEntry.ticker,
    date: newEntry.dateShort,
    returnCash: newEntry.returnCash,
  };

  // losing streak - checks whether the entry exists in the losing streak
  const indexInLosses = user.streaks.losses.trades
    ? user.streaks.losses.trades.map(loss => loss.id).indexOf(newEntry.id)
    : -1;

  // if the index exists and the new entry's cash return is smaller than zero, overwrite the index
  if (indexInLosses !== -1 && newEntry.returnCash < 0) {
    user.streaks.losses.trades[indexInLosses] = streakObj;
  }

  // if the index exists and the new entry's cash return is bigger than zero, remove the entry from losing streak
  if (indexInLosses !== -1 && newEntry.returnCash > -1) {
    user.streaks.losses.trades.splice(indexInLosses, 1);
  }

  // winning streak - checks whether the entry exists in the winning streak
  const indexInWins = user.streaks.wins.trades
    ? user.streaks.wins.trades.map(win => win.id).indexOf(newEntry.id)
    : -1;

  // if the index exists and the new entry's cash return is bigger than zero, overwrite the index
  if (indexInWins !== -1 && newEntry.returnCash > -1) {
    user.streaks.wins.trades[indexInWins] = streakObj;
  }

  // if the index exists and the new entry's cash return is smaller than zero, remove the entry from winning streak
  if (indexInWins !== -1 && newEntry.returnCash < 0) {
    user.streaks.wins.trades.splice(indexInWins, 1);
  }

  // current streak - checks whether the entry exists in the streak
  const indexInCurrent = user.streaks.current.trades
    ? user.streaks.current.trades.map(cur => cur.id).indexOf(newEntry.id)
    : -1;

  if (indexInCurrent !== -1) {
    const currentStreakLength = user.streaks.current.trades.length;
    // if the current streak is 1, overwrite the index as the new Entry already exists in the array
    if (currentStreakLength === 1) {
      user.streaks.current.trades[indexInCurrent] = streakObj;
      return;
    }
    // checks if new Entry's cash return is positive and the previous or next element's cash return is also positive
    // if this is the case, overwrite the index as the new Entry already exists in the array
    if (
      newEntry.returnCash > -1 &&
      (user.streaks.current.trades[indexInCurrent - 1].returnCash > -1 ||
        user.streaks.current.trades[indexInCurrent + 1].returnCash > -1)
    ) {
      user.streaks.current.trades[indexInCurrent] = streakObj;
      return;
    }

    // checks if new Entry's cash return is positive and the previous or next element's cash return is negative
    // if this is the case, the streak is broken, so remove the existing new entry index from the array
    if (
      newEntry.returnCash > -1 &&
      (user.streaks.current.trades[indexInCurrent - 1].returnCash < 0 ||
        user.streaks.current.trades[indexInCurrent + 1].returnCash < 0)
    ) {
      user.streaks.current.trades.splice(indexInCurrent, 1);
      return;
    }

    // checks if new Entry's cash return is negative and the previous or next element's cash return is also negative
    // if this is the case, overwrite the index as the new Entry already exists in the array
    if (
      newEntry.returnCash < 0 &&
      (user.streaks.current.trades[indexInCurrent - 1].returnCash < 0 ||
        user.streaks.current.trades[indexInCurrent + 1].returnCash < 0)
    ) {
      user.streaks.current.trades[indexInCurrent] = streakObj;
      return;
    }

    // checks if new Entry's cash return is negative and the previous or next element's cash return is positive
    // if this is the case, the streak is broken, so remove the existing new entry index from the array
    if (
      newEntry.returnCash < 0 &&
      (user.streaks.current.trades[indexInCurrent - 1].returnCash > -1 ||
        user.streaks.current.trades[indexInCurrent + 1].returnCash > -1)
    ) {
      user.streaks.current.trades.splice(indexInCurrent, 1);
      return;
    }
  }

  // check new entry against current streak
  // the existing entries and the new entry are both positive/negative, so push to the array
  if (
    user.streaks.current.trades[0] &&
    newEntry.returnCash > -1 &&
    user.streaks.current.trades[0].returnCash > -1
  ) {
    user.streaks.current.trades.push(streakObj);
  } else if (
    // the existing entriees and the new entry are not both positive/negative, so override the array
    user.streaks.current.trades[0] &&
    newEntry.returnCash > -1 &&
    user.streaks.current.trades[0].returnCash < 0
  ) {
    user.streaks.current.trades = [streakObj];
  }

  // the existing entries and the new entry are both positive/negative, so push to the array
  if (
    user.streaks.current.trades[0] &&
    newEntry.returnCash < 0 &&
    user.streaks.current.trades[0].returnCash < 0
  ) {
    user.streaks.current.trades.push(streakObj);
  } else if (
    // the existing entriees and the new entry are not both positive/negative, so override the array
    user.streaks.current.trades[0] &&
    newEntry.returnCash < 0 &&
    user.streaks.current.trades[0].returnCash > -1
  ) {
    user.streaks.current.trades = [streakObj];
  }

  // compare the current streak to winning and losing streak
  if (user.streaks.current.trades.length > 0) {
    if (
      // checks if the entries in the current streak are positive and if the current streak is longer than the winning streak
      // if this is the case, the current streak becomes the new winning streak
      user.streaks.current.trades[0].returnCash > -1 &&
      user.streaks.current.trades.length >= user.streaks.wins.trades.length
    ) {
      user.streaks.wins.trades = user.streaks.current.trades;
      return;
    }

    if (
      // checks if the entries in the current streak are negative and if the current streak is longer than the losing streak
      // if this is the case, the current streak becomes the new losing streak
      user.streaks.current.trades[0].returnCash < 0 &&
      user.streaks.current.trades.length >= user.streaks.losses.trades.length
    ) {
      user.streaks.losses.trades = user.streaks.current.trades;
      return;
    }
  } else {
    // if the current streak is empty, push the entry
    user.streaks.current.trades.push(streakObj);
  }
};

const compareToWorstBest = function (newEntry) {
  // best comparison
  if (newEntry.returnCash > -1) {
    const indexInBest = user.bestTrades
      .map(trade => trade.id)
      .indexOf(newEntry.id);

    if (indexInBest !== -1) {
      user.bestTrades[indexInBest] = newEntry;
      user.bestTrades = user.bestTrades.sort(
        (a, b) => b.returnCash - a.returnCash
      );
      return;
    }

    user.bestTrades.push(newEntry);
    user.bestTrades = user.bestTrades.sort(
      (a, b) => b.returnCash - a.returnCash
    );

    if (user.bestTrades.length > 16) user.bestTrades.pop();
  }
  // worst comparison
  if (newEntry.returnCash < 0) {
    const indexInWorst = user.worstTrades
      .map(trade => trade.id)
      .indexOf(newEntry.id);

    if (indexInWorst !== -1) {
      user.worstTrades[indexInWorst] = newEntry;
      user.worstTrades = user.worstTrades.sort(
        (a, b) => a.returnCash - b.returnCash
      );
      return;
    }

    user.worstTrades.push(newEntry);
    user.worstTrades = user.worstTrades.sort(
      (a, b) => a.returnCash - b.returnCash
    );
    if (user.worstTrades.length > 16) user.worstTrades.pop();
  }
};

const addToTickers = function (newEntry) {
  console.log(newEntry);
  let currentTicker = user.tickers[newEntry.ticker];

  // if the ticker already exists in the array
  if (currentTicker) {
    //TODO: check if the id already exists in the array

    const indexInTrades = currentTicker.trades
      .map(trade => trade.id)
      .indexOf(newEntry.id);
    console.log('}{}{}{}{}{}{}{}{');
    console.log(indexInTrades);

    if (indexInTrades !== -1) {
      currentTicker.trades[indexInTrades] = {
        id: newEntry.id,
        shares: newEntry.sharesAmount,
        returnCash: newEntry.returnCash,
        returnPercent: newEntry.returnPercent,
      };
    }

    if (indexInTrades === -1) {
      currentTicker.trades.push({
        id: newEntry.id,
        shares: newEntry.sharesAmount,
        returnCash: newEntry.returnCash,
        returnPercent: newEntry.returnPercent,
      });
    }

    currentTicker.avgReturn = +(
      currentTicker.trades
        .map(trade => trade.returnCash)
        .reduce((acc, num) => acc + num, 0) / currentTicker.trades.length
    ).toFixed(2);
  }

  // if the ticker is new
  if (!currentTicker) {
    user.tickers[newEntry.ticker] = {
      ticker: newEntry.ticker,
      avgReturn: newEntry.returnCash,
      trades: [
        {
          id: newEntry.id,
          shares: newEntry.sharesAmount,
          returnCash: newEntry.returnCash,
          returnPercent: newEntry.returnPercent,
        },
      ],
    };
  }

  console.log(user);
};

const compareStatistics = function (
  newEntry,
  newEntryIndex,
  previousSide = ''
) {
  addToOverall(newEntry, newEntryIndex, previousSide);
  compareToStreaks(newEntry);
  compareToWorstBest(newEntry);
  addToTickers(newEntry);
};

export const passData = function (field) {
  return user[field];
};

export const passNestedData = function (field, field2) {
  if (field2) {
    return { [field2]: user[field][field2] };
  } else {
    return user[field];
  }
};

export const updateCapital = function (amount, action) {
  if (action === 'minus') user.capital -= amount;
  if (action === 'plus') user.capital += amount;
  if (user.capital < 0) user.capital = 0;
  return [action, stringifyNum(amount), stringifyNum(user.capital)];
};

export const updateCalendarData = function (obj) {
  Object.keys(obj).forEach(key => {
    user.calendarData[key] = obj[key];
  });
  return user.calendarData;
};

export const updateJournalData = function (newEntry) {
  const newEntryIndex = user.journal.map(e => e.id).indexOf(newEntry.id);
  let previousSide;
  // if the id already exists, meaning the journal entry has been updated
  if (newEntryIndex > -1) {
    updateCapital(user.journal[newEntryIndex].returnCash, 'minus');
    previousSide = user.journal[newEntryIndex].side;
    user.journal[newEntryIndex] = newEntry;
    updateCapital(newEntry.returnCash, 'plus');
  }

  // newEntryIndex is -1, meaning the jounal entry is new
  if (newEntryIndex === -1) {
    updateCapital(newEntry.returnCash, 'plus');
    user.journal.push(newEntry);
    // sort the data
    sortJournal(user.journal);
  }

  compareStatistics(newEntry, newEntryIndex, previousSide);

  return [user.capital];
};

export const findJournalEntry = function (id) {
  if (!id) return;
  return user.journal.filter(entry => entry.id === id);
  s;
};
