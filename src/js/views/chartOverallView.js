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
  return obj;
};

export const queryOverallEls = function () {
  overallEls = getElements();
};

export const renderStreaks = function (data) {
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

// ZONE - D3
export const renderLongShortPie = function (tradesNo) {
  const canvasRect = overallEls.shortLongCanvas.getBoundingClientRect();

  // create room for axes
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const graphWidth = canvasRect.width - margin.left - margin.right;
  const graphHeight = canvasRect.height - margin.top - margin.bottom;
  const graphRadius = canvasRect.height / 2.2;
  const graphCenter = { x: graphWidth / 2, y: graphHeight / 2 };

  const svg = d3
    .select('.js-pie-canvas')
    .append('svg')
    .attr('width', graphWidth)
    .attr('height', graphHeight);

  // create a group to contain all graph elements
  const graph = svg
    .append('g')
    .attr('transform', `translate(${graphRadius + 5}, ${graphCenter.y})`);

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
  const updateLongShortPie = function (tradesNo) {
    // join enhanced pie data to path elements
    const paths = graph.selectAll('path').data(pie(tradesNo));
    console.log(tradesNo);
    console.log(paths.enter());

    // remove unwanted paths
    paths.exit().remove();

    // enter elements
    paths
      .enter()
      .append('path')
      .attr('class', 'pie-section')
      .attr('d', arcPath)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('fill', 'pink');

    // existing DOM elements
    paths.attr('d', arcPath);
  };
  updateLongShortPie(tradesNo);
};
