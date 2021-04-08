import { kFormatter } from '../helpers';

let overallEls = {};

const getElements = function (obj = {}) {
  obj.pieStreakCard = document.querySelector('.js-pie-streak');
  obj.shortLongCanvas = document.querySelector('.js-pie-canvas');
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
  obj.overallTradesNumber = obj.pieStreakCard.querySelector(
    '.js-overall-trades-number'
  );
  obj.shortPositions = obj.pieStreakCard.querySelector('.js-short-positions');
  obj.longPositions = obj.pieStreakCard.querySelector('.js-long-positions');
  return obj;
};

export const queryOverallEls = function () {
  overallEls = getElements();
};

export const clearLongShortCanvas = function () {
  overallEls.shortLongCanvas.innerHTML = '';
};

export const renderLongShortStats = function (data) {
  overallEls.overallTradesNumber.textContent = data.total ? data.total : 0;

  if (data.proportions && data.proportions[0]) {
    overallEls.longPositions.textContent = `${data.proportions[0].total} - ${(
      (data.proportions[0].total / (data.total > 0 ? data.total : 1)) *
      100
    ).toFixed(1)}%`;
  } else {
    overallEls.longPositions.textContent = '0 - 0%';
  }

  if (data.proportions && data.proportions[1]) {
    overallEls.shortPositions.textContent = `${data.proportions[1].total} - ${(
      (data.proportions[1].total / (data.total > 0 ? data.total : 1)) *
      100
    ).toFixed(1)}%`;
  } else {
    overallEls.shortPositions.textContent = '0 - 0%';
  }
};

export const renderStreaks = function (data) {
  overallEls.winStreakTotal.textContent = data.wins.trades
    ? data.wins.trades.length
    : 0;
  overallEls.winStreakProfit.textContent = data.wins.trades
    ? data.wins.trades
        .map(trade => trade.returnCash)
        .reduce((acc, num) => acc + num, 0)
    : 0;

  overallEls.winStreakDate.textContent = `${
    data.wins.trades.length > 0 ? data.wins.trades[0].date : 'xx/xx/xx'
  } - ${
    data.wins.trades.length > 0
      ? data.wins.trades[data.wins.trades.length - 1].date
      : 'xx/xx/xx'
  }`;

  overallEls.lossStreakTotal.textContent = data.losses.trades
    ? data.losses.trades.length
    : 0;

  overallEls.lossStreakProfit.textContent = data.losses.trades
    ? data.losses.trades
        .map(trade => trade.returnCash)
        .reduce((acc, num) => acc + num, 0)
    : 0;

  overallEls.lossStreakDate.textContent = `${
    data.losses.trades.length > 0 ? data.losses.trades[0].date : 'xx/xx/xx'
  } - ${
    data.losses.trades.length > 0
      ? data.losses.trades[data.losses.trades.length - 1].date
      : 'xx/xx/xx'
  }`;
};

// ZONE - D3
let pieData = [];

export const renderLongShortPie = function (passedData) {
  if (passedData) {
    pieData = passedData;
    clearLongShortCanvas();
  } else {
    passedData = pieData;
  }

  const canvasRect = overallEls.shortLongCanvas.getBoundingClientRect();

  // create room for axes
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const graphWidth = canvasRect.width - margin.left - margin.right;
  const graphHeight = canvasRect.height - margin.top - margin.bottom;
  const graphRadius = canvasRect.height / 2.4;
  const graphCenter = { x: graphWidth / 2, y: graphHeight / 2 };
  let totalTrades;
  if (passedData[1]) {
    totalTrades = passedData[0].total + passedData[1].total;
  } else {
    totalTrades = passedData[0];
  }

  const svg = d3
    .select('.js-pie-canvas')
    .append('svg')
    .attr('width', '100%')
    .attr('height', graphHeight);

  // create a group to contain all graph elements
  const graph = svg
    .append('g')
    .attr('transform', `translate(${graphCenter.x}, ${graphCenter.y})`);

  const pie = d3
    .pie()
    .sort(null)
    .value(d => d.total);

  // arc generator needs to know the start and end angles, which is why we created the pie function
  const arcPath = d3
    .arc()
    .outerRadius(graphRadius)
    .innerRadius(graphRadius / 4);

  // ZONE - update function
  const updateLongShortPie = function (passedData) {
    // join enhanced pie data to path elements
    const paths = graph.selectAll('path').data(pie(passedData));

    // remove unwanted paths
    paths.exit().remove();

    // enter elements
    paths
      .enter()
      .append('path')
      .attr('class', 'pie-section')
      .attr('d', arcPath);

    // existing DOM elements
    paths.attr('d', arcPath);
  };
  updateLongShortPie(passedData);
};
