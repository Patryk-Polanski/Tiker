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
exports.clearCalcResult = exports.renderCalcResult = exports.renderCapitalMessage = exports.addCalcRatioHandler = exports.addCalcPositionHandler = exports.addCalcCapitalHandler = exports.queryCalcEl = void 0;
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

var queryCalcEl = function queryCalcEl() {
  calculatorEls = getElements();
};

exports.queryCalcEl = queryCalcEl;

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
},{}],"js/models/dataModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCapital = exports.passData = void 0;
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
      trades: [{
        ID: '7Ft7s4w',
        shares: 60,
        result: 121,
        winPercentage: 1.44
      }]
    },
    AAPL: {
      trades: [{
        ID: 'QHnv65t',
        shares: 40,
        result: 175,
        winPercentage: 1.54
      }]
    }
  },
  profitable: {
    BMBL: {
      totalProfit: 2780,
      totalShares: 312,
      avgReturn: 134,
      avgWinPercentage: 1.56,
      battingAvgPercentage: 64,
      winLossRatio: 3.11
    },
    AAPL: {
      totalProfit: 2780,
      totalShares: 312,
      avgReturn: 134,
      avgWinPercentage: 1.56,
      battingAvgPercentage: 64,
      winLossRatio: 3.11
    }
  },
  monthlyData: {
    june21: [{
      ID: 'OL4stW4',
      side: 'long',
      result: 240,
      resultPercentage: 1.83,
      date: '16/06/21'
    }, {
      ID: 'SLX8f6s',
      side: 'long',
      result: -130,
      resultPercentage: 1.92,
      date: '13/06/21'
    }],
    may21: [{
      ID: 'HR6q2pf',
      side: 'short',
      result: 160,
      resultPercentage: 1.42,
      date: '27/05/21'
    }, {
      ID: 'Gq9pd4H',
      side: 'short',
      result: -80,
      resultPercentage: -0.8,
      date: '27/05/21'
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

var updateCapital = function updateCapital(amount, action) {
  Math.abs(action);
  if (action === 'minus') user.capital -= amount;
  if (action === 'plus') user.capital += amount;
  if (user.capital < 0) user.capital = 0;
  console.log('updated global state', user);
  return [action, amount, user.capital];
};

exports.updateCapital = updateCapital;
},{}],"js/models/calculatorsModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcRatioResult = exports.calcPositionResult = void 0;

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
  var stopDistance = Math.abs(entry - stop);
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
  var exitDistance = Math.abs(exit - entry);
  var stopDistance = Math.abs(entry - stop);
  return (exitDistance / stopDistance).toFixed(2);
};

exports.calcRatioResult = calcRatioResult;
},{}],"js/controller.js":[function(require,module,exports) {
"use strict";

var _calculatorsView = require("./views/calculatorsView");

var _dataModel = require("./models/dataModel");

var _calculatorsModel = require("./models/calculatorsModel");

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
}; // ZONE - event listeners


window.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOM app is loaded');
  (0, _calculatorsView.queryCalcEl)();
  (0, _calculatorsView.addCalcPositionHandler)(controlCalcPosition);
  (0, _calculatorsView.addCalcRatioHandler)(controlCalcRatio);
  (0, _calculatorsView.addCalcCapitalHandler)(controlCalcCapital);
});
},{"./views/calculatorsView":"js/views/calculatorsView.js","./models/dataModel":"js/models/dataModel.js","./models/calculatorsModel":"js/models/calculatorsModel.js"}],"../../../Users/Patryk/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61988" + '/');

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