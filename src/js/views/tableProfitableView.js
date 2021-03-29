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
  console.log('THIS IS THE TABLE DATA');
  console.log(tableData);
};
