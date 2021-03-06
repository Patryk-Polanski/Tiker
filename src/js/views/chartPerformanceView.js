import { path } from 'd3-path';
import { curveLinearClosed } from 'd3-shape';
import { kFormatter } from '../helpers';

let performanceEls = {};

const getElements = function (obj = {}) {
  obj.performanceCanvas = document.querySelector('.js-performance-canvas');
  obj.performanceDayBtn = document.querySelector('.js-performance-btn-day');
  obj.performanceMonthBtn = document.querySelector('.js-performance-btn-month');
  obj.performanceHeading = document.querySelector('.js-performance-heading');
  return obj;
};

export const queryPerformanceEls = function () {
  performanceEls = getElements();
};

export const addPerformanceRenderHandler = function (handler) {
  [
    performanceEls.performanceDayBtn,
    performanceEls.performanceMonthBtn,
  ].forEach(btn =>
    btn.addEventListener('click', e => {
      btn.parentElement
        .querySelectorAll('button')
        .forEach(b => b.classList.remove('btn--tertiary--active'));
      e.target.classList.add('btn--tertiary--active');
      handler(e.target.getAttribute('data-type'));
    })
  );
};

const updatePerformanceHeading = function (type) {
  performanceEls.performanceHeading.querySelector('span').textContent = type;
};

export const clearPerformanceCanvas = function () {
  performanceEls.performanceCanvas.innerHTML = '';
};

let chartData = [];
let chartType;

// ZONE - D3
export const renderPerformanceChart = function (passedData) {
  let type, data;
  if (passedData) {
    type = passedData[0];
    data = passedData[1];
    console.log(data);
    updatePerformanceHeading(type);
    clearPerformanceCanvas();
  }

  if (data) {
    (chartData = [...data]), (chartType = type);
  } else {
    (data = chartData), (type = chartType);
  }

  const canvasRect = performanceEls.performanceCanvas.getBoundingClientRect();

  // create room for axes
  const margin = { top: 25, right: 20, bottom: 50, left: 60 };
  const graphWidth = canvasRect.width - margin.left - margin.right;
  const graphHeight = canvasRect.height - margin.top - margin.bottom;

  // create svg container, specify width & height, translate to create room for axes labels
  const svg = d3
    .select('.js-performance-canvas')
    .append('svg')
    .attr('class', 'performance-canvas')
    .attr('viewBox', `0 0 ${canvasRect.width} ${canvasRect.height}`);

  // create a group for our graph elements and append it to our svg
  const graph = svg
    .append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // create scales
  const x = d3.scaleLinear().range([0, graphWidth]);
  const y = d3.scaleLinear().range([graphHeight, 0]);

  // create axes groups
  const xAxisGroup = graph
    .append('g')
    .attr('transform', `translate(0, ${graphHeight})`)
    .attr('class', 'performance-axis-x');
  const yAxisGroup = graph.append('g').attr('class', 'performance-axis-y');

  // set up d3 line graph generator
  // it will generate a line, based on our data points
  // it returns a long string that is then used for 'd' attribute of the svg path
  const line = d3
    .line()
    .x(function (d) {
      return x(d.position);
    })
    .y(function (d) {
      return y(d.total);
    });

  // create line path element
  const path = graph.append('path');

  // ZONE - update function
  const updatePerformanceChart = function (data = chartData) {
    // create responsive gaps for the chart
    const maxMinVals = d3.extent(data, d => d.total);
    const gap = Math.round((maxMinVals[1] - maxMinVals[0]) / 6);

    // set scale domains
    // x.domain(d3.extent(data, d => d.position)); // find the lowest and highest dates, return in array format
    x.domain([
      d3.min(data, d => d.position) - 0.5,
      d3.max(data, d => d.position) + 0.5,
    ]);
    y.domain([
      d3.min(data, d => d.total) - gap,
      d3.max(data, d => d.total) + gap,
    ]); // find the highest value

    // update path data
    // when we are using d3 line, we need to pass the data inside of another array
    path.data([data]).attr('d', line).attr('class', 'performance-line');

    // create circles for objects
    // join data to the selection
    const circles = graph.selectAll('circle').data(data);

    // remove unwanted points
    circles.exit().remove();

    // add new points
    circles
      .enter()
      .append('circle')
      .attr('cx', d => x(d.position))
      .attr('cy', d => {
        return y(Math.round(d.total));
      })
      .attr('class', 'performance-circles');

    // update current points
    circles
      .attr('cx', d => x(d.position))
      .attr('cy', d => y(Math.round(d.total)));

    // create axes
    const xAxis = d3
      .axisBottom(x)
      .ticks(data.length)
      .tickFormat(d => data[d].dateShort);
    // .tickFormat(d => (data[d - 1] ? data[d - 1].dateShort : '')); // create bottom axis based on our x scale

    const yAxis = d3
      .axisLeft(y)
      .ticks(4)
      .tickFormat(d => kFormatter(d, 999, ''));

    // generate all shapes for xAxis and yAxis and place them in axis groups
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // ZONE - generate horizontal lines

    const yAxisTicks = performanceEls.performanceCanvas.querySelectorAll(
      'g.performance-axis-y g.tick'
    );
    const yTicksTranslates = Array.from(yAxisTicks).map(t =>
      t.getAttribute('transform')
    );

    const horizontalLinesGroup = graph.append('g');

    for (let i = 0; i < yTicksTranslates.length; i++) {
      const horizontalLine = horizontalLinesGroup
        .append('line')
        .attr('class', 'performance-graph-line')
        .attr('x1', 0)
        .attr('x2', graphWidth)
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('transform', yTicksTranslates[i]);
    }

    // ZONE - create circle labels
    const points = Array.from(
      performanceEls.performanceCanvas.querySelectorAll(
        'circle.performance-circles'
      )
    );
    const pointsCoords = points.map(point => [
      point.getAttribute('cx'),
      point.getAttribute('cy'),
    ]);

    const labelsGroup = graph.append('g');

    for (let i = 0; i < pointsCoords.length; i++) {
      labelsGroup
        .append('text')
        .text(kFormatter(data[i].total, 9999))
        .attr(
          'class',
          `${
            data[i].returnCash >= 0
              ? 'performance-label'
              : 'performance-label--negative'
          }`
        )
        .attr(
          'transform',
          `translate(${pointsCoords[i][0] - 20}, ${
            pointsCoords[i][1] - (data[i].returnCash >= 0 ? 15 : -25)
          })`
        );
    }

    // select x axis text and translate down every odd text to make space
    xAxisGroup
      .selectAll('g.tick:nth-child(odd) text')
      .attr('transform', 'translate(0, 18)')
      .attr('class', 'performance-axis-odd');
  };

  // change the buttons accordingly
  [
    performanceEls.performanceDayBtn,
    performanceEls.performanceMonthBtn,
  ].forEach(btn => btn.classList.remove('btn--tertiary--active'));
  if (type === 'Daily')
    performanceEls.performanceDayBtn.classList.add('btn--tertiary--active');
  if (type === 'Monthly')
    performanceEls.performanceMonthBtn.classList.add('btn--tertiary--active');

  updatePerformanceChart(data);
};
