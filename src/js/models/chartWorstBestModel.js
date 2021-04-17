export const formatWorstBestData = function (type, stocksData) {
  if (type === 'worst') {
    const dataCopy = [];
    stocksData.forEach(stock => dataCopy.push({ ...stock }));
    dataCopy.forEach(stock => (stock.returnCash = Math.abs(stock.returnCash)));
    return ['worst', dataCopy.slice(0, 8)];
  }
  if (type === 'best') return ['best', stocksData.slice(0, 8)];
};
