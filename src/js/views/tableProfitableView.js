let profitableEls = {};

const getElements = function (obj = {}) {
  obj.profitableTable = document.querySelector('.js-profitable-table');
  obj.profitableTableHead = obj.profitableTable.querySelector(
    '.js-profitable-table-head'
  );
  return obj;
};

export const queryProfitableEls = function () {
  profitableEls = getElements();
};

export const renderProfitableTable = function (tableData) {
  Object.keys(tableData).forEach(data => {
    const ticker = tableData[data];
    const html = `
        <tr>
            <th>${data}</th>
            <td>${ticker.totalProfit}</td>
            <td>${ticker.totalTrades}</td>
            <td>${ticker.avgReturn}</td>
            <td>${ticker.avgWinPercent}%</td>
            <td>${ticker.battingAvgPercent}%</td>
            <td>${ticker.winLossRatio}</td>
        </tr>
      `;
    profitableEls.profitableTableHead.insertAdjacentHTML('afterend', html);
  });
};
