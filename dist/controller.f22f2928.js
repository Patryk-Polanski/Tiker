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
})({"js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = void 0;
var user = {
  capital: 7305,
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
exports.user = user;
console.log(user);
},{}],"js/views/calculatorsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHandlerKeypress = void 0;
var calculatorEl = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.positionEntryPrice = document.querySelector('.js-calculator-position-entry');
  obj.positionRiskPercentage = document.querySelector('.js-calculator-position-percentage');
  obj.positionStopPrice = document.querySelector('.js-calculator-position-stop');
  obj.positionResult = document.querySelector('.js-calculator-position-result');
  return obj;
};

var checkFieldsForData = function checkFieldsForData(el1, el2, el3) {
  if (!el1.value || !el2.value || !el3.value) return;
  return [+el1.value, +el2.value, +el3.value];
};

var addHandlerKeypress = function addHandlerKeypress() {
  calculatorEl = getElements({});
  [calculatorEl.positionEntryPrice, calculatorEl.positionRiskPercentage, calculatorEl.positionStopPrice].forEach(function (input) {
    input.addEventListener('keyup', function (e) {
      if (e.key === 'Tab' || !isFinite(e.key)) return;
      var formattedData = checkFieldsForData(calculatorEl.positionEntryPrice, calculatorEl.positionRiskPercentage, calculatorEl.positionStopPrice);
      console.log(formattedData);
    });
  });
};

exports.addHandlerKeypress = addHandlerKeypress;
},{}],"js/controller.js":[function(require,module,exports) {
"use strict";

var _helpers = _interopRequireDefault(require("./helpers"));

var _calculatorsView = require("./views/calculatorsView");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOM app is loaded');
  (0, _calculatorsView.addHandlerKeypress)();
});
},{"./helpers":"js/helpers.js","./views/calculatorsView":"js/views/calculatorsView.js"}],"../../../Users/Patryk/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56098" + '/');

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