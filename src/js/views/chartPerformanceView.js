import { path } from 'd3-path';
import { curveLinearClosed } from 'd3-shape';

let performanceEls = {};

const testData = [
  {
    date: 'Mon Mar 01 2021 23:14:58 GMT+0000 (Greenwich Mean Time)',
    distance: 2400,
  },
  {
    date: 'Mon Mar 02 2021 23:13:58 GMT+0000 (Greenwich Mean Time)',
    distance: 1200,
  },
  {
    date: 'Mon Mar 03 2021 23:12:58 GMT+0000 (Greenwich Mean Time)',
    distance: 900,
  },
  {
    date: 'Mon Mar 04 2021 23:11:58 GMT+0000 (Greenwich Mean Time)',
    distance: 1400,
  },
  {
    date: 'Mon Mar 05 2021 23:10:58 GMT+0000 (Greenwich Mean Time)',
    distance: 2200,
  },
  {
    date: 'Mon Mar 06 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 600,
  },
];

const getElements = function (obj = {}) {
  obj.performanceCanvas = document.querySelector('.js-performance-canvas');
  console.log(obj.performanceCanvas.getBoundingClientRect().width);
  console.log(obj.performanceCanvas.getBoundingClientRect().height);
  return obj;
};

export const queryPerformanceEls = function () {
  performanceEls = getElements();
};

export const renderPerformanceChart = function () {
  // ZONE - D3
  let data = [];

  const canvasRect = performanceEls.performanceCanvas.getBoundingClientRect();

  // create room for axes
  const margin = { top: 40, right: 20, bottom: 50, left: 100 };
  const graphWidth = canvasRect.width - margin.left - margin.right;
  const graphHeight = canvasRect.height - margin.top - margin.bottom;

  // create svg container, specify width & height, translate to create room for axes labels
  const svg = d3
    .select('.js-performance-canvas')
    .append('svg')
    .attr('width', canvasRect.width)
    .attr('height', canvasRect.height);

  // create a group for our graph elements and append it to our svg
  const graph = svg
    .append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // create scales
  const x = d3.scaleTime().range([0, graphWidth]);
  const y = d3.scaleTime().range([graphHeight, 0]);

  // create axes groups
  const xAxisGroup = graph
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${graphHeight})`);
  const yAxisGroup = graph.append('g').attr('class', 'y-axis');

  // set up d3 line graph generator
  // it will generate a line, based on our data points
  // it returns a long string that is then used for 'd' attribute of the svg path
  const line = d3
    .line()
    .x(function (d) {
      return x(new Date(d.date));
    })
    .y(function (d) {
      return y(d.distance);
    });

  // create line path element
  const path = graph.append('path');

  // create dotted line group and append to graph
  const dottedLines = graph
    .append('g')
    .attr('class', 'lines')
    .style('opacity', 0);

  // create x dotted line and append to dotted line group
  const xDottedLine = dottedLines
    .append('line')
    .attr('stroke', '#aaa')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', 4);

  // create y dotted line and append to dotted line group
  const yDottedLine = dottedLines
    .append('line')
    .attr('stroke', '#aaa')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', 4);

  // ZONE - update function
  const updatePerformanceChart = function (data) {
    // sort the data based on date object
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    // set scale domains
    x.domain(d3.extent(data, d => new Date(d.date))); // find the lowest and highest dates, return in array format
    y.domain([0, d3.max(data, d => d.distance)]); // find the highest value

    // update path data
    // when we are using d3 line, we need to pass the data inside of another array
    path
      .data([data])
      .attr('fill', 'none')
      .attr('stroke', '#00bfa5')
      .attr('stroke-width', 2)
      .attr('d', line);

    // create circles for objects
    // join data to the selection
    const circles = graph.selectAll('circle').data(data);

    // remove unwanted points
    circles.exit().remove();

    // add new points
    circles
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('cx', d => x(new Date(d.date)))
      .attr('cy', d => y(d.distance))
      .attr('fill', '#ccc');

    // update current points
    circles.attr('cx', d => x(new Date(d.date))).attr('cy', d => y(d.distance));

    // create axes
    const xAxis = d3.axisBottom(x).ticks(3).tickFormat(d3.timeFormat('%b %d')); // create bottom axis based on our x scale
    const yAxis = d3
      .axisLeft(y)
      .ticks(4)
      .tickFormat(d => d + 'm');

    // generate all shapes for xAxis and yAxis and place them in axis groups
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // rotate axes text
    xAxisGroup
      .selectAll('text')
      .attr('transform', 'rotate(-40)')
      .attr('text-anchor', 'end');
  };

  updatePerformanceChart(testData);
};
