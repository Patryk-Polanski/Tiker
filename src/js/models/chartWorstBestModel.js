const worstTrades = [
  {
    id: '8gW2a5Q',
    ticker: 'ZM',
    result: 240,
    date: '3/4/21',
  },
  {
    id: 'lK2G98Q',
    ticker: 'MARA',
    result: 173,
    date: '3/5/21',
  },
  {
    id: 'K14Ji98',
    ticker: 'BMBL',
    result: 166,
    date: '13/4/21',
  },
  {
    id: 'k98Ck9s',
    ticker: 'X',
    result: 130,
    date: '26/3/21',
  },
  {
    id: '92Kji63',
    ticker: 'SNAP',
    result: 122,
    date: '1/3/21',
  },
  {
    id: '8gW2a5Q',
    ticker: 'GME',
    result: 111,
    date: '2/4/21',
  },
  {
    id: 'Sd8tr32',
    ticker: 'MSFT',
    result: 103,
    date: '5/6/21',
  },
  {
    id: 'pa52Qs4',
    ticker: 'ROKU',
    result: 94,
    date: '16/7/21',
  },
];

const bestTrades = [
  {
    id: '8gW2a5Q',
    ticker: 'ZM',
    result: 440,
    date: '30/4/21',
  },
  {
    id: 'lK2G98Q',
    ticker: 'MARA',
    result: 373,
    date: '8/5/21',
  },
  {
    id: 'K14Ji98',
    ticker: 'BMBL',
    result: 366,
    date: '8/4/21',
  },
  {
    id: 'k98Ck9s',
    ticker: 'X',
    result: 230,
    date: '13/3/21',
  },
  {
    id: '92Kji63',
    ticker: 'SNAP',
    result: 222,
    date: '16/3/21',
  },
  {
    id: '8gW2a5Q',
    ticker: 'GME',
    result: 117,
    date: '6/4/21',
  },
  {
    id: 'Sd8tr32',
    ticker: 'MSFT',
    result: 109,
    date: '2/6/21',
  },
  {
    id: 'pa52Qs4',
    ticker: 'ROKU',
    result: 104,
    date: '18/7/21',
  },
];

export const formatWorstBestData = function (type) {
  if (type === 'worst') return ['worst', worstTrades];
  if (type === 'best') return ['best', bestTrades];
};
