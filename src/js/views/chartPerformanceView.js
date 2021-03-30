import { path } from 'd3-path';
import { curveLinearClosed } from 'd3-shape';

let performanceEls = {};

const testData = [
  {
    date: 'Mon Mar 01 2021 23:14:58 GMT+0000 (Greenwich Mean Time)',
    distance: 2400,
    shortDate: '1/3/21',
    position: 1,
  },
  {
    date: 'Mon Mar 02 2021 23:13:58 GMT+0000 (Greenwich Mean Time)',
    distance: 1200,
    shortDate: '2/3/21',
    position: 2,
  },
  {
    date: 'Mon Mar 03 2021 23:12:58 GMT+0000 (Greenwich Mean Time)',
    distance: 900,
    shortDate: '3/3/21',
    position: 3,
  },
  {
    date: 'Mon Mar 04 2021 23:11:58 GMT+0000 (Greenwich Mean Time)',
    distance: 1400,
    shortDate: '4/3/21',
    position: 4,
  },
  {
    date: 'Mon Mar 05 2021 23:10:58 GMT+0000 (Greenwich Mean Time)',
    distance: 2200,
    shortDate: '5/3/21',
    position: 5,
  },
  {
    date: 'Mon Mar 06 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 600,
    shortDate: '6/3/21',
    position: 6,
  },
  {
    date: 'Mon Mar 07 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 500,
    shortDate: '7/3/21',
    position: 7,
  },
  {
    date: 'Mon Mar 12 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 660,
    shortDate: '12/3/21',
    position: 8,
  },
  {
    date: 'Mon Mar 16 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 990,
    shortDate: '16/3/21',
    position: 9,
  },
  {
    date: 'Mon Mar 18 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 1300,
    shortDate: '19/3/21',
    position: 10,
  },
  {
    date: 'Mon Mar 23 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 1348,
    shortDate: '23/3/21',
    position: 11,
  },
  {
    date: 'Mon Mar 24 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 1450,
    shortDate: '24/3/21',
    position: 12,
  },
  {
    date: 'Mon Mar 26 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 1300,
    shortDate: '26/3/21',
    position: 13,
  },
  {
    date: 'Mon Mar 27 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 1423,
    shortDate: '27/3/21',
    position: 14,
  },
  {
    date: 'Mon Mar 29 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
    distance: 1497,
    shortDate: '29/3/21',
    position: 15,
  },
];

const getElements = function (obj = {}) {
  obj.performanceCanvas = document.querySelector('.js-performance-canvas');
  return obj;
};

export const queryPerformanceEls = function () {
  performanceEls = getElements();
};

export const renderPerformanceChart = function () {
  // ZONE - D3
  performanceEls.performanceCanvas.innerHTML = '';

  const canvasRect = performanceEls.performanceCanvas.getBoundingClientRect();

  // create room for axes
  const margin = { top: 30, right: 20, bottom: 50, left: 50 };
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
      return y(d.distance);
    });

  // create line path element
  const path = graph.append('path');

  // ZONE - update function
  const updatePerformanceChart = function (data) {
    // sort the data based on date object
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    // set scale domains
    // x.domain(d3.extent(data, d => d.position)); // find the lowest and highest dates, return in array format
    x.domain([
      d3.min(data, d => d.position) - 0.5,
      d3.max(data, d => d.position) + 0.5,
    ]);
    y.domain([
      d3.min(data, d => d.distance) - 200,
      d3.max(data, d => d.distance) + 100,
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
        return y(d.distance);
      })
      .attr('class', 'performance-circles');

    // update current points
    circles.attr('cx', d => x(d.position)).attr('cy', d => y(d.distance));

    // circles.append('text').text('haha').attr('color', '#fff');

    // create axes
    const xAxis = d3
      .axisBottom(x)
      .ticks(data.length)
      .tickFormat(d => (data[d - 1] ? data[d - 1].shortDate : '')); // create bottom axis based on our x scale

    const yAxis = d3
      .axisLeft(y)
      .ticks(4)
      .tickFormat(d => d);

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
    // const points = Array.from(
    //   performanceEls.performanceCanvas.querySelectorAll(
    //     'circle.performance-circles'
    //   )
    // );
    // const pointsCoords = points.map(point => [
    //   point.getAttribute('cx'),
    //   point.getAttribute('cy'),
    // ]);
    // console.log(pointsCoords);

    // const labelsGroup = graph.append('g');

    // for (let i = 0; i < pointsCoords.length; i++) {
    //   const label = labelsGroup
    //     .append('text')
    //     .attr('class', 'performance-label')
    //     .attr('color', '#fff');
    // }

    // select x axis text and translate down every odd text to make space
    xAxisGroup
      .selectAll('g.tick:nth-child(odd) text')
      .attr('transform', 'translate(0, 18)')
      .attr('class', 'performance-axis-odd');
  };

  updatePerformanceChart(testData);
};
