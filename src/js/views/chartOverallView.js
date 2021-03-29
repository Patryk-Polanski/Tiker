let overallEls = {};

const getElements = function (obj = {}) {
  obj.pieStreakCard = document.querySelector('.js-pie-streak');
  obj.winStreakDate = obj.pieStreakCard.querySelector('.js-win-streak-date');
  obj.winStreakTotal = obj.pieStreakCard.querySelector('.js-win-streak-total');
  obj.winStreakProfit = obj.pieStreakCard.querySelector(
    '.js-win-streak-profit'
  );
  obj.lossStreakDate = obj.pieStreakCard.querySelector('.js-loss-streak-date');
  obj.lossStreakTotal = obj.pieStreakCard.querySelector(
    '.js-loss-streak-total'
  );
  obj.lossStreakProfit = obj.pieStreakCard.querySelector(
    '.js-loss-streak-profit'
  );
  console.log('PIE STREAK ELS');
  console.log(obj);
  return obj;
};

export const queryOverallEls = function () {
  overallEls = getElements();
};

export const renderStreaks = function (data) {
  console.log('STREAK DATA!');
  console.log(data);
  overallEls.winStreakTotal.textContent = data.wins.trades.length;
  overallEls.winStreakProfit.textContent = data.wins.trades
    .map(trade => trade.profit)
    .reduce((acc, num) => acc + num, 0);
  overallEls.winStreakDate.textContent = `${data.wins.trades[0].date} - ${
    data.wins.trades[data.wins.trades.length - 1].date
  }`;

  overallEls.lossStreakTotal.textContent = data.losses.trades.length;
  overallEls.lossStreakProfit.textContent = data.losses.trades
    .map(trade => trade.loss)
    .reduce((acc, num) => acc + num, 0);
  overallEls.lossStreakDate.textContent = `${data.losses.trades[0].date} - ${
    data.losses.trades[data.losses.trades.length - 1].date
  }`;
};
