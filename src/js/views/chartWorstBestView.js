let bestWorstEls = {};

const testData = [
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
  return obj;
};

export const queryBestWorstEls = function () {
  bestWorstEls = getElements();
};

export const renderWorstBestChart = function () {
  // ZONE - D3

  const canvasRect = bestWorstEls.bestWorstCanvas.getBoundingClientRect();

  // create room for axes
  const margin = { top: 25, right: 20, bottom: 50, left: 50 };
  const graphWidth = canvasRect.width - margin.left - margin.right;
  const graphHeight = canvasRect.height - margin.top - margin.bottom;

  // create svg container, specify width & height, translate to create room for axes labels
  const svg = d3
    .select('.js-performance-canvas')
    .append('svg')
    .attr('class', 'worst-best-canvas')
    .attr('viewBox', `0 0 ${canvasRect.width} ${canvasRect.height}`);

  // create graph for the elements and append it to our svg
  const graph = svg
    .append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // create scales
  const y = d3.scaleLinear().range([graphHeight, 0]);
  const x = d3.scaleBand().range([0, 500]).paddingInner(0.2).paddingOuter(0.2);

  // create a group for the x and y axis
  const xAxisGroup = graph
    .append('g')
    .attr('transform', `translate(0, ${graphHeight})`);
  const yAxisGroup = graph.append('g');

  // create and call the axes
  const xAxis = d3.axisBottom(x);
  const yAxis = d3
    .axisLeft(y)
    .ticks(4)
    .tickFormat(d => d);
};
