let performanceEls = {};

const getElements = function (obj = {}) {
  obj.performanceCanvas = document.querySelector('.js-performance-canvas');
  console.log(obj.performanceCanvas.getBoundingClientRect().width);
  console.log(obj.performanceCanvas.getBoundingClientRect().height);
  return obj;
};

export const queryPerformanceEls = function () {
  performanceEls = getElements();
};

const updatePerformanceChart = function(data)(){
    
}

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
    .attr('stroke', #aaa)
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', 4);

  // create y dotted line and append to dotted line group
  const yDottedLine = dottedLines
    .append('line')
    .attr('stroke', #aaa)
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', 4);
};
