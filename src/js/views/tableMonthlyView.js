let monthlyEls = {};

const getElements = function (obj = {}) {
  obj.monthlyTable = document.querySelector('.js-monthly-table');
  obj.monthlyTableHead = obj.monthlyTable.querySelector(
    '.js-monthly-table-head'
  );
  return obj;
};

export const queryMonthlyEls = function () {
  monthlyEls = getElements();
};

export const renderMonthlyTable = function (data) {
  if (monthlyEls.monthlyTableRows) {
    Array.from(monthlyEls.monthlyTableRows).forEach(row => row.remove());
  }

  const keys = Object.keys(data).reverse();
  keys.forEach(key => {
    const current = data[key];
    const html = `
    <tr class="js-table-monthly-row">
        <th>${current.total.month}</th>
        <td class="${
          current.total.monthlyReturn >= 0 ? '' : 'negative'
        }">${current.total.monthlyReturn.toFixed(2)}</td>
        <td>${current.total.totalTrades}</td>
        <td class="${current.total.avgReturn >= 0 ? '' : 'negative'}">${
      current.total.avgReturn
    }</td>
        <td>${+current.total.avgWinPercent}%</td>
        <td>${+current.total.avgLossPercent}%</td>
        <td>${+current.total.battingAvg}%</td>
        <td>${current.total.winLossRatio}</td>
    </tr>
    <tr class="js-table-monthly-row">
        <th>${current.long.side}</th>
        <td class="${
          current.long.monthlyReturn >= 0 ? '' : 'negative'
        }">${current.long.monthlyReturn.toFixed(2)}</td>
        <td>${current.long.totalTrades}</td>
        <td class="${current.long.avgReturn >= 0 ? '' : 'negative'}">${
      current.long.avgReturn
    }</td>
        <td>${+current.long.avgWinPercent}%</td>
        <td>${+current.long.avgLossPercent}%</td>
        <td>${+current.long.battingAvg}%</td>
        <td>${current.long.winLossRatio}</td>
    </tr>
    <tr class="s-monthly__table-unit js-table-monthly-row">
        <th>${current.short.side}</th>
        <td class="${
          current.short.monthlyReturn >= 0 ? '' : 'negative'
        }">${current.short.monthlyReturn.toFixed(2)}</td>
        <td>${current.short.totalTrades}</td>
        <td class="${current.short.avgReturn >= 0 ? '' : 'negative'}">${
      current.short.avgReturn
    }</td>
        <td>${+current.short.avgWinPercent}%</td>
        <td>${+current.short.avgLossPercent}%</td>
        <td>${+current.short.battingAvg}%</td>
        <td>${current.short.winLossRatio}</td>
    </tr>
    `;
    monthlyEls.monthlyTableHead.insertAdjacentHTML('afterend', html);
    monthlyEls.monthlyTableRows = monthlyEls.monthlyTable.querySelectorAll(
      '.js-table-monthly-row'
    );
  });
};
