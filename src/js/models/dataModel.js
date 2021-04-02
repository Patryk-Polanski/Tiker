import { stringifyNum } from './../helpers';

const user = {
  capital: 7000,
  overall: {
    total: 723,
    proportions: [
      { side: 'long', total: 395 },
      { side: 'short', total: 328 },
    ],
  },
  streaks: {
    wins: {
      trades: [
        {
          ID: 'ZYRwa5z',
          ticker: 'NFLX',
          date: '14/06/21',
          profit: 253,
        },
        {
          ID: 'Y58P1M',
          ticker: 'BMBL',
          date: '15/06/21',
          profit: 312,
        },
      ],
    },
    losses: {
      trades: [
        {
          ID: 'liJ56D3',
          ticker: 'AMZN',
          date: '12/08/21',
          loss: -90,
        },
        {
          ID: 'Y58P1M',
          ticker: 'X',
          date: '21/07/21',
          loss: -112,
        },
      ],
    },
    current: {
      trades: [
        {
          ID: 'ZYRwa5z',
          ticker: 'NFLX',
          date: '14/06/21',
          profit: 253,
        },
      ],
    },
  },
  worstTrades: [
    {
      ID: 'ZYRwa5z',
      ticker: 'NFLX',
      date: '14/06/21',
      loss: 253,
    },
    {
      ID: 'Y58P1M1',
      ticker: 'BMBL',
      date: '15/06/21',
      loss: 312,
    },
  ],
  bestTrades: [
    {
      ID: 'ZYRwa5z',
      ticker: 'NFLX',
      date: '14/06/21',
      loss: 253,
    },
    {
      ID: 'Y58P1M1',
      ticker: 'BMBL',
      date: '15/06/21',
      loss: 312,
    },
  ],
  tickers: {
    AAL: {
      ticker: 'AAL',
      profitable: 0,
      trades: [
        {
          ID: '7Ft7s4w',
          shares: 60,
          result: 121,
          winPercentage: 1.44,
        },
        {
          ID: 'p8Hi52N',
          shares: 72,
          result: 118,
          winPercentage: 1.32,
        },
        {
          ID: 'Jk6sDew',
          shares: 70,
          result: -82,
          winPercentage: -1,
        },
      ],
    },
    AAPL: {
      ticker: 'AAPL',
      profitable: 0,
      trades: [
        {
          ID: 'QHnv65t',
          shares: 40,
          result: 175,
          winPercentage: 1.54,
        },
        {
          ID: 'kG24s8i',
          shares: 50,
          result: 125,
          winPercentage: 1.23,
        },
        {
          ID: 'Vz9qA1k',
          shares: 42,
          result: -102,
          winPercentage: -1.1,
        },
      ],
    },
  },
  profitable: {
    // BMBL: {
    //   totalProfit: 2780,
    //   totalShares: 312,
    //   avgReturn: 134,
    //   avgWinPercentage: 1.56,
    //   battingAvgPercentage: 64,
    //   winLossRatio: 3.11,
    // },
    // AAPL: {
    //   totalProfit: 2780,
    //   totalShares: 312,
    //   avgReturn: 134,
    //   avgWinPercentage: 1.56,
    //   battingAvgPercentage: 64,
    //   winLossRatio: 3.11,
    // },
  },
  monthlyData: {},
  calendarData: {
    jul21: [
      {
        ID: 'Kr92fYl',
        side: 'short',
        result: -90,
        resultPercentage: -0.9,
        date: '02/07/21',
      },
      {
        ID: 'P9gHt21',
        side: 'long',
        result: -86,
        resultPercentage: -0.84,
        date: '07/07/21',
      },
      {
        ID: 'K88spRl',
        side: 'long',
        result: 146,
        resultPercentage: 1.46,
        date: '15/07/21',
      },
      {
        ID: 'Mn3z2pl',
        side: 'short',
        result: 67,
        resultPercentage: 0.63,
        date: '20/07/21',
      },
    ],
    jun21: [
      {
        ID: 'OL4stW4',
        side: 'long',
        result: 240,
        resultPercentage: 1.83,
        date: '04/06/21',
      },
      {
        ID: 'SLX8f6s',
        side: 'long',
        result: -130,
        resultPercentage: -1.92,
        date: '13/06/21',
      },
      {
        ID: 'SLX8f6a',
        side: 'long',
        result: -130,
        resultPercentage: -1.92,
        date: '19/06/21',
      },
      {
        ID: 'Qr4fG61',
        side: 'short',
        result: 106,
        resultPercentage: 1.02,
        date: '24/06/21',
      },
    ],
    may21: [
      {
        ID: 'HR6q2pf',
        side: 'short',
        result: -160,
        resultPercentage: -1.42,
        date: '07/05/21',
      },
      {
        ID: 'Gq9pd4H',
        side: 'short',
        result: -80,
        resultPercentage: -0.8,
        date: '11/05/21',
      },
      {
        ID: 'Bd99sd1',
        side: 'long',
        result: 213,
        resultPercentage: 2.2,
        date: '19/05/21',
      },
      {
        ID: 'lE59t6A',
        side: 'short',
        result: 110,
        resultPercentage: 1.1,
        date: '25/05/21',
      },
    ],
  },
  journal: [
    {
      ID: 'Hf5t3q1',
      ticker: 'ROKU',
      date: '28/07/21',
      side: 'short',
      entries: [
        [180.75, 40],
        [180.9, 60],
      ],
      exits: [
        [181.15, 20],
        [181.42, 20],
        [182.69, 60],
      ],
      body:
        'Commodo ullamcorper a lacus vestibulum sed. Non odio euismod lacinia at quis risus. Ultrices tincidunt arcu non sodales neque sodales. Sodales neque sodales ut etiam sit amet. Viverra orci sagittis eu volutpat. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Ultrices in iaculis nunc sed augue lacus viverra.',
    },
    {
      ID: 'nC4s97Q',
      ticker: 'RIOT',
      date: '28/07/21',
      side: 'short',
      entries: [
        [22.31, 80],
        [22.41, 60],
      ],
      exits: [
        [24.11, 40],
        [24.5, 50],
        [24.77, 50],
      ],
      body:
        'Quis varius quam quisque id diam vel quam. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et ultrices neque ornare aenean euismod elementum nisi quis. Amet luctus venenatis lectus magna fringilla urna porttitor. In est ante in nibh mauris cursus mattis.',
    },
  ],
};

console.log(user);

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
  action = Math.abs(action);
  if (action === 'minus') user.capital -= amount;
  if (action === 'plus') user.capital += amount;
  if (user.capital < 0) user.capital = 0;
  return [action, stringifyNum(amount), stringifyNum(user.capital)];
};

export const updateMonthlyData = function (obj) {
  Object.keys(obj).forEach(key => {
    user.monthlyData[key] = obj[key];
  });
  return user.monthlyData;
};

export const updateProfitableData = function (items) {
  items.forEach(item => {
    const [newLeader, oldLeader] = item;
    if (oldLeader) delete user.profitable[oldLeader];
    if (newLeader) {
      const getTicker = Object.keys(newLeader)[0];
      user.profitable[getTicker] = newLeader[getTicker];
    }
  });
  return user.profitable;
};
