export const formatWorstBestData = function (type, stocksData) {
  if (type === 'worst') {
    const dataCopy = [];
    stocksData.forEach(stock => dataCopy.push({ ...stock }));
    dataCopy.forEach(stock => (stock.returnCash = Math.abs(stock.returnCash)));
    return ['worst', dataCopy];
  }
  if (type === 'best') return ['best', stocksData];
};
