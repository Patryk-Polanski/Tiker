import { kFormatter } from '../helpers';

let bestWorstEls = {};

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
      e.target.classList.add('btn--tertiary--active');
      handler(e.target.getAttribute('data-type'));
    });
  });
};

// ZONE - D3
let chartData = [];
let chartType;

export const renderWorstBestChart = function (passedData) {
  let type, data;
  if (passedData) {
    type = passedData[0];
    data = passedData[1];
    clearWorstBestCanvas();
  }

  if (data) {
    (chartData = [...data]), (chartType = type);
  } else {
    (data = chartData), (type = chartType);
  }

  const determineSign = function (data) {
    if (type === 'worst') return -Math.abs(data);
    return Math.abs(data);
  };

  const canvasRect = bestWorstEls.bestWorstCanvas.getBoundingClientRect();

  // create room for axes
  const margin = { top: 25, right: 20, bottom: 50, left: 50 };
  const graphWidth = canvasRect.width - margin.left - margin.right;
  const graphHeight = canvasRect.height - margin.top - margin.bottom;

  // create svg container, specify width & height, translate to create room for axes labels
  const svg = d3
    .select('.js-worst-best-canvas')
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
    .tickFormat(d => {
      if (type === 'worst') return -Math.abs(kFormatter(d, 9999));
      if (type === 'best') return Math.abs(kFormatter(d, 9999));
    });

  // ZONE - update function
  const updateWorstBestChart = function (data = chartData) {
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

    const labelsGroup = graph.append('g');

    for (let i = 0; i < barsDimensions.length; i++) {
      labelsGroup
        .append('text')
        .text(kFormatter(determineSign(data[i].result), 9999))
        .attr('class', `${type === 'best' ? 'best' : 'worst'}-trades-label`)
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
