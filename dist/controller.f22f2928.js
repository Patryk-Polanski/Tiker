// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/views/calculatorsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCalcResult = exports.renderCalcResult = exports.renderCapitalMessage = exports.addCalcRatioHandler = exports.addCalcPositionHandler = exports.addCalcCapitalHandler = exports.queryCalcEls = void 0;
var calculatorEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.calcPosition = document.querySelector('.js-calc-position');
  obj.positionEntryPrice = obj.calcPosition.querySelector('.js-calc-position-entry');
  obj.positionRiskPercentage = obj.calcPosition.querySelector('.js-calc-position-percentage');
  obj.positionStopPrice = obj.calcPosition.querySelector('.js-calc-position-stop');
  obj.positionResult = obj.calcPosition.querySelector('.js-calc-position-result');
  obj.calcRatio = document.querySelector('.js-calc-ratio');
  obj.ratioEntryPrice = obj.calcRatio.querySelector('.js-calc-ratio-entry');
  obj.ratioExitPrice = obj.calcRatio.querySelector('.js-calc-ratio-exit');
  obj.ratioStopPrice = obj.calcRatio.querySelector('.js-calc-ratio-stop');
  obj.ratioResult = obj.calcRatio.querySelector('.js-calc-ratio-result');
  obj.calcCapital = document.querySelector('.js-calc-capital');
  obj.capitalSign = obj.calcCapital.querySelector('.js-calc-capital-sign');
  obj.capitalSignBtn = obj.calcCapital.querySelector('.js-calc-capital-sign-btn');
  obj.capitalInput = obj.calcCapital.querySelector('.js-calc-capital-input');
  obj.capitalUpdateBtn = obj.calcCapital.querySelector('.js-calc-capital-update-btn');
  obj.capitalMessage = obj.calcCapital.querySelector('.js-calc-capital-message');
  return obj;
};

var queryCalcEls = function queryCalcEls() {
  calculatorEls = getElements();
};

exports.queryCalcEls = queryCalcEls;

var checkFieldsForData = function checkFieldsForData(el1, el2, el3) {
  if (!el1.value || !el2.value || !el3.value) return;
  return [+el1.value, +el2.value, +el3.value];
};

var addCalcCapitalHandler = function addCalcCapitalHandler(handler) {
  calculatorEls.capitalUpdateBtn.addEventListener('click', function (e) {
    var amount = +calculatorEls.capitalInput.value;
    if (!amount || isNaN(amount)) return;
    handler(amount, calculatorEls.capitalSign.getAttribute('data-action'));
  });
  calculatorEls.capitalSignBtn.addEventListener('click', function (e) {
    if (e.target.previousElementSibling.getAttribute('data-action') === 'plus') {
      calculatorEls.capitalSign.innerHTML = "\n      <svg class=\"svg svg--minus\" viewBox=\"0 0 13 13\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect y=\"5\" width=\"13\" height=\"3\" fill=\"#C4C4C4\"/>\n      </svg>\n      ";
      calculatorEls.capitalSign.setAttribute('data-action', 'minus');
      console.log(calculatorEls.capitalSign);
    } else {
      calculatorEls.capitalSign.innerHTML = "\n      <svg class=\"svg svg--plus\" viewBox=\"0 0 13 13\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <rect y=\"5\" width=\"13\" height=\"3\" fill=\"#C4C4C4\" />\n        <rect x=\"8\" width=\"13\" height=\"3\" transform=\"rotate(90 8 0)\" fill=\"#C4C4C4\" />\n      </svg>\n      ";
      calculatorEls.capitalSign.setAttribute('data-action', 'plus');
      console.log(calculatorEls.capitalSign);
    }
  });
};

exports.addCalcCapitalHandler = addCalcCapitalHandler;

var addCalcPositionHandler = function addCalcPositionHandler(handler) {
  [calculatorEls.positionEntryPrice, calculatorEls.positionRiskPercentage, calculatorEls.positionStopPrice].forEach(function (input) {
    input.addEventListener('keyup', function (e) {
      if (e.key === 'Tab' || !isFinite(e.key) && e.key !== 'Backspace') return;
      var formattedData = checkFieldsForData(calculatorEls.positionEntryPrice, calculatorEls.positionRiskPercentage, calculatorEls.positionStopPrice);
      handler(formattedData);
    });
  });
};

exports.addCalcPositionHandler = addCalcPositionHandler;

var addCalcRatioHandler = function addCalcRatioHandler(handler) {
  [calculatorEls.ratioEntryPrice, calculatorEls.ratioExitPrice, calculatorEls.ratioStopPrice].forEach(function (input) {
    input.addEventListener('keyup', function (e) {
      if (e.key === 'Tab' || !isFinite(e.key) && e.key !== 'Backspace') return;
      var formattedData = checkFieldsForData(calculatorEls.ratioEntryPrice, calculatorEls.ratioExitPrice, calculatorEls.ratioStopPrice);
      handler(formattedData);
    });
  });
};

exports.addCalcRatioHandler = addCalcRatioHandler;

var renderCapitalMessage = function renderCapitalMessage(arr) {
  var spanEls = calculatorEls.capitalMessage.querySelectorAll('span');
  spanEls[0].textContent = arr[0] === 'plus' ? 'added' : 'removed';
  spanEls[1].textContent = arr[1];
  spanEls[2].textContent = arr[2];
  calculatorEls.capitalMessage.classList.add('c-calculator-capital__message--is-active');
  setTimeout(function () {
    calculatorEls.capitalMessage.classList.remove('c-calculator-capital__message--is-active');
    calculatorEls.capitalInput.value = '';
  }, 6000);
};

exports.renderCapitalMessage = renderCapitalMessage;

var renderCalcResult = function renderCalcResult(result, el) {
  calculatorEls[el].value = result;
};

exports.renderCalcResult = renderCalcResult;

var clearCalcResult = function clearCalcResult(el) {
  calculatorEls[el].value = '';
};

exports.clearCalcResult = clearCalcResult;
},{}],"js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterNonStrings = exports.crunchData = exports.reduceData = exports.makeAbsolute = exports.stringifyNum = void 0;

var stringifyNum = function stringifyNum(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

exports.stringifyNum = stringifyNum;

var makeAbsolute = function makeAbsolute(num) {
  return Math.abs(num);
};

exports.makeAbsolute = makeAbsolute;

var reduceData = function reduceData(arr) {
  return arr.reduce(function (acc, num) {
    return acc + num;
  }, 0);
};

exports.reduceData = reduceData;

var crunchData = function crunchData(arr) {
  if (!Array.isArray(arr) || arr.length < 1) return [];
  var singleNumber = reduceData(arr);
  return (singleNumber / arr.length).toFixed(2);
};

exports.crunchData = crunchData;

var filterNonStrings = function filterNonStrings(arr) {
  var filtered = arr.filter(function (item) {
    return typeof item === 'string' || typeof item === 'number';
  }).map(function (item) {
    return +item;
  });
  if (filtered.length < 1) filtered = [0];
  return filtered;
};

exports.filterNonStrings = filterNonStrings;
},{}],"js/models/dataModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProfitableData = exports.updateMonthlyData = exports.updateCapital = exports.passNestedData = exports.passData = void 0;

var _helpers = require("./../helpers");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var user = {
  capital: 7000,
  overall: {
    total: 723,
    long: 395,
    short: 328
  },
  streak: {
    wins: {
      combo: 2,
      trades: [{
        ID: 'ZYRwa5z',
        ticker: 'NFLX',
        date: '14/06/21',
        profit: 253
      }, {
        ID: 'Y58P1M',
        ticker: 'BMBL',
        date: '15/06/21',
        profit: 312
      }]
    },
    losses: {
      combo: 2,
      trades: [{
        ID: 'ZYRwa5z',
        ticker: 'NFLX',
        date: '14/06/21',
        loss: 253
      }, {
        ID: 'Y58P1M',
        ticker: 'BMBL',
        date: '15/06/21',
        loss: 312
      }]
    },
    current: {
      combo: 1,
      type: 'wins',
      trades: [{
        ID: 'ZYRwa5z',
        ticker: 'NFLX',
        date: '14/06/21',
        profit: 253
      }]
    }
  },
  worstTrades: [{
    ID: 'ZYRwa5z',
    ticker: 'NFLX',
    date: '14/06/21',
    loss: 253
  }, {
    ID: 'Y58P1M1',
    ticker: 'BMBL',
    date: '15/06/21',
    loss: 312
  }],
  bestTrades: [{
    ID: 'ZYRwa5z',
    ticker: 'NFLX',
    date: '14/06/21',
    loss: 253
  }, {
    ID: 'Y58P1M1',
    ticker: 'BMBL',
    date: '15/06/21',
    loss: 312
  }],
  tickers: {
    AAL: {
      ticker: 'AAL',
      profitable: 0,
      trades: [{
        ID: '7Ft7s4w',
        shares: 60,
        result: 121,
        winPercentage: 1.44
      }, {
        ID: 'p8Hi52N',
        shares: 72,
        result: 118,
        winPercentage: 1.32
      }, {
        ID: 'Jk6sDew',
        shares: 70,
        result: -82,
        winPercentage: -1
      }]
    },
    AAPL: {
      ticker: 'AAPL',
      profitable: 0,
      trades: [{
        ID: 'QHnv65t',
        shares: 40,
        result: 175,
        winPercentage: 1.54
      }, {
        ID: 'kG24s8i',
        shares: 50,
        result: 125,
        winPercentage: 1.23
      }, {
        ID: 'Vz9qA1k',
        shares: 42,
        result: -102,
        winPercentage: -1.1
      }]
    }
  },
  profitable: {// BMBL: {
    //   totalProfit: 2780,
    //   totalShares: 312,
    //   avgReturn: 134,
    //   avgWinPercentage: 1.56,
    //   battingAvgPercentage: 64,
    //   winLossRatio: 3.11,
    // },
    // AAPL: {
    //   totalProfit: 2780,
    //   totalShares: 312,
    //   avgReturn: 134,
    //   avgWinPercentage: 1.56,
    //   battingAvgPercentage: 64,
    //   winLossRatio: 3.11,
    // },
  },
  monthlyData: {},
  calendarData: {
    jul21: [{
      ID: 'Kr92fYl',
      side: 'short',
      result: -90,
      resultPercentage: -0.9,
      date: '02/07/21'
    }, {
      ID: 'P9gHt21',
      side: 'long',
      result: -86,
      resultPercentage: -0.84,
      date: '07/07/21'
    }, {
      ID: 'K88spRl',
      side: 'long',
      result: 146,
      resultPercentage: 1.46,
      date: '15/07/21'
    }, {
      ID: 'Mn3z2pl',
      side: 'short',
      result: 67,
      resultPercentage: 0.63,
      date: '20/07/21'
    }],
    jun21: [{
      ID: 'OL4stW4',
      side: 'long',
      result: 240,
      resultPercentage: 1.83,
      date: '04/06/21'
    }, {
      ID: 'SLX8f6s',
      side: 'long',
      result: -130,
      resultPercentage: -1.92,
      date: '13/06/21'
    }, {
      ID: 'SLX8f6a',
      side: 'long',
      result: -130,
      resultPercentage: -1.92,
      date: '19/06/21'
    }, {
      ID: 'Qr4fG61',
      side: 'short',
      result: 106,
      resultPercentage: 1.02,
      date: '24/06/21'
    }],
    may21: [{
      ID: 'HR6q2pf',
      side: 'short',
      result: -160,
      resultPercentage: -1.42,
      date: '07/05/21'
    }, {
      ID: 'Gq9pd4H',
      side: 'short',
      result: -80,
      resultPercentage: -0.8,
      date: '11/05/21'
    }, {
      ID: 'Bd99sd1',
      side: 'long',
      result: 213,
      resultPercentage: 2.2,
      date: '19/05/21'
    }, {
      ID: 'lE59t6A',
      side: 'short',
      result: 110,
      resultPercentage: 1.1,
      date: '25/05/21'
    }]
  },
  journal: [{
    ID: 'Hf5t3q1',
    ticker: 'ROKU',
    date: '28/07/21',
    side: 'short',
    entries: [[180.75, 40], [180.9, 60]],
    exits: [[181.15, 20], [181.42, 20], [182.69, 60]],
    body: 'Commodo ullamcorper a lacus vestibulum sed. Non odio euismod lacinia at quis risus. Ultrices tincidunt arcu non sodales neque sodales. Sodales neque sodales ut etiam sit amet. Viverra orci sagittis eu volutpat. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Ultrices in iaculis nunc sed augue lacus viverra.'
  }, {
    ID: 'nC4s97Q',
    ticker: 'RIOT',
    date: '28/07/21',
    side: 'short',
    entries: [[22.31, 80], [22.41, 60]],
    exits: [[24.11, 40], [24.5, 50], [24.77, 50]],
    body: 'Quis varius quam quisque id diam vel quam. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et ultrices neque ornare aenean euismod elementum nisi quis. Amet luctus venenatis lectus magna fringilla urna porttitor. In est ante in nibh mauris cursus mattis.'
  }]
};
console.log(user);

var passData = function passData(field) {
  return user[field];
};

exports.passData = passData;

var passNestedData = function passNestedData(field, field2) {
  if (field2) {
    return _defineProperty({}, field2, user[field][field2]);
  } else {
    console.log('###~~~~####~~~~###');
    console.log(user[field]);
    return user[field];
  }
};

exports.passNestedData = passNestedData;

var updateCapital = function updateCapital(amount, action) {
  action = Math.abs(action);
  if (action === 'minus') user.capital -= amount;
  if (action === 'plus') user.capital += amount;
  if (user.capital < 0) user.capital = 0;
  return [action, (0, _helpers.stringifyNum)(amount), (0, _helpers.stringifyNum)(user.capital)];
};

exports.updateCapital = updateCapital;

var updateMonthlyData = function updateMonthlyData(obj) {
  Object.keys(obj).forEach(function (key) {
    user.monthlyData[key] = obj[key];
  });
  return user.monthlyData;
};

exports.updateMonthlyData = updateMonthlyData;

var updateProfitableData = function updateProfitableData(items) {
  items.forEach(function (item) {
    var _item = _slicedToArray(item, 2),
        newLeader = _item[0],
        oldLeader = _item[1];

    console.log('DESTRUCTURED ITEM');
    console.log(newLeader, oldLeader);
    if (oldLeader) delete user.profitable[oldLeader];

    if (newLeader) {
      var getTicker = Object.keys(newLeader)[0];
      user.profitable[getTicker] = newLeader[getTicker];
    }

    console.log('THIS IS THE FINAL STATE');
    console.log(user);
  });
  return user.profitable;
};

exports.updateProfitableData = updateProfitableData;
},{"./../helpers":"js/helpers.js"}],"js/models/calculatorsModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcRatioResult = exports.calcPositionResult = void 0;

var _helpers = require("../helpers");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var calcPositionResult = function calcPositionResult(accountCapital, dataArr) {
  var _dataArr = _slicedToArray(dataArr, 3),
      entry = _dataArr[0],
      risk = _dataArr[1],
      stop = _dataArr[2];

  var moneyRisk = accountCapital * (risk * 0.01);
  var stopDistance = (0, _helpers.makeAbsolute)(entry - stop);
  return stopDistance !== 0 ? Math.round(moneyRisk / stopDistance) : 0;
};

exports.calcPositionResult = calcPositionResult;

var calcRatioResult = function calcRatioResult(dataArr) {
  console.log('fresh array', dataArr);

  var _dataArr2 = _slicedToArray(dataArr, 3),
      entry = _dataArr2[0],
      exit = _dataArr2[1],
      stop = _dataArr2[2];

  if (dataArr.sort(function (a, b) {
    return a - b;
  }).indexOf(entry) !== 1) return;
  var exitDistance = (0, _helpers.makeAbsolute)(exit - entry);
  var stopDistance = (0, _helpers.makeAbsolute)(entry - stop);
  return (exitDistance / stopDistance).toFixed(2);
};

exports.calcRatioResult = calcRatioResult;
},{"../helpers":"js/helpers.js"}],"js/views/tableMonthlyView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMonthlyTable = exports.queryMonthlyEls = void 0;
var monthlyEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.monthlyTable = document.querySelector('.js-monthly-table');
  obj.monthlyTableHead = obj.monthlyTable.querySelector('.js-monthly-table-head');
  return obj;
};

var queryMonthlyEls = function queryMonthlyEls() {
  monthlyEls = getElements();
};

exports.queryMonthlyEls = queryMonthlyEls;

var renderMonthlyTable = function renderMonthlyTable(data) {
  var keys = Object.keys(data).reverse();
  keys.forEach(function (key) {
    var current = data[key];
    var html = "\n    <tr>\n        <th>".concat(current.total.month, "</th>\n        <td class=\"").concat(current.total.monthlyReturn >= 0 ? '' : 'negative', "\">").concat(current.total.monthlyReturn, "</td>\n        <td>").concat(current.total.totalTrades, "</td>\n        <td class=\"").concat(current.total.avgReturn >= 0 ? '' : 'negative', "\">").concat(current.total.avgReturn, "</td>\n        <td>").concat(+current.total.avgWinPercent, "%</td>\n        <td>").concat(+current.total.avgLossPercent, "%</td>\n        <td>").concat(+current.total.battingAvg, "%</td>\n        <td>").concat(current.total.winLossRatio, "</td>\n    </tr>\n    <tr>\n        <th>").concat(current.long.side, "</th>\n        <td class=\"").concat(current.long.monthlyReturn >= 0 ? '' : 'negative', "\">").concat(current.long.monthlyReturn, "</td>\n        <td>").concat(current.long.totalTrades, "</td>\n        <td class=\"").concat(current.long.avgReturn >= 0 ? '' : 'negative', "\">").concat(current.long.avgReturn, "</td>\n        <td>").concat(+current.long.avgWinPercent, "%</td>\n        <td>").concat(+current.long.avgLossPercent, "%</td>\n        <td>").concat(+current.long.battingAvg, "%</td>\n        <td>").concat(current.long.winLossRatio, "</td>\n    </tr>\n    <tr class=\"s-monthly__table-unit\">\n        <th>").concat(current.short.side, "</th>\n        <td class=\"").concat(current.short.monthlyReturn >= 0 ? '' : 'negative', "\">").concat(current.short.monthlyReturn, "</td>\n        <td>").concat(current.short.totalTrades, "</td>\n        <td class=\"").concat(current.short.avgReturn >= 0 ? '' : 'negative', "\">").concat(current.short.avgReturn, "</td>\n        <td>").concat(+current.short.avgWinPercent, "%</td>\n        <td>").concat(+current.short.avgLossPercent, "%</td>\n        <td>").concat(+current.short.battingAvg, "%</td>\n        <td>").concat(current.short.winLossRatio, "</td>\n    </tr>\n    ");
    monthlyEls.monthlyTableHead.insertAdjacentHTML('afterend', html);
  });
};

exports.renderMonthlyTable = renderMonthlyTable;
},{}],"js/views/tableProfitableView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderProfitableTable = exports.queryProfitableEls = void 0;
var profitableEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.profitableTable = document.querySelector('.js-profitable-table');
  obj.profitableTableHead = obj.profitableTable.querySelector('.js-profitable-table-head');
  return obj;
};

var queryProfitableEls = function queryProfitableEls() {
  profitableEls = getElements();
};

exports.queryProfitableEls = queryProfitableEls;

var renderProfitableTable = function renderProfitableTable(tableData) {
  console.log('THIS IS THE TABLE DATA');
  console.log(tableData);
  Object.keys(tableData).forEach(function (data) {
    var ticker = tableData[data];
    var html = "\n        <tr>\n            <th>".concat(data, "</th>\n            <td>").concat(ticker.totalProfit, "</td>\n            <td>").concat(ticker.totalTrades, "</td>\n            <td>").concat(ticker.avgReturn, "</td>\n            <td>").concat(ticker.avgWinPercent, "%</td>\n            <td>").concat(ticker.battingAvgPercent, "%</td>\n            <td>").concat(ticker.winLossRatio, "</td>\n        </tr>\n      ");
    profitableEls.profitableTableHead.insertAdjacentHTML('afterend', html);
  });
};

exports.renderProfitableTable = renderProfitableTable;
},{}],"js/models/tableMonthlyModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeMonthlyData = void 0;

var _helpers = require("../helpers");

// import { reduce } from 'core-js/core/array';
var createPlaceholderObj = function createPlaceholderObj(current, key) {
  return {
    total: {
      month: key,
      monthlyReturn: [0],
      totalTrades: current.length,
      avgReturn: [],
      avgWinPercent: [],
      avgLossPercent: [],
      profitableNumber: 0,
      battingAvg: 0,
      winLossRatio: []
    },
    long: {
      side: 'long',
      monthlyReturn: [0],
      totalTrades: 0,
      avgReturn: [],
      avgWinPercent: [],
      avgLossPercent: [],
      profitableNumber: 0,
      battingAvg: [],
      winLossRatio: []
    },
    short: {
      side: 'short',
      monthlyReturn: [0],
      totalTrades: 0,
      avgReturn: [],
      avgWinPercent: [],
      avgLossPercent: [],
      profitableNumber: 0,
      battingAvg: [],
      winLossRatio: []
    }
  };
};

var calcBattingAvg = function calcBattingAvg(profitable, total) {
  return Math.round(profitable / total * 100);
};

var calcWinLossRatio = function calcWinLossRatio(profitable, total) {
  if (profitable === total) total++;
  return (profitable / (total - profitable)).toFixed(2);
};

var computeMonthlyData = function computeMonthlyData(rawData) {
  var formattedMonths = {};
  var keys = Object.keys(rawData);
  keys.forEach(function (key) {
    var currentMonth = rawData[key];
    var tableUnit = createPlaceholderObj(currentMonth, key);
    currentMonth.forEach(function (trade) {
      var currentSide; // decided which object to add data to

      if (trade.side === 'long') currentSide = tableUnit.long;else if (trade.side === 'short') currentSide = tableUnit.short;
      currentSide.monthlyReturn.push(trade.result); // monthly return

      currentSide.totalTrades++; // total trades

      currentSide.avgReturn.push(trade.result); // avg Return
      // avg win and loss %

      if (trade.resultPercentage >= 0) {
        currentSide.avgWinPercent.push(trade.resultPercentage);
        tableUnit.total.profitableNumber++;
        currentSide.profitableNumber++;
      } else if (trade.resultPercentage <= 0) {
        currentSide.avgLossPercent.push(trade.resultPercentage);
      }
    }); // crunch the array data into single numbers

    tableUnit.long.monthlyReturn = (0, _helpers.reduceData)(tableUnit.long.monthlyReturn);
    tableUnit.long.avgReturn = (0, _helpers.crunchData)(tableUnit.long.avgReturn);
    tableUnit.long.avgWinPercent = (0, _helpers.crunchData)(tableUnit.long.avgWinPercent);
    tableUnit.long.avgLossPercent = (0, _helpers.crunchData)(tableUnit.long.avgLossPercent);
    tableUnit.short.monthlyReturn = (0, _helpers.reduceData)(tableUnit.short.avgReturn);
    tableUnit.short.avgReturn = (0, _helpers.crunchData)(tableUnit.short.avgReturn);
    tableUnit.short.avgWinPercent = (0, _helpers.crunchData)(tableUnit.short.avgWinPercent);
    tableUnit.short.avgLossPercent = (0, _helpers.crunchData)(tableUnit.short.avgLossPercent);
    tableUnit.total.monthlyReturn = (0, _helpers.reduceData)([tableUnit.long.monthlyReturn, tableUnit.short.monthlyReturn]);
    tableUnit.total.avgReturn = (0, _helpers.crunchData)((0, _helpers.filterNonStrings)([tableUnit.long.avgReturn, tableUnit.short.avgReturn]));
    tableUnit.total.avgWinPercent = (0, _helpers.crunchData)((0, _helpers.filterNonStrings)([tableUnit.long.avgWinPercent, tableUnit.short.avgWinPercent]));
    tableUnit.total.avgLossPercent = (0, _helpers.crunchData)((0, _helpers.filterNonStrings)([tableUnit.long.avgLossPercent, tableUnit.short.avgLossPercent])); // batting avg %

    tableUnit.long.battingAvg = calcBattingAvg(tableUnit.long.profitableNumber, tableUnit.long.totalTrades);
    tableUnit.short.battingAvg = calcBattingAvg(tableUnit.short.profitableNumber, tableUnit.short.totalTrades);
    tableUnit.total.battingAvg = calcBattingAvg(tableUnit.total.profitableNumber, tableUnit.total.totalTrades); // win loss ratio

    tableUnit.long.winLossRatio = calcWinLossRatio(tableUnit.long.profitableNumber, tableUnit.long.totalTrades);
    tableUnit.short.winLossRatio = calcWinLossRatio(tableUnit.short.profitableNumber, tableUnit.short.totalTrades);
    tableUnit.total.winLossRatio = calcWinLossRatio(tableUnit.total.profitableNumber, tableUnit.total.totalTrades);
    formattedMonths[key] = tableUnit;
  });
  return formattedMonths;
};

exports.computeMonthlyData = computeMonthlyData;
},{"../helpers":"js/helpers.js"}],"js/models/tableProfitableModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAgainstLeaders = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var convertToLeader = function convertToLeader(data) {
  var ticker = data.ticker;

  var formattedLeader = _defineProperty({}, ticker, {
    totalTrades: data.trades.length,
    profitable: 0,
    totalProfit: 0,
    totalShares: 0,
    avgReturn: 0,
    avgWinPercent: 0,
    battingAvgPercent: 0,
    winLossRatio: 0
  });

  var current = formattedLeader[ticker];
  var tradeResults = data.trades.map(function (trade) {
    return trade.result;
  });
  var totalProfit = tradeResults.reduce(function (acc, num) {
    return acc + num;
  }, 0);
  var totalShares = data.trades.map(function (trade) {
    return trade.shares;
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0);
  var winPercentTrades = data.trades.map(function (trade) {
    return trade.winPercentage;
  }).filter(function (percent) {
    return percent >= 0;
  });
  current.totalProfit = totalProfit;
  current.totalShares = totalShares;
  current.avgReturn = +(totalProfit / current.totalTrades).toFixed(0);
  current.avgWinPercent = winPercentTrades.reduce(function (acc, num) {
    return acc + num;
  }) / winPercentTrades.length;
  current.profitable = winPercentTrades.length;
  current.battingAvgPercent = +(current.profitable / current.totalTrades * 100).toFixed(2);
  current.winLossRatio = +(current.profitable / (current.totalTrades - current.profitable)).toFixed(2);
  return formattedLeader;
};

var checkAgainstLeaders = function checkAgainstLeaders(leaders, dataArr) {
  console.log('~~~~~~~~~~~~~');
  console.log(dataArr);
  console.log(leaders);
  var newLeadersArr = [];
  Object.keys(dataArr[0]).forEach(function (key) {
    var data = dataArr[0][key];
    var newLeader;
    var leaderSmallestAvg;
    console.log('this iS THE data');
    console.log(data);
    if (data.trades.length < 3) return {
      newLeader: newLeader,
      leaderSmallestAvg: leaderSmallestAvg
    }; // check if number of trades is greater than three

    var leaderTickers = Object.keys(leaders);
    var leaderAvgReturn = []; // calculate avg wi percentage on the new data

    var avgWinPercent = (data.trades.map(function (trade) {
      return trade.winPercentage;
    }).reduce(function (acc, num) {
      return acc + num;
    }, 0) / data.trades.length).toFixed(2); // if the length of the leader tickers array is bigger than 6, push the avg return of each leader to an array
    // sort the array so that the leader with the smallest avgWinPercent is first
    // Compare the smallest leader to current data
    // if the avgWinPercent of the current data is larger than the smallest leader, create a new leader

    if (leaderTickers.length >= 6) {
      leaderTickers.forEach(function (ticker) {
        leaderAvgReturn.push([leaders[ticker].avgWinPercent, ticker]);
      });
      leaderSmallestAvg = leaderAvgReturn.sort(function (a, b) {
        return a[0] - b[0];
      })[0];
      if (avgWinPercent > leaderSmallestAvg) newLeader = convertToLeader(data);
    } // if the length of the leader tickers array is smaller than six, create a new leader


    if (leaderTickers.length < 6) {
      newLeader = convertToLeader(data);
      console.log(newLeader);
    }

    console.log('this is the new leader');
    console.log(newLeader);
    newLeadersArr.push([newLeader, leaderSmallestAvg]);
  });
  return newLeadersArr;
};

exports.checkAgainstLeaders = checkAgainstLeaders;
},{}],"js/controller.js":[function(require,module,exports) {
"use strict";

var _calculatorsView = require("./views/calculatorsView");

var _dataModel = require("./models/dataModel");

var _calculatorsModel = require("./models/calculatorsModel");

var _tableMonthlyView = require("./views/tableMonthlyView");

var _tableProfitableView = require("./views/tableProfitableView");

var _tableMonthlyModel = require("./models/tableMonthlyModel");

var _tableProfitableModel = require("./models/tableProfitableModel");

// ZONE - controllers
var controlCalcCapital = function controlCalcCapital(amount, action) {
  (0, _calculatorsView.renderCapitalMessage)((0, _dataModel.updateCapital)(amount, action));
};

var controlCalcPosition = function controlCalcPosition(data) {
  if (!data) return (0, _calculatorsView.clearCalcResult)('positionResult');
  var positionResult = (0, _calculatorsModel.calcPositionResult)((0, _dataModel.passData)('capital'), data);
  if (isNaN(positionResult)) return;
  (0, _calculatorsView.renderCalcResult)(positionResult, 'positionResult');
};

var controlCalcRatio = function controlCalcRatio(data) {
  if (!data) return (0, _calculatorsView.clearCalcResult)('ratioResult');
  var ratioResult = (0, _calculatorsModel.calcRatioResult)(data);
  if (isNaN(ratioResult) || !ratioResult) return (0, _calculatorsView.clearCalcResult)('ratioResult');
  (0, _calculatorsView.renderCalcResult)(ratioResult, 'ratioResult');
};

var controlMonthlyRender = function controlMonthlyRender() {
  var computedData = (0, _tableMonthlyModel.computeMonthlyData)((0, _dataModel.passData)('calendarData'));
  (0, _tableMonthlyView.renderMonthlyTable)((0, _dataModel.updateMonthlyData)(computedData));
};

var controlProfitableRender = function controlProfitableRender() {
  var newProfitable = (0, _tableProfitableModel.checkAgainstLeaders)((0, _dataModel.passData)('profitable'), [(0, _dataModel.passNestedData)('tickers', '')]);
  var tableData = (0, _dataModel.updateProfitableData)(newProfitable);
  (0, _tableProfitableView.renderProfitableTable)(tableData);
}; // ZONE - event listeners


window.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOM app is loaded');
  (0, _calculatorsView.queryCalcEls)();
  (0, _tableMonthlyView.queryMonthlyEls)();
  (0, _tableProfitableView.queryProfitableEls)();
  controlMonthlyRender();
  controlProfitableRender();
  (0, _calculatorsView.addCalcPositionHandler)(controlCalcPosition);
  (0, _calculatorsView.addCalcRatioHandler)(controlCalcRatio);
  (0, _calculatorsView.addCalcCapitalHandler)(controlCalcCapital);
});
},{"./views/calculatorsView":"js/views/calculatorsView.js","./models/dataModel":"js/models/dataModel.js","./models/calculatorsModel":"js/models/calculatorsModel.js","./views/tableMonthlyView":"js/views/tableMonthlyView.js","./views/tableProfitableView":"js/views/tableProfitableView.js","./models/tableMonthlyModel":"js/models/tableMonthlyModel.js","./models/tableProfitableModel":"js/models/tableProfitableModel.js"}],"../../../Users/Patryk/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52124" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/Patryk/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","js/controller.js"], null)
//# sourceMappingURL=/controller.f22f2928.js.map