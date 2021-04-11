import { stringifyNum } from './../helpers';
import { MONTHS_FORMAT } from './../config';
import jsonData from '../../data.json';

let user;

const startingUserObject = {
  capital: 0,
  overall: {
    total: 0,
    proportions: [
      { side: 'long', total: 0 },
      { side: 'short', total: 0 },
    ],
  },
  streaks: {
    wins: {
      trades: [],
    },
    losses: {
      trades: [],
    },
    current: {
      trades: [],
    },
  },
  worstTrades: [],
  bestTrades: [],
  tickers: {},
  calendarData: {},
  journal: [],
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

export const fetchUserFromJSON = function () {
  user = startingUserObject;
  if (jsonData) user = jsonData;
  console.log(user);
};

export const clearUserObject = function () {
  user = startingUserObject;
  console.log('this is the cleared user object');
  console.log(user);
};

export const checkIfJournalEmpty = function () {
  if (user.journal.length < 1) return 'empty';
  if (user.journal.length > 0) return 'full';
};

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
      user.streaks.current.trades.length > user.streaks.wins.trades.length + 1
    ) {
      user.streaks.wins.trades = user.streaks.current.trades;
      return;
    }

    if (
      // checks if the entries in the current streak are negative and if the current streak is longer than the losing streak
      // if this is the case, the current streak becomes the new losing streak
      user.streaks.current.trades[0].returnCash < 0 &&
      user.streaks.current.trades.length > user.streaks.losses.trades.length + 1
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
  let currentTicker = user.tickers[newEntry.ticker];

  // if the ticker already exists in the array
  if (currentTicker) {
    const indexInTrades = currentTicker.trades
      .map(trade => trade.id)
      .indexOf(newEntry.id);

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
};

const addToCalendarData = function (newEntry) {
  const dateKey =
    MONTHS_FORMAT[new Date(newEntry.dateFull).getMonth()] +
    String(new Date(newEntry.dateFull).getFullYear()).slice(-2);
  console.log(dateKey);
  const currentKey = user.calendarData[dateKey];
  if (currentKey) {
    const entryDateIndex = currentKey
      .map(day => day.dateShort)
      .indexOf(newEntry.dateShort);
    if (entryDateIndex !== -1) {
      console.log('it is the same day');
      currentKey[entryDateIndex].trades.push({
        id: newEntry.id,
        side: newEntry.side,
        returnCash: newEntry.returnCash,
        returnPercent: newEntry.returnPercent,
        total: newEntry.total,
      });
    }
    if (entryDateIndex === -1) {
      currentKey.push({
        dateLong: newEntry.dateFull,
        dateShort: newEntry.dateShort,
        trades: [
          {
            id: newEntry.id,
            side: newEntry.side,
            returnCash: newEntry.returnCash,
            returnPercent: newEntry.returnPercent,
            total: newEntry.total,
          },
        ],
      });
    }
  }
  if (!currentKey) {
    user.calendarData[dateKey] = [
      {
        dateLong: newEntry.dateFull,
        dateShort: newEntry.dateShort,
        trades: [
          {
            id: newEntry.id,
            side: newEntry.side,
            returnCash: newEntry.returnCash,
            returnPercent: newEntry.returnPercent,
            total: newEntry.total,
          },
        ],
      },
    ];
  }
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
  addToCalendarData(newEntry);
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
  if (action === 'minus') user.capital -= Math.round(amount);
  if (action === 'plus') user.capital += Math.round(amount);
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
  if (newEntryIndex !== -1) {
    updateCapital(user.journal[newEntryIndex].returnCash, 'minus');
    newEntry.total = user.capital;
    previousSide = user.journal[newEntryIndex].side;
    user.journal[newEntryIndex] = newEntry;
    updateCapital(newEntry.returnCash, 'plus');
  }

  // newEntryIndex is -1, meaning the jounal entry is new
  if (newEntryIndex === -1) {
    updateCapital(newEntry.returnCash, 'plus');
    newEntry.total = user.capital;
    user.journal.push(newEntry);
    // sort the data
    sortJournal(user.journal);
  }

  compareStatistics(newEntry, newEntryIndex, previousSide);

  console.log('><><><><');
  console.log(user);

  return [user.capital];
};

export const findJournalEntry = function (id) {
  if (!id) return;
  return user.journal.filter(entry => entry.id === id);
  s;
};

// ZONE - deleting an entry

export const targetSelectedEntry = function (entryID) {
  // const [foundEntry] = user.journal.filter(entry => entry.id === entryID);
  const IndexInJournal = user.journal
    .map(journal => journal.id)
    .indexOf(entryID);
  const foundEntry = user.journal[IndexInJournal];

  // capital
  user.capital -= foundEntry.returnCash;

  // overall
  if (foundEntry.side === 'short') user.overall.proportions[1].total--;
  if (foundEntry.side === 'long') user.overall.proportions[0].total--;
  user.overall.total--;

  // streaks
  const indexInWinsStreak = user.streaks.wins.trades
    .map(trade => trade.id)
    .indexOf(entryID);
  if (indexInWinsStreak !== -1)
    user.streaks.wins.trades.splice(indexInWinsStreak, 1);
  const indexInLossStreak = user.streaks.losses.trades
    .map(trade => trade.id)
    .indexOf(entryID);
  if (indexInLossStreak !== -1)
    user.streaks.losses.trades.splice(indexInWinsStreak, 1);
  const indexInCurrentStreak = user.streaks.current.trades
    .map(trade => trade.id)
    .indexOf(entryID);
  if (indexInCurrentStreak !== -1)
    user.streaks.current.trades.splice(indexInCurrentStreak, 1);

  // worst and best trades
  const indexInWorst = user.worstTrades.map(trade => trade.id).indexOf(entryID);
  if (indexInWorst !== -1) user.worstTrades.splice(indexInWorst, 1);
  const indexInBest = user.bestTrades.map(trade => trade.id).indexOf(entryID);
  if (indexInBest !== -1) user.bestTrades.splice(indexInBest, 1);

  // tickers
  const indexInTickers = user.tickers[foundEntry.ticker].trades
    .map(trade => trade.id)
    .indexOf(entryID);
  if (indexInTickers !== -1)
    user.tickers[foundEntry.ticker].trades.splice(indexInTickers, 1);

  // calendar data

  const dateKey =
    MONTHS_FORMAT[new Date(foundEntry.dateLong).getMonth()] +
    String(new Date(foundEntry.dateLong).getFullYear()).slice(-2);

  const indexInCalendar = user.calendarData[dateKey]
    .map(day => day.dateShort)
    .indexOf(foundEntry.dateShort);

  if (indexInCalendar !== -1) {
    const indexInTrades = user.calendarData[dateKey][indexInCalendar].trades
      .map(trade => trade.id)
      .indexOf(entryID);
    if (indexInTrades !== -1)
      user.calendarData[dateKey][indexInCalendar].trades.splice(
        indexInTrades,
        1
      );
  }

  // journal
  user.journal.splice(IndexInJournal, 1);

  console.log('~~~~~~~~~~~~~~~~~~~~~~');
  console.log(foundEntry);
  console.log(user);
};

export const saveToLocalStorage = function () {
  localStorage.setItem('TikerData', JSON.stringify(user));
};
