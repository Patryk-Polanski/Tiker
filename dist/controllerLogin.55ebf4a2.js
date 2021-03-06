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
exports.createLongDate = exports.createShortDate = exports.kFormatter = exports.filterNonStrings = exports.crunchData = exports.reduceData = exports.makeAbsolute = exports.stringifyNum = void 0;

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
  var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'k';
  if (!num) return 0;
  return Math.abs(num) > decimal ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(2) + unit : Math.sign(num) * Math.abs(num);
};

exports.kFormatter = kFormatter;

var createShortDate = function createShortDate() {
  var specifiedDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var joinedDate;

  if (specifiedDate) {
    var _Date$toLocaleDateStr = new Date(specifiedDate).toLocaleDateString('en-US').split('/'),
        _Date$toLocaleDateStr2 = _slicedToArray(_Date$toLocaleDateStr, 3),
        month = _Date$toLocaleDateStr2[0],
        date = _Date$toLocaleDateStr2[1],
        year = _Date$toLocaleDateStr2[2];

    joinedDate = date + '/' + month + '/' + year.slice(-2);
  } else {
    var _Date$toLocaleDateStr3 = new Date().toLocaleDateString('en-US').split('/'),
        _Date$toLocaleDateStr4 = _slicedToArray(_Date$toLocaleDateStr3, 3),
        _month = _Date$toLocaleDateStr4[0],
        _date = _Date$toLocaleDateStr4[1],
        _year = _Date$toLocaleDateStr4[2];

    joinedDate = _date + '/' + _month + '/' + _year.slice(-2);
  }

  return joinedDate;
};

exports.createShortDate = createShortDate;

var createLongDate = function createLongDate(shortDate) {
  var _ref;

  var _shortDate$split$reve = shortDate.split('/').reverse(),
      _shortDate$split$reve2 = _slicedToArray(_shortDate$split$reve, 3),
      year = _shortDate$split$reve2[0],
      month = _shortDate$split$reve2[1],
      day = _shortDate$split$reve2[2]; // check if each data has the correct length


  if (year.length !== 2 || month.length > 2 && month.length < 1 || day.length > 2 || day.length < 1) return 'ERROR'; // coerce the string into numbers

  year = +('20' + year);
  month = +month;
  day = +day; // check if day, month or year failed the coercion due to incorrect format

  if (!year || !month || !day) return 'ERROR'; // get current year

  var currentYear = new Date().getFullYear(); // run year, day and month range validation

  if ((_ref = year < 2010) !== null && _ref !== void 0 ? _ref : year > currentYear) return 'ERROR';
  if (month < 0 || month > 12) return 'ERROR';
  if (day < 1 || day > 31) return 'ERROR';
  var fullDate = new Date(year, month - 1, day);
  return String(fullDate);
};

exports.createLongDate = createLongDate;
},{}],"js/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_PASSWORD = exports.USER_USERNAME = exports.MONTHS_FORMAT = exports.ENTRIES_PER_PAGE = void 0;
var ENTRIES_PER_PAGE = 8;
exports.ENTRIES_PER_PAGE = ENTRIES_PER_PAGE;
var MONTHS_FORMAT = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
exports.MONTHS_FORMAT = MONTHS_FORMAT;
var USER_USERNAME = 'trader';
exports.USER_USERNAME = USER_USERNAME;
var USER_PASSWORD = 'app';
exports.USER_PASSWORD = USER_PASSWORD;
},{}],"js/views/loginView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHandlerLogin = void 0;

var _config = require("../config");

var formEls = {};

var getElements = function getElements() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.enterBtn = document.querySelector('.js-enter-btn');
  obj.joinBtn = document.querySelector('.js-join-btn');
  obj.usernameInput = document.querySelector('.js-login-username');
  obj.passwordInput = document.querySelector('.js-login-password');
  obj.loginMessage = document.querySelector('.js-form-message');
  return obj;
};

var clearLoginInputs = function clearLoginInputs() {
  formEls.usernameInput.value = '';
  formEls.passwordInput.value = '';
};

var compareLoginDetails = function compareLoginDetails(inputUsername, inputPassword) {
  if (inputUsername !== _config.USER_USERNAME || inputPassword !== _config.USER_PASSWORD) {
    formEls.loginMessage.textContent = 'Incorrect username and/or password';
    setTimeout(function () {
      formEls.loginMessage.textContent = '';
    }, 5000);
    return;
  }

  clearLoginInputs();
  window.location.href = '../../app.html';
};

var addHandlerLogin = function addHandlerLogin() {
  formEls = getElements({});
  formEls.enterBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var inputtedUsername = formEls.usernameInput.value;
    var inputtedPassword = formEls.passwordInput.value;
    compareLoginDetails(inputtedUsername, inputtedPassword);
  });
  formEls.joinBtn.addEventListener('click', function (e) {
    e.preventDefault();
    formEls.loginMessage.textContent = 'Join option is currently unavailable';
    setTimeout(function () {
      formEls.loginMessage.textContent = '';
    }, 5000);
  });
};

exports.addHandlerLogin = addHandlerLogin;
},{"../config":"js/config.js"}],"js/controllerLogin.js":[function(require,module,exports) {
"use strict";

var _helpers = _interopRequireDefault(require("./helpers"));

var _loginView = require("./views/loginView");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('DOMContentLoaded', function (e) {
  (0, _loginView.addHandlerLogin)();
});
},{"./helpers":"js/helpers.js","./views/loginView":"js/views/loginView.js"}],"../../../Users/Patryk/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51346" + '/');

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
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
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
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
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
},{}]},{},["../../../Users/Patryk/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","js/controllerLogin.js"], null)
//# sourceMappingURL=/controllerLogin.55ebf4a2.js.map