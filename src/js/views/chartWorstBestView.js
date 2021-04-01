import { kFormatter } from '../helpers';

let bestWorstEls = {};

const data = [
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

const getElements = function (obj = {}) {
  obj.bestWorstCanvas = document.querySelector('.js-worst-best-canvas');
  obj.worstBtn = document.querySelector('.js-worst-btn');
  obj.bestBtn = document.querySelector('.js-best-btn');
  return obj;
};

export const queryBestWorstEls = function () {
  bestWorstEls = getElements();
};

export const clearWorstBestCanvas = function () {
  bestWorstEls.bestWorstCanvas.innerHTML = '';
};

export const addWorstBestRenderHandler = function (handler) {
  [bestWorstEls.worstBtn, bestWorstEls.bestBtn].forEach(btn => {
    btn.addEventListener('click', e => {
      btn.parentElement
        .querySelectorAll('button')
        .forEach(b => b.classList.remove('btn--tertiary--active'));
      handler(e.target.getAttribute('data-type'));
    });
  });
};

let chartData = [];

export const renderWorstBestChart = function () {
  // ZONE - D3

  const canvasRect = bestWorstEls.bestWorstCanvas.getBoundingClientRect();

  // create room for axes
  const margin = { top: 25, right: 20, bottom: 50, left: 50 };
  const graphWidth = canvasRect.width - margin.left - margin.right;
  const graphHeight = canvasRect.height - margin.top - margin.bottom;

  console.log('THIS IS THE GRAPH WIDTH');
  console.log(graphWidth);

  // create svg container, specify width & height, translate to create room for axes labels
  const svg = d3
    .select('.js-worst-best-canvas')
    .append('svg')
    .attr('class', 'worst-best-canvas')
    .attr('viewBox', `0 0 ${canvasRect.width} ${canvasRect.height}`);

  // create graph for the elements and append it to our svg
  const graph = svg
    .append('g')
    .attr('width', '600')
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // create scales
  const y = d3.scaleLinear().range([graphHeight, 0]);
  const x = d3
    .scaleBand()
    .range([0, graphWidth])
    .paddingInner(0.5)
    .paddingOuter(0.5);

  // create a group for the x and y axis
  const xAxisGroup = graph
    .append('g')
    .attr('transform', `translate(0, ${graphHeight})`)
    .attr('class', 'worst-best-axis-x');
  const yAxisGroup = graph.append('g').attr('class', 'worst-best-axis-y');

  // create and call the axes
  const xAxis = d3.axisBottom(x).tickFormat(d => d);
  const yAxis = d3
    .axisLeft(y)
    .ticks(6)
    .tickFormat(d => -Math.abs(kFormatter(d, 9999)));

  // ZONE - update function
  const updateWorstBestChart = function (data) {
    // sort the data based on result
    data.sort((a, b) => b.result - a.result);

    // create responsive gap for the chart
    const maxMinVals = d3.extent(data, d => d.result);
    const gap = Math.round((maxMinVals[1] - maxMinVals[0]) / 6);

    // set scale domains
    y.domain([0, d3.max(data, d => d.result) + gap]);
    x.domain(data.map(item => item.ticker));

    // join data to rectangles inside our graph group
    const rects = graph.selectAll('rect').data(data);

    // remove any unwanted shapes
    rects.exit().remove();

    // update already existing rectangles in DOM
    rects
      .attr('width', x.bandwidth)
      .attr('y', d => y(total))
      .attr('fill', 'orange');

    // update and append virtual elements
    rects
      .enter()
      .append('rect')
      .attr('width', x.bandwidth)
      .attr('height', 0)
      .attr('y', graphHeight)
      .attr('x', d => x(d.ticker))
      .attr('fill', 'orange')
      .attr('height', d => graphHeight - y(d.result))
      .attr('y', d => y(d.result))
      .attr('class', 'worst-best-bars');

    // apply axes to axes groups
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // ZONE - create bars labels
    const bars = Array.from(
      bestWorstEls.bestWorstCanvas.querySelectorAll('rect.worst-best-bars')
    );
    const barsDimensions = bars.map(bar => [
      bar.getAttribute('x'),
      bar.getAttribute('y'),
      bar.getAttribute('width'),
      bar.getAttribute('height'),
    ]);
    console.log(barsDimensions);

    const labelsGroup = graph.append('g');

    for (let i = 0; i < barsDimensions.length; i++) {
      labelsGroup
        .append('text')
        .text(-kFormatter(data[i].result, 9999))
        .attr('class', 'worst-trades-label')
        .attr(
          'transform',
          `translate(${barsDimensions[i][0]}, ${barsDimensions[i][1] - 10})`
        );
      labelsGroup
        .append('text')
        .text(data[i].date)
        .attr('class', 'worst-best-date')
        .attr(
          'transform',
          `translate(${barsDimensions[i][0] - 8}, ${
            graphHeight - 10
          }) rotate(-90)`
        );
    }

    // ZONE - create horizontal line on the x axis to cover the bars borders
    const xOverlayLineGroup = graph.append('g');
    xOverlayLineGroup
      .append('line')
      .attr('x1', 0)
      .attr('x2', graphWidth)
      .attr('y1', graphHeight)
      .attr('y2', graphHeight)
      .attr('class', 'worst-best-overlay-line');

    // select x axis text and translate down every odd text to make space
    xAxisGroup
      .selectAll('g.tick:nth-child(odd) text')
      .attr('transform', 'translate(0, 18)');
  };
  updateWorstBestChart(data);
};
