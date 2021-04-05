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
    } else {
      calculatorEls.capitalSign.innerHTML = "\n      <svg class=\"svg svg--plus\" viewBox=\"0 0 13 13\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <rect y=\"5\" width=\"13\" height=\"3\" fill=\"#C4C4C4\" />\n        <rect x=\"8\" width=\"13\" height=\"3\" transform=\"rotate(90 8 0)\" fill=\"#C4C4C4\" />\n      </svg>\n      ";
      calculatorEls.capitalSign.setAttribute('data-action', 'plus');
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
exports.getTodayShortDate = exports.kFormatter = exports.filterNonStrings = exports.crunchData = exports.reduceData = exports.makeAbsolute = exports.stringifyNum = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var kFormatter = function kFormatter(num) {
  var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 999;
  if (!num) return 0;
  return Math.abs(num) > decimal ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(2) + 'k' : Math.sign(num) * Math.abs(num);
};

exports.kFormatter = kFormatter;

var getTodayShortDate = function getTodayShortDate() {
  var _Date$toLocaleDateStr = new Date().toLocaleDateString('en-US').split('/'),
      _Date$toLocaleDateStr2 = _slicedToArray(_Date$toLocaleDateStr, 3),
      month = _Date$toLocaleDateStr2[0],
      date = _Date$toLocaleDateStr2[1],
      year = _Date$toLocaleDateStr2[2];

  var joinedDate = date + '/' + month + '/' + year;
  return joinedDate;
};

exports.getTodayShortDate = getTodayShortDate;
},{}],"js/models/dataModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findJournalEntry = exports.updateProfitableData = exports.updateMonthlyData = exports.updateCapital = exports.passNestedData = exports.passData = void 0;

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
    proportions: [{
      side: 'long',
      total: 395
    }, {
      side: 'short',
      total: 328
    }]
  },
  streaks: {
    wins: {
      trades: [{
        id: 'ZYRwa5z',
        ticker: 'NFLX',
        date: '14/06/21',
        profit: 253
      }, {
        id: 'Y58P1M',
        ticker: 'BMBL',
        date: '15/06/21',
        profit: 312
      }]
    },
    losses: {
      trades: [{
        id: 'liJ56D3',
        ticker: 'AMZN',
        date: '12/08/21',
        loss: -90
      }, {
        id: 'Y58P1M',
        ticker: 'X',
        date: '21/07/21',
        loss: -112
      }]
    },
    current: {
      trades: [{
        id: 'ZYRwa5z',
        ticker: 'NFLX',
        date: '14/06/21',
        profit: 253
      }]
    }
  },
  worstTrades: [{
    id: 'ZYRwa5z',
    ticker: 'NFLX',
    date: '14/06/21',
    loss: 253
  }, {
    id: 'Y58P1M1',
    ticker: 'BMBL',
    date: '15/06/21',
    loss: 312
  }],
  bestTrades: [{
    id: 'ZYRwa5z',
    ticker: 'NFLX',
    date: '14/06/21',
    loss: 253
  }, {
    id: 'Y58P1M1',
    ticker: 'BMBL',
    date: '15/06/21',
    loss: 312
  }],
  tickers: {
    AAL: {
      ticker: 'AAL',
      profitable: 0,
      trades: [{
        id: '7Ft7s4w',
        shares: 60,
        result: 121,
        winPercentage: 1.44
      }, {
        id: 'p8Hi52N',
        shares: 72,
        result: 118,
        winPercentage: 1.32
      }, {
        id: 'Jk6sDew',
        shares: 70,
        result: -82,
        winPercentage: -1
      }]
    },
    AAPL: {
      ticker: 'AAPL',
      profitable: 0,
      trades: [{
        id: 'QHnv65t',
        shares: 40,
        result: 175,
        winPercentage: 1.54
      }, {
        id: 'kG24s8i',
        shares: 50,
        result: 125,
        winPercentage: 1.23
      }, {
        id: 'Vz9qA1k',
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
      id: 'Kr92fYl',
      side: 'short',
      result: -90,
      resultPercentage: -0.9,
      date: '02/07/21'
    }, {
      id: 'P9gHt21',
      side: 'long',
      result: -86,
      resultPercentage: -0.84,
      date: '07/07/21'
    }, {
      id: 'K88spRl',
      side: 'long',
      result: 146,
      resultPercentage: 1.46,
      date: '15/07/21'
    }, {
      id: 'Mn3z2pl',
      side: 'short',
      result: 67,
      resultPercentage: 0.63,
      date: '20/07/21'
    }],
    jun21: [{
      id: 'OL4stW4',
      side: 'long',
      result: 240,
      resultPercentage: 1.83,
      date: '04/06/21'
    }, {
      id: 'SLX8f6s',
      side: 'long',
      result: -130,
      resultPercentage: -1.92,
      date: '13/06/21'
    }, {
      id: 'SLX8f6a',
      side: 'long',
      result: -130,
      resultPercentage: -1.92,
      date: '19/06/21'
    }, {
      id: 'Qr4fG61',
      side: 'short',
      result: 106,
      resultPercentage: 1.02,
      date: '24/06/21'
    }],
    may21: [{
      id: 'HR6q2pf',
      side: 'short',
      result: -160,
      resultPercentage: -1.42,
      date: '07/05/21'
    }, {
      id: 'Gq9pd4H',
      side: 'short',
      result: -80,
      resultPercentage: -0.8,
      date: '11/05/21'
    }, {
      id: 'Bd99sd1',
      side: 'long',
      result: 213,
      resultPercentage: 2.2,
      date: '19/05/21'
    }, {
      id: 'lE59t6A',
      side: 'short',
      result: 110,
      resultPercentage: 1.1,
      date: '25/05/21'
    }]
  },
  journal: [{
    id: 'Hf5t3q1',
    ticker: 'ROKU',
    shortDate: '28/07/21',
    side: 'short',
    sharesAmount: 100,
    avgEntry: 180.84,
    avgExit: 181.9,
    return: 112.52,
    returnPercent: 1.63,
    tradeEntries: [[180.75, 40], [180.9, 60]],
    tradeExits: [[181.15, 20], [181.42, 20], [182.69, 60]],
    body: 'Commodo ullamcorper a lacus vestibulum sed. Non odio euismod lacinia at quis risus. Ultrices tincidunt arcu non sodales neque sodales. Sodales neque sodales ut etiam sit amet. Viverra orci sagittis eu volutpat. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Ultrices in iaculis nunc sed augue lacus viverra.'
  }, {
    id: 'Hf5t3p1',
    ticker: 'RIOT',
    shortDate: '29/07/21',
    side: 'short',
    sharesAmount: 100,
    avgEntry: 180.84,
    avgExit: 181.9,
    return: 112.52,
    returnPercent: 1.63,
    tradeEntries: [[180.75, 40], [180.9, 60]],
    tradeExits: [[181.15, 20], [181.42, 20], [182.69, 60]],
    body: 'Commodo ullamcorper a lacus vestibulum sed. Non odio euismod lacinia at quis risus. Ultrices tincidunt arcu non sodales neque sodales. Sodales neque sodales ut etiam sit amet. Viverra orci sagittis eu volutpat. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Ultrices in iaculis nunc sed augue lacus viverra.'
  }, {
    id: 'Hf5t3s1',
    ticker: 'MSFT',
    shortDate: '30/07/21',
    side: 'short',
    sharesAmount: 110,
    avgEntry: 180.84,
    avgExit: 181.9,
    return: 112.52,
    returnPercent: 1.63,
    tradeEntries: [[180.75, 50], [180.9, 60]],
    tradeExits: [[181.15, 20], [181.42, 20], [182.69, 70]],
    body: 'Commodo ullamcorper a lacus vestibulum sed. Non odio euismod lacinia at quis risus. Ultrices tincidunt arcu non sodales neque sodales. Sodales neque sodales ut etiam sit amet. Viverra orci sagittis eu volutpat. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Ultrices in iaculis nunc sed augue lacus viverra.'
  }],
  dummyJournal: [{
    id: '',
    ticker: '',
    shortDate: '',
    side: '',
    sharesAmount: '',
    avgEntry: '',
    avgExit: '',
    return: '',
    returnPercent: '',
    tradeEntries: [['', '']],
    tradeExits: [['', '']],
    body: ''
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
    return user[field];
  }
};

exports.passNestedData = passNestedData;

var updateCapital = function updateCapital(amount, action) {
  if (action === 'minus') user.capital -= amount;
  if (action === 'plus') user.capital += amount;
  if (user.capital < 0) user.capital = 0;
  console.log(user);
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

    if (oldLeader) delete user.profitable[oldLeader];

    if (newLeader) {
      var getTicker = Object.keys(newLeader)[0];
      user.profitable[getTicker] = newLeader[getTicker];
    }
  });
  return user.profitable;
};

exports.updateProfitableData = updateProfitableData;

var findJournalEntry = function findJournalEntry(id) {
  if (!id) return;
  return user.journal.filter(function (entry) {
    return entry.id === id;
  });
  s;
};

exports.findJournalEntry = findJournalEntry;
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

var _helpers = require("../helpers");

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
  Object.keys(tableData).forEach(function (data) {
    var ticker = tableData[data];
    var html = "\n        <tr>\n            <th>".concat(data, "</th>\n            <td>").concat(ticker.totalProfit, "</td>\n            <td>").concat(ticker.totalTrades, "/").concat((0, _helpers.kFormatter)(ticker.totalShares, 9999), "</td>\n            <td>").concat(ticker.avgReturn, "</td>\n            <td>").concat(ticker.avgWinPercent, "%</td>\n            <td>").concat(ticker.battingAvgPercent, "%</td>\n            <td>").concat(ticker.winLossRatio, "</td>\n        </tr>\n      ");
    profitableEls.profitableTableHead.insertAdjacentHTML('afterend', html);
  });
};

exports.renderProfitableTable = renderProfitableTable;
},{"../helpers":"js/helpers.js"}],"js/views/chartOverallView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLongShortPie = exports.renderStreaks = exports.clearLongShortCanvas = exports.queryOverallEls = void 0;

var _helpers = require("../helpers");

var overallEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.pieStreakCard = document.querySelector('.js-pie-streak');
  obj.shortLongCanvas = document.querySelector('.js-pie-canvas');
  obj.winStreakDate = obj.pieStreakCard.querySelector('.js-win-streak-date');
  obj.winStreakTotal = obj.pieStreakCard.querySelector('.js-win-streak-total');
  obj.winStreakProfit = obj.pieStreakCard.querySelector('.js-win-streak-profit');
  obj.lossStreakDate = obj.pieStreakCard.querySelector('.js-loss-streak-date');
  obj.lossStreakTotal = obj.pieStreakCard.querySelector('.js-loss-streak-total');
  obj.lossStreakProfit = obj.pieStreakCard.querySelector('.js-loss-streak-profit');
  return obj;
};

var queryOverallEls = function queryOverallEls() {
  overallEls = getElements();
};

exports.queryOverallEls = queryOverallEls;

var clearLongShortCanvas = function clearLongShortCanvas() {
  overallEls.shortLongCanvas.innerHTML = '';
};

exports.clearLongShortCanvas = clearLongShortCanvas;

var renderStreaks = function renderStreaks(data) {
  overallEls.winStreakTotal.textContent = data.wins.trades.length;
  overallEls.winStreakProfit.textContent = data.wins.trades.map(function (trade) {
    return trade.profit;
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0);
  overallEls.winStreakDate.textContent = "".concat(data.wins.trades[0].date, " - ").concat(data.wins.trades[data.wins.trades.length - 1].date);
  overallEls.lossStreakTotal.textContent = data.losses.trades.length;
  overallEls.lossStreakProfit.textContent = data.losses.trades.map(function (trade) {
    return trade.loss;
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0);
  overallEls.lossStreakDate.textContent = "".concat(data.losses.trades[0].date, " - ").concat(data.losses.trades[data.losses.trades.length - 1].date);
}; // ZONE - D3


exports.renderStreaks = renderStreaks;
var pieData = [];

var renderLongShortPie = function renderLongShortPie(passedData) {
  if (passedData) {
    pieData = passedData;
    clearLongShortCanvas();
  } else {
    passedData = pieData;
  }

  var canvasRect = overallEls.shortLongCanvas.getBoundingClientRect(); // create room for axes

  var margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  var graphWidth = canvasRect.width - margin.left - margin.right;
  var graphHeight = canvasRect.height - margin.top - margin.bottom;
  var graphRadius = canvasRect.height / 2.4;
  var graphCenter = {
    x: graphWidth / 2,
    y: graphHeight / 2
  };
  var totalTrades;

  if (passedData[1]) {
    totalTrades = passedData[0].total + passedData[1].total;
  } else {
    totalTrades = passedData[0];
  }

  var svg = d3.select('.js-pie-canvas').append('svg').attr('width', '100%').attr('height', graphHeight); // create a group to contain all graph elements

  var graph = svg.append('g').attr('transform', "translate(".concat(graphCenter.x, ", ").concat(graphCenter.y, ")"));
  var pie = d3.pie().sort(null).value(function (d) {
    return d.total;
  }); // arc generator needs to know the start and end angles, which is why we created the pie function

  var arcPath = d3.arc().outerRadius(graphRadius).innerRadius(graphRadius / 4); // ZONE - update function

  var updateLongShortPie = function updateLongShortPie(passedData) {
    // join enhanced pie data to path elements
    var paths = graph.selectAll('path').data(pie(passedData)); // remove unwanted paths

    paths.exit().remove(); // enter elements

    paths.enter().append('path').attr('class', 'pie-section').attr('d', arcPath); // existing DOM elements

    paths.attr('d', arcPath);
  };

  updateLongShortPie(passedData);
};

exports.renderLongShortPie = renderLongShortPie;
},{"../helpers":"js/helpers.js"}],"js/models/tableMonthlyModel.js":[function(require,module,exports) {
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
  var newLeadersArr = [];
  Object.keys(dataArr[0]).forEach(function (key) {
    var data = dataArr[0][key];
    var newLeader;
    var leaderSmallestAvg;
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
    }

    newLeadersArr.push([newLeader, leaderSmallestAvg]);
  });
  return newLeadersArr;
};

exports.checkAgainstLeaders = checkAgainstLeaders;
},{}],"../node_modules/d3-path/src/path.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const pi = Math.PI,
      tau = 2 * pi,
      epsilon = 1e-6,
      tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath

  this._ = "";
}

function path() {
  return new Path();
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function (x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function () {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function (x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function (x1, y1, x, y) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function (x1, y1, x2, y2, x, y) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function (x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01; // Is the radius negative? Error.

    if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x1,y1).

    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) ; // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
          this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
        } // Otherwise, draw an arc!
        else {
            var x20 = x2 - x0,
                y20 = y2 - y0,
                l21_2 = x21 * x21 + y21 * y21,
                l20_2 = x20 * x20 + y20 * y20,
                l21 = Math.sqrt(l21_2),
                l01 = Math.sqrt(l01_2),
                l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
                t01 = l / l01,
                t21 = l / l21; // If the start tangent is not coincident with (x0,y0), line to.

            if (Math.abs(t01 - 1) > epsilon) {
              this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
            }

            this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
          }
  },
  arc: function (x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0; // Is the radius negative? Error.

    if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x0,y0).

    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
        this._ += "L" + x0 + "," + y0;
      } // Is this arc empty? We’re done.


    if (!r) return; // Does the angle go the wrong way? Flip the direction.

    if (da < 0) da = da % tau + tau; // Is this a complete circle? Draw two arcs to complete the circle.

    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
        this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
      }
  },
  rect: function (x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
  },
  toString: function () {
    return this._;
  }
};
var _default = path;
exports.default = _default;
},{}],"../node_modules/d3-path/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "path", {
  enumerable: true,
  get: function () {
    return _path.default;
  }
});

var _path = _interopRequireDefault(require("./path.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./path.js":"../node_modules/d3-path/src/path.js"}],"../node_modules/d3-shape/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function constant() {
    return x;
  };
}
},{}],"../node_modules/d3-shape/src/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acos = acos;
exports.asin = asin;
exports.tau = exports.halfPi = exports.pi = exports.epsilon = exports.sqrt = exports.sin = exports.min = exports.max = exports.cos = exports.atan2 = exports.abs = void 0;
var abs = Math.abs;
exports.abs = abs;
var atan2 = Math.atan2;
exports.atan2 = atan2;
var cos = Math.cos;
exports.cos = cos;
var max = Math.max;
exports.max = max;
var min = Math.min;
exports.min = min;
var sin = Math.sin;
exports.sin = sin;
var sqrt = Math.sqrt;
exports.sqrt = sqrt;
var epsilon = 1e-12;
exports.epsilon = epsilon;
var pi = Math.PI;
exports.pi = pi;
var halfPi = pi / 2;
exports.halfPi = halfPi;
var tau = 2 * pi;
exports.tau = tau;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}
},{}],"../node_modules/d3-shape/src/arc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Path = require("d3-path");

var _constant = _interopRequireDefault(require("./constant.js"));

var _math = require("./math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0,
      y10 = y1 - y0,
      x32 = x3 - x2,
      y32 = y3 - y2,
      t = y32 * x10 - x32 * y10;
  if (t * t < _math.epsilon) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
} // Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html


function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / (0, _math.sqrt)(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * (0, _math.sqrt)((0, _math.max)(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00; // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?

  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

function _default() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = (0, _constant.default)(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - _math.halfPi,
        a1 = endAngle.apply(this, arguments) - _math.halfPi,
        da = (0, _math.abs)(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = (0, _d3Path.path)(); // Ensure that the outer radius is always larger than the inner radius.

    if (r1 < r0) r = r1, r1 = r0, r0 = r; // Is it a point?

    if (!(r1 > _math.epsilon)) context.moveTo(0, 0); // Or is it a circle or annulus?
    else if (da > _math.tau - _math.epsilon) {
        context.moveTo(r1 * (0, _math.cos)(a0), r1 * (0, _math.sin)(a0));
        context.arc(0, 0, r1, a0, a1, !cw);

        if (r0 > _math.epsilon) {
          context.moveTo(r0 * (0, _math.cos)(a1), r0 * (0, _math.sin)(a1));
          context.arc(0, 0, r0, a1, a0, cw);
        }
      } // Or is it a circular or annular sector?
      else {
          var a01 = a0,
              a11 = a1,
              a00 = a0,
              a10 = a1,
              da0 = da,
              da1 = da,
              ap = padAngle.apply(this, arguments) / 2,
              rp = ap > _math.epsilon && (padRadius ? +padRadius.apply(this, arguments) : (0, _math.sqrt)(r0 * r0 + r1 * r1)),
              rc = (0, _math.min)((0, _math.abs)(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
              rc0 = rc,
              rc1 = rc,
              t0,
              t1; // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.

          if (rp > _math.epsilon) {
            var p0 = (0, _math.asin)(rp / r0 * (0, _math.sin)(ap)),
                p1 = (0, _math.asin)(rp / r1 * (0, _math.sin)(ap));
            if ((da0 -= p0 * 2) > _math.epsilon) p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;else da0 = 0, a00 = a10 = (a0 + a1) / 2;
            if ((da1 -= p1 * 2) > _math.epsilon) p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;else da1 = 0, a01 = a11 = (a0 + a1) / 2;
          }

          var x01 = r1 * (0, _math.cos)(a01),
              y01 = r1 * (0, _math.sin)(a01),
              x10 = r0 * (0, _math.cos)(a10),
              y10 = r0 * (0, _math.sin)(a10); // Apply rounded corners?

          if (rc > _math.epsilon) {
            var x11 = r1 * (0, _math.cos)(a11),
                y11 = r1 * (0, _math.sin)(a11),
                x00 = r0 * (0, _math.cos)(a00),
                y00 = r0 * (0, _math.sin)(a00),
                oc; // Restrict the corner radius according to the sector angle.

            if (da < _math.pi && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
              var ax = x01 - oc[0],
                  ay = y01 - oc[1],
                  bx = x11 - oc[0],
                  by = y11 - oc[1],
                  kc = 1 / (0, _math.sin)((0, _math.acos)((ax * bx + ay * by) / ((0, _math.sqrt)(ax * ax + ay * ay) * (0, _math.sqrt)(bx * bx + by * by))) / 2),
                  lc = (0, _math.sqrt)(oc[0] * oc[0] + oc[1] * oc[1]);
              rc0 = (0, _math.min)(rc, (r0 - lc) / (kc - 1));
              rc1 = (0, _math.min)(rc, (r1 - lc) / (kc + 1));
            }
          } // Is the sector collapsed to a line?


          if (!(da1 > _math.epsilon)) context.moveTo(x01, y01); // Does the sector’s outer ring have rounded corners?
          else if (rc1 > _math.epsilon) {
              t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
              t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
              context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01); // Have the corners merged?

              if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, (0, _math.atan2)(t0.y01, t0.x01), (0, _math.atan2)(t1.y01, t1.x01), !cw); // Otherwise, draw the two corners and the ring.
              else {
                  context.arc(t0.cx, t0.cy, rc1, (0, _math.atan2)(t0.y01, t0.x01), (0, _math.atan2)(t0.y11, t0.x11), !cw);
                  context.arc(0, 0, r1, (0, _math.atan2)(t0.cy + t0.y11, t0.cx + t0.x11), (0, _math.atan2)(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
                  context.arc(t1.cx, t1.cy, rc1, (0, _math.atan2)(t1.y11, t1.x11), (0, _math.atan2)(t1.y01, t1.x01), !cw);
                }
            } // Or is the outer ring just a circular arc?
            else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw); // Is there no inner ring, and it’s a circular sector?
          // Or perhaps it’s an annular sector collapsed due to padding?

          if (!(r0 > _math.epsilon) || !(da0 > _math.epsilon)) context.lineTo(x10, y10); // Does the sector’s inner ring (or point) have rounded corners?
          else if (rc0 > _math.epsilon) {
              t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
              t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
              context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01); // Have the corners merged?

              if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, (0, _math.atan2)(t0.y01, t0.x01), (0, _math.atan2)(t1.y01, t1.x01), !cw); // Otherwise, draw the two corners and the ring.
              else {
                  context.arc(t0.cx, t0.cy, rc0, (0, _math.atan2)(t0.y01, t0.x01), (0, _math.atan2)(t0.y11, t0.x11), !cw);
                  context.arc(0, 0, r0, (0, _math.atan2)(t0.cy + t0.y11, t0.cx + t0.x11), (0, _math.atan2)(t1.cy + t1.y11, t1.cx + t1.x11), cw);
                  context.arc(t1.cx, t1.cy, rc0, (0, _math.atan2)(t1.y11, t1.x11), (0, _math.atan2)(t1.y01, t1.x01), !cw);
                }
            } // Or is the inner ring just a circular arc?
            else context.arc(0, 0, r0, a10, a00, cw);
        }
    context.closePath();
    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function () {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - _math.pi / 2;
    return [(0, _math.cos)(a) * r, (0, _math.sin)(a) * r];
  };

  arc.innerRadius = function (_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : innerRadius;
  };

  arc.outerRadius = function (_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function (_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : cornerRadius;
  };

  arc.padRadius = function (_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : padRadius;
  };

  arc.startAngle = function (_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : startAngle;
  };

  arc.endAngle = function (_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : endAngle;
  };

  arc.padAngle = function (_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : padAngle;
  };

  arc.context = function (_) {
    return arguments.length ? (context = _ == null ? null : _, arc) : context;
  };

  return arc;
}
},{"d3-path":"../node_modules/d3-path/src/index.js","./constant.js":"../node_modules/d3-shape/src/constant.js","./math.js":"../node_modules/d3-shape/src/math.js"}],"../node_modules/d3-shape/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.slice = void 0;
var slice = Array.prototype.slice;
exports.slice = slice;

function _default(x) {
  return typeof x === "object" && "length" in x ? x // Array, TypedArray, NodeList, array-like
  : Array.from(x); // Map, Set, iterable, string, or anything else
}
},{}],"../node_modules/d3-shape/src/curve/linear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
      // proceed

      default:
        this._context.lineTo(x, y);

        break;
    }
  }
};

function _default(context) {
  return new Linear(context);
}
},{}],"../node_modules/d3-shape/src/point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.x = x;
exports.y = y;

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}
},{}],"../node_modules/d3-shape/src/line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Path = require("d3-path");

var _array = _interopRequireDefault(require("./array.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _linear = _interopRequireDefault(require("./curve/linear.js"));

var _point = require("./point.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(x, y) {
  var defined = (0, _constant.default)(true),
      context = null,
      curve = _linear.default,
      output = null;
  x = typeof x === "function" ? x : x === undefined ? _point.x : (0, _constant.default)(x);
  y = typeof y === "function" ? y : y === undefined ? _point.y : (0, _constant.default)(y);

  function line(data) {
    var i,
        n = (data = (0, _array.default)(data)).length,
        d,
        defined0 = false,
        buffer;
    if (context == null) output = curve(buffer = (0, _d3Path.path)());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();else output.lineEnd();
      }

      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function (_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : (0, _constant.default)(+_), line) : x;
  };

  line.y = function (_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : (0, _constant.default)(+_), line) : y;
  };

  line.defined = function (_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : (0, _constant.default)(!!_), line) : defined;
  };

  line.curve = function (_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function (_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}
},{"d3-path":"../node_modules/d3-path/src/index.js","./array.js":"../node_modules/d3-shape/src/array.js","./constant.js":"../node_modules/d3-shape/src/constant.js","./curve/linear.js":"../node_modules/d3-shape/src/curve/linear.js","./point.js":"../node_modules/d3-shape/src/point.js"}],"../node_modules/d3-shape/src/area.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Path = require("d3-path");

var _array = _interopRequireDefault(require("./array.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _linear = _interopRequireDefault(require("./curve/linear.js"));

var _line = _interopRequireDefault(require("./line.js"));

var _point = require("./point.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(x0, y0, y1) {
  var x1 = null,
      defined = (0, _constant.default)(true),
      context = null,
      curve = _linear.default,
      output = null;
  x0 = typeof x0 === "function" ? x0 : x0 === undefined ? _point.x : (0, _constant.default)(+x0);
  y0 = typeof y0 === "function" ? y0 : y0 === undefined ? (0, _constant.default)(0) : (0, _constant.default)(+y0);
  y1 = typeof y1 === "function" ? y1 : y1 === undefined ? _point.y : (0, _constant.default)(+y1);

  function area(data) {
    var i,
        j,
        k,
        n = (data = (0, _array.default)(data)).length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);
    if (context == null) output = curve(buffer = (0, _d3Path.path)());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();

          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }

          output.lineEnd();
          output.areaEnd();
        }
      }

      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return (0, _line.default)().defined(defined).curve(curve).context(context);
  }

  area.x = function (_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : (0, _constant.default)(+_), x1 = null, area) : x0;
  };

  area.x0 = function (_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : (0, _constant.default)(+_), area) : x0;
  };

  area.x1 = function (_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : (0, _constant.default)(+_), area) : x1;
  };

  area.y = function (_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : (0, _constant.default)(+_), y1 = null, area) : y0;
  };

  area.y0 = function (_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : (0, _constant.default)(+_), area) : y0;
  };

  area.y1 = function (_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : (0, _constant.default)(+_), area) : y1;
  };

  area.lineX0 = area.lineY0 = function () {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function () {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function () {
    return arealine().x(x1).y(y0);
  };

  area.defined = function (_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : (0, _constant.default)(!!_), area) : defined;
  };

  area.curve = function (_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function (_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}
},{"d3-path":"../node_modules/d3-path/src/index.js","./array.js":"../node_modules/d3-shape/src/array.js","./constant.js":"../node_modules/d3-shape/src/constant.js","./curve/linear.js":"../node_modules/d3-shape/src/curve/linear.js","./line.js":"../node_modules/d3-shape/src/line.js","./point.js":"../node_modules/d3-shape/src/point.js"}],"../node_modules/d3-shape/src/descending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
},{}],"../node_modules/d3-shape/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(d) {
  return d;
}
},{}],"../node_modules/d3-shape/src/pie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _array = _interopRequireDefault(require("./array.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _descending = _interopRequireDefault(require("./descending.js"));

var _identity = _interopRequireDefault(require("./identity.js"));

var _math = require("./math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  var value = _identity.default,
      sortValues = _descending.default,
      sort = null,
      startAngle = (0, _constant.default)(0),
      endAngle = (0, _constant.default)(_math.tau),
      padAngle = (0, _constant.default)(0);

  function pie(data) {
    var i,
        n = (data = (0, _array.default)(data)).length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(_math.tau, Math.max(-_math.tau, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    } // Optionally sort the arcs by previously-computed values or by data.


    if (sortValues != null) index.sort(function (i, j) {
      return sortValues(arcs[i], arcs[j]);
    });else if (sort != null) index.sort(function (i, j) {
      return sort(data[i], data[j]);
    }); // Compute the arcs! They are stored in the original data's order.

    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function (_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constant.default)(+_), pie) : value;
  };

  pie.sortValues = function (_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function (_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function (_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), pie) : startAngle;
  };

  pie.endAngle = function (_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), pie) : endAngle;
  };

  pie.padAngle = function (_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), pie) : padAngle;
  };

  return pie;
}
},{"./array.js":"../node_modules/d3-shape/src/array.js","./constant.js":"../node_modules/d3-shape/src/constant.js","./descending.js":"../node_modules/d3-shape/src/descending.js","./identity.js":"../node_modules/d3-shape/src/identity.js","./math.js":"../node_modules/d3-shape/src/math.js"}],"../node_modules/d3-shape/src/curve/radial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curveRadial;
exports.curveRadialLinear = void 0;

var _linear = _interopRequireDefault(require("./linear.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var curveRadialLinear = curveRadial(_linear.default);
exports.curveRadialLinear = curveRadialLinear;

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function () {
    this._curve.areaStart();
  },
  areaEnd: function () {
    this._curve.areaEnd();
  },
  lineStart: function () {
    this._curve.lineStart();
  },
  lineEnd: function () {
    this._curve.lineEnd();
  },
  point: function (a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {
  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;
  return radial;
}
},{"./linear.js":"../node_modules/d3-shape/src/curve/linear.js"}],"../node_modules/d3-shape/src/lineRadial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lineRadial = lineRadial;
exports.default = _default;

var _radial = _interopRequireWildcard(require("./curve/radial.js"));

var _line = _interopRequireDefault(require("./line.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function lineRadial(l) {
  var c = l.curve;
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function (_) {
    return arguments.length ? c((0, _radial.default)(_)) : c()._curve;
  };

  return l;
}

function _default() {
  return lineRadial((0, _line.default)().curve(_radial.curveRadialLinear));
}
},{"./curve/radial.js":"../node_modules/d3-shape/src/curve/radial.js","./line.js":"../node_modules/d3-shape/src/line.js"}],"../node_modules/d3-shape/src/areaRadial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _radial = _interopRequireWildcard(require("./curve/radial.js"));

var _area = _interopRequireDefault(require("./area.js"));

var _lineRadial = require("./lineRadial.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default() {
  var a = (0, _area.default)().curve(_radial.curveRadialLinear),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;
  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function () {
    return (0, _lineRadial.lineRadial)(x0());
  }, delete a.lineX0;
  a.lineEndAngle = function () {
    return (0, _lineRadial.lineRadial)(x1());
  }, delete a.lineX1;
  a.lineInnerRadius = function () {
    return (0, _lineRadial.lineRadial)(y0());
  }, delete a.lineY0;
  a.lineOuterRadius = function () {
    return (0, _lineRadial.lineRadial)(y1());
  }, delete a.lineY1;

  a.curve = function (_) {
    return arguments.length ? c((0, _radial.default)(_)) : c()._curve;
  };

  return a;
}
},{"./curve/radial.js":"../node_modules/d3-shape/src/curve/radial.js","./area.js":"../node_modules/d3-shape/src/area.js","./lineRadial.js":"../node_modules/d3-shape/src/lineRadial.js"}],"../node_modules/d3-shape/src/pointRadial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}
},{}],"../node_modules/d3-shape/src/link/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkHorizontal = linkHorizontal;
exports.linkVertical = linkVertical;
exports.linkRadial = linkRadial;

var _d3Path = require("d3-path");

var _array = require("../array.js");

var _constant = _interopRequireDefault(require("../constant.js"));

var _point = require("../point.js");

var _pointRadial = _interopRequireDefault(require("../pointRadial.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x = _point.x,
      y = _point.y,
      context = null;

  function link() {
    var buffer,
        argv = _array.slice.call(arguments),
        s = source.apply(this, argv),
        t = target.apply(this, argv);

    if (!context) context = buffer = (0, _d3Path.path)();
    curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function (_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function (_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function (_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : (0, _constant.default)(+_), link) : x;
  };

  link.y = function (_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : (0, _constant.default)(+_), link) : y;
  };

  link.context = function (_) {
    return arguments.length ? (context = _ == null ? null : _, link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial(context, x0, y0, x1, y1) {
  var p0 = (0, _pointRadial.default)(x0, y0),
      p1 = (0, _pointRadial.default)(x0, y0 = (y0 + y1) / 2),
      p2 = (0, _pointRadial.default)(x1, y0),
      p3 = (0, _pointRadial.default)(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}
},{"d3-path":"../node_modules/d3-path/src/index.js","../array.js":"../node_modules/d3-shape/src/array.js","../constant.js":"../node_modules/d3-shape/src/constant.js","../point.js":"../node_modules/d3-shape/src/point.js","../pointRadial.js":"../node_modules/d3-shape/src/pointRadial.js"}],"../node_modules/d3-shape/src/symbol/circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _math = require("../math.js");

var _default = {
  draw: function (context, size) {
    var r = Math.sqrt(size / _math.pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, _math.tau);
  }
};
exports.default = _default;
},{"../math.js":"../node_modules/d3-shape/src/math.js"}],"../node_modules/d3-shape/src/symbol/cross.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  draw: function (context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};
exports.default = _default;
},{}],"../node_modules/d3-shape/src/symbol/diamond.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var tan30 = Math.sqrt(1 / 3),
    tan30_2 = tan30 * 2;
var _default = {
  draw: function (context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};
exports.default = _default;
},{}],"../node_modules/d3-shape/src/symbol/star.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _math = require("../math.js");

var ka = 0.89081309152928522810,
    kr = Math.sin(_math.pi / 10) / Math.sin(7 * _math.pi / 10),
    kx = Math.sin(_math.tau / 10) * kr,
    ky = -Math.cos(_math.tau / 10) * kr;
var _default = {
  draw: function (context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);

    for (var i = 1; i < 5; ++i) {
      var a = _math.tau * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }

    context.closePath();
  }
};
exports.default = _default;
},{"../math.js":"../node_modules/d3-shape/src/math.js"}],"../node_modules/d3-shape/src/symbol/square.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  draw: function (context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
};
exports.default = _default;
},{}],"../node_modules/d3-shape/src/symbol/triangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var sqrt3 = Math.sqrt(3);
var _default = {
  draw: function (context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};
exports.default = _default;
},{}],"../node_modules/d3-shape/src/symbol/wye.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var c = -0.5,
    s = Math.sqrt(3) / 2,
    k = 1 / Math.sqrt(12),
    a = (k / 2 + 1) * 3;
var _default = {
  draw: function (context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};
exports.default = _default;
},{}],"../node_modules/d3-shape/src/symbol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.symbols = void 0;

var _d3Path = require("d3-path");

var _circle = _interopRequireDefault(require("./symbol/circle.js"));

var _cross = _interopRequireDefault(require("./symbol/cross.js"));

var _diamond = _interopRequireDefault(require("./symbol/diamond.js"));

var _star = _interopRequireDefault(require("./symbol/star.js"));

var _square = _interopRequireDefault(require("./symbol/square.js"));

var _triangle = _interopRequireDefault(require("./symbol/triangle.js"));

var _wye = _interopRequireDefault(require("./symbol/wye.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = [_circle.default, _cross.default, _diamond.default, _square.default, _star.default, _triangle.default, _wye.default];
exports.symbols = symbols;

function _default(type, size) {
  var context = null;
  type = typeof type === "function" ? type : (0, _constant.default)(type || _circle.default);
  size = typeof size === "function" ? size : (0, _constant.default)(size === undefined ? 64 : +size);

  function symbol() {
    var buffer;
    if (!context) context = buffer = (0, _d3Path.path)();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function (_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : (0, _constant.default)(_), symbol) : type;
  };

  symbol.size = function (_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : (0, _constant.default)(+_), symbol) : size;
  };

  symbol.context = function (_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
}
},{"d3-path":"../node_modules/d3-path/src/index.js","./symbol/circle.js":"../node_modules/d3-shape/src/symbol/circle.js","./symbol/cross.js":"../node_modules/d3-shape/src/symbol/cross.js","./symbol/diamond.js":"../node_modules/d3-shape/src/symbol/diamond.js","./symbol/star.js":"../node_modules/d3-shape/src/symbol/star.js","./symbol/square.js":"../node_modules/d3-shape/src/symbol/square.js","./symbol/triangle.js":"../node_modules/d3-shape/src/symbol/triangle.js","./symbol/wye.js":"../node_modules/d3-shape/src/symbol/wye.js","./constant.js":"../node_modules/d3-shape/src/constant.js"}],"../node_modules/d3-shape/src/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {}
},{}],"../node_modules/d3-shape/src/curve/basis.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.point = point;
exports.Basis = Basis;
exports.default = _default;

function point(that, x, y) {
  that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x) / 6, (that._y0 + 4 * that._y1 + y) / 6);
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 3:
        point(this, this._x1, this._y1);
      // proceed

      case 2:
        this._context.lineTo(this._x1, this._y1);

        break;
    }

    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;

        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);

      // proceed

      default:
        point(this, x, y);
        break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function _default(context) {
  return new Basis(context);
}
},{}],"../node_modules/d3-shape/src/curve/basisClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _noop = _interopRequireDefault(require("../noop.js"));

var _basis = require("./basis.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: _noop.default,
  areaEnd: _noop.default,
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 1:
        {
          this._context.moveTo(this._x2, this._y2);

          this._context.closePath();

          break;
        }

      case 2:
        {
          this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);

          this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);

          this._context.closePath();

          break;
        }

      case 3:
        {
          this.point(this._x2, this._y2);
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          break;
        }
    }
  },
  point: function (x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x, this._y2 = y;
        break;

      case 1:
        this._point = 2;
        this._x3 = x, this._y3 = y;
        break;

      case 2:
        this._point = 3;
        this._x4 = x, this._y4 = y;

        this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);

        break;

      default:
        (0, _basis.point)(this, x, y);
        break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function _default(context) {
  return new BasisClosed(context);
}
},{"../noop.js":"../node_modules/d3-shape/src/noop.js","./basis.js":"../node_modules/d3-shape/src/curve/basis.js"}],"../node_modules/d3-shape/src/curve/basisOpen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _basis = require("./basis.js");

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x) / 6,
            y0 = (this._y0 + 4 * this._y1 + y) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;

      case 3:
        this._point = 4;
      // proceed

      default:
        (0, _basis.point)(this, x, y);
        break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function _default(context) {
  return new BasisOpen(context);
}
},{"./basis.js":"../node_modules/d3-shape/src/curve/basis.js"}],"../node_modules/d3-shape/src/curve/bump.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bumpX = bumpX;
exports.bumpY = bumpY;

class Bump {
  constructor(context, x) {
    this._context = context;
    this._x = x;
  }

  areaStart() {
    this._line = 0;
  }

  areaEnd() {
    this._line = NaN;
  }

  lineStart() {
    this._point = 0;
  }

  lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  }

  point(x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        {
          this._point = 1;
          if (this._line) this._context.lineTo(x, y);else this._context.moveTo(x, y);
          break;
        }

      case 1:
        this._point = 2;
      // proceed

      default:
        {
          if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x) / 2, this._y0, this._x0, y, x, y);else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y) / 2, x, this._y0, x, y);
          break;
        }
    }

    this._x0 = x, this._y0 = y;
  }

}

function bumpX(context) {
  return new Bump(context, true);
}

function bumpY(context) {
  return new Bump(context, false);
}
},{}],"../node_modules/d3-shape/src/curve/bundle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _basis = require("./basis.js");

function Bundle(context, beta) {
  this._basis = new _basis.Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function () {
    this._x = [];
    this._y = [];

    this._basis.lineStart();
  },
  lineEnd: function () {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;

        this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
      }
    }

    this._x = this._y = null;

    this._basis.lineEnd();
  },
  point: function (x, y) {
    this._x.push(+x);

    this._y.push(+y);
  }
};

var _default = function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new _basis.Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function (beta) {
    return custom(+beta);
  };

  return bundle;
}(0.85);

exports.default = _default;
},{"./basis.js":"../node_modules/d3-shape/src/curve/basis.js"}],"../node_modules/d3-shape/src/curve/cardinal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.point = point;
exports.Cardinal = Cardinal;
exports.default = void 0;

function point(that, x, y) {
  that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x), that._y2 + that._k * (that._y1 - y), that._x2, that._y2);
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);

        break;

      case 3:
        point(this, this._x1, this._y1);
        break;
    }

    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
        this._x1 = x, this._y1 = y;
        break;

      case 2:
        this._point = 3;
      // proceed

      default:
        point(this, x, y);
        break;
    }

    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var _default = function custom(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function (tension) {
    return custom(+tension);
  };

  return cardinal;
}(0);

exports.default = _default;
},{}],"../node_modules/d3-shape/src/curve/cardinalClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardinalClosed = CardinalClosed;
exports.default = void 0;

var _noop = _interopRequireDefault(require("../noop.js"));

var _cardinal = require("./cardinal.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: _noop.default,
  areaEnd: _noop.default,
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 1:
        {
          this._context.moveTo(this._x3, this._y3);

          this._context.closePath();

          break;
        }

      case 2:
        {
          this._context.lineTo(this._x3, this._y3);

          this._context.closePath();

          break;
        }

      case 3:
        {
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          this.point(this._x5, this._y5);
          break;
        }
    }
  },
  point: function (x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x, this._y3 = y;
        break;

      case 1:
        this._point = 2;

        this._context.moveTo(this._x4 = x, this._y4 = y);

        break;

      case 2:
        this._point = 3;
        this._x5 = x, this._y5 = y;
        break;

      default:
        (0, _cardinal.point)(this, x, y);
        break;
    }

    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var _default = function custom(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function (tension) {
    return custom(+tension);
  };

  return cardinal;
}(0);

exports.default = _default;
},{"../noop.js":"../node_modules/d3-shape/src/noop.js","./cardinal.js":"../node_modules/d3-shape/src/curve/cardinal.js"}],"../node_modules/d3-shape/src/curve/cardinalOpen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardinalOpen = CardinalOpen;
exports.default = void 0;

var _cardinal = require("./cardinal.js");

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;

      case 3:
        this._point = 4;
      // proceed

      default:
        (0, _cardinal.point)(this, x, y);
        break;
    }

    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var _default = function custom(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function (tension) {
    return custom(+tension);
  };

  return cardinal;
}(0);

exports.default = _default;
},{"./cardinal.js":"../node_modules/d3-shape/src/curve/cardinal.js"}],"../node_modules/d3-shape/src/curve/catmullRom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.point = point;
exports.default = void 0;

var _math = require("../math.js");

var _cardinal = require("./cardinal.js");

function point(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > _math.epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > _math.epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);

        break;

      case 3:
        this.point(this._x2, this._y2);
        break;
    }

    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;
      // proceed

      default:
        point(this, x, y);
        break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var _default = function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new _cardinal.Cardinal(context, 0);
  }

  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}(0.5);

exports.default = _default;
},{"../math.js":"../node_modules/d3-shape/src/math.js","./cardinal.js":"../node_modules/d3-shape/src/curve/cardinal.js"}],"../node_modules/d3-shape/src/curve/catmullRomClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cardinalClosed = require("./cardinalClosed.js");

var _noop = _interopRequireDefault(require("../noop.js"));

var _catmullRom = require("./catmullRom.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: _noop.default,
  areaEnd: _noop.default,
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 1:
        {
          this._context.moveTo(this._x3, this._y3);

          this._context.closePath();

          break;
        }

      case 2:
        {
          this._context.lineTo(this._x3, this._y3);

          this._context.closePath();

          break;
        }

      case 3:
        {
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          this.point(this._x5, this._y5);
          break;
        }
    }
  },
  point: function (x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x, this._y3 = y;
        break;

      case 1:
        this._point = 2;

        this._context.moveTo(this._x4 = x, this._y4 = y);

        break;

      case 2:
        this._point = 3;
        this._x5 = x, this._y5 = y;
        break;

      default:
        (0, _catmullRom.point)(this, x, y);
        break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var _default = function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new _cardinalClosed.CardinalClosed(context, 0);
  }

  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}(0.5);

exports.default = _default;
},{"./cardinalClosed.js":"../node_modules/d3-shape/src/curve/cardinalClosed.js","../noop.js":"../node_modules/d3-shape/src/noop.js","./catmullRom.js":"../node_modules/d3-shape/src/curve/catmullRom.js"}],"../node_modules/d3-shape/src/curve/catmullRomOpen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cardinalOpen = require("./cardinalOpen.js");

var _catmullRom = require("./catmullRom.js");

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function () {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0:
        this._point = 1;
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;

      case 3:
        this._point = 4;
      // proceed

      default:
        (0, _catmullRom.point)(this, x, y);
        break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var _default = function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new _cardinalOpen.CardinalOpen(context, 0);
  }

  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}(0.5);

exports.default = _default;
},{"./cardinalOpen.js":"../node_modules/d3-shape/src/curve/cardinalOpen.js","./catmullRom.js":"../node_modules/d3-shape/src/curve/catmullRom.js"}],"../node_modules/d3-shape/src/curve/linearClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _noop = _interopRequireDefault(require("../noop.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: _noop.default,
  areaEnd: _noop.default,
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    if (this._point) this._context.closePath();
  },
  point: function (x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);else this._point = 1, this._context.moveTo(x, y);
  }
};

function _default(context) {
  return new LinearClosed(context);
}
},{"../noop.js":"../node_modules/d3-shape/src/noop.js"}],"../node_modules/d3-shape/src/curve/monotone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monotoneX = monotoneX;
exports.monotoneY = monotoneY;

function sign(x) {
  return x < 0 ? -1 : 1;
} // Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.


function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
} // Calculate a one-sided slope.


function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
} // According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".


function point(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;

  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);

        break;

      case 3:
        point(this, this._t0, slope2(this, this._t0));
        break;
    }

    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    var t1 = NaN;
    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;
        point(this, slope2(this, t1 = slope3(this, x, y)), t1);
        break;

      default:
        point(this, this._t0, t1 = slope3(this, x, y));
        break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function (x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function (x, y) {
    this._context.moveTo(y, x);
  },
  closePath: function () {
    this._context.closePath();
  },
  lineTo: function (x, y) {
    this._context.lineTo(y, x);
  },
  bezierCurveTo: function (x1, y1, x2, y2, x, y) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
  }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}
},{}],"../node_modules/d3-shape/src/curve/natural.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x = [];
    this._y = [];
  },
  lineEnd: function () {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);

      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);

        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || this._line !== 0 && n === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function (x, y) {
    this._x.push(+x);

    this._y.push(+y);
  }
}; // See https://www.particleincell.com/2012/bezier-splines/ for derivation.

function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];

  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];

  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];

  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];

  a[n - 1] = r[n - 1] / b[n - 1];

  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];

  b[n - 1] = (x[n] + a[n - 1]) / 2;

  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];

  return [a, b];
}

function _default(context) {
  return new Natural(context);
}
},{}],"../node_modules/d3-shape/src/curve/step.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.stepBefore = stepBefore;
exports.stepAfter = stepAfter;

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
      // proceed

      default:
        {
          if (this._t <= 0) {
            this._context.lineTo(this._x, y);

            this._context.lineTo(x, y);
          } else {
            var x1 = this._x * (1 - this._t) + x * this._t;

            this._context.lineTo(x1, this._y);

            this._context.lineTo(x1, y);
          }

          break;
        }
    }

    this._x = x, this._y = y;
  }
};

function _default(context) {
  return new Step(context, 0.5);
}

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}
},{}],"../node_modules/d3-shape/src/offset/none.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(series, order) {
  if (!((n = series.length) > 1)) return;

  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];

    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}
},{}],"../node_modules/d3-shape/src/order/none.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(series) {
  var n = series.length,
      o = new Array(n);

  while (--n >= 0) o[n] = n;

  return o;
}
},{}],"../node_modules/d3-shape/src/stack.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _array = _interopRequireDefault(require("./array.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _none = _interopRequireDefault(require("./offset/none.js"));

var _none2 = _interopRequireDefault(require("./order/none.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stackValue(d, key) {
  return d[key];
}

function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}

function _default() {
  var keys = (0, _constant.default)([]),
      order = _none2.default,
      offset = _none.default,
      value = stackValue;

  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries),
        i,
        n = sz.length,
        j = -1,
        oz;

    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }

    for (i = 0, oz = (0, _array.default)(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function (_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : (0, _constant.default)(Array.from(_)), stack) : keys;
  };

  stack.value = function (_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constant.default)(+_), stack) : value;
  };

  stack.order = function (_) {
    return arguments.length ? (order = _ == null ? _none2.default : typeof _ === "function" ? _ : (0, _constant.default)(Array.from(_)), stack) : order;
  };

  stack.offset = function (_) {
    return arguments.length ? (offset = _ == null ? _none.default : _, stack) : offset;
  };

  return stack;
}
},{"./array.js":"../node_modules/d3-shape/src/array.js","./constant.js":"../node_modules/d3-shape/src/constant.js","./offset/none.js":"../node_modules/d3-shape/src/offset/none.js","./order/none.js":"../node_modules/d3-shape/src/order/none.js"}],"../node_modules/d3-shape/src/offset/expand.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _none = _interopRequireDefault(require("./none.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(series, order) {
  if (!((n = series.length) > 0)) return;

  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;

    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }

  (0, _none.default)(series, order);
}
},{"./none.js":"../node_modules/d3-shape/src/offset/none.js"}],"../node_modules/d3-shape/src/offset/diverging.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(series, order) {
  if (!((n = series.length) > 0)) return;

  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = 0, d[1] = dy;
      }
    }
  }
}
},{}],"../node_modules/d3-shape/src/offset/silhouette.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _none = _interopRequireDefault(require("./none.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(series, order) {
  if (!((n = series.length) > 0)) return;

  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;

    s0[j][1] += s0[j][0] = -y / 2;
  }

  (0, _none.default)(series, order);
}
},{"./none.js":"../node_modules/d3-shape/src/offset/none.js"}],"../node_modules/d3-shape/src/offset/wiggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _none = _interopRequireDefault(require("./none.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;

  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;

      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }

      s1 += sij0, s2 += s3 * sij0;
    }

    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }

  s0[j - 1][1] += s0[j - 1][0] = y;
  (0, _none.default)(series, order);
}
},{"./none.js":"../node_modules/d3-shape/src/offset/none.js"}],"../node_modules/d3-shape/src/order/appearance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _none = _interopRequireDefault(require("./none.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(series) {
  var peaks = series.map(peak);
  return (0, _none.default)(series).sort(function (a, b) {
    return peaks[a] - peaks[b];
  });
}

function peak(series) {
  var i = -1,
      j = 0,
      n = series.length,
      vi,
      vj = -Infinity;

  while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;

  return j;
}
},{"./none.js":"../node_modules/d3-shape/src/order/none.js"}],"../node_modules/d3-shape/src/order/ascending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.sum = sum;

var _none = _interopRequireDefault(require("./none.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(series) {
  var sums = series.map(sum);
  return (0, _none.default)(series).sort(function (a, b) {
    return sums[a] - sums[b];
  });
}

function sum(series) {
  var s = 0,
      i = -1,
      n = series.length,
      v;

  while (++i < n) if (v = +series[i][1]) s += v;

  return s;
}
},{"./none.js":"../node_modules/d3-shape/src/order/none.js"}],"../node_modules/d3-shape/src/order/descending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ascending = _interopRequireDefault(require("./ascending.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(series) {
  return (0, _ascending.default)(series).reverse();
}
},{"./ascending.js":"../node_modules/d3-shape/src/order/ascending.js"}],"../node_modules/d3-shape/src/order/insideOut.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _appearance = _interopRequireDefault(require("./appearance.js"));

var _ascending = require("./ascending.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(_ascending.sum),
      order = (0, _appearance.default)(series),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];

    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
}
},{"./appearance.js":"../node_modules/d3-shape/src/order/appearance.js","./ascending.js":"../node_modules/d3-shape/src/order/ascending.js"}],"../node_modules/d3-shape/src/order/reverse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _none = _interopRequireDefault(require("./none.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(series) {
  return (0, _none.default)(series).reverse();
}
},{"./none.js":"../node_modules/d3-shape/src/order/none.js"}],"../node_modules/d3-shape/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "arc", {
  enumerable: true,
  get: function () {
    return _arc.default;
  }
});
Object.defineProperty(exports, "area", {
  enumerable: true,
  get: function () {
    return _area.default;
  }
});
Object.defineProperty(exports, "line", {
  enumerable: true,
  get: function () {
    return _line.default;
  }
});
Object.defineProperty(exports, "pie", {
  enumerable: true,
  get: function () {
    return _pie.default;
  }
});
Object.defineProperty(exports, "areaRadial", {
  enumerable: true,
  get: function () {
    return _areaRadial.default;
  }
});
Object.defineProperty(exports, "radialArea", {
  enumerable: true,
  get: function () {
    return _areaRadial.default;
  }
});
Object.defineProperty(exports, "lineRadial", {
  enumerable: true,
  get: function () {
    return _lineRadial.default;
  }
});
Object.defineProperty(exports, "radialLine", {
  enumerable: true,
  get: function () {
    return _lineRadial.default;
  }
});
Object.defineProperty(exports, "pointRadial", {
  enumerable: true,
  get: function () {
    return _pointRadial.default;
  }
});
Object.defineProperty(exports, "linkHorizontal", {
  enumerable: true,
  get: function () {
    return _index.linkHorizontal;
  }
});
Object.defineProperty(exports, "linkVertical", {
  enumerable: true,
  get: function () {
    return _index.linkVertical;
  }
});
Object.defineProperty(exports, "linkRadial", {
  enumerable: true,
  get: function () {
    return _index.linkRadial;
  }
});
Object.defineProperty(exports, "symbol", {
  enumerable: true,
  get: function () {
    return _symbol.default;
  }
});
Object.defineProperty(exports, "symbols", {
  enumerable: true,
  get: function () {
    return _symbol.symbols;
  }
});
Object.defineProperty(exports, "symbolCircle", {
  enumerable: true,
  get: function () {
    return _circle.default;
  }
});
Object.defineProperty(exports, "symbolCross", {
  enumerable: true,
  get: function () {
    return _cross.default;
  }
});
Object.defineProperty(exports, "symbolDiamond", {
  enumerable: true,
  get: function () {
    return _diamond.default;
  }
});
Object.defineProperty(exports, "symbolSquare", {
  enumerable: true,
  get: function () {
    return _square.default;
  }
});
Object.defineProperty(exports, "symbolStar", {
  enumerable: true,
  get: function () {
    return _star.default;
  }
});
Object.defineProperty(exports, "symbolTriangle", {
  enumerable: true,
  get: function () {
    return _triangle.default;
  }
});
Object.defineProperty(exports, "symbolWye", {
  enumerable: true,
  get: function () {
    return _wye.default;
  }
});
Object.defineProperty(exports, "curveBasisClosed", {
  enumerable: true,
  get: function () {
    return _basisClosed.default;
  }
});
Object.defineProperty(exports, "curveBasisOpen", {
  enumerable: true,
  get: function () {
    return _basisOpen.default;
  }
});
Object.defineProperty(exports, "curveBasis", {
  enumerable: true,
  get: function () {
    return _basis.default;
  }
});
Object.defineProperty(exports, "curveBumpX", {
  enumerable: true,
  get: function () {
    return _bump.bumpX;
  }
});
Object.defineProperty(exports, "curveBumpY", {
  enumerable: true,
  get: function () {
    return _bump.bumpY;
  }
});
Object.defineProperty(exports, "curveBundle", {
  enumerable: true,
  get: function () {
    return _bundle.default;
  }
});
Object.defineProperty(exports, "curveCardinalClosed", {
  enumerable: true,
  get: function () {
    return _cardinalClosed.default;
  }
});
Object.defineProperty(exports, "curveCardinalOpen", {
  enumerable: true,
  get: function () {
    return _cardinalOpen.default;
  }
});
Object.defineProperty(exports, "curveCardinal", {
  enumerable: true,
  get: function () {
    return _cardinal.default;
  }
});
Object.defineProperty(exports, "curveCatmullRomClosed", {
  enumerable: true,
  get: function () {
    return _catmullRomClosed.default;
  }
});
Object.defineProperty(exports, "curveCatmullRomOpen", {
  enumerable: true,
  get: function () {
    return _catmullRomOpen.default;
  }
});
Object.defineProperty(exports, "curveCatmullRom", {
  enumerable: true,
  get: function () {
    return _catmullRom.default;
  }
});
Object.defineProperty(exports, "curveLinearClosed", {
  enumerable: true,
  get: function () {
    return _linearClosed.default;
  }
});
Object.defineProperty(exports, "curveLinear", {
  enumerable: true,
  get: function () {
    return _linear.default;
  }
});
Object.defineProperty(exports, "curveMonotoneX", {
  enumerable: true,
  get: function () {
    return _monotone.monotoneX;
  }
});
Object.defineProperty(exports, "curveMonotoneY", {
  enumerable: true,
  get: function () {
    return _monotone.monotoneY;
  }
});
Object.defineProperty(exports, "curveNatural", {
  enumerable: true,
  get: function () {
    return _natural.default;
  }
});
Object.defineProperty(exports, "curveStep", {
  enumerable: true,
  get: function () {
    return _step.default;
  }
});
Object.defineProperty(exports, "curveStepAfter", {
  enumerable: true,
  get: function () {
    return _step.stepAfter;
  }
});
Object.defineProperty(exports, "curveStepBefore", {
  enumerable: true,
  get: function () {
    return _step.stepBefore;
  }
});
Object.defineProperty(exports, "stack", {
  enumerable: true,
  get: function () {
    return _stack.default;
  }
});
Object.defineProperty(exports, "stackOffsetExpand", {
  enumerable: true,
  get: function () {
    return _expand.default;
  }
});
Object.defineProperty(exports, "stackOffsetDiverging", {
  enumerable: true,
  get: function () {
    return _diverging.default;
  }
});
Object.defineProperty(exports, "stackOffsetNone", {
  enumerable: true,
  get: function () {
    return _none.default;
  }
});
Object.defineProperty(exports, "stackOffsetSilhouette", {
  enumerable: true,
  get: function () {
    return _silhouette.default;
  }
});
Object.defineProperty(exports, "stackOffsetWiggle", {
  enumerable: true,
  get: function () {
    return _wiggle.default;
  }
});
Object.defineProperty(exports, "stackOrderAppearance", {
  enumerable: true,
  get: function () {
    return _appearance.default;
  }
});
Object.defineProperty(exports, "stackOrderAscending", {
  enumerable: true,
  get: function () {
    return _ascending.default;
  }
});
Object.defineProperty(exports, "stackOrderDescending", {
  enumerable: true,
  get: function () {
    return _descending.default;
  }
});
Object.defineProperty(exports, "stackOrderInsideOut", {
  enumerable: true,
  get: function () {
    return _insideOut.default;
  }
});
Object.defineProperty(exports, "stackOrderNone", {
  enumerable: true,
  get: function () {
    return _none2.default;
  }
});
Object.defineProperty(exports, "stackOrderReverse", {
  enumerable: true,
  get: function () {
    return _reverse.default;
  }
});

var _arc = _interopRequireDefault(require("./arc.js"));

var _area = _interopRequireDefault(require("./area.js"));

var _line = _interopRequireDefault(require("./line.js"));

var _pie = _interopRequireDefault(require("./pie.js"));

var _areaRadial = _interopRequireDefault(require("./areaRadial.js"));

var _lineRadial = _interopRequireDefault(require("./lineRadial.js"));

var _pointRadial = _interopRequireDefault(require("./pointRadial.js"));

var _index = require("./link/index.js");

var _symbol = _interopRequireWildcard(require("./symbol.js"));

var _circle = _interopRequireDefault(require("./symbol/circle.js"));

var _cross = _interopRequireDefault(require("./symbol/cross.js"));

var _diamond = _interopRequireDefault(require("./symbol/diamond.js"));

var _square = _interopRequireDefault(require("./symbol/square.js"));

var _star = _interopRequireDefault(require("./symbol/star.js"));

var _triangle = _interopRequireDefault(require("./symbol/triangle.js"));

var _wye = _interopRequireDefault(require("./symbol/wye.js"));

var _basisClosed = _interopRequireDefault(require("./curve/basisClosed.js"));

var _basisOpen = _interopRequireDefault(require("./curve/basisOpen.js"));

var _basis = _interopRequireDefault(require("./curve/basis.js"));

var _bump = require("./curve/bump.js");

var _bundle = _interopRequireDefault(require("./curve/bundle.js"));

var _cardinalClosed = _interopRequireDefault(require("./curve/cardinalClosed.js"));

var _cardinalOpen = _interopRequireDefault(require("./curve/cardinalOpen.js"));

var _cardinal = _interopRequireDefault(require("./curve/cardinal.js"));

var _catmullRomClosed = _interopRequireDefault(require("./curve/catmullRomClosed.js"));

var _catmullRomOpen = _interopRequireDefault(require("./curve/catmullRomOpen.js"));

var _catmullRom = _interopRequireDefault(require("./curve/catmullRom.js"));

var _linearClosed = _interopRequireDefault(require("./curve/linearClosed.js"));

var _linear = _interopRequireDefault(require("./curve/linear.js"));

var _monotone = require("./curve/monotone.js");

var _natural = _interopRequireDefault(require("./curve/natural.js"));

var _step = _interopRequireWildcard(require("./curve/step.js"));

var _stack = _interopRequireDefault(require("./stack.js"));

var _expand = _interopRequireDefault(require("./offset/expand.js"));

var _diverging = _interopRequireDefault(require("./offset/diverging.js"));

var _none = _interopRequireDefault(require("./offset/none.js"));

var _silhouette = _interopRequireDefault(require("./offset/silhouette.js"));

var _wiggle = _interopRequireDefault(require("./offset/wiggle.js"));

var _appearance = _interopRequireDefault(require("./order/appearance.js"));

var _ascending = _interopRequireDefault(require("./order/ascending.js"));

var _descending = _interopRequireDefault(require("./order/descending.js"));

var _insideOut = _interopRequireDefault(require("./order/insideOut.js"));

var _none2 = _interopRequireDefault(require("./order/none.js"));

var _reverse = _interopRequireDefault(require("./order/reverse.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./arc.js":"../node_modules/d3-shape/src/arc.js","./area.js":"../node_modules/d3-shape/src/area.js","./line.js":"../node_modules/d3-shape/src/line.js","./pie.js":"../node_modules/d3-shape/src/pie.js","./areaRadial.js":"../node_modules/d3-shape/src/areaRadial.js","./lineRadial.js":"../node_modules/d3-shape/src/lineRadial.js","./pointRadial.js":"../node_modules/d3-shape/src/pointRadial.js","./link/index.js":"../node_modules/d3-shape/src/link/index.js","./symbol.js":"../node_modules/d3-shape/src/symbol.js","./symbol/circle.js":"../node_modules/d3-shape/src/symbol/circle.js","./symbol/cross.js":"../node_modules/d3-shape/src/symbol/cross.js","./symbol/diamond.js":"../node_modules/d3-shape/src/symbol/diamond.js","./symbol/square.js":"../node_modules/d3-shape/src/symbol/square.js","./symbol/star.js":"../node_modules/d3-shape/src/symbol/star.js","./symbol/triangle.js":"../node_modules/d3-shape/src/symbol/triangle.js","./symbol/wye.js":"../node_modules/d3-shape/src/symbol/wye.js","./curve/basisClosed.js":"../node_modules/d3-shape/src/curve/basisClosed.js","./curve/basisOpen.js":"../node_modules/d3-shape/src/curve/basisOpen.js","./curve/basis.js":"../node_modules/d3-shape/src/curve/basis.js","./curve/bump.js":"../node_modules/d3-shape/src/curve/bump.js","./curve/bundle.js":"../node_modules/d3-shape/src/curve/bundle.js","./curve/cardinalClosed.js":"../node_modules/d3-shape/src/curve/cardinalClosed.js","./curve/cardinalOpen.js":"../node_modules/d3-shape/src/curve/cardinalOpen.js","./curve/cardinal.js":"../node_modules/d3-shape/src/curve/cardinal.js","./curve/catmullRomClosed.js":"../node_modules/d3-shape/src/curve/catmullRomClosed.js","./curve/catmullRomOpen.js":"../node_modules/d3-shape/src/curve/catmullRomOpen.js","./curve/catmullRom.js":"../node_modules/d3-shape/src/curve/catmullRom.js","./curve/linearClosed.js":"../node_modules/d3-shape/src/curve/linearClosed.js","./curve/linear.js":"../node_modules/d3-shape/src/curve/linear.js","./curve/monotone.js":"../node_modules/d3-shape/src/curve/monotone.js","./curve/natural.js":"../node_modules/d3-shape/src/curve/natural.js","./curve/step.js":"../node_modules/d3-shape/src/curve/step.js","./stack.js":"../node_modules/d3-shape/src/stack.js","./offset/expand.js":"../node_modules/d3-shape/src/offset/expand.js","./offset/diverging.js":"../node_modules/d3-shape/src/offset/diverging.js","./offset/none.js":"../node_modules/d3-shape/src/offset/none.js","./offset/silhouette.js":"../node_modules/d3-shape/src/offset/silhouette.js","./offset/wiggle.js":"../node_modules/d3-shape/src/offset/wiggle.js","./order/appearance.js":"../node_modules/d3-shape/src/order/appearance.js","./order/ascending.js":"../node_modules/d3-shape/src/order/ascending.js","./order/descending.js":"../node_modules/d3-shape/src/order/descending.js","./order/insideOut.js":"../node_modules/d3-shape/src/order/insideOut.js","./order/none.js":"../node_modules/d3-shape/src/order/none.js","./order/reverse.js":"../node_modules/d3-shape/src/order/reverse.js"}],"js/views/chartPerformanceView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPerformanceChart = exports.clearPerformanceCanvas = exports.addPerformanceRenderHandler = exports.queryPerformanceEls = void 0;

var _d3Path = require("d3-path");

var _d3Shape = require("d3-shape");

var _helpers = require("../helpers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var performanceEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.performanceCanvas = document.querySelector('.js-performance-canvas');
  obj.performanceDayBtn = document.querySelector('.js-performance-btn-day');
  obj.performanceMonthBtn = document.querySelector('.js-performance-btn-month');
  obj.performanceHeading = document.querySelector('.js-performance-heading');
  return obj;
};

var queryPerformanceEls = function queryPerformanceEls() {
  performanceEls = getElements();
};

exports.queryPerformanceEls = queryPerformanceEls;

var addPerformanceRenderHandler = function addPerformanceRenderHandler(handler) {
  [performanceEls.performanceDayBtn, performanceEls.performanceMonthBtn].forEach(function (btn) {
    return btn.addEventListener('click', function (e) {
      btn.parentElement.querySelectorAll('button').forEach(function (b) {
        return b.classList.remove('btn--tertiary--active');
      });
      e.target.classList.add('btn--tertiary--active');
      handler(e.target.getAttribute('data-type'));
    });
  });
};

exports.addPerformanceRenderHandler = addPerformanceRenderHandler;

var updatePerformanceHeading = function updatePerformanceHeading(type) {
  performanceEls.performanceHeading.querySelector('span').textContent = type;
};

var clearPerformanceCanvas = function clearPerformanceCanvas() {
  performanceEls.performanceCanvas.innerHTML = '';
};

exports.clearPerformanceCanvas = clearPerformanceCanvas;
var chartData = [];
var chartType; // ZONE - D3

var renderPerformanceChart = function renderPerformanceChart(passedData) {
  var type, data;

  if (passedData) {
    type = passedData[0];
    data = passedData[1];
    updatePerformanceHeading(type);
    clearPerformanceCanvas();
  }

  if (data) {
    chartData = _toConsumableArray(data), chartType = type;
  } else {
    data = chartData, type = chartType;
  }

  var canvasRect = performanceEls.performanceCanvas.getBoundingClientRect(); // create room for axes

  var margin = {
    top: 25,
    right: 20,
    bottom: 50,
    left: 50
  };
  var graphWidth = canvasRect.width - margin.left - margin.right;
  var graphHeight = canvasRect.height - margin.top - margin.bottom; // create svg container, specify width & height, translate to create room for axes labels

  var svg = d3.select('.js-performance-canvas').append('svg').attr('class', 'performance-canvas').attr('viewBox', "0 0 ".concat(canvasRect.width, " ").concat(canvasRect.height)); // create a group for our graph elements and append it to our svg

  var graph = svg.append('g').attr('width', graphWidth).attr('height', graphHeight).attr('transform', "translate(".concat(margin.left, ", ").concat(margin.top, ")")); // create scales

  var x = d3.scaleLinear().range([0, graphWidth]);
  var y = d3.scaleLinear().range([graphHeight, 0]); // create axes groups

  var xAxisGroup = graph.append('g').attr('transform', "translate(0, ".concat(graphHeight, ")")).attr('class', 'performance-axis-x');
  var yAxisGroup = graph.append('g').attr('class', 'performance-axis-y'); // set up d3 line graph generator
  // it will generate a line, based on our data points
  // it returns a long string that is then used for 'd' attribute of the svg path

  var line = d3.line().x(function (d) {
    return x(d.position);
  }).y(function (d) {
    return y(d.total);
  }); // create line path element

  var path = graph.append('path'); // ZONE - update function

  var updatePerformanceChart = function updatePerformanceChart() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : chartData;
    // sort the data based on date object
    data.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    }); // create responsive gaps for the chart

    var maxMinVals = d3.extent(data, function (d) {
      return d.total;
    });
    var gap = Math.round((maxMinVals[1] - maxMinVals[0]) / 6); // set scale domains
    // x.domain(d3.extent(data, d => d.position)); // find the lowest and highest dates, return in array format

    x.domain([d3.min(data, function (d) {
      return d.position;
    }) - 0.5, d3.max(data, function (d) {
      return d.position;
    }) + 0.5]);
    y.domain([d3.min(data, function (d) {
      return d.total;
    }) - gap, d3.max(data, function (d) {
      return d.total;
    }) + gap]); // find the highest value
    // update path data
    // when we are using d3 line, we need to pass the data inside of another array

    path.data([data]).attr('d', line).attr('class', 'performance-line'); // create circles for objects
    // join data to the selection

    var circles = graph.selectAll('circle').data(data); // remove unwanted points

    circles.exit().remove(); // add new points

    circles.enter().append('circle').attr('cx', function (d) {
      return x(d.position);
    }).attr('cy', function (d) {
      return y(d.total);
    }).attr('class', 'performance-circles'); // update current points

    circles.attr('cx', function (d) {
      return x(d.position);
    }).attr('cy', function (d) {
      return y(d.total);
    }); // create axes

    var xAxis = d3.axisBottom(x).ticks(data.length).tickFormat(function (d) {
      return data[d - 1] ? data[d - 1].shortDate : '';
    }); // create bottom axis based on our x scale

    var yAxis = d3.axisLeft(y).ticks(4).tickFormat(function (d) {
      return (0, _helpers.kFormatter)(d, 999);
    }); // generate all shapes for xAxis and yAxis and place them in axis groups

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis); // ZONE - generate horizontal lines

    var yAxisTicks = performanceEls.performanceCanvas.querySelectorAll('g.performance-axis-y g.tick');
    var yTicksTranslates = Array.from(yAxisTicks).map(function (t) {
      return t.getAttribute('transform');
    });
    var horizontalLinesGroup = graph.append('g');

    for (var i = 0; i < yTicksTranslates.length; i++) {
      var horizontalLine = horizontalLinesGroup.append('line').attr('class', 'performance-graph-line').attr('x1', 0).attr('x2', graphWidth).attr('y1', 0).attr('y2', 0).attr('transform', yTicksTranslates[i]);
    } // ZONE - create circle labels


    var points = Array.from(performanceEls.performanceCanvas.querySelectorAll('circle.performance-circles'));
    var pointsCoords = points.map(function (point) {
      return [point.getAttribute('cx'), point.getAttribute('cy')];
    });
    var labelsGroup = graph.append('g');

    for (var _i = 0; _i < pointsCoords.length; _i++) {
      var label = labelsGroup.append('text').text((0, _helpers.kFormatter)(data[_i].total, 9999)).attr('class', "".concat(data[_i].result >= 0 ? 'performance-label' : 'performance-label--negative')).attr('transform', "translate(".concat(pointsCoords[_i][0] - 20, ", ").concat(pointsCoords[_i][1] - (data[_i].result >= 0 ? 15 : -25), ")"));
    } // select x axis text and translate down every odd text to make space


    xAxisGroup.selectAll('g.tick:nth-child(odd) text').attr('transform', 'translate(0, 18)').attr('class', 'performance-axis-odd');
  };

  updatePerformanceChart(data);
};

exports.renderPerformanceChart = renderPerformanceChart;
},{"d3-path":"../node_modules/d3-path/src/index.js","d3-shape":"../node_modules/d3-shape/src/index.js","../helpers":"js/helpers.js"}],"js/models/chartPerformanceModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatPerformanceData = void 0;
var dailyData = [{
  date: 'Mon Mar 01 2021 23:14:58 GMT+0000 (Greenwich Mean Time)',
  total: 2400,
  result: 400,
  shortDate: '1/3/21',
  position: 1
}, {
  date: 'Mon Mar 02 2021 23:13:58 GMT+0000 (Greenwich Mean Time)',
  total: 1200,
  result: -1200,
  shortDate: '2/3/21',
  position: 2
}, {
  date: 'Mon Mar 03 2021 23:12:58 GMT+0000 (Greenwich Mean Time)',
  total: 900,
  result: -300,
  shortDate: '3/3/21',
  position: 3
}, {
  date: 'Mon Mar 04 2021 23:11:58 GMT+0000 (Greenwich Mean Time)',
  total: 1400,
  result: 500,
  shortDate: '4/3/21',
  position: 4
}, {
  date: 'Mon Mar 05 2021 23:10:58 GMT+0000 (Greenwich Mean Time)',
  total: 2200,
  result: 800,
  shortDate: '5/3/21',
  position: 5
}, {
  date: 'Mon Mar 06 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
  total: 600,
  result: -1600,
  shortDate: '6/3/21',
  position: 6
}, {
  date: 'Mon Mar 07 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
  total: 500,
  result: -100,
  shortDate: '7/3/21',
  position: 7
}, {
  date: 'Mon Mar 12 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
  total: 660,
  result: 160,
  shortDate: '12/3/21',
  position: 8
}, {
  date: 'Mon Mar 16 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
  total: 990,
  result: 330,
  shortDate: '16/3/21',
  position: 9
}, {
  date: 'Mon Mar 18 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
  total: 1300,
  result: 310,
  shortDate: '19/3/21',
  position: 10
}, {
  date: 'Mon Mar 23 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
  total: 1348,
  result: 48,
  shortDate: '23/3/21',
  position: 11
}, {
  date: 'Mon Mar 24 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
  total: 1450,
  result: 112,
  shortDate: '24/3/21',
  position: 12
}, {
  date: 'Mon Mar 26 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
  total: 1300,
  result: -150,
  shortDate: '26/3/21',
  position: 13
}, {
  date: 'Mon Mar 27 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
  total: 1423,
  result: 123,
  shortDate: '27/3/21',
  position: 14
}, {
  date: 'Mon Mar 29 2021 23:09:58 GMT+0000 (Greenwich Mean Time)',
  total: 1497,
  result: 74,
  shortDate: '29/3/21',
  position: 15
}];
var monthlyData = [{
  date: 'Mon Mar 01 2021 23:14:58 GMT+0000 (Greenwich Mean Time)',
  total: 100500,
  result: 2500,
  shortDate: '3/21',
  position: 1
}, {
  date: 'Mon Mar 02 2022 23:13:58 GMT+0000 (Greenwich Mean Time)',
  total: 123260,
  result: 18260,
  shortDate: '4/21',
  position: 2
}, {
  date: 'Mon Mar 03 2023 23:12:58 GMT+0000 (Greenwich Mean Time)',
  total: 120000,
  result: -3200,
  shortDate: '5/21',
  position: 3
}, {
  date: 'Mon Mar 03 2024 23:12:58 GMT+0000 (Greenwich Mean Time)',
  total: 110340,
  result: -10660,
  shortDate: '5/21',
  position: 4
}];

var formatPerformanceData = function formatPerformanceData(type) {
  if (type === 'day') return ['Daily', dailyData];
  if (type === 'month') return ['Monthly', monthlyData];
};

exports.formatPerformanceData = formatPerformanceData;
},{}],"js/views/chartWorstBestView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderWorstBestChart = exports.addWorstBestRenderHandler = exports.clearWorstBestCanvas = exports.queryBestWorstEls = void 0;

var _helpers = require("../helpers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var bestWorstEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.bestWorstCanvas = document.querySelector('.js-worst-best-canvas');
  obj.worstBtn = document.querySelector('.js-worst-btn');
  obj.bestBtn = document.querySelector('.js-best-btn');
  return obj;
};

var queryBestWorstEls = function queryBestWorstEls() {
  bestWorstEls = getElements();
};

exports.queryBestWorstEls = queryBestWorstEls;

var clearWorstBestCanvas = function clearWorstBestCanvas() {
  bestWorstEls.bestWorstCanvas.innerHTML = '';
};

exports.clearWorstBestCanvas = clearWorstBestCanvas;

var addWorstBestRenderHandler = function addWorstBestRenderHandler(handler) {
  [bestWorstEls.worstBtn, bestWorstEls.bestBtn].forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      btn.parentElement.querySelectorAll('button').forEach(function (b) {
        return b.classList.remove('btn--tertiary--active');
      });
      e.target.classList.add('btn--tertiary--active');
      handler(e.target.getAttribute('data-type'));
    });
  });
}; // ZONE - D3


exports.addWorstBestRenderHandler = addWorstBestRenderHandler;
var chartData = [];
var chartType;

var renderWorstBestChart = function renderWorstBestChart(passedData) {
  var type, data;

  if (passedData) {
    type = passedData[0];
    data = passedData[1];
    clearWorstBestCanvas();
  }

  if (data) {
    chartData = _toConsumableArray(data), chartType = type;
  } else {
    data = chartData, type = chartType;
  }

  var determineSign = function determineSign(data) {
    if (type === 'worst') return -Math.abs(data);
    return Math.abs(data);
  };

  var canvasRect = bestWorstEls.bestWorstCanvas.getBoundingClientRect(); // create room for axes

  var margin = {
    top: 25,
    right: 20,
    bottom: 50,
    left: 50
  };
  var graphWidth = canvasRect.width - margin.left - margin.right;
  var graphHeight = canvasRect.height - margin.top - margin.bottom; // create svg container, specify width & height, translate to create room for axes labels

  var svg = d3.select('.js-worst-best-canvas').append('svg').attr('class', 'worst-best-canvas').attr('viewBox', "0 0 ".concat(canvasRect.width, " ").concat(canvasRect.height)); // create graph for the elements and append it to our svg

  var graph = svg.append('g').attr('width', graphWidth).attr('height', graphHeight).attr('transform', "translate(".concat(margin.left, ", ").concat(margin.top, ")")); // create scales

  var y = d3.scaleLinear().range([graphHeight, 0]);
  var x = d3.scaleBand().range([0, graphWidth]).paddingInner(0.5).paddingOuter(0.5); // create a group for the x and y axis

  var xAxisGroup = graph.append('g').attr('transform', "translate(0, ".concat(graphHeight, ")")).attr('class', 'worst-best-axis-x');
  var yAxisGroup = graph.append('g').attr('class', 'worst-best-axis-y'); // create and call the axes

  var xAxis = d3.axisBottom(x).tickFormat(function (d) {
    return d;
  });
  var yAxis = d3.axisLeft(y).ticks(6).tickFormat(function (d) {
    if (type === 'worst') return -Math.abs((0, _helpers.kFormatter)(d, 9999));
    if (type === 'best') return Math.abs((0, _helpers.kFormatter)(d, 9999));
  }); // ZONE - update function

  var updateWorstBestChart = function updateWorstBestChart() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : chartData;
    // sort the data based on result
    data.sort(function (a, b) {
      return b.result - a.result;
    }); // create responsive gap for the chart

    var maxMinVals = d3.extent(data, function (d) {
      return d.result;
    });
    var gap = Math.round((maxMinVals[1] - maxMinVals[0]) / 6); // set scale domains

    y.domain([0, d3.max(data, function (d) {
      return d.result;
    }) + gap]);
    x.domain(data.map(function (item) {
      return item.ticker;
    })); // join data to rectangles inside our graph group

    var rects = graph.selectAll('rect').data(data); // remove any unwanted shapes

    rects.exit().remove(); // update already existing rectangles in DOM

    rects.attr('width', x.bandwidth).attr('y', function (d) {
      return y(total);
    }).attr('fill', 'orange'); // update and append virtual elements

    rects.enter().append('rect').attr('width', x.bandwidth).attr('height', 0).attr('y', graphHeight).attr('x', function (d) {
      return x(d.ticker);
    }).attr('fill', 'orange').attr('height', function (d) {
      return graphHeight - y(d.result);
    }).attr('y', function (d) {
      return y(d.result);
    }).attr('class', 'worst-best-bars'); // apply axes to axes groups

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis); // ZONE - create bars labels

    var bars = Array.from(bestWorstEls.bestWorstCanvas.querySelectorAll('rect.worst-best-bars'));
    var barsDimensions = bars.map(function (bar) {
      return [bar.getAttribute('x'), bar.getAttribute('y'), bar.getAttribute('width'), bar.getAttribute('height')];
    });
    var labelsGroup = graph.append('g');

    for (var i = 0; i < barsDimensions.length; i++) {
      labelsGroup.append('text').text((0, _helpers.kFormatter)(determineSign(data[i].result), 9999)).attr('class', "".concat(type === 'best' ? 'best' : 'worst', "-trades-label")).attr('transform', "translate(".concat(barsDimensions[i][0], ", ").concat(barsDimensions[i][1] - 10, ")"));
      labelsGroup.append('text').text(data[i].date).attr('class', 'worst-best-date').attr('transform', "translate(".concat(barsDimensions[i][0] - 8, ", ").concat(graphHeight - 10, ") rotate(-90)"));
    } // ZONE - create horizontal line on the x axis to cover the bars borders


    var xOverlayLineGroup = graph.append('g');
    xOverlayLineGroup.append('line').attr('x1', 0).attr('x2', graphWidth).attr('y1', graphHeight).attr('y2', graphHeight).attr('class', 'worst-best-overlay-line'); // select x axis text and translate down every odd text to make space

    xAxisGroup.selectAll('g.tick:nth-child(odd) text').attr('transform', 'translate(0, 18)');
  };

  updateWorstBestChart(data);
};

exports.renderWorstBestChart = renderWorstBestChart;
},{"../helpers":"js/helpers.js"}],"js/models/chartWorstBestModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatWorstBestData = void 0;
var worstTrades = [{
  id: '8gW2a5Q',
  ticker: 'ZM',
  result: 240,
  date: '3/4/21'
}, {
  id: 'lK2G98Q',
  ticker: 'MARA',
  result: 173,
  date: '3/5/21'
}, {
  id: 'K14Ji98',
  ticker: 'BMBL',
  result: 166,
  date: '13/4/21'
}, {
  id: 'k98Ck9s',
  ticker: 'X',
  result: 130,
  date: '26/3/21'
}, {
  id: '92Kji63',
  ticker: 'SNAP',
  result: 122,
  date: '1/3/21'
}, {
  id: '8gW2a5Q',
  ticker: 'GME',
  result: 111,
  date: '2/4/21'
}, {
  id: 'Sd8tr32',
  ticker: 'MSFT',
  result: 103,
  date: '5/6/21'
}, {
  id: 'pa52Qs4',
  ticker: 'ROKU',
  result: 94,
  date: '16/7/21'
}];
var bestTrades = [{
  id: '8gW2a5Q',
  ticker: 'ZM',
  result: 440,
  date: '30/4/21'
}, {
  id: 'lK2G98Q',
  ticker: 'MARA',
  result: 373,
  date: '8/5/21'
}, {
  id: 'K14Ji98',
  ticker: 'BMBL',
  result: 366,
  date: '8/4/21'
}, {
  id: 'k98Ck9s',
  ticker: 'X',
  result: 230,
  date: '13/3/21'
}, {
  id: '92Kji63',
  ticker: 'SNAP',
  result: 222,
  date: '16/3/21'
}, {
  id: '8gW2a5Q',
  ticker: 'GME',
  result: 117,
  date: '6/4/21'
}, {
  id: 'Sd8tr32',
  ticker: 'MSFT',
  result: 109,
  date: '2/6/21'
}, {
  id: 'pa52Qs4',
  ticker: 'ROKU',
  result: 104,
  date: '18/7/21'
}];

var formatWorstBestData = function formatWorstBestData(type) {
  if (type === 'worst') return ['worst', worstTrades];
  if (type === 'best') return ['best', bestTrades];
};

exports.formatWorstBestData = formatWorstBestData;
},{}],"js/views/accountDetailsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCapitalOutput = exports.queryDetailsEls = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var detailsEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.capitalOutput = document.querySelector('.js-capital-output span');
  return obj;
};

var queryDetailsEls = function queryDetailsEls() {
  detailsEls = getElements();
};

exports.queryDetailsEls = queryDetailsEls;

var updateCapitalOutput = function updateCapitalOutput(capitalData) {
  var _capitalData = _slicedToArray(capitalData, 3),
      action = _capitalData[0],
      amount = _capitalData[1],
      newCapital = _capitalData[2];

  detailsEls.capitalOutput.textContent = newCapital;
};

exports.updateCapitalOutput = updateCapitalOutput;
},{}],"js/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENTRIES_PER_PAGE = void 0;
var ENTRIES_PER_PAGE = 2;
exports.ENTRIES_PER_PAGE = ENTRIES_PER_PAGE;
},{}],"js/views/journalEntriesView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderJournalEntries = exports.removeEmptyJournalCard = exports.addJournalEntriesHandler = exports.queryJournalEntriesEls = void 0;

var _config = require("../config");

var journalEntriesEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.journalEntriesWrapper = document.querySelector('.js-journal-entries-wrapper');
  obj.journalPaginationWrapper = document.querySelector('.js-journal-pagination');
  obj.journalFormWrapper = document.querySelector('.js-journal-form-wrapper');
  return obj;
};

var queryJournalEntriesEls = function queryJournalEntriesEls() {
  journalEntriesEls = getElements();
};

exports.queryJournalEntriesEls = queryJournalEntriesEls;

var addJournalEntriesHandler = function addJournalEntriesHandler(handler) {
  journalEntriesEls.journalEntriesWrapper.addEventListener('click', function (e) {
    if (e.target.closest('.c-journal-entry')) {
      var clickedCard = e.target.closest('.c-journal-entry');
      journalEntriesEls.journalEntriesWrapper.querySelector('.c-journal-entry--active').classList.remove('c-journal-entry--active');
      clickedCard.classList.add('c-journal-entry--active');
      return handler(clickedCard.getAttribute('data-id'));
    }

    return;
  });
};

exports.addJournalEntriesHandler = addJournalEntriesHandler;

var removeEmptyJournalCard = function removeEmptyJournalCard() {
  var emptyCard = journalEntriesEls.journalEntriesWrapper.querySelector('.c-journal-entry--new');

  if (emptyCard) {
    emptyCard.remove();
    activateEntry(selectFirstEntry());
  }
};

exports.removeEmptyJournalCard = removeEmptyJournalCard;

var selectFirstEntry = function selectFirstEntry() {
  return journalEntriesEls.journalEntriesWrapper.querySelector('.c-journal-entry');
};

var activateEntry = function activateEntry(entryEl) {
  if (!entryEl) return;
  var previouslyActive = journalEntriesEls.journalEntriesWrapper.querySelector('.c-journal-entry--active');
  if (previouslyActive) previouslyActive.classList.remove('c-journal-entry--active');
  entryEl.classList.add('c-journal-entry--active');
};

var renderJournalPagination = function renderJournalPagination(entriesNumber) {
  var html = '';
  var buttonsNumber = Math.ceil(entriesNumber / _config.ENTRIES_PER_PAGE);

  for (var i = 1; i <= buttonsNumber; i++) {
    html += "\n        <button class=\"c-journal-pagination__button btn btn--pagination\" data-pagination-btn=\"".concat(i, "\">").concat(i, "</button>\n    ");
  }

  journalEntriesEls.journalPaginationWrapper.insertAdjacentHTML('afterbegin', html);
  if (entriesNumber < 9) return;
};

var renderJournalEntries = function renderJournalEntries(entriesData) {
  if (!entriesData) return;
  entriesData.slice(-2, -1).forEach(function (entry) {
    var html = "\n      <div class=\"c-journal-entry ".concat(entry.id ? '' : 'c-journal-entry--new', "\" data-id=").concat(entry.id, ">\n          <div class=\"c-journal-entry__unit-wrapper\">\n              <span class=\"c-journal-entry__date\">").concat(entry.shortDate, "</span>\n              <span class=\"c-journal-entry__data\">").concat(entry.ticker, "</span>\n          </div>\n          <div class=\"c-journal-entry__unit-wrapper\">\n              <span class=\"c-journal-entry__data\">").concat(entry.side, " side</span>\n              <span class=\"c-journal-entry__data\">").concat(entry.sharesAmount, " shares</span>\n          </div>\n          <div class=\"c-journal-entry__unit-wrapper\">\n              <span class=\"c-journal-entry__data\">avg.entry: ").concat(entry.avgEntry, "</span>\n              <span class=\"c-journal-entry__data\">return: ").concat(entry.return, "</span>\n          </div>\n          <div class=\"c-journal-entry__unit-wrapper\">\n              <span class=\"c-journal-entry__data\">avg.exit: ").concat(entry.avgExit, "</span>\n              <span class=\"c-journal-entry__data\">% return ").concat(entry.returnPercent, "</span>\n          </div>\n          <svg class=\"c-journal-entry__chevron svg svg--chevron\" viewBox=\"0 0 31 20\"\n              xmlns=\"http://www.w3.org/2000/svg\">\n              <path d=\"M1.5 1.5L15.5 16.5L29.5 1.5\" stroke=\"#AAAAAA\" stroke-width=\"4\" />\n          </svg>\n      </div>\n      ");
    journalEntriesEls.journalEntriesWrapper.insertAdjacentHTML('afterbegin', html);
  });
  activateEntry(selectFirstEntry());
  renderJournalPagination(entriesData.length);
  return selectFirstEntry().getAttribute('data-id');
};

exports.renderJournalEntries = renderJournalEntries;
},{"../config":"js/config.js"}],"js/views/journalFiltersView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addJournalFiltersHandler = exports.queryJournalFilterEls = void 0;
var journalFilterEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.journalFiltersWrapper = document.querySelector('.js-journal-filter');
  obj.journalEntriesWrapper = document.querySelector('.js-journal-entries-wrapper');
  return obj;
};

var queryJournalFilterEls = function queryJournalFilterEls() {
  journalFilterEls = getElements();
};

exports.queryJournalFilterEls = queryJournalFilterEls;

var addJournalFiltersHandler = function addJournalFiltersHandler(handler) {
  journalFilterEls.journalFiltersWrapper.addEventListener('click', function (e) {
    var existingNewEntry = journalFilterEls.journalEntriesWrapper.querySelector('.c-journal-entry--new');
    if (e.target.classList.contains('js-new-trade-btn') && !existingNewEntry) handler('new');
  });
};

exports.addJournalFiltersHandler = addJournalFiltersHandler;
},{}],"js/views/journalFormView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderJournalForm = exports.switchPositionSide = exports.checkFormMode = exports.renderExtraDetailsRows = exports.switchJournalFormModes = exports.removeJournalFormDetailsRow = exports.addJournalFormEventsHandler = exports.queryJournalFormEls = void 0;

var _helpers = require("../helpers");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var journalFormEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.journalFormWrapper = document.querySelector('.js-journal-form-wrapper');
  obj.journalEntriesWrapper = document.querySelector('.js-journal-entries-wrapper');
  obj.detailsEntryPriceAvg;
  obj.detailsExitPriceAvg;
  obj.detailsEntrySharesTotal;
  obj.detailsExitSharesTotal;
  return obj;
};

var toggleDisabledState = function toggleDisabledState(mode) {
  journalFormEls.manualInputs.forEach(function (input) {
    input.disabled = mode;
  });
};

var recalculateDetailsPrice = function recalculateDetailsPrice(targetElClass, siblingElClass) {
  var inputsArr = Array.from(journalFormEls.journalFormWrapper.querySelectorAll(targetElClass));
  var weightedResultsArr = inputsArr.map(function (input) {
    return +input.value * +input.nextElementSibling.value;
  });
  var allShares = Array.from(journalFormEls.journalFormWrapper.querySelectorAll(siblingElClass)).map(function (input) {
    return +input.value;
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0);
  var filteredWeightedResultsArr = weightedResultsArr.filter(function (num) {
    return num !== 0;
  });
  return (filteredWeightedResultsArr.reduce(function (acc, num) {
    return acc + num;
  }, 0) / allShares).toFixed(2);
};

var recalculateDetailsShares = function recalculateDetailsShares(targetElClass) {
  return Array.from(journalFormEls.journalFormWrapper.querySelectorAll(targetElClass)).map(function (input) {
    return +input.value;
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0);
};

var calculateDetailsOutput = function calculateDetailsOutput(focusedEl) {
  if (focusedEl.classList.contains('c-journal-form__entry')) {
    journalFormEls.detailsEntryPriceAvg.textContent = recalculateDetailsPrice('.c-journal-form__entry', '.c-journal-form__entry-size');
  }

  if (focusedEl.classList.contains('c-journal-form__entry-size')) {
    journalFormEls.detailsEntrySharesTotal.textContent = recalculateDetailsShares('.c-journal-form__entry-size');
    journalFormEls.detailsEntryPriceAvg.textContent = recalculateDetailsPrice('.c-journal-form__entry', '.c-journal-form__entry-size');
  }

  if (focusedEl.classList.contains('c-journal-form__exit')) {
    journalFormEls.detailsExitPriceAvg.textContent = recalculateDetailsPrice('.c-journal-form__exit', '.c-journal-form__exit-size');
  }

  if (focusedEl.classList.contains('c-journal-form__exit-size')) {
    journalFormEls.detailsExitSharesTotal.textContent = recalculateDetailsShares('.c-journal-form__exit-size');
    journalFormEls.detailsExitPriceAvg.textContent = recalculateDetailsPrice('.c-journal-form__exit', '.c-journal-form__exit-size');
  }
};

var addKeyEventToDetailsInputs = function addKeyEventToDetailsInputs() {
  journalFormEls.journalForm.querySelectorAll('.js-form-details-input').forEach(function (input) {
    input.addEventListener('keyup', function (e) {
      setTimeout(function () {
        calculateDetailsOutput(e.target);
      }, 2000);
    });
  });
};

var removeFirstCrossInstances = function removeFirstCrossInstances() {
  journalFormEls.journalFormWrapper.querySelector('.c-journal-form__entry-size-wrapper .js-form-remove-details-row-btn').classList.add('c-journal-form__entry-size-remove-wrapper--disabled');
  journalFormEls.journalFormWrapper.querySelector('.c-journal-form__exit-size-wrapper .js-form-remove-details-row-btn').classList.add('c-journal-form__exit-size-remove-wrapper--disabled');
};

var queryJournalFormEls = function queryJournalFormEls() {
  journalFormEls = getElements();
};

exports.queryJournalFormEls = queryJournalFormEls;

var addJournalFormEventsHandler = function addJournalFormEventsHandler(handler) {
  journalFormEls.journalFormWrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('js-form-edit-btn') && journalFormEls.journalFormWrapper.classList.contains('s-journal__form-wrapper--read-mode')) handler('edit');

    if (e.target.classList.contains('js-form-cancel-btn')) {
      var formId = journalFormEls.journalForm.getAttribute('data-id');

      if (formId) {
        handler('cancel', formId);
      } else {
        handler('cancel', journalFormEls.journalEntriesWrapper.querySelector('.c-journal-entry').nextElementSibling.getAttribute('data-id'));
      }
    }

    if (e.target.classList.contains('js-form-swap-btn')) handler('swap');
    if (e.target.classList.contains('js-form-plus-btn')) handler('extra', '', e.target);
    if (e.target.classList.contains('js-form-remove-details-row-btn')) handler('pop', '', e.target);
  });
};

exports.addJournalFormEventsHandler = addJournalFormEventsHandler;

var removeJournalFormDetailsRow = function removeJournalFormDetailsRow(el) {
  el.previousElementSibling.previousElementSibling.remove();
  el.previousElementSibling.remove();
  el.remove();
  journalFormEls.detailsEntrySharesTotal.textContent = recalculateDetailsShares('.c-journal-form__entry-size');
  journalFormEls.detailsExitSharesTotal.textContent = recalculateDetailsShares('.c-journal-form__exit-size');
  journalFormEls.detailsEntryPriceAvg.textContent = recalculateDetailsPrice('.c-journal-form__entry', '.c-journal-form__entry-size');
  journalFormEls.detailsExitPriceAvg.textContent = recalculateDetailsPrice('.c-journal-form__exit', '.c-journal-form__exit-size');
};

exports.removeJournalFormDetailsRow = removeJournalFormDetailsRow;

var switchJournalFormModes = function switchJournalFormModes() {
  var instruction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (instruction === 'read-only') {
    journalFormEls.journalFormWrapper.classList.remove('s-journal__form-wrapper--edit-mode');
    journalFormEls.journalFormWrapper.classList.add('s-journal__form-wrapper--read-mode');
    return;
  }

  if (journalFormEls.journalFormWrapper.classList.contains('s-journal__form-wrapper--read-mode')) {
    journalFormEls.journalFormWrapper.classList.remove('s-journal__form-wrapper--read-mode');
    journalFormEls.journalFormWrapper.classList.add('s-journal__form-wrapper--edit-mode');
    journalFormEls.manualInputs.forEach(function (input) {
      input.disabled = false;
    });
  } else if (journalFormEls.journalFormWrapper.classList.contains('s-journal__form-wrapper--edit-mode')) {
    journalFormEls.journalFormWrapper.classList.remove('s-journal__form-wrapper--edit-mode');
    journalFormEls.journalFormWrapper.classList.add('s-journal__form-wrapper--read-mode');
    toggleDisabledState(true);
  }
};

exports.switchJournalFormModes = switchJournalFormModes;

var renderExtraDetailsRows = function renderExtraDetailsRows(targetEl) {
  var lastRow = targetEl.previousElementSibling.lastElementChild;
  var rowClone = lastRow.cloneNode(true);
  lastRow.insertAdjacentElement('afterend', rowClone);
  addKeyEventToDetailsInputs();
};

exports.renderExtraDetailsRows = renderExtraDetailsRows;

var checkFormMode = function checkFormMode() {
  if (journalFormEls.journalFormWrapper.classList.contains('s-journal__form-wrapper--read-mode')) {
    switchJournalFormModes();
  }
};

exports.checkFormMode = checkFormMode;

var switchPositionSide = function switchPositionSide() {
  var sideValueEl = journalFormEls.swapBtn.previousElementSibling.firstElementChild;
  sideValueEl.value === 'long' ? sideValueEl.value = 'short' : sideValueEl.value = 'long';
};

exports.switchPositionSide = switchPositionSide;

var renderJournalForm = function renderJournalForm(singleEntry) {
  journalFormEls.journalFormWrapper.innerHTML = '';
  var _singleEntry = singleEntry;

  var _singleEntry2 = _slicedToArray(_singleEntry, 1);

  singleEntry = _singleEntry2[0];
  var html = "\n    <div class=\"c-journal-form js-journal-form\" data-id=\"".concat(singleEntry.id, "\">\n      <div class=\"c-journal-form__upper-region\">\n          <div class=\"c-journal-form__unit-wrapper\">\n              <span class=\"c-journal-form__data\">date: <input\n                      class=\"c-input-text c-input-text--compact c-journal-form__manual-input\"\n                       value=\"").concat(singleEntry.shortDate ? singleEntry.shortDate : (0, _helpers.getTodayShortDate)(), "\" disabled>\n              </span>\n              <span class=\"c-journal-form__data\">stock: <input\n                      class=\"c-input-text c-input-text--compact c-journal-form__manual-input\"\n                      type=\"text\" value=\"").concat(singleEntry.ticker, "\" disabled></span>\n          </div>\n          <div class=\"c-journal-form__unit-wrapper\">\n              <div class=\"c-journal-form__trade-side-wrapper\">\n                  <span class=\"c-journal-form__data\">side: <input\n                          class=\"c-input-text c-input-text--compact c-journal-form__manual-input\"\n                          type=\"text\" value=\"").concat(singleEntry.side ? singleEntry.side : 'long', "\" disabled></span>\n                  <button class=\"c-journal-form__swap btn btn--form-icon c-journal-form__edit-mode-btn js-form-swap-btn\">\n                      <svg class=\"svg svg--swap\" viewBox=\"0 0 17 29\"\n                          xmlns=\"http://www.w3.org/2000/svg\">\n                          <path d=\"M8.5 0L15.8612 12.75L1.13878 12.75L8.5 0Z\"\n                              fill=\"#C4C4C4\" />\n                          <path d=\"M8.5 29L1.13879 16.25L15.8612 16.25L8.5 29Z\"\n                              fill=\"#C4C4C4\" />\n                      </svg>\n  \n                  </button>\n              </div>\n              <span class=\"c-journal-form__data\">%return: <input\n                      class=\"c-input-text c-input-text--compact\" type=\"number\"\n                      value=\"").concat(singleEntry.returnPercent, "\" disabled></span>\n          </div>\n          <div class=\"c-journal-form__unit-wrapper\">\n              <span class=\"c-journal-form__data\">shares: <input\n                      class=\"c-input-text c-input-text--compact\" type=\"number\"\n                      value=\"").concat(singleEntry.sharesAmount, "\" disabled></span>\n              <span class=\"c-journal-form__data\">return: <input\n                      class=\"c-input-text c-input-text--compact\" type=\"number\"\n                      value=\"").concat(singleEntry.return, "\" disabled></span>\n          </div>\n      </div>\n      <div class=\"c-journal-form__middle-region\">\n          <div class=\"c-journal-form__entries-wrapper\">\n              <div class=\"c-journal-form__entries-labels-wrapper\">\n                  <span class=\"c-journal-form__entries-label\">entries</span>\n                  <span class=\"c-journal-form__entries-label\">shares</span>\n              </div>\n              <div class=\"c-journal-form__entries-inner-wrapper js-entries-wrapper\">\n                  \n              </div>\n              <button class=\"c-journal-form__plus-entry btn btn--icon c-journal-form__edit-mode-btn js-form-plus-btn\">\n                  <svg class=\"svg svg--plus-circle\" viewBox=\"0 0 17 17\"\n                      xmlns=\"http://www.w3.org/2000/svg\">\n                      <circle cx=\"8.5\" cy=\"8.5\" r=\"8.5\" fill=\"#29242A\" />\n                      <path d=\"M14 7H3V10H14V7Z\" fill=\"#C4C4C4\" />\n                      <path d=\"M10 14V3H7L7 14H10Z\" fill=\"#C4C4C4\" />\n                  </svg>\n  \n              </button>\n              <div class=\"c-journal-form__entries-labels-wrapper\">\n                  <span class=\"c-journal-form__entries-label\">average: <br><span\n                          class=\"c-journal-form__entries-label-result js-details-entry-price-average\">").concat(singleEntry.tradeEntries[0][0] ? (singleEntry.tradeEntries.map(function (single) {
    return single[0] * single[1];
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0) / singleEntry.tradeEntries.map(function (single) {
    return single[1];
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0)).toFixed(2) : '', "</span></span>\n                  <span class=\"c-journal-form__average-entry\">shares: <br><span\n                          class=\"c-journal-form__entries-label-result js-details-entry-shares-result\">").concat(singleEntry.tradeExits[0][1] ? singleEntry.tradeExits.map(function (single) {
    return single[1];
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0) : '', "</span></span>\n              </div>\n          </div>\n          <div class=\"c-journal-form__exits-wrapper\">\n              <div class=\"c-journal-form__exits-labels-wrapper\">\n                  <span class=\"c-journal-form__exits-label\">exits</span>\n                  <span class=\"c-journal-form__exits-label\">shares</span>\n              </div>\n              <div class=\"c-journal-form__exits-inner-wrapper js-exits-wrapper\">\n                \n              </div>\n              <button class=\"c-journal-form__plus-exit btn btn--icon c-journal-form__edit-mode-btn js-form-plus-btn\">\n                  <svg class=\"svg svg--plus-circle\" viewBox=\"0 0 17 17\"\n                      xmlns=\"http://www.w3.org/2000/svg\">\n                      <circle cx=\"8.5\" cy=\"8.5\" r=\"8.5\" fill=\"#29242A\" />\n                      <path d=\"M14 7H3V10H14V7Z\" fill=\"#C4C4C4\" />\n                      <path d=\"M10 14V3H7L7 14H10Z\" fill=\"#C4C4C4\" />\n                  </svg>\n  \n              </button>\n              <div class=\"c-journal-form__exits-labels-wrapper\">\n                  <span class=\"c-journal-form__exits-label\">average: <br><span\n                          class=\"c-journal-form__exits-label-result js-details-exit-price-average\">").concat(singleEntry.tradeExits[0][0] ? (singleEntry.tradeExits.map(function (single) {
    return single[0] * single[1];
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0) / singleEntry.tradeExits.map(function (single) {
    return single[1];
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0)).toFixed(2) : '', "</span></span>\n                  <span class=\"c-journal-form__average-exit\">shares: <br><span\n                          class=\"c-journal-form__exits-label-result js-details-exit-shares-result\">").concat(singleEntry.tradeExits[0][1] ? singleEntry.tradeExits.map(function (single) {
    return single[1];
  }).reduce(function (acc, num) {
    return acc + num;
  }, 0) : '', "</span></span>\n              </div>\n          </div>\n  \n      </div>\n    <textarea class=\"c-journal-form__text-area\" name=\"\" id=\"\" rows=\"10\"></textarea>\n    </div>\n    <div class=\"c-journal-form__buttons-wrapper\">\n        <button class=\"c-journal-from__button-delete btn btn--secondary\">delete</button>\n        <div class=\"c-journal-form__buttons-inner-wrapper\">\n            <button class=\"c-journal-form__button-cancel btn btn--secondary c-journal-form__edit-mode-btn js-form-cancel-btn\">cancel</button>\n            <button class=\"c-journal-form__button-save btn btn--primary c-journal-form__edit-mode-btn\">save</button>\n        </div>\n        <button class=\"c-journal-form__button-edit btn btn--primary js-form-edit-btn\">edit</button>\n    </div>\n    ");
  journalFormEls.journalFormWrapper.insertAdjacentHTML('afterbegin', html);
  journalFormEls.journalForm = document.querySelector('.js-journal-form');
  var entriesSection = document.querySelector('.js-entries-wrapper');
  var exitsSection = document.querySelector('.js-exits-wrapper');
  singleEntry.tradeEntries.forEach(function (transaction) {
    entriesSection.innerHTML += "\n          <div class=\"c-journal-form__entry-size-wrapper\">\n              <input type=\"number\"\n              class=\"c-journal-form__entry c-input-text c-input-text--compact c-journal-form__manual-input  js-form-details-input\"\n              value=\"".concat(transaction[0], "\" disabled>\n              <input type=\"number\"\n              class=\"c-journal-form__entry-size c-input-text c-input-text--compact c-journal-form__manual-input  js-form-details-input\"\n              value=\"").concat(transaction[1], "\" disabled>\n              <div class=\"c-journal-form__entry-size-remove-wrapper c-journal-form__edit-mode-btn js-form-remove-details-row-btn\">\n                <span class=\"c-journal-form__entry-size-remove-btn\">x</span>\n              </div>\n          </div>\n        ");
  });
  singleEntry.tradeExits.forEach(function (transaction) {
    exitsSection.innerHTML += "\n          <div class=\"c-journal-form__exit-size-wrapper\">\n              <input type=\"number\"\n              class=\"c-journal-form__exit c-input-text c-input-text--compact c-journal-form__manual-input js-form-details-input\"\n              value=\"".concat(transaction[0], "\" disabled>\n              <input type=\"number\"\n              class=\"c-journal-form__exit-size c-input-text c-input-text--compact c-journal-form__manual-input  js-form-details-input\"\n              value=\"").concat(transaction[1], "\" disabled>\n              <div class=\"c-journal-form__exit-size-remove-wrapper c-journal-form__edit-mode-btn js-form-remove-details-row-btn\">\n              <span class=\"c-journal-form__exit-size-remove-btn\">x</span>\n            </div>\n          </div>\n        ");
  });
  journalFormEls.swapBtn = journalFormEls.journalFormWrapper.querySelector('.js-form-swap-btn');
  journalFormEls.manualInputs = journalFormEls.journalFormWrapper.querySelectorAll('.c-journal-form__manual-input');
  journalFormEls.detailsExitPriceAvg = journalFormEls.journalFormWrapper.querySelector('.js-details-exit-price-average');
  journalFormEls.detailsExitSharesTotal = journalFormEls.journalFormWrapper.querySelector('.js-details-exit-shares-result');
  journalFormEls.detailsEntryPriceAvg = journalFormEls.journalFormWrapper.querySelector('.js-details-entry-price-average');
  journalFormEls.detailsEntrySharesTotal = journalFormEls.journalFormWrapper.querySelector('.js-details-entry-shares-result');
  addKeyEventToDetailsInputs();
  removeFirstCrossInstances();
};

exports.renderJournalForm = renderJournalForm;
},{"../helpers":"js/helpers.js"}],"js/controller.js":[function(require,module,exports) {
"use strict";

var _calculatorsView = require("./views/calculatorsView");

var _dataModel = require("./models/dataModel");

var _calculatorsModel = require("./models/calculatorsModel");

var _tableMonthlyView = require("./views/tableMonthlyView");

var _tableProfitableView = require("./views/tableProfitableView");

var _chartOverallView = require("./views/chartOverallView");

var _tableMonthlyModel = require("./models/tableMonthlyModel");

var _tableProfitableModel = require("./models/tableProfitableModel");

var _chartPerformanceView = require("./views/chartPerformanceView");

var _chartPerformanceModel = require("./models/chartPerformanceModel");

var _chartWorstBestView = require("./views/chartWorstBestView");

var _chartWorstBestModel = require("./models/chartWorstBestModel");

var _accountDetailsView = require("./views/accountDetailsView");

var _journalEntriesView = require("./views/journalEntriesView");

var _journalFiltersView = require("./views/journalFiltersView");

var _journalFormView = require("./views/journalFormView");

// ZONE - controllers
var controlCalcCapital = function controlCalcCapital(amount, action) {
  var capitalData = (0, _dataModel.updateCapital)(amount, action);
  (0, _calculatorsView.renderCapitalMessage)(capitalData);
  (0, _accountDetailsView.updateCapitalOutput)(capitalData);
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
};

var controlOverallRender = function controlOverallRender() {
  (0, _chartOverallView.renderStreaks)((0, _dataModel.passData)('streaks'));
};

var controlPerformanceRender = function controlPerformanceRender() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'day';
  (0, _chartPerformanceView.renderPerformanceChart)((0, _chartPerformanceModel.formatPerformanceData)(type));
};

var controlWorstBestRender = function controlWorstBestRender() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'worst';
  (0, _chartWorstBestView.renderWorstBestChart)((0, _chartWorstBestModel.formatWorstBestData)(type));
};

var controlLongShortPieRender = function controlLongShortPieRender() {
  (0, _chartOverallView.renderLongShortPie)((0, _dataModel.passData)('overall').proportions);
};

var controlJournalRender = function controlJournalRender() {
  var activeEntryID = (0, _journalEntriesView.renderJournalEntries)((0, _dataModel.passData)('journal'));
  (0, _journalFormView.renderJournalForm)((0, _dataModel.findJournalEntry)(activeEntryID));
};

var controlJournalFormEvents = function controlJournalFormEvents(action) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var targetEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (action === 'edit') (0, _journalFormView.switchJournalFormModes)();

  if (action === 'cancel') {
    (0, _journalEntriesView.removeEmptyJournalCard)();
    (0, _journalFormView.switchJournalFormModes)();
    (0, _journalFormView.renderJournalForm)((0, _dataModel.findJournalEntry)(id));
  }

  if (action === 'swap') (0, _journalFormView.switchPositionSide)();
  if (action === 'extra') (0, _journalFormView.renderExtraDetailsRows)(targetEl);
  if (action === 'pop') (0, _journalFormView.removeJournalFormDetailsRow)(targetEl);
};

var controlJournalActiveEntries = function controlJournalActiveEntries() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (!id) return;
  (0, _journalEntriesView.removeEmptyJournalCard)();
  (0, _journalFormView.switchJournalFormModes)('read-only');
  (0, _journalFormView.renderJournalForm)((0, _dataModel.findJournalEntry)(id));
};

var controlJournalFilters = function controlJournalFilters(action) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (action === 'new') {
    (0, _journalEntriesView.renderJournalEntries)((0, _dataModel.passData)('dummyJournal'));
    (0, _journalFormView.renderJournalForm)((0, _dataModel.passData)('dummyJournal'));
    (0, _journalFormView.checkFormMode)();
  }
};

var queryDOM = function queryDOM() {
  (0, _calculatorsView.queryCalcEls)();
  (0, _tableMonthlyView.queryMonthlyEls)();
  (0, _tableProfitableView.queryProfitableEls)();
  (0, _chartOverallView.queryOverallEls)();
  (0, _chartPerformanceView.queryPerformanceEls)();
  (0, _chartWorstBestView.queryBestWorstEls)();
  (0, _accountDetailsView.queryDetailsEls)();
  (0, _journalEntriesView.queryJournalEntriesEls)();
  (0, _journalFiltersView.queryJournalFilterEls)();
  (0, _journalFormView.queryJournalFormEls)();
}; // ZONE - event listeners


window.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOM app is loaded');
  queryDOM();
  controlMonthlyRender();
  controlProfitableRender();
  controlOverallRender();
  controlPerformanceRender();
  controlWorstBestRender();
  controlLongShortPieRender();
  controlJournalRender();
  (0, _calculatorsView.addCalcPositionHandler)(controlCalcPosition);
  (0, _calculatorsView.addCalcRatioHandler)(controlCalcRatio);
  (0, _calculatorsView.addCalcCapitalHandler)(controlCalcCapital);
  (0, _chartPerformanceView.addPerformanceRenderHandler)(controlPerformanceRender);
  (0, _chartWorstBestView.addWorstBestRenderHandler)(controlWorstBestRender);
  (0, _journalFiltersView.addJournalFiltersHandler)(controlJournalFilters);
  (0, _journalEntriesView.addJournalEntriesHandler)(controlJournalActiveEntries);
  (0, _journalFormView.addJournalFormEventsHandler)(controlJournalFormEvents);
});
var resizeTimer;
window.addEventListener('resize', function (e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    (0, _chartPerformanceView.clearPerformanceCanvas)();
    (0, _chartWorstBestView.clearWorstBestCanvas)();
    (0, _chartOverallView.clearLongShortCanvas)();
    (0, _chartPerformanceView.renderPerformanceChart)();
    (0, _chartWorstBestView.renderWorstBestChart)();
    (0, _chartOverallView.renderLongShortPie)();
  }, 1000);
});
},{"./views/calculatorsView":"js/views/calculatorsView.js","./models/dataModel":"js/models/dataModel.js","./models/calculatorsModel":"js/models/calculatorsModel.js","./views/tableMonthlyView":"js/views/tableMonthlyView.js","./views/tableProfitableView":"js/views/tableProfitableView.js","./views/chartOverallView":"js/views/chartOverallView.js","./models/tableMonthlyModel":"js/models/tableMonthlyModel.js","./models/tableProfitableModel":"js/models/tableProfitableModel.js","./views/chartPerformanceView":"js/views/chartPerformanceView.js","./models/chartPerformanceModel":"js/models/chartPerformanceModel.js","./views/chartWorstBestView":"js/views/chartWorstBestView.js","./models/chartWorstBestModel":"js/models/chartWorstBestModel.js","./views/accountDetailsView":"js/views/accountDetailsView.js","./views/journalEntriesView":"js/views/journalEntriesView.js","./views/journalFiltersView":"js/views/journalFiltersView.js","./views/journalFormView":"js/views/journalFormView.js"}],"../../../Users/Patryk/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62596" + '/');

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