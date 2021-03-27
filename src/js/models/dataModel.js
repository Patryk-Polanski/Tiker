const user = {
  capital: 7000,
  overall: {
    total: 723,
    long: 395,
    short: 328,
  },
  streak: {
    wins: {
      combo: 2,
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
      combo: 2,
      trades: [
        {
          ID: 'ZYRwa5z',
          ticker: 'NFLX',
          date: '14/06/21',
          loss: 253,
        },
        {
          ID: 'Y58P1M',
          ticker: 'BMBL',
          date: '15/06/21',
          loss: 312,
        },
      ],
    },
    current: {
      combo: 1,
      type: 'wins',
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
      trades: [
        {
          ID: '7Ft7s4w',
          shares: 60,
          result: 121,
          winPercentage: 1.44,
        },
      ],
    },
    AAPL: {
      trades: [
        {
          ID: 'QHnv65t',
          shares: 40,
          result: 175,
          winPercentage: 1.54,
        },
      ],
    },
  },
  profitable: {
    BMBL: {
      totalProfit: 2780,
      totalShares: 312,
      avgReturn: 134,
      avgWinPercentage: 1.56,
      battingAvgPercentage: 64,
      winLossRatio: 3.11,
    },
    AAPL: {
      totalProfit: 2780,
      totalShares: 312,
      avgReturn: 134,
      avgWinPercentage: 1.56,
      battingAvgPercentage: 64,
      winLossRatio: 3.11,
    },
  },
  monthlyData: {
    june21: [
      {
        ID: 'OL4stW4',
        side: 'long',
        result: 240,
        resultPercentage: 1.83,
        date: '16/06/21',
      },
      {
        ID: 'SLX8f6s',
        side: 'long',
        result: -130,
        resultPercentage: 1.92,
        date: '13/06/21',
      },
    ],
    may21: [
      {
        ID: 'HR6q2pf',
        side: 'short',
        result: 160,
        resultPercentage: 1.42,
        date: '27/05/21',
      },
      {
        ID: 'Gq9pd4H',
        side: 'short',
        result: -80,
        resultPercentage: -0.8,
        date: '27/05/21',
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

export const updateCapital = function (amount, action) {
  Math.abs(action);
  if (action === 'minus') user.capital -= amount;
  if (action === 'plus') user.capital += amount;
  if (user.capital < 0) user.capital = 0;
  console.log('updated global state', user);
  return [action, amount, user.capital];
};
