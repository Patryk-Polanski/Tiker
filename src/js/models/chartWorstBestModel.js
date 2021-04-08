export const formatWorstBestData = function (type, stocksData) {
  if (type === 'worst') {
    stocksData.forEach(
      stock => (stock.returnCash = Math.abs(stock.returnCash))
    );
    return ['worst', stocksData];
  }
  if (type === 'best') return ['best', stocksData];
};
