/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _leancloudStorage = __webpack_require__(6);

var _leancloudStorage2 = _interopRequireDefault(_leancloudStorage);

__webpack_require__(7);

var _date = __webpack_require__(12);

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP_ID = 'aeTqFehwIkT3Lfdz57UTEkai-gzGzoHsz';
var APP_KEY = 'hGtaRjlrewcCIUyTtl9lVGYT';
_leancloudStorage2.default.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var app = new _vue2.default({
    el: '#app',
    data: {
        message: 'TodoList',
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        formData: { //登入 注册共用，这样一来用户切换登入注册的时候，已输入的数据就不需要再输入一遍
            username: '',
            password: ''
        },
        currentUser: null //当前登录的用户
    },

    created: function created() {
        // window.onbeforeunload = () => {//onbeforeunload在页面卸载时触发，实践得出的结论是：beforeunload 事件里面的所有请求都发不出去，会被取消
        //     let dataString = JSON.stringify(this.todoList)

        // 每次刷新页面待办就没了，因为代码保存在内存中，而内存无法持久，所以我们选择将代码保存在localStorage中
        // window.localStorage.setItem('myTodos', dataString)
        // 但将数据保存在localStorage里，弊端是在不清空内存的情况下所有用户看到的都是同意todoList
        // 所以我们选择将内存存储在leancloud中，以下接口来自官方文档 https://leancloud.cn/docs/leanstorage_guide-js.html#hash-609558353

        // 因为beforeunload事件里的请求发不出去，所以我们不能再beforeunload事件里将数据存储到LeanCloud中

        // 第一次尝试保存数据与用户匹配不成功
        // var AVTodos = AV.Object.extend('AllTodos')
        // var avTodos = new AVTodos()
        // avTodos.set('content', dataString)
        // avTodos.save().then(function (todo) {
        //     // 成功保存之后，执行其他逻辑.
        //     console.log('保存成功')
        // }, function (error) {
        //     // 异常处理
        //     console.error('保存失败')
        // })

        // 别被困难打倒，为什么一定要在页面卸载前存储数据到leancloud中呢？
        // 我们完全可以在用户每次增删todo时就发送请求存储数据
        // }

        // 从LeanCloud读取todos的逻辑
        // let oldDataString = window.localStorage.getItem('myTodos')
        // let oldData = JSON.parse(oldDataString)
        // this.todoList = oldData || []

        this.currentUser = this.getCurrentUser();
        this.fetchTodos();
        // this.$nextTick(()=>{
        //     
        // })
    },

    methods: {
        // 读取todos
        fetchTodos: function fetchTodos() {
            var _this = this;

            if (this.currentUser) {
                var query = new _leancloudStorage2.default.Query('AllTodos');
                query.find()
                // .then(function (todos) {
                //     console.log(todos)//获取user的AllTodos
                .then(function (todos) {
                    var avAllTodos = todos[0]; //一个用户对应一块AllTodos，理论上AllTodos只有一个，所以我们取结果的第一项
                    var id = avAllTodos.id;
                    _this.todoList = JSON.parse(avAllTodos.attributes.content);
                    _this.todoList.id = id; // 读取成功后保存id
                }, function (error) {
                    console.log(error);
                });
            }
        },


        // 更新对象
        updateTodos: function updateTodos() {
            var dataString = JSON.stringify(this.todoList);
            var avTodos = _leancloudStorage2.default.Object.createWithoutData('AllTodos', this.todoList.id);
            avTodos.set('content', dataString);
            avTodos.save().then(function () {
                console.log('更新成功');
            });
        },


        // 存储待办项
        saveTodos: function saveTodos() {
            var _this2 = this;

            var dataString = JSON.stringify(this.todoList);
            var AVTodos = _leancloudStorage2.default.Object.extend('AllTodos');
            var avTodos = new AVTodos();
            var acl = new _leancloudStorage2.default.ACL(); // ACL即leancloud访问控制（读写权限管理）
            acl.setReadAccess(_leancloudStorage2.default.User.current(), true); // 当前user可读
            acl.setWriteAccess(_leancloudStorage2.default.User.current(), true); // 当前user可写
            avTodos.set('content', dataString);
            avTodos.setACL(acl); // 设置访问控制
            avTodos.save().then(function (todo) {
                // 成功保存之后，执行其他逻辑.
                _this2.todoList.id = todo.id; // save成功后保存id
                console.log('保存成功');
            }, function (error) {
                // 异常处理
                console.error('保存失败');
            });
        },


        // id存在即更新todos，不存在则新建todos
        saveOrUpdateTodos: function saveOrUpdateTodos() {
            if (this.todoList.id) {
                this.updateTodos();
            } else {
                this.saveTodos();
            }
        },


        // 增加一个待办项
        addTodo: function addTodo() {
            // 避免无内容的todo
            if (this.newTodo === '') return;
            this.todoList.unshift({
                title: this.newTodo,
                createdAt: Date.now(),
                doneAt: 0,
                done: false //添加一个done属性
            });
            this.newTodo = '';
            this.saveOrUpdateTodos(); //每次新增/更新项即发送请求存储数据
        },


        // 移除一个待办项
        removeTodo: function removeTodo(todo) {
            var index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
            this.saveOrUpdateTodos(); //每次删除/更新项即发送请求存储数据
        },


        //todo可以在已完成和未完成之间切换，无论何时，已完成的项在底部，未完成的项在顶部
        toggleTodo: function toggleTodo(todo) {
            var index = this.todoList.indexOf(todo);
            if (todo.done) {
                todo.done = false;
                todo.doneAt = 0;
                this.todoList.unshift(this.todoList.splice(index, 1)[0]);
            } else {
                todo.done = true;
                todo.doneAt = Date.now();
                this.todoList.push(this.todoList.splice(index, 1)[0]);
            }
            this.saveOrUpdateTodos(); //一定要记得保存完成状态
        },


        //切换日期显示格式
        formatedTime: function formatedTime(time) {
            return (0, _date2.default)(time);
        },


        //注册
        signUp: function signUp() {
            var _this3 = this;

            var user = new _leancloudStorage2.default.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then(function (loginedUser) {
                // console.log(loginedUser)
                _this3.currentUser = _this3.getCurrentUser();
            }, function (error) {
                console.log('注册失败');
            });
        },


        //登入
        login: function login() {
            _leancloudStorage2.default.User.logIn(this.formData.username, this.formData.password).then(function (loginedUser) {
                // console.log(loginedUser)
                // this.currentUser = this.getCurrentUser()
                // this.fetchTodos()//登录成功后即读取todos
            }, function (error) {
                console.log('登录失败');
            });
        },


        //获取当前登录的用户
        getCurrentUser: function getCurrentUser() {
            var current = _leancloudStorage2.default.User.current();
            if (current) {
                var id = current.id,
                    createdAt = current.createdAt,
                    username = current.attributes.username;

                return { id: id, username: username, createdAt: createdAt //解构赋值
                };
            } else {
                return null;
            }
        },


        //登出
        logout: function logout() {
            _leancloudStorage2.default.User.logOut();
            this.currentUser = null;
            window.location.reload();
        }
    }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = { value: value };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  if (process.env.NODE_ENV !== 'production') {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    if (value$1) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (process.env.NODE_ENV !== 'production') {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}

function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

module.exports = Vue$3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1), __webpack_require__(4).setImmediate))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(5);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.AV=e():t.AV=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=35)}([function(t,e,n){var r,i;(function(){function n(t){function e(e,n,r,i,s,o){for(;s>=0&&s<o;s+=t){var a=i?i[s]:s;r=n(r,e[a],a,e)}return r}return function(n,r,i,s){r=S(r,s,4);var o=!x(n)&&O.keys(n),a=(o||n).length,u=t>0?0:a-1;return arguments.length<3&&(i=n[o?o[u]:u],u+=t),e(n,r,i,o,u,a)}}function s(t){return function(e,n,r){n=A(n,r);for(var i=j(e),s=t>0?0:i-1;s>=0&&s<i;s+=t)if(n(e[s],s,e))return s;return-1}}function o(t,e,n){return function(r,i,s){var o=0,a=j(r);if("number"==typeof s)t>0?o=s>=0?s:Math.max(s+a,o):a=s>=0?Math.min(s+1,a):s+a+1;else if(n&&s&&a)return s=n(r,i),r[s]===i?s:-1;if(i!==i)return s=e(p.call(r,o,a),O.isNaN),s>=0?s+o:-1;for(s=t>0?o:a-1;s>=0&&s<a;s+=t)if(r[s]===i)return s;return-1}}function a(t,e){var n=P.length,r=t.constructor,i=O.isFunction(r)&&r.prototype||h,s="constructor";for(O.has(t,s)&&!O.contains(e,s)&&e.push(s);n--;)(s=P[n])in t&&t[s]!==i[s]&&!O.contains(e,s)&&e.push(s)}var u=this,c=u._,l=Array.prototype,h=Object.prototype,f=Function.prototype,d=l.push,p=l.slice,_=h.toString,v=h.hasOwnProperty,y=Array.isArray,m=Object.keys,g=f.bind,b=Object.create,w=function(){},O=function(t){return t instanceof O?t:this instanceof O?void(this._wrapped=t):new O(t)};void 0!==t&&t.exports&&(e=t.exports=O),e._=O,O.VERSION="1.8.3";var S=function(t,e,n){if(void 0===e)return t;switch(null==n?3:n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)};case 4:return function(n,r,i,s){return t.call(e,n,r,i,s)}}return function(){return t.apply(e,arguments)}},A=function(t,e,n){return null==t?O.identity:O.isFunction(t)?S(t,e,n):O.isObject(t)?O.matcher(t):O.property(t)};O.iteratee=function(t,e){return A(t,e,1/0)};var C=function(t,e){return function(n){var r=arguments.length;if(r<2||null==n)return n;for(var i=1;i<r;i++)for(var s=arguments[i],o=t(s),a=o.length,u=0;u<a;u++){var c=o[u];e&&void 0!==n[c]||(n[c]=s[c])}return n}},E=function(t){if(!O.isObject(t))return{};if(b)return b(t);w.prototype=t;var e=new w;return w.prototype=null,e},T=function(t){return function(e){return null==e?void 0:e[t]}},N=Math.pow(2,53)-1,j=T("length"),x=function(t){var e=j(t);return"number"==typeof e&&e>=0&&e<=N};O.each=O.forEach=function(t,e,n){e=S(e,n);var r,i;if(x(t))for(r=0,i=t.length;r<i;r++)e(t[r],r,t);else{var s=O.keys(t);for(r=0,i=s.length;r<i;r++)e(t[s[r]],s[r],t)}return t},O.map=O.collect=function(t,e,n){e=A(e,n);for(var r=!x(t)&&O.keys(t),i=(r||t).length,s=Array(i),o=0;o<i;o++){var a=r?r[o]:o;s[o]=e(t[a],a,t)}return s},O.reduce=O.foldl=O.inject=n(1),O.reduceRight=O.foldr=n(-1),O.find=O.detect=function(t,e,n){var r;if(void 0!==(r=x(t)?O.findIndex(t,e,n):O.findKey(t,e,n))&&-1!==r)return t[r]},O.filter=O.select=function(t,e,n){var r=[];return e=A(e,n),O.each(t,function(t,n,i){e(t,n,i)&&r.push(t)}),r},O.reject=function(t,e,n){return O.filter(t,O.negate(A(e)),n)},O.every=O.all=function(t,e,n){e=A(e,n);for(var r=!x(t)&&O.keys(t),i=(r||t).length,s=0;s<i;s++){var o=r?r[s]:s;if(!e(t[o],o,t))return!1}return!0},O.some=O.any=function(t,e,n){e=A(e,n);for(var r=!x(t)&&O.keys(t),i=(r||t).length,s=0;s<i;s++){var o=r?r[s]:s;if(e(t[o],o,t))return!0}return!1},O.contains=O.includes=O.include=function(t,e,n,r){return x(t)||(t=O.values(t)),("number"!=typeof n||r)&&(n=0),O.indexOf(t,e,n)>=0},O.invoke=function(t,e){var n=p.call(arguments,2),r=O.isFunction(e);return O.map(t,function(t){var i=r?e:t[e];return null==i?i:i.apply(t,n)})},O.pluck=function(t,e){return O.map(t,O.property(e))},O.where=function(t,e){return O.filter(t,O.matcher(e))},O.findWhere=function(t,e){return O.find(t,O.matcher(e))},O.max=function(t,e,n){var r,i,s=-1/0,o=-1/0;if(null==e&&null!=t){t=x(t)?t:O.values(t);for(var a=0,u=t.length;a<u;a++)(r=t[a])>s&&(s=r)}else e=A(e,n),O.each(t,function(t,n,r){((i=e(t,n,r))>o||i===-1/0&&s===-1/0)&&(s=t,o=i)});return s},O.min=function(t,e,n){var r,i,s=1/0,o=1/0;if(null==e&&null!=t){t=x(t)?t:O.values(t);for(var a=0,u=t.length;a<u;a++)(r=t[a])<s&&(s=r)}else e=A(e,n),O.each(t,function(t,n,r){((i=e(t,n,r))<o||i===1/0&&s===1/0)&&(s=t,o=i)});return s},O.shuffle=function(t){for(var e,n=x(t)?t:O.values(t),r=n.length,i=Array(r),s=0;s<r;s++)e=O.random(0,s),e!==s&&(i[s]=i[e]),i[e]=n[s];return i},O.sample=function(t,e,n){return null==e||n?(x(t)||(t=O.values(t)),t[O.random(t.length-1)]):O.shuffle(t).slice(0,Math.max(0,e))},O.sortBy=function(t,e,n){return e=A(e,n),O.pluck(O.map(t,function(t,n,r){return{value:t,index:n,criteria:e(t,n,r)}}).sort(function(t,e){var n=t.criteria,r=e.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(n<r||void 0===r)return-1}return t.index-e.index}),"value")};var U=function(t){return function(e,n,r){var i={};return n=A(n,r),O.each(e,function(r,s){var o=n(r,s,e);t(i,r,o)}),i}};O.groupBy=U(function(t,e,n){O.has(t,n)?t[n].push(e):t[n]=[e]}),O.indexBy=U(function(t,e,n){t[n]=e}),O.countBy=U(function(t,e,n){O.has(t,n)?t[n]++:t[n]=1}),O.toArray=function(t){return t?O.isArray(t)?p.call(t):x(t)?O.map(t,O.identity):O.values(t):[]},O.size=function(t){return null==t?0:x(t)?t.length:O.keys(t).length},O.partition=function(t,e,n){e=A(e,n);var r=[],i=[];return O.each(t,function(t,n,s){(e(t,n,s)?r:i).push(t)}),[r,i]},O.first=O.head=O.take=function(t,e,n){if(null!=t)return null==e||n?t[0]:O.initial(t,t.length-e)},O.initial=function(t,e,n){return p.call(t,0,Math.max(0,t.length-(null==e||n?1:e)))},O.last=function(t,e,n){if(null!=t)return null==e||n?t[t.length-1]:O.rest(t,Math.max(0,t.length-e))},O.rest=O.tail=O.drop=function(t,e,n){return p.call(t,null==e||n?1:e)},O.compact=function(t){return O.filter(t,O.identity)};var k=function(t,e,n,r){for(var i=[],s=0,o=r||0,a=j(t);o<a;o++){var u=t[o];if(x(u)&&(O.isArray(u)||O.isArguments(u))){e||(u=k(u,e,n));var c=0,l=u.length;for(i.length+=l;c<l;)i[s++]=u[c++]}else n||(i[s++]=u)}return i};O.flatten=function(t,e){return k(t,e,!1)},O.without=function(t){return O.difference(t,p.call(arguments,1))},O.uniq=O.unique=function(t,e,n,r){O.isBoolean(e)||(r=n,n=e,e=!1),null!=n&&(n=A(n,r));for(var i=[],s=[],o=0,a=j(t);o<a;o++){var u=t[o],c=n?n(u,o,t):u;e?(o&&s===c||i.push(u),s=c):n?O.contains(s,c)||(s.push(c),i.push(u)):O.contains(i,u)||i.push(u)}return i},O.union=function(){return O.uniq(k(arguments,!0,!0))},O.intersection=function(t){for(var e=[],n=arguments.length,r=0,i=j(t);r<i;r++){var s=t[r];if(!O.contains(e,s)){for(var o=1;o<n&&O.contains(arguments[o],s);o++);o===n&&e.push(s)}}return e},O.difference=function(t){var e=k(arguments,!0,!0,1);return O.filter(t,function(t){return!O.contains(e,t)})},O.zip=function(){return O.unzip(arguments)},O.unzip=function(t){for(var e=t&&O.max(t,j).length||0,n=Array(e),r=0;r<e;r++)n[r]=O.pluck(t,r);return n},O.object=function(t,e){for(var n={},r=0,i=j(t);r<i;r++)e?n[t[r]]=e[r]:n[t[r][0]]=t[r][1];return n},O.findIndex=s(1),O.findLastIndex=s(-1),O.sortedIndex=function(t,e,n,r){n=A(n,r,1);for(var i=n(e),s=0,o=j(t);s<o;){var a=Math.floor((s+o)/2);n(t[a])<i?s=a+1:o=a}return s},O.indexOf=o(1,O.findIndex,O.sortedIndex),O.lastIndexOf=o(-1,O.findLastIndex),O.range=function(t,e,n){null==e&&(e=t||0,t=0),n=n||1;for(var r=Math.max(Math.ceil((e-t)/n),0),i=Array(r),s=0;s<r;s++,t+=n)i[s]=t;return i};var I=function(t,e,n,r,i){if(!(r instanceof e))return t.apply(n,i);var s=E(t.prototype),o=t.apply(s,i);return O.isObject(o)?o:s};O.bind=function(t,e){if(g&&t.bind===g)return g.apply(t,p.call(arguments,1));if(!O.isFunction(t))throw new TypeError("Bind must be called on a function");var n=p.call(arguments,2),r=function(){return I(t,r,e,this,n.concat(p.call(arguments)))};return r},O.partial=function(t){var e=p.call(arguments,1),n=function(){for(var r=0,i=e.length,s=Array(i),o=0;o<i;o++)s[o]=e[o]===O?arguments[r++]:e[o];for(;r<arguments.length;)s.push(arguments[r++]);return I(t,n,this,this,s)};return n},O.bindAll=function(t){var e,n,r=arguments.length;if(r<=1)throw new Error("bindAll must be passed function names");for(e=1;e<r;e++)n=arguments[e],t[n]=O.bind(t[n],t);return t},O.memoize=function(t,e){var n=function(r){var i=n.cache,s=""+(e?e.apply(this,arguments):r);return O.has(i,s)||(i[s]=t.apply(this,arguments)),i[s]};return n.cache={},n},O.delay=function(t,e){var n=p.call(arguments,2);return setTimeout(function(){return t.apply(null,n)},e)},O.defer=O.partial(O.delay,O,1),O.throttle=function(t,e,n){var r,i,s,o=null,a=0;n||(n={});var u=function(){a=!1===n.leading?0:O.now(),o=null,s=t.apply(r,i),o||(r=i=null)};return function(){var c=O.now();a||!1!==n.leading||(a=c);var l=e-(c-a);return r=this,i=arguments,l<=0||l>e?(o&&(clearTimeout(o),o=null),a=c,s=t.apply(r,i),o||(r=i=null)):o||!1===n.trailing||(o=setTimeout(u,l)),s}},O.debounce=function(t,e,n){var r,i,s,o,a,u=function(){var c=O.now()-o;c<e&&c>=0?r=setTimeout(u,e-c):(r=null,n||(a=t.apply(s,i),r||(s=i=null)))};return function(){s=this,i=arguments,o=O.now();var c=n&&!r;return r||(r=setTimeout(u,e)),c&&(a=t.apply(s,i),s=i=null),a}},O.wrap=function(t,e){return O.partial(e,t)},O.negate=function(t){return function(){return!t.apply(this,arguments)}},O.compose=function(){var t=arguments,e=t.length-1;return function(){for(var n=e,r=t[e].apply(this,arguments);n--;)r=t[n].call(this,r);return r}},O.after=function(t,e){return function(){if(--t<1)return e.apply(this,arguments)}},O.before=function(t,e){var n;return function(){return--t>0&&(n=e.apply(this,arguments)),t<=1&&(e=null),n}},O.once=O.partial(O.before,2);var R=!{toString:null}.propertyIsEnumerable("toString"),P=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];O.keys=function(t){if(!O.isObject(t))return[];if(m)return m(t);var e=[];for(var n in t)O.has(t,n)&&e.push(n);return R&&a(t,e),e},O.allKeys=function(t){if(!O.isObject(t))return[];var e=[];for(var n in t)e.push(n);return R&&a(t,e),e},O.values=function(t){for(var e=O.keys(t),n=e.length,r=Array(n),i=0;i<n;i++)r[i]=t[e[i]];return r},O.mapObject=function(t,e,n){e=A(e,n);for(var r,i=O.keys(t),s=i.length,o={},a=0;a<s;a++)r=i[a],o[r]=e(t[r],r,t);return o},O.pairs=function(t){for(var e=O.keys(t),n=e.length,r=Array(n),i=0;i<n;i++)r[i]=[e[i],t[e[i]]];return r},O.invert=function(t){for(var e={},n=O.keys(t),r=0,i=n.length;r<i;r++)e[t[n[r]]]=n[r];return e},O.functions=O.methods=function(t){var e=[];for(var n in t)O.isFunction(t[n])&&e.push(n);return e.sort()},O.extend=C(O.allKeys),O.extendOwn=O.assign=C(O.keys),O.findKey=function(t,e,n){e=A(e,n);for(var r,i=O.keys(t),s=0,o=i.length;s<o;s++)if(r=i[s],e(t[r],r,t))return r},O.pick=function(t,e,n){var r,i,s={},o=t;if(null==o)return s;O.isFunction(e)?(i=O.allKeys(o),r=S(e,n)):(i=k(arguments,!1,!1,1),r=function(t,e,n){return e in n},o=Object(o));for(var a=0,u=i.length;a<u;a++){var c=i[a],l=o[c];r(l,c,o)&&(s[c]=l)}return s},O.omit=function(t,e,n){if(O.isFunction(e))e=O.negate(e);else{var r=O.map(k(arguments,!1,!1,1),String);e=function(t,e){return!O.contains(r,e)}}return O.pick(t,e,n)},O.defaults=C(O.allKeys,!0),O.create=function(t,e){var n=E(t);return e&&O.extendOwn(n,e),n},O.clone=function(t){return O.isObject(t)?O.isArray(t)?t.slice():O.extend({},t):t},O.tap=function(t,e){return e(t),t},O.isMatch=function(t,e){var n=O.keys(e),r=n.length;if(null==t)return!r;for(var i=Object(t),s=0;s<r;s++){var o=n[s];if(e[o]!==i[o]||!(o in i))return!1}return!0};var D=function(t,e,n,r){if(t===e)return 0!==t||1/t==1/e;if(null==t||null==e)return t===e;t instanceof O&&(t=t._wrapped),e instanceof O&&(e=e._wrapped);var i=_.call(t);if(i!==_.call(e))return!1;switch(i){case"[object RegExp]":case"[object String]":return""+t==""+e;case"[object Number]":return+t!=+t?+e!=+e:0==+t?1/+t==1/e:+t==+e;case"[object Date]":case"[object Boolean]":return+t==+e}var s="[object Array]"===i;if(!s){if("object"!=typeof t||"object"!=typeof e)return!1;var o=t.constructor,a=e.constructor;if(o!==a&&!(O.isFunction(o)&&o instanceof o&&O.isFunction(a)&&a instanceof a)&&"constructor"in t&&"constructor"in e)return!1}n=n||[],r=r||[];for(var u=n.length;u--;)if(n[u]===t)return r[u]===e;if(n.push(t),r.push(e),s){if((u=t.length)!==e.length)return!1;for(;u--;)if(!D(t[u],e[u],n,r))return!1}else{var c,l=O.keys(t);if(u=l.length,O.keys(e).length!==u)return!1;for(;u--;)if(c=l[u],!O.has(e,c)||!D(t[c],e[c],n,r))return!1}return n.pop(),r.pop(),!0};O.isEqual=function(t,e){return D(t,e)},O.isEmpty=function(t){return null==t||(x(t)&&(O.isArray(t)||O.isString(t)||O.isArguments(t))?0===t.length:0===O.keys(t).length)},O.isElement=function(t){return!(!t||1!==t.nodeType)},O.isArray=y||function(t){return"[object Array]"===_.call(t)},O.isObject=function(t){var e=typeof t;return"function"===e||"object"===e&&!!t},O.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(t){O["is"+t]=function(e){return _.call(e)==="[object "+t+"]"}}),O.isArguments(arguments)||(O.isArguments=function(t){return O.has(t,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(O.isFunction=function(t){return"function"==typeof t||!1}),O.isFinite=function(t){return isFinite(t)&&!isNaN(parseFloat(t))},O.isNaN=function(t){return O.isNumber(t)&&t!==+t},O.isBoolean=function(t){return!0===t||!1===t||"[object Boolean]"===_.call(t)},O.isNull=function(t){return null===t},O.isUndefined=function(t){return void 0===t},O.has=function(t,e){return null!=t&&v.call(t,e)},O.noConflict=function(){return u._=c,this},O.identity=function(t){return t},O.constant=function(t){return function(){return t}},O.noop=function(){},O.property=T,O.propertyOf=function(t){return null==t?function(){}:function(e){return t[e]}},O.matcher=O.matches=function(t){return t=O.extendOwn({},t),function(e){return O.isMatch(e,t)}},O.times=function(t,e,n){var r=Array(Math.max(0,t));e=S(e,n,1);for(var i=0;i<t;i++)r[i]=e(i);return r},O.random=function(t,e){return null==e&&(e=t,t=0),t+Math.floor(Math.random()*(e-t+1))},O.now=Date.now||function(){return(new Date).getTime()};var F={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},L=O.invert(F),q=function(t){var e=function(e){return t[e]},n="(?:"+O.keys(t).join("|")+")",r=RegExp(n),i=RegExp(n,"g");return function(t){return t=null==t?"":""+t,r.test(t)?t.replace(i,e):t}};O.escape=q(F),O.unescape=q(L),O.result=function(t,e,n){var r=null==t?void 0:t[e];return void 0===r&&(r=n),O.isFunction(r)?r.call(t):r};var M=0;O.uniqueId=function(t){var e=++M+"";return t?t+e:e},O.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var B=/(.)^/,J={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},Q=/\\|'|\r|\n|\u2028|\u2029/g,V=function(t){return"\\"+J[t]};O.template=function(t,e,n){!e&&n&&(e=n),e=O.defaults({},e,O.templateSettings);var r=RegExp([(e.escape||B).source,(e.interpolate||B).source,(e.evaluate||B).source].join("|")+"|$","g"),i=0,s="__p+='";t.replace(r,function(e,n,r,o,a){return s+=t.slice(i,a).replace(Q,V),i=a+e.length,n?s+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?s+="'+\n((__t=("+r+"))==null?'':__t)+\n'":o&&(s+="';\n"+o+"\n__p+='"),e}),s+="';\n",e.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{var o=new Function(e.variable||"obj","_",s)}catch(t){throw t.source=s,t}var a=function(t){return o.call(this,t,O)};return a.source="function("+(e.variable||"obj")+"){\n"+s+"}",a},O.chain=function(t){var e=O(t);return e._chain=!0,e};var W=function(t,e){return t._chain?O(e).chain():e};O.mixin=function(t){O.each(O.functions(t),function(e){var n=O[e]=t[e];O.prototype[e]=function(){var t=[this._wrapped];return d.apply(t,arguments),W(this,n.apply(O,t))}})},O.mixin(O),O.each(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var e=l[t];O.prototype[t]=function(){var n=this._wrapped;return e.apply(n,arguments),"shift"!==t&&"splice"!==t||0!==n.length||delete n[0],W(this,n)}}),O.each(["concat","join","slice"],function(t){var e=l[t];O.prototype[t]=function(){return W(this,e.apply(this._wrapped,arguments))}}),O.prototype.value=function(){return this._wrapped},O.prototype.valueOf=O.prototype.toJSON=O.prototype.value,O.prototype.toString=function(){return""+this._wrapped},r=[],void 0!==(i=function(){return O}.apply(e,r))&&(t.exports=i)}).call(this)},function(t,e,n){"use strict";var r=(n(0),n(46).Promise);r._continueWhile=function(t,e){return t()?e().then(function(){return r._continueWhile(t,e)}):r.resolve()},t.exports=r},function(t,e,n){"use strict";var r=n(0),i=n(50),s=n(0),o=s.extend,a=n(1),u=n(5),c=n(3),l=c.getSessionToken,h=c.ajax,f=function(t,e){var n=(new Date).getTime(),r=i(n+t);return e?r+","+n+",master":r+","+n},d=function(t,e){e?t["X-LC-Sign"]=f(u.applicationKey):t["X-LC-Key"]=u.applicationKey},p=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments[1],n={"X-LC-Id":u.applicationId,"Content-Type":"application/json;charset=UTF-8"},r=!1;return"boolean"==typeof t.useMasterKey?r=t.useMasterKey:"boolean"==typeof u._config.useMasterKey&&(r=u._config.useMasterKey),r?u.masterKey?e?n["X-LC-Sign"]=f(u.masterKey,!0):n["X-LC-Key"]=u.masterKey+",master":(console.warn("masterKey is not set, fall back to use appKey"),d(n,e)):d(n,e),u.hookKey&&(n["X-LC-Hook-Key"]=u.hookKey),null!==u._config.production&&(n["X-LC-Prod"]=String(u._config.production)),n["X-LC-UA"]=u._sharedConfig.userAgent,a.resolve().then(function(){var e=l(t);if(e)n["X-LC-Session"]=e;else if(!u._config.disableCurrentUser)return u.User.currentAsync().then(function(t){return t&&t._sessionToken&&(n["X-LC-Session"]=t._sessionToken),n});return n})},_=function(t){var e=t.service,n=void 0===e?"api":e,r=t.version,i=void 0===r?"1.1":r,s=t.path,o=u._config.serverURLs[n];if(!o)throw new Error("undefined server URL for "+n);return"/"!==o.charAt(o.length-1)&&(o+="/"),o+=i,s&&(o+=s),o},v=function(t){var e=t.service,n=t.version,i=t.method,s=t.path,o=t.query,a=t.data,c=void 0===a?{}:a,l=t.authOptions,f=t.signKey,d=void 0===f||f;if(!u.applicationId||!u.applicationKey&&!u.masterKey)throw new Error("Not initialized");u._appRouter.refresh();var v=_({service:e,path:s,version:n});return p(l,d).then(function(t){return h({method:i,url:v,query:o,data:c,headers:t}).catch(function(t){var e={code:t.code||-1,error:t.message||t.responseText};if(t.response&&t.response.code)e=t.response;else if(t.responseText)try{e=JSON.parse(t.responseText)}catch(t){}e.rawMessage=e.rawMessage||e.error,u._sharedConfig.keepErrorRawMessage||(e.error+=" ["+(t.statusCode||"N/A")+" "+i+" "+v+"]");var n=new Error(e.error);throw delete e.error,r.extend(n,e)})})},y=function(t,e,n,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=arguments[5],a=arguments[6],u="";if(t&&(u+="/"+t),e&&(u+="/"+e),n&&(u+="/"+n),i&&i._fetchWhenSave)throw new Error("_fetchWhenSave should be in the query");if(i&&i._where)throw new Error("_where should be in the query");return r&&"get"===r.toLowerCase()&&(a=o({},a,i),i=null),v({method:r,path:u,query:a,data:i,authOptions:s})};u.request=v,t.exports={_request:y,request:v}},function(t,e,n){"use strict";function r(t){var e=new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$"),n=e.exec(t);if(!n)return null;var r=n[1]||0,i=(n[2]||1)-1,s=n[3]||0,o=n[4]||0,a=n[5]||0,u=n[6]||0,c=n[8]||0;return new Date(Date.UTC(r,i,s,o,a,u,c))}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=n(0),o=n(7),a=n(6),u=a("leancloud:request"),c=a("leancloud:request:error"),l=n(1),h=0,f=function(t){var e=t.method,n=t.url,r=t.query,s=t.data,f=t.headers,d=void 0===f?{}:f,p=t.onprogress,_=h++;u("request("+_+")",e,n,r,s,d);var v={};if(r)for(var y in r)"object"===i(r[y])?v[y]=JSON.stringify(r[y]):v[y]=r[y];return new l(function(t,i){var l=o(e,n).set(d).query(v).send(s);p&&l.on("progress",p),l.end(function(o,l){return o?(l&&(a.enabled("leancloud:request")||c("request("+_+")",e,n,r,s,d),c("response("+_+")",l.status,l.body||l.text,l.header),o.statusCode=l.status,o.responseText=l.text,o.response=l.body),i(o)):(u("response("+_+")",l.status,l.body||l.text,l.header),t(l.body))})})},d=function(t){return s.isNull(t)||s.isUndefined(t)},p=function(t){return s.isArray(t)?t:void 0===t||null===t?[]:[t]},_=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.keys,n=t.include,r=t.includeACL,i={};return e&&(i.keys=p(e).join(",")),n&&(i.include=p(n).join(",")),r&&(i.returnACL=r),i},v=function(t){return t.sessionToken?t.sessionToken:t.user&&"function"==typeof t.user.getSessionToken?t.user.getSessionToken():void 0},y=function(t){return function(e){return t(e),e}},m=function(){},g=function(t,e,n){var r;return r=e&&e.hasOwnProperty("constructor")?e.constructor:function(){t.apply(this,arguments)},s.extend(r,t),m.prototype=t.prototype,r.prototype=new m,e&&s.extend(r.prototype,e),n&&s.extend(r,n),r.prototype.constructor=r,r.__super__=t.prototype,r},b=function(t,e,n){var r=e.split("."),i=r.pop(),s=t;return r.forEach(function(t){void 0===s[t]&&(s[t]={}),s=s[t]}),s[i]=n,t},w=function(t,e){for(var n=e.split("."),r=n.pop(),i=t,s=0;s<n.length;s++)if(void 0===(i=i[n[s]]))return[void 0,void 0,r];return[i[r],i,r]};t.exports={ajax:f,isNullOrUndefined:d,ensureArray:p,transformFetchOptions:_,getSessionToken:v,tap:y,inherits:g,parseDate:r,setValue:b,findValue:w}},function(t,e,n){"use strict";function r(t,e){var n=new Error(e);return n.code=t,n}n(0).extend(r,{OTHER_CAUSE:-1,INTERNAL_SERVER_ERROR:1,CONNECTION_FAILED:100,OBJECT_NOT_FOUND:101,INVALID_QUERY:102,INVALID_CLASS_NAME:103,MISSING_OBJECT_ID:104,INVALID_KEY_NAME:105,INVALID_POINTER:106,INVALID_JSON:107,COMMAND_UNAVAILABLE:108,NOT_INITIALIZED:109,INCORRECT_TYPE:111,INVALID_CHANNEL_NAME:112,PUSH_MISCONFIGURED:115,OBJECT_TOO_LARGE:116,OPERATION_FORBIDDEN:119,CACHE_MISS:120,INVALID_NESTED_KEY:121,INVALID_FILE_NAME:122,INVALID_ACL:123,TIMEOUT:124,INVALID_EMAIL_ADDRESS:125,MISSING_CONTENT_TYPE:126,MISSING_CONTENT_LENGTH:127,INVALID_CONTENT_LENGTH:128,FILE_TOO_LARGE:129,FILE_SAVE_ERROR:130,FILE_DELETE_ERROR:153,DUPLICATE_VALUE:137,INVALID_ROLE_NAME:139,EXCEEDED_QUOTA:140,SCRIPT_FAILED:141,VALIDATION_ERROR:142,INVALID_IMAGE_DATA:150,UNSAVED_FILE_ERROR:151,INVALID_PUSH_TIME_ERROR:152,USERNAME_MISSING:200,PASSWORD_MISSING:201,USERNAME_TAKEN:202,EMAIL_TAKEN:203,EMAIL_MISSING:204,EMAIL_NOT_FOUND:205,SESSION_MISSING:206,MUST_CREATE_USER_THROUGH_SIGNUP:207,ACCOUNT_ALREADY_LINKED:208,LINKED_ID_MISSING:250,INVALID_LINKED_SESSION:251,UNSUPPORTED_SERVICE:252,X_DOMAIN_REQUEST:602}),t.exports=r},function(t,e,n){"use strict";(function(e){var r=n(0),i=n(37),s=n(3),o=s.inherits,a=s.parseDate,u=e.AV||{};u._config={serverURLs:{},useMasterKey:!1,production:null,realtime:null},u._sharedConfig={userAgent:i,liveQueryRealtime:null},u._getAVPath=function(t){if(!u.applicationId)throw new Error("You need to call AV.initialize before using AV.");if(t||(t=""),!r.isString(t))throw new Error("Tried to get a localStorage path that wasn't a String.");return"/"===t[0]&&(t=t.substring(1)),"AV/"+u.applicationId+"/"+t};var c=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},l=function(){return""+c()+c()+"-"+c()+"-"+c()+"-"+c()+"-"+c()+c()+c()};u._installationId=null,u._getInstallationId=function(){if(u._installationId)return u.Promise.resolve(u._installationId);var t=u._getAVPath("installationId");return u.localStorage.getItemAsync(t).then(function(e){return u._installationId=e,u._installationId?e:(u._installationId=e=l(),u.localStorage.setItemAsync(t,e).then(function(){return e}))})},u._subscriptionId=null,u._refreshSubscriptionId=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u._getAVPath("subscriptionId"),e=u._subscriptionId=l();return u.localStorage.setItemAsync(t,e).then(function(){return e})},u._getSubscriptionId=function(){if(u._subscriptionId)return u.Promise.resolve(u._subscriptionId);var t=u._getAVPath("subscriptionId");return u.localStorage.getItemAsync(t).then(function(e){return u._subscriptionId=e,u._subscriptionId||(e=u._refreshSubscriptionId(t)),e})},u._parseDate=a,u._extend=function(t,e){var n=o(this,t,e);return n.extend=this.extend,n},u._encode=function(t,e,n){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];if(t instanceof u.Object){if(n)throw new Error("AV.Objects not allowed here");return e&&!r.include(e,t)&&t._hasData?t._toFullJSON(e.concat(t),i):t._toPointer()}if(t instanceof u.ACL)return t.toJSON();if(r.isDate(t))return i?{__type:"Date",iso:t.toJSON()}:t.toJSON();if(t instanceof u.GeoPoint)return t.toJSON();if(r.isArray(t))return r.map(t,function(t){return u._encode(t,e,n,i)});if(r.isRegExp(t))return t.source;if(t instanceof u.Relation)return t.toJSON();if(t instanceof u.Op)return t.toJSON();if(t instanceof u.File){if(!t.url()&&!t.id)throw new Error("Tried to save an object containing an unsaved file.");return t._toFullJSON(e,i)}return r.isObject(t)?r.mapObject(t,function(t,r){return u._encode(t,e,n,i)}):t},u._decode=function(t,e){if(!r.isObject(t)||r.isDate(t))return t;if(r.isArray(t))return r.map(t,function(t){return u._decode(t)});if(t instanceof u.Object)return t;if(t instanceof u.File)return t;if(t instanceof u.Op)return t;if(t instanceof u.GeoPoint)return t;if(t instanceof u.ACL)return t;if("ACL"===e)return new u.ACL(t);if(t.__op)return u.Op._decode(t);var n;if("Pointer"===t.__type){n=t.className;var i=u.Object._create(n);if(Object.keys(t).length>3){var s=r.clone(t);delete s.__type,delete s.className,i._finishFetch(s,!0)}else i._finishFetch({objectId:t.objectId},!1);return i}if("Object"===t.__type){n=t.className;var o=r.clone(t);delete o.__type,delete o.className;var a=u.Object._create(n);return a._finishFetch(o,!0),a}if("Date"===t.__type)return u._parseDate(t.iso);if("GeoPoint"===t.__type)return new u.GeoPoint({latitude:t.latitude,longitude:t.longitude});if("Relation"===t.__type){if(!e)throw new Error("key missing decoding a Relation");var c=new u.Relation(null,e);return c.targetClassName=t.className,c}if("File"===t.__type){var l=new u.File(t.name),h=r.clone(t);return delete h.__type,l._finishFetch(h),l}return r.mapObject(t,u._decode)},u.parseJSON=u._decode,u._encodeObjectOrArray=function(t){var e=function(t){return t&&t._toFullJSON&&(t=t._toFullJSON([])),r.mapObject(t,function(t){return u._encode(t,[])})};return r.isArray(t)?t.map(function(t){return e(t)}):e(t)},u._arrayEach=r.each,u._traverse=function(t,e,n){if(t instanceof u.Object){if(n=n||[],r.indexOf(n,t)>=0)return;return n.push(t),u._traverse(t.attributes,e,n),e(t)}return t instanceof u.Relation||t instanceof u.File?e(t):r.isArray(t)?(r.each(t,function(r,i){var s=u._traverse(r,e,n);s&&(t[i]=s)}),e(t)):r.isObject(t)?(u._each(t,function(r,i){var s=u._traverse(r,e,n);s&&(t[i]=s)}),e(t)):e(t)},u._objectEach=u._each=function(t,e){r.isObject(t)?r.each(r.keys(t),function(n){e(t[n],n)}):r.each(t,e)},t.exports=u}).call(e,n(8))},function(t,e,n){function r(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function i(t){var n=this.useColors;if(t[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+t[0]+(n?"%c ":" ")+"+"+e.humanize(this.diff),n){var r="color: "+this.color;t.splice(1,0,r,"color: inherit");var i=0,s=0;t[0].replace(/%[a-zA-Z%]/g,function(t){"%%"!==t&&(i++,"%c"===t&&(s=i))}),t.splice(s,0,r)}}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function o(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(t){}}function a(){var t;try{t=e.storage.debug}catch(t){}return!t&&"undefined"!=typeof process&&"env"in process&&(t=process.env.DEBUG),t}e=t.exports=n(45),e.log=s,e.formatArgs=i,e.save=o,e.load=a,e.useColors=r,e.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(t){}}(),e.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],e.formatters.j=function(t){try{return JSON.stringify(t)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}},e.enable(a())},function(t,e,n){function r(){}function i(t){if(!_(t))return t;var e=[];for(var n in t)s(e,n,t[n]);return e.join("&")}function s(t,e,n){if(null!=n)if(Array.isArray(n))n.forEach(function(n){s(t,e,n)});else if(_(n))for(var r in n)s(t,e+"["+r+"]",n[r]);else t.push(encodeURIComponent(e)+"="+encodeURIComponent(n));else null===n&&t.push(encodeURIComponent(e))}function o(t){for(var e,n,r={},i=t.split("&"),s=0,o=i.length;s<o;++s)e=i[s],n=e.indexOf("="),-1==n?r[decodeURIComponent(e)]="":r[decodeURIComponent(e.slice(0,n))]=decodeURIComponent(e.slice(n+1));return r}function a(t){for(var e,n,r,i,s=t.split(/\r?\n/),o={},a=0,u=s.length;a<u;++a)n=s[a],-1!==(e=n.indexOf(":"))&&(r=n.slice(0,e).toLowerCase(),i=g(n.slice(e+1)),o[r]=i);return o}function u(t){return/[\/+]json\b/.test(t)}function c(t){this.req=t,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||void 0===this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText;var e=this.xhr.status;1223===e&&(e=204),this._setStatusProperties(e),this.header=this.headers=a(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this._setHeaderProperties(this.header),null===this.text&&t._responseType?this.body=this.xhr.response:this.body="HEAD"!=this.req.method?this._parseBody(this.text?this.text:this.xhr.response):null}function l(t,e){var n=this;this._query=this._query||[],this.method=t,this.url=e,this.header={},this._header={},this.on("end",function(){var t=null,e=null;try{e=new c(n)}catch(e){return t=new Error("Parser is unable to parse the response"),t.parse=!0,t.original=e,n.xhr?(t.rawResponse=void 0===n.xhr.responseType?n.xhr.responseText:n.xhr.response,t.status=n.xhr.status?n.xhr.status:null,t.statusCode=t.status):(t.rawResponse=null,t.status=null),n.callback(t)}n.emit("response",e);var r;try{n._isResponseOK(e)||(r=new Error(e.statusText||"Unsuccessful HTTP response"))}catch(t){r=t}r?(r.original=t,r.response=e,r.status=e.status,n.callback(r,e)):n.callback(null,e)})}function h(t,e,n){var r=m("DELETE",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r}var f;"undefined"!=typeof window?f=window:"undefined"!=typeof self?f=self:(console.warn("Using browser-only version of superagent in non-browser environment"),f=this);var d=n(43),p=n(53),_=n(13),v=n(54),y=n(52),m=e=t.exports=function(t,n){return"function"==typeof n?new e.Request("GET",t).end(n):1==arguments.length?new e.Request("GET",t):new e.Request(t,n)};e.Request=l,m.getXHR=function(){if(!(!f.XMLHttpRequest||f.location&&"file:"==f.location.protocol&&f.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}throw Error("Browser-only version of superagent could not find XHR")};var g="".trim?function(t){return t.trim()}:function(t){return t.replace(/(^\s*|\s*$)/g,"")};m.serializeObject=i,m.parseString=o,m.types={html:"text/html",json:"application/json",xml:"text/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},m.serialize={"application/x-www-form-urlencoded":i,"application/json":JSON.stringify},m.parse={"application/x-www-form-urlencoded":o,"application/json":JSON.parse},v(c.prototype),c.prototype._parseBody=function(t){var e=m.parse[this.type];return this.req._parser?this.req._parser(this,t):(!e&&u(this.type)&&(e=m.parse["application/json"]),e&&t&&(t.length||t instanceof Object)?e(t):null)},c.prototype.toError=function(){var t=this.req,e=t.method,n=t.url,r="cannot "+e+" "+n+" ("+this.status+")",i=new Error(r);return i.status=this.status,i.method=e,i.url=n,i},m.Response=c,d(l.prototype),p(l.prototype),l.prototype.type=function(t){return this.set("Content-Type",m.types[t]||t),this},l.prototype.accept=function(t){return this.set("Accept",m.types[t]||t),this},l.prototype.auth=function(t,e,n){1===arguments.length&&(e=""),"object"==typeof e&&null!==e&&(n=e,e=""),n||(n={type:"function"==typeof btoa?"basic":"auto"});var r=function(t){if("function"==typeof btoa)return btoa(t);throw new Error("Cannot use basic auth, btoa is not a function")};return this._auth(t,e,n,r)},l.prototype.query=function(t){return"string"!=typeof t&&(t=i(t)),t&&this._query.push(t),this},l.prototype.attach=function(t,e,n){if(e){if(this._data)throw Error("superagent can't mix .send() and .attach()");this._getFormData().append(t,e,n||e.name)}return this},l.prototype._getFormData=function(){return this._formData||(this._formData=new f.FormData),this._formData},l.prototype.callback=function(t,e){if(this._shouldRetry(t,e))return this._retry();var n=this._callback;this.clearTimeout(),t&&(this._maxRetries&&(t.retries=this._retries-1),this.emit("error",t)),n(t,e)},l.prototype.crossDomainError=function(){var t=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");t.crossDomain=!0,t.status=this.status,t.method=this.method,t.url=this.url,this.callback(t)},l.prototype.buffer=l.prototype.ca=l.prototype.agent=function(){return console.warn("This is not supported in browser version of superagent"),this},l.prototype.pipe=l.prototype.write=function(){throw Error("Streaming is not supported in browser version of superagent")},l.prototype._isHost=function(t){return t&&"object"==typeof t&&!Array.isArray(t)&&"[object Object]"!==Object.prototype.toString.call(t)},l.prototype.end=function(t){return this._endCalled&&console.warn("Warning: .end() was called twice. This is not supported in superagent"),this._endCalled=!0,this._callback=t||r,this._finalizeQueryString(),this._end()},l.prototype._end=function(){var t=this,e=this.xhr=m.getXHR(),n=this._formData||this._data;this._setTimeouts(),e.onreadystatechange=function(){var n=e.readyState;if(n>=2&&t._responseTimeoutTimer&&clearTimeout(t._responseTimeoutTimer),4==n){var r;try{r=e.status}catch(t){r=0}if(!r){if(t.timedout||t._aborted)return;return t.crossDomainError()}t.emit("end")}};var r=function(e,n){n.total>0&&(n.percent=n.loaded/n.total*100),n.direction=e,t.emit("progress",n)};if(this.hasListeners("progress"))try{e.onprogress=r.bind(null,"download"),e.upload&&(e.upload.onprogress=r.bind(null,"upload"))}catch(t){}try{this.username&&this.password?e.open(this.method,this.url,!0,this.username,this.password):e.open(this.method,this.url,!0)}catch(t){return this.callback(t)}if(this._withCredentials&&(e.withCredentials=!0),!this._formData&&"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof n&&!this._isHost(n)){var i=this._header["content-type"],s=this._serializer||m.serialize[i?i.split(";")[0]:""];!s&&u(i)&&(s=m.serialize["application/json"]),s&&(n=s(n))}for(var o in this.header)null!=this.header[o]&&this.header.hasOwnProperty(o)&&e.setRequestHeader(o,this.header[o]);return this._responseType&&(e.responseType=this._responseType),this.emit("request",this),e.send(void 0!==n?n:null),this},m.agent=function(){return new y},["GET","POST","OPTIONS","PATCH","PUT","DELETE"].forEach(function(t){y.prototype[t.toLowerCase()]=function(e,n){var r=new m.Request(t,e);return this._setDefaults(r),n&&r.end(n),r}}),y.prototype.del=y.prototype.delete,m.get=function(t,e,n){var r=m("GET",t);return"function"==typeof e&&(n=e,e=null),e&&r.query(e),n&&r.end(n),r},m.head=function(t,e,n){var r=m("HEAD",t);return"function"==typeof e&&(n=e,e=null),e&&r.query(e),n&&r.end(n),r},m.options=function(t,e,n){var r=m("OPTIONS",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},m.del=h,m.delete=h,m.patch=function(t,e,n){var r=m("PATCH",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},m.post=function(t,e,n){var r=m("POST",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},m.put=function(t,e,n){var r=m("PUT",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var r=n(10),i=n(5),s=e.removeAsync=r.removeItemAsync.bind(r),o=function(t,e){try{t=JSON.parse(t)}catch(t){return null}if(t){return t.expiredAt&&t.expiredAt<Date.now()?s(e).then(function(){return null}):t.value}return null};e.getAsync=function(t){return t="AV/"+i.applicationId+"/"+t,r.getItemAsync(t).then(function(e){return o(e,t)})},e.setAsync=function(t,e,n){var s={value:e};return"number"==typeof n&&(s.expiredAt=Date.now()+n),r.setItemAsync("AV/"+i.applicationId+"/"+t,JSON.stringify(s))}},function(t,e,n){"use strict";var r=n(0),i=n(1),s=n(41),o=["getItem","setItem","removeItem","clear"];s.async?r(o).each(function(t){"function"!=typeof s[t]&&(s[t]=function(){var e=new Error("Synchronous API ["+t+"] is not available in this runtime.");throw e.code="SYNC_API_NOT_AVAILABLE",e})}):r(o).each(function(t){"function"==typeof s[t]&&(s[t+"Async"]=function(){return i.resolve(s[t].apply(s,arguments))})}),t.exports=s},function(t,e,n){"use strict";t.exports="3.4.2"},function(t,e){var n={utf8:{stringToBytes:function(t){return n.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(n.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n));return e},bytesToString:function(t){for(var e=[],n=0;n<t.length;n++)e.push(String.fromCharCode(t[n]));return e.join("")}}};t.exports=n},function(t,e,n){"use strict";function r(t){return null!==t&&"object"==typeof t}t.exports=r},function(t,e,n){"use strict";var r=n(0);t.exports=function(t){t.ACL=function(e){var n=this;if(n.permissionsById={},r.isObject(e))if(e instanceof t.User)n.setReadAccess(e,!0),n.setWriteAccess(e,!0);else{if(r.isFunction(e))throw new Error("AV.ACL() called with a function.  Did you forget ()?");t._objectEach(e,function(e,i){if(!r.isString(i))throw new Error("Tried to create an ACL with an invalid userId.");n.permissionsById[i]={},t._objectEach(e,function(t,e){if("read"!==e&&"write"!==e)throw new Error("Tried to create an ACL with an invalid permission type.");if(!r.isBoolean(t))throw new Error("Tried to create an ACL with an invalid permission value.");n.permissionsById[i][e]=t})})}},t.ACL.prototype.toJSON=function(){return r.clone(this.permissionsById)},t.ACL.prototype._setAccess=function(e,n,i){if(n instanceof t.User?n=n.id:n instanceof t.Role&&(n="role:"+n.getName()),!r.isString(n))throw new Error("userId must be a string.");if(!r.isBoolean(i))throw new Error("allowed must be either true or false.");var s=this.permissionsById[n];if(!s){if(!i)return;s={},this.permissionsById[n]=s}i?this.permissionsById[n][e]=!0:(delete s[e],r.isEmpty(s)&&delete this.permissionsById[n])},t.ACL.prototype._getAccess=function(e,n){n instanceof t.User?n=n.id:n instanceof t.Role&&(n="role:"+n.getName());var r=this.permissionsById[n];return!!r&&!!r[e]},t.ACL.prototype.setReadAccess=function(t,e){this._setAccess("read",t,e)},t.ACL.prototype.getReadAccess=function(t){return this._getAccess("read",t)},t.ACL.prototype.setWriteAccess=function(t,e){this._setAccess("write",t,e)},t.ACL.prototype.getWriteAccess=function(t){return this._getAccess("write",t)},t.ACL.prototype.setPublicReadAccess=function(t){this.setReadAccess("*",t)},t.ACL.prototype.getPublicReadAccess=function(){return this.getReadAccess("*")},t.ACL.prototype.setPublicWriteAccess=function(t){this.setWriteAccess("*",t)},t.ACL.prototype.getPublicWriteAccess=function(){return this.getWriteAccess("*")},t.ACL.prototype.getRoleReadAccess=function(e){if(e instanceof t.Role&&(e=e.getName()),r.isString(e))return this.getReadAccess("role:"+e);throw new Error("role must be a AV.Role or a String")},t.ACL.prototype.getRoleWriteAccess=function(e){if(e instanceof t.Role&&(e=e.getName()),r.isString(e))return this.getWriteAccess("role:"+e);throw new Error("role must be a AV.Role or a String")},t.ACL.prototype.setRoleReadAccess=function(e,n){if(e instanceof t.Role&&(e=e.getName()),r.isString(e))return void this.setReadAccess("role:"+e,n);throw new Error("role must be a AV.Role or a String")},t.ACL.prototype.setRoleWriteAccess=function(e,n){if(e instanceof t.Role&&(e=e.getName()),r.isString(e))return void this.setWriteAccess("role:"+e,n);throw new Error("role must be a AV.Role or a String")}}},function(t,e,n){"use strict";var r=n(0),i=n(3),s=i.tap;t.exports=function(t){t.Captcha=function(t,e){this._options=t,this._authOptions=e,this.url=void 0,this.captchaToken=void 0,this.validateToken=void 0},t.Captcha.prototype.refresh=function(){var e=this;return t.Cloud._requestCaptcha(this._options,this._authOptions).then(function(t){var n=t.captchaToken,i=t.url;return r.extend(e,{captchaToken:n,url:i}),i})},t.Captcha.prototype.verify=function(e){var n=this;return t.Cloud.verifyCaptcha(e,this.captchaToken).then(s(function(t){return n.validateToken=t}))},t.Captcha.prototype.bind=function(t,e){var n=this,r=t.textInput,i=t.image,s=t.verifyButton,o=e.success,a=e.error;if("string"==typeof r&&!(r=document.getElementById(r)))throw new Error("textInput with id "+r+" not found");if("string"==typeof i&&!(i=document.getElementById(i)))throw new Error("image with id "+i+" not found");if("string"==typeof s&&!(s=document.getElementById(s)))throw new Error("verifyButton with id "+s+" not found");this.__refresh=function(){return n.refresh().then(function(t){i.src=t,r&&(r.value="",r.focus())}).catch(function(t){return console.warn("refresh captcha fail: "+t.message)})},i&&(this.__image=i,i.src=this.url,i.addEventListener("click",this.__refresh)),this.__verify=function(){var t=r.value;n.verify(t).catch(function(t){throw n.__refresh(),t}).then(o,a).catch(function(t){return console.warn("verify captcha fail: "+t.message)})},r&&s&&(this.__verifyButton=s,s.addEventListener("click",this.__verify))},t.Captcha.prototype.unbind=function(){this.__image&&this.__image.removeEventListener("click",this.__refresh),this.__verifyButton&&this.__verifyButton.removeEventListener("click",this.__verify)},t.Captcha.request=function(e,n){var r=new t.Captcha(e,n);return r.refresh().then(function(){return r})}}},function(t,e,n){"use strict";var r=n(0),i=n(2),s=i._request,o=i.request,a=n(1);t.exports=function(t){t.Cloud=t.Cloud||{},r.extend(t.Cloud,{run:function(e,n,r){return o({service:"engine",method:"POST",path:"/functions/"+e,data:t._encode(n,null,!0),authOptions:r}).then(function(e){return t._decode(e).result})},rpc:function(e,n,i){return r.isArray(n)?a.reject(new Error("Can't pass Array as the param of rpc function in JavaScript SDK.")):o({service:"engine",method:"POST",path:"/call/"+e,data:t._encodeObjectOrArray(n),authOptions:i}).then(function(e){return t._decode(e).result})},getServerDate:function(){return s("date",null,null,"GET").then(function(e){return t._decode(e)})},requestSmsCode:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(r.isString(t)&&(t={mobilePhoneNumber:t}),!t.mobilePhoneNumber)throw new Error("Missing mobilePhoneNumber.");return e.validateToken&&(t=r.extend({},t,{validate_token:e.validateToken})),s("requestSmsCode",null,null,"POST",t,e)},verifySmsCode:function(t,e){if(!t)throw new Error("Missing sms code.");var n={};return r.isString(e)&&(n.mobilePhoneNumber=e),s("verifySmsCode",t,null,"POST",n)},_requestCaptcha:function(t,e){return s("requestCaptcha",null,null,"GET",t,e).then(function(t){var e=t.captcha_url;return{captchaToken:t.captcha_token,url:e}})},requestCaptcha:t.Captcha.request,verifyCaptcha:function(t,e){return s("verifyCaptcha",null,null,"POST",{captcha_code:t,captcha_token:e}).then(function(t){return t.validate_token})}})}},function(t,e,n){"use strict";var r=n(0),i=n(2),s=i._request,o=n(5);t.exports=o.Object.extend("_Conversation",{constructor:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o.Object.prototype.constructor.call(this,null,null),this.set("name",t),void 0!==e.isSystem&&this.set("sys",!!e.isSystem),void 0!==e.isTransient&&this.set("tr",!!e.isTransient)},getCreator:function(){return this.get("c")},getLastMessageAt:function(){return this.get("lm")},getMembers:function(){return this.get("m")},addMember:function(t){return this.add("m",t)},getMutedMembers:function(){return this.get("mu")},getName:function(){return this.get("name")},isTransient:function(){return this.get("tr")},isSystem:function(){return this.get("sys")},send:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};"function"==typeof e.toJSON&&(e=e.toJSON()),"string"!=typeof e&&(e=JSON.stringify(e));var i={from_peer:t,conv_id:this.id,transient:!1,message:e};return void 0!==n.toClients&&(i.to_peers=n.toClients),void 0!==n.transient&&(i.transient=!!n.transient),void 0!==n.pushData&&(i.push_data=n.pushData),s("rtm","messages",null,"POST",i,r)},broadcast:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};"function"==typeof e.toJSON&&(e=e.toJSON()),"string"!=typeof e&&(e=JSON.stringify(e));var o={from_peer:t,conv_id:this.id,message:e};if(void 0!==n.pushData&&(o.push=n.pushData),void 0!==n.validTill){var a=n.validTill;r.isDate(a)&&(a=a.getTime()),n.valid_till=a}return s("rtm","broadcast",null,"POST",o,i)}})},function(t,e,n){"use strict";var r=n(0);t.exports=function(t){var e=/\s+/,n=Array.prototype.slice;t.Events={on:function(t,n,r){var i,s,o,a,u;if(!n)return this;for(t=t.split(e),i=this._callbacks||(this._callbacks={}),s=t.shift();s;)u=i[s],o=u?u.tail:{},o.next=a={},o.context=r,o.callback=n,i[s]={tail:a,next:u?u.next:o},s=t.shift();return this},off:function(t,n,i){var s,o,a,u,c,l;if(o=this._callbacks){if(!(t||n||i))return delete this._callbacks,this;for(t=t?t.split(e):r.keys(o),s=t.shift();s;)if(a=o[s],delete o[s],a&&(n||i)){for(u=a.tail,a=a.next;a!==u;)c=a.callback,l=a.context,(n&&c!==n||i&&l!==i)&&this.on(s,c,l),a=a.next;s=t.shift()}return this}},trigger:function(t){var r,i,s,o,a,u,c;if(!(s=this._callbacks))return this;for(u=s.all,t=t.split(e),c=n.call(arguments,1),r=t.shift();r;){if(i=s[r])for(o=i.tail;(i=i.next)!==o;)i.callback.apply(i.context||this,c);if(i=u)for(o=i.tail,a=[r].concat(c);(i=i.next)!==o;)i.callback.apply(i.context||this,a);r=t.shift()}return this}},t.Events.bind=t.Events.on,t.Events.unbind=t.Events.off}},function(t,e,n){"use strict";var r=n(0),i=n(38),s=n(39),o=n(40),a=n(4),u=n(2)._request,c=n(1),l=n(3),h=l.tap,f=l.transformFetchOptions,d=n(6)("leancloud:file"),p=n(42);t.exports=function(t){var e=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},n=function(t){return r.isString(t)?t.match(/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/)[4]:""},l=function(t){if(t<26)return String.fromCharCode(65+t);if(t<52)return String.fromCharCode(t-26+97);if(t<62)return String.fromCharCode(t-52+48);if(62===t)return"+";if(63===t)return"/";throw new Error("Tried to encode large digit "+t+" in base64.")},_=function(t){var e=[];return e.length=Math.ceil(t.length/3),r.times(e.length,function(n){var r=t[3*n],i=t[3*n+1]||0,s=t[3*n+2]||0,o=3*n+1<t.length,a=3*n+2<t.length;e[n]=[l(r>>2&63),l(r<<4&48|i>>4&15),o?l(i<<2&60|s>>6&3):"=",a?l(63&s):"="].join("")}),e.join("")};t.File=function(e,i,s){if(this.attributes={name:e,url:"",metaData:{},base64:""},r.isString(i))throw new TypeError("Creating an AV.File from a String is not yet supported.");r.isArray(i)&&(this.attributes.metaData.size=i.length,i={base64:_(i)}),this._extName="",this._data=i,this._uploadHeaders={},"undefined"!=typeof Blob&&i instanceof Blob&&(i.size&&(this.attributes.metaData.size=i.size),i.name&&(this._extName=n(i.name)));var o=void 0;if(i&&i.owner)o=i.owner;else if(!t._config.disableCurrentUser)try{o=t.User.current()}catch(t){if("SYNC_API_NOT_AVAILABLE"!==t.code)throw t;console.warn("Get current user failed. It seems this runtime use an async storage system, please create AV.File in the callback of AV.User.currentAsync().")}this.attributes.metaData.owner=o?o.id:"unknown",this.set("mime_type",s)},t.File.withURL=function(e,n,r,i){if(!e||!n)throw new Error("Please provide file name and url");var s=new t.File(e,null,i);if(r)for(var o in r)s.attributes.metaData[o]||(s.attributes.metaData[o]=r[o]);return s.attributes.url=n,s.attributes.metaData.__source="external",s},t.File.createWithoutData=function(e){var n=new t.File;return n.id=e,n},r.extend(t.File.prototype,{className:"_File",_toFullJSON:function(e){var n=this,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],s=r.clone(this.attributes);return t._objectEach(s,function(n,r){s[r]=t._encode(n,e,void 0,i)}),t._objectEach(this._operations,function(t,e){s[e]=t}),r.has(this,"id")&&(s.objectId=this.id),r(["createdAt","updatedAt"]).each(function(t){if(r.has(n,t)){var e=n[t];s[t]=r.isDate(e)?e.toJSON():e}}),i&&(s.__type="File"),s},toFullJSON:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return this._toFullJSON(t)},toJSON:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[this];return this._toFullJSON(n,!1)},getACL:function(){return this._acl},setACL:function(e){if(!(e instanceof t.ACL))return new a(a.OTHER_CAUSE,"ACL must be a AV.ACL.");this._acl=e},name:function(){return this.get("name")},url:function(){return this.get("url")},get:function(t){switch(t){case"objectId":return this.id;case"url":case"name":case"mime_type":case"metaData":case"createdAt":case"updatedAt":return this.attributes[t];default:return this.attributes.metaData[t]}},set:function(){for(var t=this,e=function(e,n){switch(e){case"name":case"url":case"mime_type":case"base64":case"metaData":t.attributes[e]=n;break;default:t.attributes.metaData[e]=n}},n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];switch(r.length){case 1:for(var s in r[0])e(s,r[0][s]);break;case 2:e(r[0],r[1])}},setUploadHeader:function(t,e){return this._uploadHeaders[t]=e,this},metaData:function(t,e){return t&&e?(this.attributes.metaData[t]=e,this):t&&!e?this.attributes.metaData[t]:this.attributes.metaData},thumbnailURL:function(t,e,n,r,i){var s=this.attributes.url;if(!s)throw new Error("Invalid url.");if(!t||!e||t<=0||e<=0)throw new Error("Invalid width or height value.");if(n=n||100,r=r||!0,n<=0||n>100)throw new Error("Invalid quality value.");return i=i||"png",s+"?imageView/"+(r?2:1)+"/w/"+t+"/h/"+e+"/q/"+n+"/format/"+i},size:function(){return this.metaData().size},ownerId:function(){return this.metaData().owner},destroy:function(t){return this.id?u("files",null,this.id,"DELETE",null,t):c.reject(new Error("The file id is not eixsts."))},_fileToken:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"fileTokens",i=this.attributes.name,s=n(i);!s&&this._extName&&(i+=this._extName,s=this._extName);var o=e()+e()+e()+e()+e()+s,a={key:o,name:i,ACL:this._acl,mime_type:t,metaData:this.attributes.metaData};return this._qiniu_key=o,u(r,null,null,"POST",a)},save:function(t){var e=this;if(this.id)throw new Error("File already saved. If you want to manipulate a file, use AV.Query to get it.");if(!this._previousSave)if(this._data){var n=this.get("mime_type");this._previousSave=this._fileToken(n).then(function(r){return r.mime_type&&(n=r.mime_type,e.set("mime_type",n)),e._token=r.token,c.resolve().then(function(){var t=e._data;if(t&&t.base64)return p(t.base64,n);if(t&&t.blob)return!t.blob.type&&n&&(t.blob.type=n),t.blob.name||(t.blob.name=e.get("name")),t.blob;if("undefined"!=typeof Blob&&t instanceof Blob)return t;throw new TypeError("malformed file data")}).then(function(n){switch(r.provider){case"s3":return o(r,n,e,t);case"qcloud":return i(r,n,e,t);case"qiniu":default:return s(r,n,e,t)}}).then(h(function(){return e._callback(!0)}),function(t){throw e._callback(!1),t})})}else if(this.attributes.url&&"external"===this.attributes.metaData.__source){var r={name:this.attributes.name,ACL:this._acl,metaData:this.attributes.metaData,mime_type:this.mimeType,url:this.attributes.url};this._previousSave=u("files",this.attributes.name,null,"post",r).then(function(t){return e.attributes.name=t.name,e.attributes.url=t.url,e.id=t.objectId,t.size&&(e.attributes.metaData.size=t.size),e})}return this._previousSave},_callback:function(t){u("fileCallback",null,null,"post",{token:this._token,result:t}).catch(d),delete this._token,delete this._data},fetch:function(t,e){return u("files",null,this.id,"GET",f(t),e).then(this._finishFetch.bind(this))},_finishFetch:function(e){var n=t.Object.prototype.parse(e);return n.attributes={name:n.name,url:n.url,mime_type:n.mime_type,bucket:n.bucket},n.attributes.metaData=n.metaData||{},n.id=n.objectId,delete n.objectId,delete n.metaData,delete n.url,delete n.name,delete n.mime_type,delete n.bucket,r.extend(this,n),this}})}},function(t,e,n){"use strict";var r=n(0);t.exports=function(t){t.GeoPoint=function(e,n){r.isArray(e)?(t.GeoPoint._validate(e[0],e[1]),this.latitude=e[0],this.longitude=e[1]):r.isObject(e)?(t.GeoPoint._validate(e.latitude,e.longitude),this.latitude=e.latitude,this.longitude=e.longitude):r.isNumber(e)&&r.isNumber(n)?(t.GeoPoint._validate(e,n),this.latitude=e,this.longitude=n):(this.latitude=0,this.longitude=0);var i=this;this.__defineGetter__&&this.__defineSetter__&&(this._latitude=this.latitude,this._longitude=this.longitude,this.__defineGetter__("latitude",function(){return i._latitude}),this.__defineGetter__("longitude",function(){return i._longitude}),this.__defineSetter__("latitude",function(e){t.GeoPoint._validate(e,i.longitude),i._latitude=e}),this.__defineSetter__("longitude",function(e){t.GeoPoint._validate(i.latitude,e),i._longitude=e}))},t.GeoPoint._validate=function(t,e){if(t<-90)throw new Error("AV.GeoPoint latitude "+t+" < -90.0.");if(t>90)throw new Error("AV.GeoPoint latitude "+t+" > 90.0.");if(e<-180)throw new Error("AV.GeoPoint longitude "+e+" < -180.0.");if(e>180)throw new Error("AV.GeoPoint longitude "+e+" > 180.0.")},t.GeoPoint.current=function(){return new t.Promise(function(e,n){navigator.geolocation.getCurrentPosition(function(n){e(new t.GeoPoint({latitude:n.coords.latitude,longitude:n.coords.longitude}))},n)})},r.extend(t.GeoPoint.prototype,{toJSON:function(){return t.GeoPoint._validate(this.latitude,this.longitude),{__type:"GeoPoint",latitude:this.latitude,longitude:this.longitude}},radiansTo:function(t){var e=Math.PI/180,n=this.latitude*e,r=this.longitude*e,i=t.latitude*e,s=t.longitude*e,o=n-i,a=r-s,u=Math.sin(o/2),c=Math.sin(a/2),l=u*u+Math.cos(n)*Math.cos(i)*c*c;return l=Math.min(1,l),2*Math.asin(Math.sqrt(l))},kilometersTo:function(t){return 6371*this.radiansTo(t)},milesTo:function(t){return 3958.8*this.radiansTo(t)}})}},function(t,e,n){"use strict";function r(t,e){if("us"===e)return h("https://us-api.leancloud.cn");var n=void 0;switch(t.slice(-9)){case"-9Nh9j0Va":return h("https://e1-api.leancloud.cn");case"-MdYXbMMI":return h("https://us-api.leancloud.cn");default:return n=t.slice(0,8).toLowerCase(),{push:"https://"+n+".push.lncld.net",stats:"https://"+n+".stats.lncld.net",engine:"https://"+n+".engine.lncld.net",api:"https://"+n+".api.lncld.net"}}}var i=n(5),s=n(34),o=n(3),a=o.isNullOrUndefined,u=n(0),c=u.extend,l=u.isObject,h=function(t){return{push:t,stats:t,engine:t,api:t}},f=!1;i.init=function(t){if(!l(t))return i.init({appId:t,appKey:arguments.length<=1?void 0:arguments[1],masterKey:arguments.length<=2?void 0:arguments[2],region:arguments.length<=3?void 0:arguments[3]});var e=t.appId,n=t.appKey,o=t.masterKey,a=(t.hookKey,t.region),u=void 0===a?"cn":a,h=t.serverURLs,d=t.disableCurrentUser,p=t.production,_=t.realtime;if(i.applicationId)throw new Error("SDK is already initialized.");if(!e)throw new TypeError("appId must be a string");if(!n)throw new TypeError("appKey must be a string");o&&console.warn("MasterKey is not supposed to be used in browser."),i._config.applicationId=e,i._config.applicationKey=n,i._config.masterKey=o,void 0!==p&&(i._config.production=p),void 0!==d&&(i._config.disableCurrentUser=d),i._appRouter=new s(i);var v=f||void 0!==h||"cn"!==u;i._setServerURLs(c({},r(e,u),i._config.serverURLs,h),v),_?i._config.realtime=_:i._sharedConfig.liveQueryRealtime&&(i._config.realtime=new i._sharedConfig.liveQueryRealtime({appId:e,region:u}))},i.setProduction=function(t){a(t)?i._config.production=null:i._config.production=t?1:0},i._setServerURLs=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];"string"!=typeof t?c(i._config.serverURLs,t):i._config.serverURLs=h(t),e&&(i._appRouter?i._appRouter.disable():f=!0)},i.setServerURLs=function(t){return i._setServerURLs(t)},i.keepErrorRawMessage=function(t){i._sharedConfig.keepErrorRawMessage=t},i.initialize=i.init,["applicationId","applicationKey","masterKey","hookKey"].forEach(function(t){return Object.defineProperty(i,t,{get:function(){return i._config[t]},set:function(e){i._config[t]=e}})})},function(t,e,n){"use strict";var r=n(0),i=n(4),s=n(2),o=s.request;t.exports=function(t){t.Insight=t.Insight||{},r.extend(t.Insight,{startJob:function(e,n){if(!e||!e.sql)throw new Error("Please provide the sql to run the job.");var r={jobConfig:e,appId:t.applicationId};return o({path:"/bigquery/jobs",method:"POST",data:t._encode(r,null,!0),authOptions:n,signKey:!1}).then(function(e){return t._decode(e).id})},on:function(t,e){}}),t.Insight.JobQuery=function(t,e){if(!t)throw new Error("Please provide the job id.");this.id=t,this.className=e,this._skip=0,this._limit=100},r.extend(t.Insight.JobQuery.prototype,{skip:function(t){return this._skip=t,this},limit:function(t){return this._limit=t,this},find:function(e){var n={skip:this._skip,limit:this._limit};return o({path:"/bigquery/jobs/"+this.id,method:"GET",query:n,authOptions:e,signKey:!1}).then(function(e){return e.error?t.Promise.reject(new i(e.code,e.error)):t.Promise.resolve(e)})}})}},function(t,e,n){"use strict";var r=n(0),i=n(47),s=n(1),o=n(3),a=o.inherits,u=n(2),c=u.request;t.exports=function(t){t.LiveQuery=a(i,{constructor:function(t,e){i.apply(this),this.id=t,this._client=e,this._client.register(this),e.on("message",this._dispatch.bind(this))},_dispatch:function(e){var n=this;e.forEach(function(e){var i=e.op,s=e.object,o=e.query_id,a=e.updatedKeys;if(o===n.id){var u=t.parseJSON(r.extend({__type:"_File"===s.className?"File":"Object"},s));a?n.emit(i,u,a):n.emit(i,u)}})},unsubscribe:function(){return this._client.deregister(this),c({method:"POST",path:"/LiveQuery/unsubscribe",data:{id:this._client.id,query_id:this.id}})}},{init:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.subscriptionId,i=void 0===r?t._getSubscriptionId():r;if(!t._config.realtime)throw new Error("LiveQuery not supported. Please use the LiveQuery bundle. https://url.leanapp.cn/enable-live-query");if(!(e instanceof t.Query))throw new TypeError("LiveQuery must be inited with a Query");var o=e.toJSON(),a=o.where,u=o.keys,l=o.returnACL;return s.resolve(i).then(function(n){return c({method:"POST",path:"/LiveQuery/subscribe",data:{query:{where:a,keys:u,returnACL:l,className:e.className},id:n}}).then(function(e){var r=e.query_id;return t._config.realtime.createLiveQueryClient(n).then(function(e){return new t.LiveQuery(r,e)})})})}})}},function(t,e,n){"use strict";function r(t,e){return t&&t[e]?s.isFunction(t[e])?t[e]():t[e]:null}var i=function(){function t(t,e){var n=[],r=!0,i=!1,s=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){i=!0,s=t}finally{try{!r&&a.return&&a.return()}finally{if(i)throw s}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=n(0),o=n(4),a=n(2),u=a._request,c=n(3),l=c.isNullOrUndefined,h=c.ensureArray,f=c.transformFetchOptions,d=c.setValue,p=c.findValue,_=["objectId","createdAt","updatedAt"],v=function(t){if(-1!==_.indexOf(t))throw new Error("key["+t+"] is reserved")},y=function(t){var e=s.find(t,function(t){return t instanceof Error});if(!e)return t;var n=new o(e.code,e.message);throw n.results=t,n};t.exports=function(t){t.Object=function(e,n){if(s.isString(e))return t.Object._create.apply(this,arguments);e=e||{},n&&n.parse&&(e=this.parse(e),e=this._mergeMagicFields(e));var i=r(this,"defaults");i&&(e=s.extend({},i,e)),n&&n.collection&&(this.collection=n.collection),this._serverData={},this._opSetQueue=[{}],this._flags={},this.attributes={},this._hashedJSON={},this._escapedAttributes={},this.cid=s.uniqueId("c"),this.changed={},this._silent={},this._pending={},this.set(e,{silent:!0}),this.changed={},this._silent={},this._pending={},this._hasData=!0,this._previousAttributes=s.clone(this.attributes),this.initialize.apply(this,arguments)},t.Object.saveAll=function(e,n){return t.Object._deepSaveAsync(e,null,n)},t.Object.fetchAll=function(e,n){return t.Promise.resolve().then(function(){return u("batch",null,null,"POST",{requests:s.map(e,function(t){if(!t.className)throw new Error("object must have className to fetch");if(!t.id)throw new Error("object must have id to fetch");if(t.dirty())throw new Error("object is modified but not saved");return{method:"GET",path:"/1.1/classes/"+t.className+"/"+t.id}})},n)}).then(function(t){var n=s.map(e,function(e,n){return t[n].success?(e._finishFetch(e.parse(t[n].success)),e):null===t[n].success?new o(o.OBJECT_NOT_FOUND,"Object not found."):new o(t[n].error.code,t[n].error.error)});return y(n)})},s.extend(t.Object.prototype,t.Events,{_fetchWhenSave:!1,initialize:function(){},fetchWhenSave:function(t){if(console.warn("AV.Object#fetchWhenSave is deprecated, use AV.Object#save with options.fetchWhenSave instead."),!s.isBoolean(t))throw new Error("Expect boolean value for fetchWhenSave");this._fetchWhenSave=t},getObjectId:function(){return this.id},getCreatedAt:function(){return this.createdAt||this.get("createdAt")},getUpdatedAt:function(){return this.updatedAt||this.get("updatedAt")},toJSON:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return this._toFullJSON(n,!1)},toFullJSON:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return this._toFullJSON(t)},_toFullJSON:function(e){var n=this,r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=s.clone(this.attributes);if(s.isArray(e))var o=e.concat(this);return t._objectEach(i,function(e,n){i[n]=t._encode(e,o,void 0,r)}),t._objectEach(this._operations,function(t,e){i[e]=t}),s.has(this,"id")&&(i.objectId=this.id),s(["createdAt","updatedAt"]).each(function(t){if(s.has(n,t)){var e=n[t];i[t]=s.isDate(e)?e.toJSON():e}}),r&&(i.__type="Object",s.isArray(e)&&e.length&&(i.__type="Pointer"),i.className=this.className),i},_refreshCache:function(){var e=this;e._refreshingCache||(e._refreshingCache=!0,t._objectEach(this.attributes,function(n,r){n instanceof t.Object?n._refreshCache():s.isObject(n)&&e._resetCacheForKey(r)&&e.set(r,new t.Op.Set(n),{silent:!0})}),delete e._refreshingCache)},dirty:function(t){return this._refreshCache(),this._dirty()},_dirty:function(t){var e=s.last(this._opSetQueue);return t?!!e[t]:!this.id||s.keys(e).length>0},_toPointer:function(){return{__type:"Pointer",className:this.className,objectId:this.id}},get:function(t){switch(t){case"objectId":return this.id;case"createdAt":case"updatedAt":return this[t];default:return this.attributes[t]}},relation:function(e){var n=this.get(e);if(n){if(!(n instanceof t.Relation))throw new Error("Called relation() on non-relation field "+e);return n._ensureParentAndKey(this,e),n}return new t.Relation(this,e)},escape:function(t){var e=this._escapedAttributes[t];if(e)return e;var n,r=this.attributes[t];return n=l(r)?"":s.escape(r.toString()),this._escapedAttributes[t]=n,n},has:function(t){return!l(this.attributes[t])},_mergeMagicFields:function(e){var n=this,r=["objectId","createdAt","updatedAt"];return t._arrayEach(r,function(r){e[r]&&("objectId"===r?n.id=e[r]:"createdAt"!==r&&"updatedAt"!==r||s.isDate(e[r])?n[r]=e[r]:n[r]=t._parseDate(e[r]),delete e[r])}),e},_startSave:function(){this._opSetQueue.push({})},_cancelSave:function(){var e=s.first(this._opSetQueue);this._opSetQueue=s.rest(this._opSetQueue);var n=s.first(this._opSetQueue);t._objectEach(e,function(t,r){var i=e[r],s=n[r];i&&s?n[r]=s._mergeWithPrevious(i):i&&(n[r]=i)}),this._saving=this._saving-1},_finishSave:function(e){var n={};t._traverse(this.attributes,function(e){e instanceof t.Object&&e.id&&e._hasData&&(n[e.id]=e)});var r=s.first(this._opSetQueue);this._opSetQueue=s.rest(this._opSetQueue),this._applyOpSet(r,this._serverData),this._mergeMagicFields(e);var i=this;t._objectEach(e,function(e,r){i._serverData[r]=t._decode(e,r);var s=t._traverse(i._serverData[r],function(e){if(e instanceof t.Object&&n[e.id])return n[e.id]});s&&(i._serverData[r]=s)}),this._rebuildAllEstimatedData(),this._saving=this._saving-1},_finishFetch:function(e,n){this._opSetQueue=[{}],this._mergeMagicFields(e);var r=this;t._objectEach(e,function(e,n){r._serverData[n]=t._decode(e,n)}),this._rebuildAllEstimatedData(),this._refreshCache(),this._opSetQueue=[{}],this._hasData=n},_applyOpSet:function(e,n){var r=this;t._objectEach(e,function(e,s){var o=p(n,s),a=i(o,3),u=a[0],c=a[1],l=a[2];d(n,s,e._estimate(u,r,s)),c&&c[l]===t.Op._UNSET&&delete c[l]})},_resetCacheForKey:function(e){var n=this.attributes[e];if(s.isObject(n)&&!(n instanceof t.Object)&&!(n instanceof t.File)){n=n.toJSON?n.toJSON():n;var r=JSON.stringify(n);if(this._hashedJSON[e]!==r){var i=!!this._hashedJSON[e];return this._hashedJSON[e]=r,i}}return!1},_rebuildEstimatedDataForKey:function(e){var n=this;delete this.attributes[e],this._serverData[e]&&(this.attributes[e]=this._serverData[e]),t._arrayEach(this._opSetQueue,function(r){var s=r[e];if(s){var o=p(n.attributes,e),a=i(o,3),u=a[0],c=a[1],l=a[2];d(n.attributes,e,s._estimate(u,n,e)),c&&c[l]===t.Op._UNSET?delete c[l]:n._resetCacheForKey(e)}})},_rebuildAllEstimatedData:function(){var e=this,n=s.clone(this.attributes);this.attributes=s.clone(this._serverData),t._arrayEach(this._opSetQueue,function(n){e._applyOpSet(n,e.attributes),t._objectEach(n,function(t,n){e._resetCacheForKey(n)})}),t._objectEach(n,function(t,n){e.attributes[n]!==t&&e.trigger("change:"+n,e,e.attributes[n],{})}),t._objectEach(this.attributes,function(t,r){s.has(n,r)||e.trigger("change:"+r,e,t,{})})},set:function(e,n,r){var i;if(s.isObject(e)||l(e)?(i=s.mapObject(e,function(e,n){return v(n),t._decode(e,n)}),r=n):(i={},v(e),i[e]=t._decode(n,e)),r=r||{},!i)return this;i instanceof t.Object&&(i=i.attributes),r.unset&&t._objectEach(i,function(e,n){i[n]=new t.Op.Unset});var o=s.clone(i),a=this;t._objectEach(o,function(e,n){e instanceof t.Op&&(o[n]=e._estimate(a.attributes[n],a,n),o[n]===t.Op._UNSET&&delete o[n])}),this._validate(i,r),r.changes={};var u=this._escapedAttributes;this._previousAttributes;return t._arrayEach(s.keys(i),function(e){var n=i[e];n instanceof t.Relation&&(n.parent=a),n instanceof t.Op||(n=new t.Op.Set(n));var o=!0;n instanceof t.Op.Set&&s.isEqual(a.attributes[e],n.value)&&(o=!1),o&&(delete u[e],r.silent?a._silent[e]=!0:r.changes[e]=!0);var c=s.last(a._opSetQueue);c[e]=n._mergeWithPrevious(c[e]),a._rebuildEstimatedDataForKey(e),o?(a.changed[e]=a.attributes[e],r.silent||(a._pending[e]=!0)):(delete a.changed[e],delete a._pending[e])}),r.silent||this.change(r),this},unset:function(t,e){return e=e||{},e.unset=!0,this.set(t,null,e)},increment:function(e,n){return(s.isUndefined(n)||s.isNull(n))&&(n=1),this.set(e,new t.Op.Increment(n))},add:function(e,n){return this.set(e,new t.Op.Add(h(n)))},addUnique:function(e,n){return this.set(e,new t.Op.AddUnique(h(n)))},remove:function(e,n){return this.set(e,new t.Op.Remove(h(n)))},bitAnd:function(e,n){return this.set(e,new t.Op.BitAnd(n))},bitOr:function(e,n){return this.set(e,new t.Op.BitOr(n))},bitXor:function(e,n){return this.set(e,new t.Op.BitXor(n))},op:function(t){return s.last(this._opSetQueue)[t]},clear:function(t){t=t||{},t.unset=!0;var e=s.extend(this.attributes,this._operations);return this.set(e,t)},_getSaveJSON:function(){var e=s.clone(s.first(this._opSetQueue));return t._objectEach(e,function(t,n){e[n]=t.toJSON()}),e},_canBeSerialized:function(){return t.Object._canBeSerializedAsValue(this.attributes)},fetch:function(t,e){var n=this;return u("classes",this.className,this.id,"GET",f(t),e).then(function(t){return n._finishFetch(n.parse(t),!0),n})},save:function(e,n,r){var i,o,a;s.isObject(e)||l(e)?(i=e,a=n):(i={},i[e]=n,a=r),a=s.clone(a)||{},a.wait&&(o=s.clone(this.attributes));var c=s.clone(a)||{};c.wait&&(c.silent=!0),i&&this.set(i,c);var h=this,f=[],d=[];return t.Object._findUnsavedChildren(h,f,d),f.length+d.length>1?t.Object._deepSaveAsync(this,h,a):(this._startSave(),this._saving=(this._saving||0)+1,this._allPreviousSaves=this._allPreviousSaves||t.Promise.resolve(),this._allPreviousSaves=this._allPreviousSaves.catch(function(t){}).then(function(){var t=h.id?"PUT":"POST",e=h._getSaveJSON(),n={};if((h._fetchWhenSave||a.fetchWhenSave)&&(n.new="true"),a.query){var r;if("function"==typeof a.query.toJSON&&(r=a.query.toJSON())&&(n.where=r.where),!n.where){throw new Error("options.query is not an AV.Query")}}s.extend(e,h._flags);var l="classes",f=h.className;"_User"!==h.className||h.id||(l="users",f=null);var d=a._makeRequest||u,p=d(l,f,h.id,t,e,a,n);return p=p.then(function(t){var e=h.parse(t);return a.wait&&(e=s.extend(i||{},e)),h._finishSave(e),a.wait&&h.set(o,c),h},function(t){throw h._cancelSave(),t})}),this._allPreviousSaves)},destroy:function(t){t=t||{};var e=this,n=function(){e.trigger("destroy",e,e.collection,t)};return this.id?(t.wait||n(),u("classes",this.className,this.id,"DELETE",this._flags,t).then(function(){return t.wait&&n(),e})):n()},parse:function(e){var n=s.clone(e);return s(["createdAt","updatedAt"]).each(function(e){n[e]&&(n[e]=t._parseDate(n[e]))}),n.createdAt&&!n.updatedAt&&(n.updatedAt=n.createdAt),n},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.id},change:function(e){e=e||{};var n=this._changing;this._changing=!0;var r=this;t._objectEach(this._silent,function(t){r._pending[t]=!0});var i=s.extend({},e.changes,this._silent);if(this._silent={},t._objectEach(i,function(t,n){r.trigger("change:"+n,r,r.get(n),e)}),n)return this;for(var o=function(t,e){r._pending[e]||r._silent[e]||delete r.changed[e]};!s.isEmpty(this._pending);)this._pending={},this.trigger("change",this,e),t._objectEach(this.changed,o),r._previousAttributes=s.clone(this.attributes);return this._changing=!1,this},hasChanged:function(t){return arguments.length?this.changed&&s.has(this.changed,t):!s.isEmpty(this.changed)},changedAttributes:function(e){if(!e)return!!this.hasChanged()&&s.clone(this.changed);var n={},r=this._previousAttributes;return t._objectEach(e,function(t,e){s.isEqual(r[e],t)||(n[e]=t)}),n},previous:function(t){return arguments.length&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return s.clone(this._previousAttributes)},isValid:function(){try{this.validate(this.attributes)}catch(t){return!1}return!0},validate:function(e){if(s.has(e,"ACL")&&!(e.ACL instanceof t.ACL))throw new o(o.OTHER_CAUSE,"ACL must be a AV.ACL.")},_validate:function(t,e){!e.silent&&this.validate&&(t=s.extend({},this.attributes,t),this.validate(t))},getACL:function(){return this.get("ACL")},setACL:function(t,e){return this.set("ACL",t,e)},disableBeforeHook:function(){this.ignoreHook("beforeSave"),this.ignoreHook("beforeUpdate"),this.ignoreHook("beforeDelete")},disableAfterHook:function(){this.ignoreHook("afterSave"),this.ignoreHook("afterUpdate"),this.ignoreHook("afterDelete")},ignoreHook:function(e){s.contains(["beforeSave","afterSave","beforeUpdate","afterUpdate","beforeDelete","afterDelete"],e)||console.trace("Unsupported hookName: "+e),t.hookKey||console.trace("ignoreHook required hookKey"),this._flags.__ignore_hooks||(this._flags.__ignore_hooks=[]),this._flags.__ignore_hooks.push(e)}}),t.Object.createWithoutData=function(e,n,r){var i=new t.Object(e);return i.id=n,i._hasData=r,i},t.Object.destroyAll=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e||0===e.length)return t.Promise.resolve();var r=s.groupBy(e,function(t){return JSON.stringify({className:t.className,flags:t._flags})}),i={requests:s.map(r,function(t){var e=s.map(t,"id").join(",");return{method:"DELETE",path:"/1.1/classes/"+t[0].className+"/"+e,body:t[0]._flags}})};return u("batch",null,null,"POST",i,n).then(function(t){var e=s.find(t,function(t){return!t.success});if(e)throw new o(e.error.code,e.error.error)})},t.Object._getSubclass=function(e){if(!s.isString(e))throw new Error("AV.Object._getSubclass requires a string argument.");var n=t.Object._classMap[e];return n||(n=t.Object.extend(e),t.Object._classMap[e]=n),n},t.Object._create=function(e,n,r){return new(t.Object._getSubclass(e))(n,r)},t.Object._classMap={},t.Object._extend=t._extend,t.Object.new=function(e,n){return new t.Object(e,n)},t.Object.extend=function(e,n,r){if(!s.isString(e)){if(e&&s.has(e,"className"))return t.Object.extend(e.className,e,n);throw new Error("AV.Object.extend's first argument should be the className.")}"User"===e&&(e="_User");var i=null;if(s.has(t.Object._classMap,e)){var o=t.Object._classMap[e];if(!n&&!r)return o;i=o._extend(n,r)}else n=n||{},n._className=e,i=this._extend(n,r);return i.extend=function(n){if(s.isString(n)||n&&s.has(n,"className"))return t.Object.extend.apply(i,arguments);var r=[e].concat(s.toArray(arguments));return t.Object.extend.apply(i,r)},Object.defineProperty(i,"query",Object.getOwnPropertyDescriptor(t.Object,"query")),i.new=function(t,e){return new i(t,e)},t.Object._classMap[e]=i,i},Object.defineProperty(t.Object.prototype,"className",{get:function(){var t=this._className||this.constructor._LCClassName||this.constructor.name;return"User"===t?"_User":t}}),t.Object.register=function(e,n){if(!(e.prototype instanceof t.Object))throw new Error("registered class is not a subclass of AV.Object");var r=n||e.name;if(!r.length)throw new Error("registered class must be named");n&&(e._LCClassName=n),t.Object._classMap[r]=e},Object.defineProperty(t.Object,"query",{get:function(){return new t.Query(this.prototype.className)}}),t.Object._findUnsavedChildren=function(e,n,r){t._traverse(e,function(e){return e instanceof t.Object?void(e._dirty()&&n.push(e)):e instanceof t.File?void(e.url()||e.id||r.push(e)):void 0})},t.Object._canBeSerializedAsValue=function(e){var n=!0;return e instanceof t.Object||e instanceof t.File?n=!!e.id:s.isArray(e)?t._arrayEach(e,function(e){t.Object._canBeSerializedAsValue(e)||(n=!1)}):s.isObject(e)&&t._objectEach(e,function(e){t.Object._canBeSerializedAsValue(e)||(n=!1)}),n},t.Object._deepSaveAsync=function(e,n,r){var i=[],a=[];t.Object._findUnsavedChildren(e,i,a);var c=t.Promise.resolve();s.each(a,function(t){c=c.then(function(){return t.save()})});var l=s.uniq(i),h=s.uniq(l);return c.then(function(){return t.Promise._continueWhile(function(){return h.length>0},function(){var e=[],n=[];if(t._arrayEach(h,function(t){if(e.length>20)return void n.push(t);t._canBeSerialized()?e.push(t):n.push(t)}),h=n,0===e.length)return t.Promise.reject(new o(o.OTHER_CAUSE,"Tried to save a batch with a cycle."));var i=t.Promise.resolve(s.map(e,function(e){return e._allPreviousSaves||t.Promise.resolve()})),a=i.then(function(){return u("batch",null,null,"POST",{requests:s.map(e,function(t){var e=t.id?"PUT":"POST",n=t._getSaveJSON();s.extend(n,t._flags);var r=t.className,i="/classes/"+r;"_User"!==t.className||t.id||(i="/users");var i="/1.1"+i;return t.id&&(i=i+"/"+t.id),t._startSave(),{method:e,path:i,body:n}})},r).then(function(t){var n=s.map(e,function(e,n){return t[n].success?(e._finishSave(e.parse(t[n].success)),e):(e._cancelSave(),new o(t[n].error.code,t[n].error.error))});return y(n)})});return t._arrayEach(e,function(t){t._allPreviousSaves=a}),a})}).then(function(){return e})}}},function(t,e,n){"use strict";var r=n(0);t.exports=function(t){t.Op=function(){this._initialize.apply(this,arguments)},r.extend(t.Op.prototype,{_initialize:function(){}}),r.extend(t.Op,{_extend:t._extend,_opDecoderMap:{},_registerDecoder:function(e,n){t.Op._opDecoderMap[e]=n},_decode:function(e){var n=t.Op._opDecoderMap[e.__op];return n?n(e):void 0}}),t.Op._registerDecoder("Batch",function(e){var n=null;return t._arrayEach(e.ops,function(e){e=t.Op._decode(e),n=e._mergeWithPrevious(n)}),n}),t.Op.Set=t.Op._extend({_initialize:function(t){this._value=t},value:function(){return this._value},toJSON:function(){return t._encode(this.value())},_mergeWithPrevious:function(t){return this},_estimate:function(t){return this.value()}}),t.Op._UNSET={},t.Op.Unset=t.Op._extend({toJSON:function(){return{__op:"Delete"}},_mergeWithPrevious:function(t){return this},_estimate:function(e){return t.Op._UNSET}}),t.Op._registerDecoder("Delete",function(e){return new t.Op.Unset}),t.Op.Increment=t.Op._extend({_initialize:function(t){this._amount=t},amount:function(){return this._amount},toJSON:function(){return{__op:"Increment",amount:this._amount}},_mergeWithPrevious:function(e){if(e){if(e instanceof t.Op.Unset)return new t.Op.Set(this.amount());if(e instanceof t.Op.Set)return new t.Op.Set(e.value()+this.amount());if(e instanceof t.Op.Increment)return new t.Op.Increment(this.amount()+e.amount());throw new Error("Op is invalid after previous op.")}return this},_estimate:function(t){return t?t+this.amount():this.amount()}}),t.Op._registerDecoder("Increment",function(e){return new t.Op.Increment(e.amount)}),t.Op.BitAnd=t.Op._extend({_initialize:function(t){this._value=t},value:function(){return this._value},toJSON:function(){return{__op:"BitAnd",value:this.value()}},_mergeWithPrevious:function(e){if(e){if(e instanceof t.Op.Unset)return new t.Op.Set(0);if(e instanceof t.Op.Set)return new t.Op.Set(e.value()&this.value());throw new Error("Op is invalid after previous op.")}return this},_estimate:function(t){return t&this.value()}}),t.Op._registerDecoder("BitAnd",function(e){return new t.Op.BitAnd(e.value)}),t.Op.BitOr=t.Op._extend({_initialize:function(t){this._value=t},value:function(){return this._value},toJSON:function(){return{__op:"BitOr",value:this.value()}},_mergeWithPrevious:function(e){if(e){if(e instanceof t.Op.Unset)return new t.Op.Set(this.value());if(e instanceof t.Op.Set)return new t.Op.Set(e.value()|this.value());throw new Error("Op is invalid after previous op.")}return this},_estimate:function(t){return t|this.value()}}),t.Op._registerDecoder("BitOr",function(e){return new t.Op.BitOr(e.value)}),t.Op.BitXor=t.Op._extend({_initialize:function(t){this._value=t},value:function(){return this._value},toJSON:function(){return{__op:"BitXor",value:this.value()}},_mergeWithPrevious:function(e){if(e){if(e instanceof t.Op.Unset)return new t.Op.Set(this.value());if(e instanceof t.Op.Set)return new t.Op.Set(e.value()^this.value());throw new Error("Op is invalid after previous op.")}return this},_estimate:function(t){return t^this.value()}}),t.Op._registerDecoder("BitXor",function(e){return new t.Op.BitXor(e.value)}),t.Op.Add=t.Op._extend({_initialize:function(t){this._objects=t},objects:function(){return this._objects},toJSON:function(){return{__op:"Add",objects:t._encode(this.objects())}},_mergeWithPrevious:function(e){if(e){if(e instanceof t.Op.Unset)return new t.Op.Set(this.objects());if(e instanceof t.Op.Set)return new t.Op.Set(this._estimate(e.value()));if(e instanceof t.Op.Add)return new t.Op.Add(e.objects().concat(this.objects()));throw new Error("Op is invalid after previous op.")}return this},_estimate:function(t){return t?t.concat(this.objects()):r.clone(this.objects())}}),t.Op._registerDecoder("Add",function(e){return new t.Op.Add(t._decode(e.objects))}),t.Op.AddUnique=t.Op._extend({_initialize:function(t){this._objects=r.uniq(t)},objects:function(){return this._objects},toJSON:function(){return{__op:"AddUnique",objects:t._encode(this.objects())}},_mergeWithPrevious:function(e){if(e){if(e instanceof t.Op.Unset)return new t.Op.Set(this.objects());if(e instanceof t.Op.Set)return new t.Op.Set(this._estimate(e.value()));if(e instanceof t.Op.AddUnique)return new t.Op.AddUnique(this._estimate(e.objects()));throw new Error("Op is invalid after previous op.")}return this},_estimate:function(e){if(e){var n=r.clone(e);return t._arrayEach(this.objects(),function(e){if(e instanceof t.Object&&e.id){var i=r.find(n,function(n){return n instanceof t.Object&&n.id===e.id});if(i){var s=r.indexOf(n,i);n[s]=e}else n.push(e)}else r.contains(n,e)||n.push(e)}),n}return r.clone(this.objects())}}),t.Op._registerDecoder("AddUnique",function(e){return new t.Op.AddUnique(t._decode(e.objects))}),t.Op.Remove=t.Op._extend({_initialize:function(t){this._objects=r.uniq(t)},objects:function(){return this._objects},toJSON:function(){return{__op:"Remove",objects:t._encode(this.objects())}},_mergeWithPrevious:function(e){if(e){if(e instanceof t.Op.Unset)return e;if(e instanceof t.Op.Set)return new t.Op.Set(this._estimate(e.value()));if(e instanceof t.Op.Remove)return new t.Op.Remove(r.union(e.objects(),this.objects()));throw new Error("Op is invalid after previous op.")}return this},_estimate:function(e){if(e){var n=r.difference(e,this.objects());return t._arrayEach(this.objects(),function(e){e instanceof t.Object&&e.id&&(n=r.reject(n,function(n){return n instanceof t.Object&&n.id===e.id}))}),n}return[]}}),t.Op._registerDecoder("Remove",function(e){return new t.Op.Remove(t._decode(e.objects))}),t.Op.Relation=t.Op._extend({_initialize:function(e,n){this._targetClassName=null;var i=this,s=function(e){if(e instanceof t.Object){if(!e.id)throw new Error("You can't add an unsaved AV.Object to a relation.");if(i._targetClassName||(i._targetClassName=e.className),i._targetClassName!==e.className)throw new Error("Tried to create a AV.Relation with 2 different types: "+i._targetClassName+" and "+e.className+".");return e.id}return e};this.relationsToAdd=r.uniq(r.map(e,s)),this.relationsToRemove=r.uniq(r.map(n,s))},added:function(){var e=this;return r.map(this.relationsToAdd,function(n){var r=t.Object._create(e._targetClassName);return r.id=n,r})},removed:function(){var e=this;return r.map(this.relationsToRemove,function(n){var r=t.Object._create(e._targetClassName);return r.id=n,r})},toJSON:function(){var t=null,e=null,n=this,i=function(t){return{__type:"Pointer",className:n._targetClassName,objectId:t}},s=null;return this.relationsToAdd.length>0&&(s=r.map(this.relationsToAdd,i),t={__op:"AddRelation",objects:s}),this.relationsToRemove.length>0&&(s=r.map(this.relationsToRemove,i),e={__op:"RemoveRelation",objects:s}),t&&e?{__op:"Batch",ops:[t,e]}:t||e||{}},_mergeWithPrevious:function(e){if(e){if(e instanceof t.Op.Unset)throw new Error("You can't modify a relation after deleting it.");if(e instanceof t.Op.Relation){if(e._targetClassName&&e._targetClassName!==this._targetClassName)throw new Error("Related object must be of class "+e._targetClassName+", but "+this._targetClassName+" was passed in.");var n=r.union(r.difference(e.relationsToAdd,this.relationsToRemove),this.relationsToAdd),i=r.union(r.difference(e.relationsToRemove,this.relationsToAdd),this.relationsToRemove),s=new t.Op.Relation(n,i);return s._targetClassName=this._targetClassName,s}throw new Error("Op is invalid after previous op.")}return this},_estimate:function(e,n,r){if(e){if(e instanceof t.Relation){if(this._targetClassName)if(e.targetClassName){if(e.targetClassName!==this._targetClassName)throw new Error("Related object must be a "+e.targetClassName+", but a "+this._targetClassName+" was passed in.")}else e.targetClassName=this._targetClassName;return e}throw new Error("Op is invalid after previous op.")}new t.Relation(n,r).targetClassName=this._targetClassName}}),t.Op._registerDecoder("AddRelation",function(e){return new t.Op.Relation(t._decode(e.objects),[])}),t.Op._registerDecoder("RemoveRelation",function(e){return new t.Op.Relation([],t._decode(e.objects))})}},function(t,e,n){"use strict"},function(t,e,n){"use strict";var r=n(2).request;t.exports=function(t){t.Installation=t.Object.extend("_Installation"),t.Push=t.Push||{},t.Push.send=function(t,e){if(t.where&&(t.where=t.where.toJSON().where),t.where&&t.cql)throw new Error("Both where and cql can't be set");if(t.push_time&&(t.push_time=t.push_time.toJSON()),t.expiration_time&&(t.expiration_time=t.expiration_time.toJSON()),t.expiration_time&&t.expiration_time_interval)throw new Error("Both expiration_time and expiration_time_interval can't be set");return r({service:"push",method:"POST",path:"/push",data:t,authOptions:e})}}},function(t,e,n){"use strict";var r=n(0),i=n(6)("leancloud:query"),s=n(1),o=n(4),a=n(2),u=a._request,c=a.request,l=n(3),h=l.ensureArray,f=l.transformFetchOptions,d=function(t,e){if(void 0===t)throw new Error(e)};t.exports=function(t){t.Query=function(e){r.isString(e)&&(e=t.Object._getSubclass(e)),this.objectClass=e,this.className=e.prototype.className,this._where={},this._include=[],this._select=[],this._limit=-1,this._skip=0,this._extraOptions={}},t.Query.or=function(){var e=r.toArray(arguments),n=null;t._arrayEach(e,function(t){if(r.isNull(n)&&(n=t.className),n!==t.className)throw new Error("All queries must be for the same class")});var i=new t.Query(n);return i._orQuery(e),i},t.Query.and=function(){var e=r.toArray(arguments),n=null;t._arrayEach(e,function(t){if(r.isNull(n)&&(n=t.className),n!==t.className)throw new Error("All queries must be for the same class")});var i=new t.Query(n);return i._andQuery(e),i},t.Query.doCloudQuery=function(e,n,i){var s={cql:e};return r.isArray(n)?s.pvalues=n:i=n,u("cloudQuery",null,null,"GET",s,i).then(function(e){var n=new t.Query(e.className);return{results:r.map(e.results,function(t){var r=n._newObject(e);return r._finishFetch&&r._finishFetch(n._processResult(t),!0),r}),count:e.count,className:e.className}})},t.Query._extend=t._extend,r.extend(t.Query.prototype,{_processResult:function(t){return t},get:function(t,e){if(!t){throw new o(o.OBJECT_NOT_FOUND,"Object not found.")}var n=this._newObject();n.id=t;var i=this.toJSON(),s={};return i.keys&&(s.keys=i.keys),i.include&&(s.include=i.include),i.includeACL&&(s.includeACL=i.includeACL),u("classes",this.className,t,"GET",f(s),e).then(function(t){if(r.isEmpty(t))throw new o(o.OBJECT_NOT_FOUND,"Object not found.");return n._finishFetch(n.parse(t),!0),n})},toJSON:function(){var e={where:this._where};return this._include.length>0&&(e.include=this._include.join(",")),this._select.length>0&&(e.keys=this._select.join(",")),void 0!==this._includeACL&&(e.returnACL=this._includeACL),this._limit>=0&&(e.limit=this._limit),this._skip>0&&(e.skip=this._skip),void 0!==this._order&&(e.order=this._order),t._objectEach(this._extraOptions,function(t,n){e[n]=t}),e},_newObject:function(e){return e&&e.className?new t.Object(e.className):new this.objectClass},_createRequest:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.toJSON(),e=arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/classes/"+this.className;if(encodeURIComponent(JSON.stringify(t)).length>2e3){return c({path:"/batch",method:"POST",data:{requests:[{method:"GET",path:"/1.1"+n,params:t}]},authOptions:e}).then(function(t){var e=t[0];if(e.success)return e.success;var n=new Error(e.error.error||"Unknown batch error");throw n.code=e.error.code,n})}return c({method:"GET",path:n,query:t,authOptions:e})},_parseResponse:function(t){var e=this;return r.map(t.results,function(n){var r=e._newObject(t);return r._finishFetch&&r._finishFetch(e._processResult(n),!0),r})},find:function(t){return this._createRequest(void 0,t).then(this._parseResponse.bind(this))},scan:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.orderedBy,o=e.batchSize,a=arguments[1],c=this.toJSON();i("scan %O",c),c.order&&(console.warn("The order of the query is ignored for Query#scan. Checkout the orderedBy option of Query#scan."),delete c.order),c.skip&&(console.warn("The skip option of the query is ignored for Query#scan."),delete c.skip),c.limit&&(console.warn("The limit option of the query is ignored for Query#scan."),delete c.limit),n&&(c.scan_key=n),o&&(c.limit=o);var l=s.resolve([]),h=void 0,f=!1;return{next:function(){return l=l.then(function(e){return f?[]:e.length>1?e:h||0===e.length?u("scan/classes",t.className,null,"GET",h?r.extend({},c,{cursor:h}):c,a).then(function(e){return h=e.cursor,t._parseResponse(e)}).then(function(t){return t.length||(f=!0),e.concat(t)}):(f=!0,e)}),l.then(function(t){return t.shift()}).then(function(t){return{value:t,done:f}})}}},destroyAll:function(e){return this.find(e).then(function(n){return t.Object.destroyAll(n,e)})},count:function(t){var e=this.toJSON();return e.limit=0,e.count=1,this._createRequest(e,t).then(function(t){return t.count})},first:function(t){var e=this,n=this.toJSON();return n.limit=1,this._createRequest(n,t).then(function(t){return r.map(t.results,function(t){var n=e._newObject();return n._finishFetch&&n._finishFetch(e._processResult(t),!0),n})[0]})},skip:function(t){return d(t,"undefined is not a valid skip value"),this._skip=t,this},limit:function(t){return d(t,"undefined is not a valid limit value"),this._limit=t,this},equalTo:function(e,n){return d(e,"undefined is not a valid key"),d(n,"undefined is not a valid value"),this._where[e]=t._encode(n),this},_addCondition:function(e,n,r){return d(e,"undefined is not a valid condition key"),d(n,"undefined is not a valid condition"),d(r,"undefined is not a valid condition value"),this._where[e]||(this._where[e]={}),this._where[e][n]=t._encode(r),this},sizeEqualTo:function(t,e){this._addCondition(t,"$size",e)},notEqualTo:function(t,e){return this._addCondition(t,"$ne",e),this},lessThan:function(t,e){return this._addCondition(t,"$lt",e),this},greaterThan:function(t,e){return this._addCondition(t,"$gt",e),this},lessThanOrEqualTo:function(t,e){return this._addCondition(t,"$lte",e),this},greaterThanOrEqualTo:function(t,e){return this._addCondition(t,"$gte",e),this},containedIn:function(t,e){return this._addCondition(t,"$in",e),this},notContainedIn:function(t,e){return this._addCondition(t,"$nin",e),this},containsAll:function(t,e){return this._addCondition(t,"$all",e),this},exists:function(t){return this._addCondition(t,"$exists",!0),this},doesNotExist:function(t){return this._addCondition(t,"$exists",!1),this},matches:function(t,e,n){return this._addCondition(t,"$regex",e),n||(n=""),e.ignoreCase&&(n+="i"),e.multiline&&(n+="m"),n&&n.length&&this._addCondition(t,"$options",n),this},matchesQuery:function(t,e){var n=e.toJSON();return n.className=e.className,this._addCondition(t,"$inQuery",n),this},doesNotMatchQuery:function(t,e){var n=e.toJSON();return n.className=e.className,this._addCondition(t,"$notInQuery",n),this},matchesKeyInQuery:function(t,e,n){var r=n.toJSON();return r.className=n.className,this._addCondition(t,"$select",{key:e,query:r}),this},doesNotMatchKeyInQuery:function(t,e,n){var r=n.toJSON();return r.className=n.className,this._addCondition(t,"$dontSelect",{key:e,query:r}),this},_orQuery:function(t){var e=r.map(t,function(t){return t.toJSON().where});return this._where.$or=e,this},_andQuery:function(t){var e=r.map(t,function(t){return t.toJSON().where});return this._where.$and=e,this},_quote:function(t){return"\\Q"+t.replace("\\E","\\E\\\\E\\Q")+"\\E"},contains:function(t,e){return this._addCondition(t,"$regex",this._quote(e)),this},startsWith:function(t,e){return this._addCondition(t,"$regex","^"+this._quote(e)),this},endsWith:function(t,e){return this._addCondition(t,"$regex",this._quote(e)+"$"),this},ascending:function(t){return d(t,"undefined is not a valid key"),this._order=t,this},addAscending:function(t){return d(t,"undefined is not a valid key"),this._order?this._order+=","+t:this._order=t,this},descending:function(t){return d(t,"undefined is not a valid key"),this._order="-"+t,this},addDescending:function(t){return d(t,"undefined is not a valid key"),this._order?this._order+=",-"+t:this._order="-"+t,this},near:function(e,n){return n instanceof t.GeoPoint||(n=new t.GeoPoint(n)),this._addCondition(e,"$nearSphere",n),this},withinRadians:function(t,e,n){return this.near(t,e),this._addCondition(t,"$maxDistance",n),this},withinMiles:function(t,e,n){return this.withinRadians(t,e,n/3958.8)},withinKilometers:function(t,e,n){return this.withinRadians(t,e,n/6371)},withinGeoBox:function(e,n,r){return n instanceof t.GeoPoint||(n=new t.GeoPoint(n)),r instanceof t.GeoPoint||(r=new t.GeoPoint(r)),this._addCondition(e,"$within",{$box:[n,r]}),this},include:function(t){var e=this;return d(t,"undefined is not a valid key"),r(arguments).forEach(function(t){e._include=e._include.concat(h(t))}),this},includeACL:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this._includeACL=t,this},select:function(t){var e=this;return d(t,"undefined is not a valid key"),r(arguments).forEach(function(t){e._select=e._select.concat(h(t))}),this},each:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(this._order||this._skip||this._limit>=0){var i=new Error("Cannot iterate on a query with sort, skip, or limit.");return t.Promise.reject(i)}var s=new t.Query(this.objectClass);s._limit=n.batchSize||100,s._where=r.clone(this._where),s._include=r.clone(this._include),s.ascending("objectId");var o=!1;return t.Promise._continueWhile(function(){return!o},function(){return s.find(n).then(function(n){var i=t.Promise.resolve();return r.each(n,function(t){i=i.then(function(){return e(t)})}),i.then(function(){n.length>=s._limit?s.greaterThan("objectId",n[n.length-1].id):o=!0})})})},subscribe:function(e){return t.LiveQuery.init(this,e)}}),t.FriendShipQuery=t.Query._extend({_objectClass:t.User,_newObject:function(){return new t.User},_processResult:function(t){if(t&&t[this._friendshipTag]){var e=t[this._friendshipTag];return"Pointer"===e.__type&&"_User"===e.className&&(delete e.__type,delete e.className),e}return null}})}},function(t,e,n){"use strict";var r=n(0);t.exports=function(t){t.Relation=function(t,e){if(!r.isString(e))throw new TypeError("key must be a string");this.parent=t,this.key=e,this.targetClassName=null},t.Relation.reverseQuery=function(e,n,r){var i=new t.Query(e);return i.equalTo(n,r._toPointer()),i},r.extend(t.Relation.prototype,{_ensureParentAndKey:function(t,e){if(this.parent=this.parent||t,this.key=this.key||e,this.parent!==t)throw new Error("Internal Error. Relation retrieved from two different Objects.");if(this.key!==e)throw new Error("Internal Error. Relation retrieved from two different keys.")},add:function(e){r.isArray(e)||(e=[e]);var n=new t.Op.Relation(e,[]);this.parent.set(this.key,n),this.targetClassName=n._targetClassName},remove:function(e){r.isArray(e)||(e=[e]);var n=new t.Op.Relation([],e);this.parent.set(this.key,n),this.targetClassName=n._targetClassName},toJSON:function(){return{__type:"Relation",className:this.targetClassName}},query:function(){var e,n;return this.targetClassName?(e=t.Object._getSubclass(this.targetClassName),n=new t.Query(e)):(e=t.Object._getSubclass(this.parent.className),n=new t.Query(e),n._extraOptions.redirectClassNameForKey=this.key),n._addCondition("$relatedTo","object",this.parent._toPointer()),n._addCondition("$relatedTo","key",this.key),n}})}},function(t,e,n){"use strict";var r=n(0),i=n(4);t.exports=function(t){t.Role=t.Object.extend("_Role",{constructor:function(e,n){if(r.isString(e)?(t.Object.prototype.constructor.call(this,null,null),this.setName(e)):t.Object.prototype.constructor.call(this,e,n),n){if(!(n instanceof t.ACL))throw new TypeError("acl must be an instance of AV.ACL");this.setACL(n)}},getName:function(){return this.get("name")},setName:function(t,e){return this.set("name",t,e)},getUsers:function(){return this.relation("users")},getRoles:function(){return this.relation("roles")},validate:function(e,n){if("name"in e&&e.name!==this.getName()){var s=e.name;if(this.id&&this.id!==e.objectId)return new i(i.OTHER_CAUSE,"A role's name can only be set before it has been saved.");if(!r.isString(s))return new i(i.OTHER_CAUSE,"A role's name must be a String.");if(!/^[0-9a-zA-Z\-_ ]+$/.test(s))return new i(i.OTHER_CAUSE,"A role's name can only contain alphanumeric characters, _, -, and spaces.")}return!!t.Object.prototype.validate&&t.Object.prototype.validate.call(this,e,n)}})}},function(t,e,n){"use strict";var r=n(0),i=n(2)._request;t.exports=function(t){t.SearchSortBuilder=function(){this._sortFields=[]},r.extend(t.SearchSortBuilder.prototype,{_addField:function(t,e,n,r){var i={};return i[t]={order:e||"asc",mode:n||"avg",missing:"_"+(r||"last")},this._sortFields.push(i),this},ascending:function(t,e,n){return this._addField(t,"asc",e,n)},descending:function(t,e,n){return this._addField(t,"desc",e,n)},whereNear:function(t,e,n){n=n||{};var r={},i={lat:e.latitude,lon:e.longitude},s={order:n.order||"asc",mode:n.mode||"avg",unit:n.unit||"km"};return s[t]=i,r._geo_distance=s,this._sortFields.push(r),this},build:function(){return JSON.stringify(t._encode(this._sortFields))}}),t.SearchQuery=t.Query._extend({_sid:null,_hits:0,_queryString:null,_highlights:null,_sortBuilder:null,_createRequest:function(t,e){return i("search/select",null,null,"GET",t||this.toJSON(),e)},sid:function(t){return this._sid=t,this},queryString:function(t){return this._queryString=t,this},highlights:function(t){var e;return e=t&&r.isString(t)?arguments:t,this._highlights=e,this},sortBy:function(t){return this._sortBuilder=t,this},hits:function(){return this._hits||(this._hits=0),this._hits},_processResult:function(t){return delete t.className,delete t._app_url,delete t._deeplink,t},hasMore:function(){return!this._hitEnd},reset:function(){this._hitEnd=!1,this._sid=null,this._hits=0},find:function(){var t=this;return this._createRequest().then(function(e){return e.sid?(t._oldSid=t._sid,t._sid=e.sid):(t._sid=null,t._hitEnd=!0),t._hits=e.hits||0,r.map(e.results,function(n){n.className&&(e.className=n.className);var r=t._newObject(e);return r.appURL=n._app_url,r._finishFetch(t._processResult(n),!0),r})})},toJSON:function(){var e=t.SearchQuery.__super__.toJSON.call(this);if(delete e.where,this.className&&(e.clazz=this.className),this._sid&&(e.sid=this._sid),!this._queryString)throw new Error("Please set query string.");if(e.q=this._queryString,this._highlights&&(e.highlights=this._highlights.join(",")),this._sortBuilder&&e.order)throw new Error("sort and order can not be set at same time.");return this._sortBuilder&&(e.sort=this._sortBuilder.build()),e}})}},function(t,e,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=n(0),s=n(2)._request,o=n(3),a=o.getSessionToken;t.exports=function(t){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return a(e)?t.User._fetchUserBySessionToken(a(e)):t.User.currentAsync()},n=function(n){return e(n).then(function(e){return t.Object.createWithoutData("_User",e.id)._toPointer()})};t.Status=function(t,e){return this.data={},this.inboxType="default",this.query=null,t&&"object"===(void 0===t?"undefined":r(t))?this.data=t:(t&&(this.data.image=t),e&&(this.data.message=e)),this},i.extend(t.Status.prototype,{get:function(t){return this.data[t]},set:function(t,e){return this.data[t]=e,this},destroy:function(e){return this.id?s("statuses",null,this.id,"DELETE",e):t.Promise.reject(new Error("The status id is not exists."))},toObject:function(){return this.id?t.Object.createWithoutData("_Status",this.id):null},_getDataJSON:function(){var e=i.clone(this.data);return t._encode(e)},send:function(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!a(r)&&!t.User.current())throw new Error("Please signin an user.");return this.query?n(r).then(function(t){var n=e.query.toJSON();n.className=e.query.className;var i={};return i.query=n,e.data=e.data||{},e.data.source=e.data.source||t,i.data=e._getDataJSON(),i.inboxType=e.inboxType||"default",s("statuses",null,null,"POST",i,r)}).then(function(n){return e.id=n.objectId,e.createdAt=t._parseDate(n.createdAt),e}):t.Status.sendStatusToFollowers(this,r)},_finishFetch:function(e){this.id=e.objectId,this.createdAt=t._parseDate(e.createdAt),this.updatedAt=t._parseDate(e.updatedAt),this.messageId=e.messageId,delete e.messageId,delete e.objectId,delete e.createdAt,delete e.updatedAt,this.data=t._decode(e)}}),t.Status.sendStatusToFollowers=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!a(r)&&!t.User.current())throw new Error("Please signin an user.");return n(r).then(function(n){var i={};i.className="_Follower",i.keys="follower",i.where={user:n};var o={};return o.query=i,e.data=e.data||{},e.data.source=e.data.source||n,o.data=e._getDataJSON(),o.inboxType=e.inboxType||"default",s("statuses",null,null,"POST",o,r).then(function(n){return e.id=n.objectId,e.createdAt=t._parseDate(n.createdAt),e})})},t.Status.sendPrivateStatus=function(e,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!a(o)&&!t.User.current())throw new Error("Please signin an user.");if(!r)throw new Error("Invalid target user.");var u=i.isString(r)?r:r.id;if(!u)throw new Error("Invalid target user.");return n(o).then(function(n){var r={};r.className="_User",r.where={objectId:u};var i={};return i.query=r,e.data=e.data||{},e.data.source=e.data.source||n,i.data=e._getDataJSON(),i.inboxType="private",e.inboxType="private",s("statuses",null,null,"POST",i,o).then(function(n){return e.id=n.objectId,e.createdAt=t._parseDate(n.createdAt),e})})},t.Status.countUnreadStatuses=function(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(i.isString(r)||(o=r),!a(o)&&null==n&&!t.User.current())throw new Error("Please signin an user or pass the owner objectId.");return e(o).then(function(e){var n={};return n.inboxType=t._encode(r),n.owner=t._encode(e),s("subscribe/statuses/count",null,null,"GET",n,o)})},t.Status.resetUnreadCount=function(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(i.isString(r)||(o=r),!a(o)&&null==n&&!t.User.current())throw new Error("Please signin an user or pass the owner objectId.");return e(o).then(function(e){var n={};return n.inboxType=t._encode(r),n.owner=t._encode(e),s("subscribe/statuses/resetUnreadCount",null,null,"POST",n,o)})},t.Status.statusQuery=function(e){var n=new t.Query("_Status");return e&&n.equalTo("source",e),n},t.InboxQuery=t.Query._extend({_objectClass:t.Status,_sinceId:0,_maxId:0,_inboxType:"default",_owner:null,_newObject:function(){return new t.Status},_createRequest:function(e,n){return t.InboxQuery.__super__._createRequest.call(this,e,n,"/subscribe/statuses")},sinceId:function(t){return this._sinceId=t,this},maxId:function(t){return this._maxId=t,this},owner:function(t){return this._owner=t,this},inboxType:function(t){return this._inboxType=t,this},toJSON:function(){var e=t.InboxQuery.__super__.toJSON.call(this);return e.owner=t._encode(this._owner),e.inboxType=t._encode(this._inboxType),e.sinceId=t._encode(this._sinceId),e.maxId=t._encode(this._maxId),e}}),t.Status.inboxQuery=function(e,n){var r=new t.InboxQuery(t.Status);return e&&(r._owner=e),n&&(r._inboxType=n),r}}},function(t,e,n){"use strict";var r=n(0),i=n(4),s=n(2),o=s._request,a=s.request,u=n(1),c=function(){if("undefined"==typeof wx||"function"!=typeof wx.login)throw new Error("Weapp Login is only available in Weapp");return new u(function(t,e){wx.login({success:function(n){var r=n.code,i=n.errMsg;r?t(r):e(new Error(i))},fail:function(){return e(new Error("wx.login 失败"))}})})};t.exports=function(t){t.User=t.Object.extend("_User",{_isCurrentUser:!1,_mergeMagicFields:function(e){return e.sessionToken&&(this._sessionToken=e.sessionToken,delete e.sessionToken),t.User.__super__._mergeMagicFields.call(this,e)},_cleanupAuthData:function(){if(this.isCurrent()){var e=this.get("authData");e&&t._objectEach(this.get("authData"),function(t,n){e[n]||delete e[n]})}},_synchronizeAllAuthData:function(){if(this.get("authData")){var e=this;t._objectEach(this.get("authData"),function(t,n){e._synchronizeAuthData(n)})}},_synchronizeAuthData:function(e){if(this.isCurrent()){var n;r.isString(e)?(n=e,e=t.User._authProviders[n]):n=e.getAuthType();var i=this.get("authData");if(i&&e){e.restoreAuthentication(i[n])||this.dissociateAuthData(e)}}},_handleSaveResult:function(e){return e&&!t._config.disableCurrentUser&&(this._isCurrentUser=!0),this._cleanupAuthData(),this._synchronizeAllAuthData(),delete this._serverData.password,this._rebuildEstimatedDataForKey("password"),this._refreshCache(),!e&&!this.isCurrent()||t._config.disableCurrentUser?u.resolve():u.resolve(t.User._saveCurrentUser(this))},_linkWith:function(e,n){var i,s=this;if(r.isString(e)?(i=e,e=t.User._authProviders[e]):i=e.getAuthType(),n){var o=this.get("authData")||{};return o[i]=n,this.save({authData:o}).then(function(t){return t._handleSaveResult(!0).then(function(){return t})})}return e.authenticate().then(function(t){return s._linkWith(e,t)})},associateWithAuthData:function(t,e){return this._linkWith(e,t)},linkWithWeapp:function(){var t=this;return c().then(function(e){return t._linkWith("lc_weapp",{code:e})})},dissociateAuthData:function(t){return this.unset("authData."+t),this.save().then(function(t){return t._handleSaveResult(!0).then(function(){return t})})},_unlinkFrom:function(t){return console.warn("DEPRECATED: User#_unlinkFrom 已废弃，请使用 User#dissociateAuthData 代替"),this.dissociateAuthData(t)},_isLinked:function(t){var e;return e=r.isString(t)?t:t.getAuthType(),!!(this.get("authData")||{})[e]},logOut:function(){this._logOutWithAll(),this._isCurrentUser=!1},_logOutWithAll:function(){if(this.get("authData")){var e=this;t._objectEach(this.get("authData"),function(t,n){e._logOutWith(n)})}},_logOutWith:function(e){this.isCurrent()&&(r.isString(e)&&(e=t.User._authProviders[e]),e&&e.deauthenticate&&e.deauthenticate())},signUp:function(t,e){var n=t&&t.username||this.get("username");if(!n||""===n)throw new i(i.OTHER_CAUSE,"Cannot sign up user with an empty name.");var r=t&&t.password||this.get("password");if(!r||""===r)throw new i(i.OTHER_CAUSE,"Cannot sign up user with an empty password.");return this.save(t,e).then(function(t){return t._handleSaveResult(!0).then(function(){return t})})},signUpOrlogInWithMobilePhone:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t&&t.mobilePhoneNumber||this.get("mobilePhoneNumber");if(!n||""===n)throw new i(i.OTHER_CAUSE,"Cannot sign up or login user by mobilePhoneNumber with an empty mobilePhoneNumber.");var r=t&&t.smsCode||this.get("smsCode");if(!r||""===r)throw new i(i.OTHER_CAUSE,"Cannot sign up or login user by mobilePhoneNumber  with an empty smsCode.");return e._makeRequest=function(t,e,n,r,i){return o("usersByMobilePhone",null,null,"POST",i)},this.save(t,e).then(function(t){return delete t.attributes.smsCode,delete t._serverData.smsCode,t._handleSaveResult(!0).then(function(){return t})})},logIn:function(){var t=this;return o("login",null,null,"POST",this.toJSON()).then(function(e){var n=t.parse(e);return t._finishFetch(n),t._handleSaveResult(!0).then(function(){return n.smsCode||delete t.attributes.smsCode,t})})},save:function(e,n,i){var s,o;return r.isObject(e)||r.isNull(e)||r.isUndefined(e)?(s=e,o=n):(s={},s[e]=n,o=i),o=o||{},t.Object.prototype.save.call(this,s,o).then(function(t){return t._handleSaveResult(!1).then(function(){return t})})},follow:function(e,n){if(!this.id)throw new Error("Please signin.");var i=void 0,s=void 0;e.user?(i=e.user,s=e.attributes):i=e;var a=r.isString(i)?i:i.id;if(!a)throw new Error("Invalid target user.");var u="users/"+this.id+"/friendship/"+a;return o(u,null,null,"POST",t._encode(s),n)},unfollow:function(t,e){if(!this.id)throw new Error("Please signin.");var n=void 0;n=t.user?t.user:t;var i=r.isString(n)?n:n.id;if(!i)throw new Error("Invalid target user.");var s="users/"+this.id+"/friendship/"+i;return o(s,null,null,"DELETE",null,e)},followerQuery:function(){return t.User.followerQuery(this.id)},followeeQuery:function(){return t.User.followeeQuery(this.id)},fetch:function(e,n){return t.Object.prototype.fetch.call(this,e,n).then(function(t){return t._handleSaveResult(!1).then(function(){return t})})},updatePassword:function(t,e,n){var r="users/"+this.id+"/updatePassword";return o(r,null,null,"PUT",{old_password:t,new_password:e},n)},isCurrent:function(){return this._isCurrentUser},getUsername:function(){return this.get("username")},getMobilePhoneNumber:function(){return this.get("mobilePhoneNumber")},setMobilePhoneNumber:function(t,e){return this.set("mobilePhoneNumber",t,e)},setUsername:function(t,e){return this.set("username",t,e)},setPassword:function(t,e){return this.set("password",t,e)},getEmail:function(){return this.get("email")},setEmail:function(t,e){return this.set("email",t,e)},authenticated:function(){return console.warn("DEPRECATED: 如果要判断当前用户的登录状态是否有效，请使用 currentUser.isAuthenticated().then()，如果要判断该用户是否是当前登录用户，请使用 user.id === currentUser.id。"),!!this._sessionToken&&!t._config.disableCurrentUser&&t.User.current()&&t.User.current().id===this.id},isAuthenticated:function(){var e=this;return u.resolve().then(function(){return!!e._sessionToken&&t.User._fetchUserBySessionToken(e._sessionToken).then(function(){return!0},function(t){if(211===t.code)return!1;throw t})})},getSessionToken:function(){return this._sessionToken},refreshSessionToken:function(t){var e=this;return o("users/"+this.id+"/refreshSessionToken",null,null,"PUT",null,t).then(function(t){return e._finishFetch(t),e._handleSaveResult(!0).then(function(){return e})})},getRoles:function(e){return t.Relation.reverseQuery("_Role","users",this).find(e)}},{_currentUser:null,_currentUserMatchesDisk:!1,_CURRENT_USER_KEY:"currentUser",_authProviders:{},signUp:function(e,n,r,i){return r=r||{},r.username=e,r.password=n,t.Object._create("_User").signUp(r,i)},logIn:function(e,n,r){var i=t.Object._create("_User");return i._finishFetch({username:e,password:n}),i.logIn(r)},become:function(t){return this._fetchUserBySessionToken(t).then(function(t){return t._handleSaveResult(!0).then(function(){return t})})},_fetchUserBySessionToken:function(e){var n=t.Object._create("_User");return a({method:"GET",path:"/users/me",authOptions:{sessionToken:e}}).then(function(t){var e=n.parse(t);return n._finishFetch(e),n})},logInWithMobilePhoneSmsCode:function(e,n,r){var i=t.Object._create("_User");return i._finishFetch({mobilePhoneNumber:e,smsCode:n}),i.logIn(r)},signUpOrlogInWithMobilePhone:function(e,n,r,i){return r=r||{},r.mobilePhoneNumber=e,r.smsCode=n,t.Object._create("_User").signUpOrlogInWithMobilePhone(r,i)},logInWithMobilePhone:function(e,n,r){var i=t.Object._create("_User");return i._finishFetch({mobilePhoneNumber:e,password:n}),i.logIn(r)},signUpOrlogInWithAuthData:function(e,n){return t.User._logInWith(n,e)},loginWithWeapp:function(){var t=this;return c().then(function(e){return t.signUpOrlogInWithAuthData({code:e},"lc_weapp")})},associateWithAuthData:function(t,e,n){return console.warn("DEPRECATED: User.associateWithAuthData 已废弃，请使用 User#associateWithAuthData 代替"),t._linkWith(e,n)},logOut:function(){return t._config.disableCurrentUser?(console.warn("AV.User.current() was disabled in multi-user environment, call logOut() from user object instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"),u.resolve(null)):(null!==t.User._currentUser&&(t.User._currentUser._logOutWithAll(),t.User._currentUser._isCurrentUser=!1),t.User._currentUserMatchesDisk=!0,t.User._currentUser=null,t.localStorage.removeItemAsync(t._getAVPath(t.User._CURRENT_USER_KEY)).then(function(){return t._refreshSubscriptionId()}))},followerQuery:function(e){if(!e||!r.isString(e))throw new Error("Invalid user object id.");var n=new t.FriendShipQuery("_Follower");return n._friendshipTag="follower",n.equalTo("user",t.Object.createWithoutData("_User",e)),n},followeeQuery:function(e){if(!e||!r.isString(e))throw new Error("Invalid user object id.");var n=new t.FriendShipQuery("_Followee");return n._friendshipTag="followee",n.equalTo("user",t.Object.createWithoutData("_User",e)),n},requestPasswordReset:function(t){return o("requestPasswordReset",null,null,"POST",{email:t})},requestEmailVerify:function(t){return o("requestEmailVerify",null,null,"POST",{email:t})},requestMobilePhoneVerify:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={mobilePhoneNumber:t};return e.validateToken&&(n.validate_token=e.validateToken),o("requestMobilePhoneVerify",null,null,"POST",n,e)},requestPasswordResetBySmsCode:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={mobilePhoneNumber:t};return e.validateToken&&(n.validate_token=e.validateToken),o("requestPasswordResetBySmsCode",null,null,"POST",n,e)},resetPasswordBySmsCode:function(t,e){return o("resetPasswordBySmsCode",null,t,"PUT",{password:e})},verifyMobilePhone:function(t){return o("verifyMobilePhone",null,t,"POST",null)},requestLoginSmsCode:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={mobilePhoneNumber:t};return e.validateToken&&(n.validate_token=e.validateToken),o("requestLoginSmsCode",null,null,"POST",n,e)},currentAsync:function(){return t._config.disableCurrentUser?(console.warn("AV.User.currentAsync() was disabled in multi-user environment, access user from request instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"),u.resolve(null)):t.User._currentUser?u.resolve(t.User._currentUser):t.User._currentUserMatchesDisk?u.resolve(t.User._currentUser):t.localStorage.getItemAsync(t._getAVPath(t.User._CURRENT_USER_KEY)).then(function(e){if(!e)return null;t.User._currentUserMatchesDisk=!0,t.User._currentUser=t.Object._create("_User"),t.User._currentUser._isCurrentUser=!0;var n=JSON.parse(e);return t.User._currentUser.id=n._id,delete n._id,t.User._currentUser._sessionToken=n._sessionToken,delete n._sessionToken,t.User._currentUser._finishFetch(n),t.User._currentUser._synchronizeAllAuthData(),t.User._currentUser._refreshCache(),t.User._currentUser._opSetQueue=[{}],t.User._currentUser})},current:function(){if(t._config.disableCurrentUser)return console.warn("AV.User.current() was disabled in multi-user environment, access user from request instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"),null;if(t.User._currentUser)return t.User._currentUser;if(t.User._currentUserMatchesDisk)return t.User._currentUser;t.User._currentUserMatchesDisk=!0;var e=t.localStorage.getItem(t._getAVPath(t.User._CURRENT_USER_KEY));if(!e)return null;t.User._currentUser=t.Object._create("_User"),t.User._currentUser._isCurrentUser=!0;var n=JSON.parse(e);return t.User._currentUser.id=n._id,delete n._id,t.User._currentUser._sessionToken=n._sessionToken,delete n._sessionToken,t.User._currentUser._finishFetch(n),t.User._currentUser._synchronizeAllAuthData(),t.User._currentUser._refreshCache(),t.User._currentUser._opSetQueue=[{}],t.User._currentUser},_saveCurrentUser:function(e){var n;return n=t.User._currentUser!==e?t.User.logOut():u.resolve(),n.then(function(){e._isCurrentUser=!0,t.User._currentUser=e;var n=e.toJSON();return n._id=e.id,n._sessionToken=e._sessionToken,t.localStorage.setItemAsync(t._getAVPath(t.User._CURRENT_USER_KEY),JSON.stringify(n)).then(function(){return t.User._currentUserMatchesDisk=!0,t._refreshSubscriptionId()})})},_registerAuthenticationProvider:function(e){t.User._authProviders[e.getAuthType()]=e,!t._config.disableCurrentUser&&t.User.current()&&t.User.current()._synchronizeAuthData(e.getAuthType())},_logInWith:function(e,n){return t.Object._create("_User")._linkWith(e,n)}})}},function(t,e,n){"use strict";function r(t){var e=this;this.AV=t,this.lockedUntil=0,o.getAsync("serverURLs").then(function(t){if(!t)return e.lock(0);var n=t.serverURLs,r=t.lockedUntil;e.AV._setServerURLs(n,!1),e.lockedUntil=r}).catch(function(){return e.lock(0)})}var i=n(3),s=i.ajax,o=n(9);r.prototype.disable=function(){this.disabled=!0},r.prototype.lock=function(t){this.lockedUntil=Date.now()+t},r.prototype.refresh=function(){var t=this;if(!(this.disabled||Date.now()<this.lockedUntil)){this.lock(10);return s({method:"get",url:"https://app-router.leancloud.cn/2/route",query:{appId:this.AV.applicationId}}).then(function(e){if(!t.disabled){var n=e.ttl;if(!n)throw new Error("missing ttl");n*=1e3;var r={push:"https://"+e.push_server,stats:"https://"+e.stats_server,engine:"https://"+e.engine_server,api:"https://"+e.api_server};return t.AV._setServerURLs(r,!1),t.lock(n),o.setAsync("serverURLs",{serverURLs:r,lockedUntil:t.lockedUntil},n)}}).catch(function(e){console.warn("refresh server URLs failed: "+e.message),t.lock(600)})}},t.exports=r},function(t,e,n){"use strict";/*!
 * LeanCloud JavaScript SDK
 * https://leancloud.cn
 *
 * Copyright 2016 LeanCloud.cn, Inc.
 * The LeanCloud JavaScript SDK is freely distributable under the MIT license.
 */
n(26);var r=n(5);r._=n(0),r.version=n(11),r.Promise=n(1),r.localStorage=n(10),r.Cache=n(9),r.Error=n(4),n(21),n(18)(r),n(20)(r),n(14)(r),n(25)(r),n(29)(r),n(19)(r),n(24)(r),n(30)(r),n(33)(r),n(28)(r),n(23)(r),n(15)(r),n(16)(r),n(27)(r),n(32)(r),n(31)(r),n(22)(r),r.Conversation=n(17),t.exports=r},function(t,e,n){"use strict";t.exports=[]},function(t,e,n){"use strict";var r=n(11),i=["Browser"].concat(n(36));t.exports="LeanCloud-JS-SDK/"+r+" ("+i.join("; ")+")"},function(t,e,n){"use strict";var r=n(7),i=n(6)("cos"),s=n(1);t.exports=function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};n.attributes.url=t.url,n._bucket=t.bucket,n.id=t.objectId;var a=t.upload_url+"?sign="+encodeURIComponent(t.token);return new s(function(t,s){var u=r("POST",a).set(n._uploadHeaders).attach("fileContent",e,n.attributes.name).field("op","upload");o.onprogress&&u.on("progress",o.onprogress),u.end(function(e,r){if(r&&i(r.status,r.body,r.text),e)return r&&(e.statusCode=r.status,e.responseText=r.text,e.response=r.body),s(e);t(n)})})}},function(t,e,n){"use strict";var r=n(7),i=n(1),s=n(6)("qiniu");t.exports=function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};n.attributes.url=t.url,n._bucket=t.bucket,n.id=t.objectId;var a=t.token,u=t.upload_url||"https://upload.qiniup.com";return new i(function(t,i){var c=r("POST",u).set(n._uploadHeaders).attach("file",e,n.attributes.name).field("name",n.attributes.name).field("key",n._qiniu_key).field("token",a);o.onprogress&&c.on("progress",o.onprogress),c.end(function(e,r){if(r&&s(r.status,r.body,r.text),e)return r&&(e.statusCode=r.status,e.responseText=r.text,e.response=r.body),i(e);t(n)})})}},function(t,e,n){"use strict";var r=n(7),i=n(1),s=function(t,e){return e&&(t.statusCode=e.status,t.responseText=e.text,t.response=e.body),t};t.exports=function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return n.attributes.url=t.url,n._bucket=t.bucket,n.id=t.objectId,new i(function(i,a){var u=r("PUT",t.upload_url).set(Object.assign({"Content-Type":n.get("mime_type"),"Cache-Control":"public, max-age=31536000"},n._uploadHeaders));o.onprogress&&u.on("progress",o.onprogress),u.on("response",function(t){if(t.ok)return i(n);a(s(t.error,t))}),u.on("error",function(t,e){return a(s(t,e))}),u.send(e).end()})}},function(t,e,n){"use strict";(function(e){var r=n(0),i=(n(1),{}),s=["getItem","setItem","removeItem","clear"],o=e.localStorage;try{var a="__storejs__";if(o.setItem(a,a),o.getItem(a)!=a)throw new Error;o.removeItem(a)}catch(t){o=n(49)}r(s).each(function(t){i[t]=function(){return o[t].apply(o,arguments)}}),i.async=!1,t.exports=i}).call(e,n(8))},function(t,e,n){"use strict";var r=function(t,e){var n;t.indexOf("base64")<0?n=atob(t):t.split(",")[0].indexOf("base64")>=0?(e=e||t.split(",")[0].split(":")[1].split(";")[0],n=atob(t.split(",")[1])):n=unescape(t.split(",")[1]);for(var r=new Uint8Array(n.length),i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return new Blob([r],{type:e})};t.exports=r},function(t,e,n){function r(t){if(t)return i(t)}function i(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},r.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r,i=0;i<n.length;i++)if((r=n[i])===e||r.fn===e){n.splice(i,1);break}return this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n){n=n.slice(0);for(var r=0,i=n.length;r<i;++r)n[r].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e){!function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&n.rotl(t,8)|4278255360&n.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=n.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],n=0,r=0;n<t.length;n++,r+=8)e[r>>>5]|=t[n]<<24-r%32;return e},wordsToBytes:function(t){for(var e=[],n=0;n<32*t.length;n+=8)e.push(t[n>>>5]>>>24-n%32&255);return e},bytesToHex:function(t){for(var e=[],n=0;n<t.length;n++)e.push((t[n]>>>4).toString(16)),e.push((15&t[n]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],n=0;n<t.length;n+=2)e.push(parseInt(t.substr(n,2),16));return e},bytesToBase64:function(t){for(var n=[],r=0;r<t.length;r+=3)for(var i=t[r]<<16|t[r+1]<<8|t[r+2],s=0;s<4;s++)8*r+6*s<=8*t.length?n.push(e.charAt(i>>>6*(3-s)&63)):n.push("=");return n.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var n=[],r=0,i=0;r<t.length;i=++r%4)0!=i&&n.push((e.indexOf(t.charAt(r-1))&Math.pow(2,-2*i+8)-1)<<2*i|e.indexOf(t.charAt(r))>>>6-2*i);return n}};t.exports=n}()},function(t,e,n){function r(t){var n,r=0;for(n in t)r=(r<<5)-r+t.charCodeAt(n),r|=0;return e.colors[Math.abs(r)%e.colors.length]}function i(t){function n(){if(n.enabled){var t=n,r=+new Date,s=r-(i||r);t.diff=s,t.prev=i,t.curr=r,i=r;for(var o=new Array(arguments.length),a=0;a<o.length;a++)o[a]=arguments[a];o[0]=e.coerce(o[0]),"string"!=typeof o[0]&&o.unshift("%O");var u=0;o[0]=o[0].replace(/%([a-zA-Z%])/g,function(n,r){if("%%"===n)return n;u++;var i=e.formatters[r];if("function"==typeof i){var s=o[u];n=i.call(t,s),o.splice(u,1),u--}return n}),e.formatArgs.call(t,o);(n.log||e.log||console.log.bind(console)).apply(t,o)}}var i;return n.namespace=t,n.enabled=e.enabled(t),n.useColors=e.useColors(),n.color=r(t),n.destroy=s,"function"==typeof e.init&&e.init(n),e.instances.push(n),n}function s(){var t=e.instances.indexOf(this);return-1!==t&&(e.instances.splice(t,1),!0)}function o(t){e.save(t),e.names=[],e.skips=[];var n,r=("string"==typeof t?t:"").split(/[\s,]+/),i=r.length;for(n=0;n<i;n++)r[n]&&(t=r[n].replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")));for(n=0;n<e.instances.length;n++){var s=e.instances[n];s.enabled=e.enabled(s.namespace)}}function a(){e.enable("")}function u(t){if("*"===t[t.length-1])return!0;var n,r;for(n=0,r=e.skips.length;n<r;n++)if(e.skips[n].test(t))return!1;for(n=0,r=e.names.length;n<r;n++)if(e.names[n].test(t))return!0;return!1}function c(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=i.debug=i.default=i,e.coerce=c,e.disable=a,e.enable=o,e.enabled=u,e.humanize=n(51),e.instances=[],e.names=[],e.skips=[],e.formatters={}},function(t,e,n){(function(e){/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */
!function(e,n){t.exports=n()}(0,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function r(t){return"function"==typeof t}function i(t){V=t}function s(t){W=t}function o(){return void 0!==Q?function(){Q(u)}:a()}function a(){var t=setTimeout;return function(){return t(u,1)}}function u(){for(var t=0;t<J;t+=2){(0,X[t])(X[t+1]),X[t]=void 0,X[t+1]=void 0}J=0}function c(t,e){var n=arguments,r=this,i=new this.constructor(h);void 0===i[Z]&&x(i);var s=r._state;return s?function(){var t=n[s-1];W(function(){return T(s,i,t,r._result)})}():S(r,i,t,e),i}function l(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(h);return g(n,t),n}function h(){}function f(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function p(t){try{return t.then}catch(t){return rt.error=t,rt}}function _(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}function v(t,e,n){W(function(t){var r=!1,i=_(n,e,function(n){r||(r=!0,e!==n?g(t,n):w(t,n))},function(e){r||(r=!0,O(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&i&&(r=!0,O(t,i))},t)}function y(t,e){e._state===et?w(t,e._result):e._state===nt?O(t,e._result):S(e,void 0,function(e){return g(t,e)},function(e){return O(t,e)})}function m(t,e,n){e.constructor===t.constructor&&n===c&&e.constructor.resolve===l?y(t,e):n===rt?(O(t,rt.error),rt.error=null):void 0===n?w(t,e):r(n)?v(t,e,n):w(t,e)}function g(e,n){e===n?O(e,f()):t(n)?m(e,n,p(n)):w(e,n)}function b(t){t._onerror&&t._onerror(t._result),A(t)}function w(t,e){t._state===tt&&(t._result=e,t._state=et,0!==t._subscribers.length&&W(A,t))}function O(t,e){t._state===tt&&(t._state=nt,t._result=e,W(b,t))}function S(t,e,n,r){var i=t._subscribers,s=i.length;t._onerror=null,i[s]=e,i[s+et]=n,i[s+nt]=r,0===s&&t._state&&W(A,t)}function A(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,i=void 0,s=t._result,o=0;o<e.length;o+=3)r=e[o],i=e[o+n],r?T(n,r,i,s):i(s);t._subscribers.length=0}}function C(){this.error=null}function E(t,e){try{return t(e)}catch(t){return it.error=t,it}}function T(t,e,n,i){var s=r(n),o=void 0,a=void 0,u=void 0,c=void 0;if(s){if(o=E(n,i),o===it?(c=!0,a=o.error,o.error=null):u=!0,e===o)return void O(e,d())}else o=i,u=!0;e._state!==tt||(s&&u?g(e,o):c?O(e,a):t===et?w(e,o):t===nt&&O(e,o))}function N(t,e){try{e(function(e){g(t,e)},function(e){O(t,e)})}catch(e){O(t,e)}}function j(){return st++}function x(t){t[Z]=st++,t._state=void 0,t._result=void 0,t._subscribers=[]}function U(t,e){this._instanceConstructor=t,this.promise=new t(h),this.promise[Z]||x(this.promise),B(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?w(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&w(this.promise,this._result))):O(this.promise,k())}function k(){return new Error("Array Methods must be provided an Array")}function I(t){return new U(this,t).promise}function R(t){var e=this;return new e(B(t)?function(n,r){for(var i=t.length,s=0;s<i;s++)e.resolve(t[s]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function P(t){var e=this,n=new e(h);return O(n,t),n}function D(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function F(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function L(t){this[Z]=j(),this._result=this._state=void 0,this._subscribers=[],h!==t&&("function"!=typeof t&&D(),this instanceof L?N(this,t):F())}function q(){var t=void 0;if(void 0!==e)t=e;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(t){}if("[object Promise]"===r&&!n.cast)return}t.Promise=L}var M=void 0;M=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B=M,J=0,Q=void 0,V=void 0,W=function(t,e){X[J]=t,X[J+1]=e,2===(J+=2)&&(V?V(u):Y())},K="undefined"!=typeof window?window:void 0,z=K||{},G=z.MutationObserver||z.WebKitMutationObserver,H="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),$="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,X=new Array(1e3),Y=void 0;Y=H?function(){return function(){return process.nextTick(u)}}():G?function(){var t=0,e=new G(u),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}():$?function(){var t=new MessageChannel;return t.port1.onmessage=u,function(){return t.port2.postMessage(0)}}():void 0===K?function(){try{var t=n(56);return Q=t.runOnLoop||t.runOnContext,o()}catch(t){return a()}}():a();var Z=Math.random().toString(36).substring(16),tt=void 0,et=1,nt=2,rt=new C,it=new C,st=0;return U.prototype._enumerate=function(t){for(var e=0;this._state===tt&&e<t.length;e++)this._eachEntry(t[e],e)},U.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===l){var i=p(t);if(i===c&&t._state!==tt)this._settledAt(t._state,e,t._result);else if("function"!=typeof i)this._remaining--,this._result[e]=t;else if(n===L){var s=new n(h);m(s,t,i),this._willSettleAt(s,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},U.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===tt&&(this._remaining--,t===nt?O(r,n):this._result[e]=n),0===this._remaining&&w(r,this._result)},U.prototype._willSettleAt=function(t,e){var n=this;S(t,void 0,function(t){return n._settledAt(et,e,t)},function(t){return n._settledAt(nt,e,t)})},L.all=I,L.race=R,L.resolve=l,L.reject=P,L._setScheduler=i,L._setAsap=s,L._asap=W,L.prototype={constructor:L,then:c,catch:function(t){return this.then(null,t)}},L.polyfill=q,L.Promise=L,L})}).call(e,n(8))},function(t,e,n){"use strict";function r(){}function i(t,e,n){this.fn=t,this.context=e,this.once=n||!1}function s(){this._events=new r,this._eventsCount=0}var o=Object.prototype.hasOwnProperty,a="~";Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(a=!1)),s.prototype.eventNames=function(){var t,e,n=[];if(0===this._eventsCount)return n;for(e in t=this._events)o.call(t,e)&&n.push(a?e.slice(1):e);return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(t)):n},s.prototype.listeners=function(t,e){var n=a?a+t:t,r=this._events[n];if(e)return!!r;if(!r)return[];if(r.fn)return[r.fn];for(var i=0,s=r.length,o=new Array(s);i<s;i++)o[i]=r[i].fn;return o},s.prototype.emit=function(t,e,n,r,i,s){var o=a?a+t:t;if(!this._events[o])return!1;var u,c,l=this._events[o],h=arguments.length;if(l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),h){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,n),!0;case 4:return l.fn.call(l.context,e,n,r),!0;case 5:return l.fn.call(l.context,e,n,r,i),!0;case 6:return l.fn.call(l.context,e,n,r,i,s),!0}for(c=1,u=new Array(h-1);c<h;c++)u[c-1]=arguments[c];l.fn.apply(l.context,u)}else{var f,d=l.length;for(c=0;c<d;c++)switch(l[c].once&&this.removeListener(t,l[c].fn,void 0,!0),h){case 1:l[c].fn.call(l[c].context);break;case 2:l[c].fn.call(l[c].context,e);break;case 3:l[c].fn.call(l[c].context,e,n);break;case 4:l[c].fn.call(l[c].context,e,n,r);break;default:if(!u)for(f=1,u=new Array(h-1);f<h;f++)u[f-1]=arguments[f];l[c].fn.apply(l[c].context,u)}}return!0},s.prototype.on=function(t,e,n){var r=new i(e,n||this),s=a?a+t:t;return this._events[s]?this._events[s].fn?this._events[s]=[this._events[s],r]:this._events[s].push(r):(this._events[s]=r,this._eventsCount++),this},s.prototype.once=function(t,e,n){var r=new i(e,n||this,!0),s=a?a+t:t;return this._events[s]?this._events[s].fn?this._events[s]=[this._events[s],r]:this._events[s].push(r):(this._events[s]=r,this._eventsCount++),this},s.prototype.removeListener=function(t,e,n,i){var s=a?a+t:t;if(!this._events[s])return this;if(!e)return 0==--this._eventsCount?this._events=new r:delete this._events[s],this;var o=this._events[s];if(o.fn)o.fn!==e||i&&!o.once||n&&o.context!==n||(0==--this._eventsCount?this._events=new r:delete this._events[s]);else{for(var u=0,c=[],l=o.length;u<l;u++)(o[u].fn!==e||i&&!o[u].once||n&&o[u].context!==n)&&c.push(o[u]);c.length?this._events[s]=1===c.length?c[0]:c:0==--this._eventsCount?this._events=new r:delete this._events[s]}return this},s.prototype.removeAllListeners=function(t){var e;return t?(e=a?a+t:t,this._events[e]&&(0==--this._eventsCount?this._events=new r:delete this._events[e])):(this._events=new r,this._eventsCount=0),this},s.prototype.off=s.prototype.removeListener,s.prototype.addListener=s.prototype.on,s.prototype.setMaxListeners=function(){return this},s.prefixed=a,s.EventEmitter=s,t.exports=s},function(t,e){function n(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function r(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&n(t.slice(0,0))}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&(n(t)||r(t)||!!t._isBuffer)}},function(t,e,n){!function(e){var n={},r={};n.length=0,n.getItem=function(t){return r[t]||null},n.setItem=function(t,e){void 0===e?n.removeItem(t):(r.hasOwnProperty(t)||n.length++,r[t]=""+e)},n.removeItem=function(t){r.hasOwnProperty(t)&&(delete r[t],n.length--)},n.key=function(t){return Object.keys(r)[t]||null},n.clear=function(){r={},n.length=0},t.exports=n}()},function(t,e,n){!function(){var e=n(44),r=n(12).utf8,i=n(48),s=n(12).bin,o=function(t,n){t.constructor==String?t=n&&"binary"===n.encoding?s.stringToBytes(t):r.stringToBytes(t):i(t)?t=Array.prototype.slice.call(t,0):Array.isArray(t)||(t=t.toString());for(var a=e.bytesToWords(t),u=8*t.length,c=1732584193,l=-271733879,h=-1732584194,f=271733878,d=0;d<a.length;d++)a[d]=16711935&(a[d]<<8|a[d]>>>24)|4278255360&(a[d]<<24|a[d]>>>8);a[u>>>5]|=128<<u%32,a[14+(u+64>>>9<<4)]=u;for(var p=o._ff,_=o._gg,v=o._hh,y=o._ii,d=0;d<a.length;d+=16){var m=c,g=l,b=h,w=f;c=p(c,l,h,f,a[d+0],7,-680876936),f=p(f,c,l,h,a[d+1],12,-389564586),h=p(h,f,c,l,a[d+2],17,606105819),l=p(l,h,f,c,a[d+3],22,-1044525330),c=p(c,l,h,f,a[d+4],7,-176418897),f=p(f,c,l,h,a[d+5],12,1200080426),h=p(h,f,c,l,a[d+6],17,-1473231341),l=p(l,h,f,c,a[d+7],22,-45705983),c=p(c,l,h,f,a[d+8],7,1770035416),f=p(f,c,l,h,a[d+9],12,-1958414417),h=p(h,f,c,l,a[d+10],17,-42063),l=p(l,h,f,c,a[d+11],22,-1990404162),c=p(c,l,h,f,a[d+12],7,1804603682),f=p(f,c,l,h,a[d+13],12,-40341101),h=p(h,f,c,l,a[d+14],17,-1502002290),l=p(l,h,f,c,a[d+15],22,1236535329),c=_(c,l,h,f,a[d+1],5,-165796510),f=_(f,c,l,h,a[d+6],9,-1069501632),h=_(h,f,c,l,a[d+11],14,643717713),l=_(l,h,f,c,a[d+0],20,-373897302),c=_(c,l,h,f,a[d+5],5,-701558691),f=_(f,c,l,h,a[d+10],9,38016083),h=_(h,f,c,l,a[d+15],14,-660478335),l=_(l,h,f,c,a[d+4],20,-405537848),c=_(c,l,h,f,a[d+9],5,568446438),f=_(f,c,l,h,a[d+14],9,-1019803690),h=_(h,f,c,l,a[d+3],14,-187363961),l=_(l,h,f,c,a[d+8],20,1163531501),c=_(c,l,h,f,a[d+13],5,-1444681467),f=_(f,c,l,h,a[d+2],9,-51403784),h=_(h,f,c,l,a[d+7],14,1735328473),l=_(l,h,f,c,a[d+12],20,-1926607734),c=v(c,l,h,f,a[d+5],4,-378558),f=v(f,c,l,h,a[d+8],11,-2022574463),h=v(h,f,c,l,a[d+11],16,1839030562),l=v(l,h,f,c,a[d+14],23,-35309556),c=v(c,l,h,f,a[d+1],4,-1530992060),f=v(f,c,l,h,a[d+4],11,1272893353),h=v(h,f,c,l,a[d+7],16,-155497632),l=v(l,h,f,c,a[d+10],23,-1094730640),c=v(c,l,h,f,a[d+13],4,681279174),f=v(f,c,l,h,a[d+0],11,-358537222),h=v(h,f,c,l,a[d+3],16,-722521979),l=v(l,h,f,c,a[d+6],23,76029189),c=v(c,l,h,f,a[d+9],4,-640364487),f=v(f,c,l,h,a[d+12],11,-421815835),h=v(h,f,c,l,a[d+15],16,530742520),l=v(l,h,f,c,a[d+2],23,-995338651),c=y(c,l,h,f,a[d+0],6,-198630844),f=y(f,c,l,h,a[d+7],10,1126891415),h=y(h,f,c,l,a[d+14],15,-1416354905),l=y(l,h,f,c,a[d+5],21,-57434055),c=y(c,l,h,f,a[d+12],6,1700485571),f=y(f,c,l,h,a[d+3],10,-1894986606),h=y(h,f,c,l,a[d+10],15,-1051523),l=y(l,h,f,c,a[d+1],21,-2054922799),c=y(c,l,h,f,a[d+8],6,1873313359),f=y(f,c,l,h,a[d+15],10,-30611744),h=y(h,f,c,l,a[d+6],15,-1560198380),l=y(l,h,f,c,a[d+13],21,1309151649),c=y(c,l,h,f,a[d+4],6,-145523070),f=y(f,c,l,h,a[d+11],10,-1120210379),h=y(h,f,c,l,a[d+2],15,718787259),l=y(l,h,f,c,a[d+9],21,-343485551),c=c+m>>>0,l=l+g>>>0,h=h+b>>>0,f=f+w>>>0}return e.endian([c,l,h,f])};o._ff=function(t,e,n,r,i,s,o){var a=t+(e&n|~e&r)+(i>>>0)+o;return(a<<s|a>>>32-s)+e},o._gg=function(t,e,n,r,i,s,o){var a=t+(e&r|n&~r)+(i>>>0)+o;return(a<<s|a>>>32-s)+e},o._hh=function(t,e,n,r,i,s,o){var a=t+(e^n^r)+(i>>>0)+o;return(a<<s|a>>>32-s)+e},o._ii=function(t,e,n,r,i,s,o){var a=t+(n^(e|~r))+(i>>>0)+o;return(a<<s|a>>>32-s)+e},o._blocksize=16,o._digestsize=16,t.exports=function(t,n){if(void 0===t||null===t)throw new Error("Illegal argument "+t);var r=e.wordsToBytes(o(t,n));return n&&n.asBytes?r:n&&n.asString?s.bytesToString(r):e.bytesToHex(r)}}()},function(t,e){function n(t){if(t=String(t),!(t.length>100)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var n=parseFloat(e[1]);switch((e[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return n*l;case"days":case"day":case"d":return n*c;case"hours":case"hour":case"hrs":case"hr":case"h":return n*u;case"minutes":case"minute":case"mins":case"min":case"m":return n*a;case"seconds":case"second":case"secs":case"sec":case"s":return n*o;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function r(t){return t>=c?Math.round(t/c)+"d":t>=u?Math.round(t/u)+"h":t>=a?Math.round(t/a)+"m":t>=o?Math.round(t/o)+"s":t+"ms"}function i(t){return s(t,c,"day")||s(t,u,"hour")||s(t,a,"minute")||s(t,o,"second")||t+" ms"}function s(t,e,n){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}var o=1e3,a=60*o,u=60*a,c=24*u,l=365.25*c;t.exports=function(t,e){e=e||{};var s=typeof t;if("string"===s&&t.length>0)return n(t);if("number"===s&&!1===isNaN(t))return e.long?i(t):r(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}},function(t,e){function n(){this._defaults=[]}["use","on","once","set","query","type","accept","auth","withCredentials","sortQuery","retry","ok","redirects","timeout","buffer","serialize","parse","ca","key","pfx","cert"].forEach(function(t){n.prototype[t]=function(){return this._defaults.push({fn:t,arguments:arguments}),this}}),n.prototype._setDefaults=function(t){this._defaults.forEach(function(e){t[e.fn].apply(t,e.arguments)})},t.exports=n},function(t,e,n){"use strict";function r(t){if(t)return i(t)}function i(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}var s=n(13);t.exports=r,r.prototype.clearTimeout=function(){return clearTimeout(this._timer),clearTimeout(this._responseTimeoutTimer),delete this._timer,delete this._responseTimeoutTimer,this},r.prototype.parse=function(t){return this._parser=t,this},r.prototype.responseType=function(t){return this._responseType=t,this},r.prototype.serialize=function(t){return this._serializer=t,this},r.prototype.timeout=function(t){if(!t||"object"!=typeof t)return this._timeout=t,this._responseTimeout=0,this;for(var e in t)switch(e){case"deadline":this._timeout=t.deadline;break;case"response":this._responseTimeout=t.response;break;default:console.warn("Unknown timeout option",e)}return this},r.prototype.retry=function(t,e){return 0!==arguments.length&&!0!==t||(t=1),t<=0&&(t=0),this._maxRetries=t,this._retries=0,this._retryCallback=e,this};var o=["ECONNRESET","ETIMEDOUT","EADDRINFO","ESOCKETTIMEDOUT"];r.prototype._shouldRetry=function(t,e){if(!this._maxRetries||this._retries++>=this._maxRetries)return!1;if(this._retryCallback)try{var n=this._retryCallback(t,e);if(!0===n)return!0;if(!1===n)return!1}catch(t){console.error(t)}if(e&&e.status&&e.status>=500&&501!=e.status)return!0;if(t){if(t.code&&~o.indexOf(t.code))return!0;if(t.timeout&&"ECONNABORTED"==t.code)return!0;if(t.crossDomain)return!0}return!1},r.prototype._retry=function(){return this.clearTimeout(),this.req&&(this.req=null,this.req=this.request()),this._aborted=!1,this.timedout=!1,this._end()},r.prototype.then=function(t,e){if(!this._fullfilledPromise){var n=this;this._endCalled&&console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"),this._fullfilledPromise=new Promise(function(t,e){n.end(function(n,r){n?e(n):t(r)})})}return this._fullfilledPromise.then(t,e)},r.prototype.catch=function(t){return this.then(void 0,t)},r.prototype.use=function(t){return t(this),this},r.prototype.ok=function(t){if("function"!=typeof t)throw Error("Callback required");return this._okCallback=t,this},r.prototype._isResponseOK=function(t){return!!t&&(this._okCallback?this._okCallback(t):t.status>=200&&t.status<300)},r.prototype.get=function(t){return this._header[t.toLowerCase()]},r.prototype.getHeader=r.prototype.get,r.prototype.set=function(t,e){if(s(t)){for(var n in t)this.set(n,t[n]);return this}return this._header[t.toLowerCase()]=e,this.header[t]=e,this},r.prototype.unset=function(t){return delete this._header[t.toLowerCase()],delete this.header[t],this},r.prototype.field=function(t,e){if(null===t||void 0===t)throw new Error(".field(name, val) name can not be empty");if(this._data&&console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"),s(t)){for(var n in t)this.field(n,t[n]);return this}if(Array.isArray(e)){for(var r in e)this.field(t,e[r]);return this}if(null===e||void 0===e)throw new Error(".field(name, val) val can not be empty");return"boolean"==typeof e&&(e=""+e),this._getFormData().append(t,e),this},r.prototype.abort=function(){return this._aborted?this:(this._aborted=!0,this.xhr&&this.xhr.abort(),this.req&&this.req.abort(),this.clearTimeout(),this.emit("abort"),this)},r.prototype._auth=function(t,e,n,r){switch(n.type){case"basic":this.set("Authorization","Basic "+r(t+":"+e));break;case"auto":this.username=t,this.password=e;break;case"bearer":this.set("Authorization","Bearer "+t)}return this},r.prototype.withCredentials=function(t){return void 0==t&&(t=!0),this._withCredentials=t,this},r.prototype.redirects=function(t){return this._maxRedirects=t,this},r.prototype.maxResponseSize=function(t){if("number"!=typeof t)throw TypeError("Invalid argument");return this._maxResponseSize=t,this},r.prototype.toJSON=function(){return{method:this.method,url:this.url,data:this._data,headers:this._header}},r.prototype.send=function(t){var e=s(t),n=this._header["content-type"];if(this._formData&&console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"),e&&!this._data)Array.isArray(t)?this._data=[]:this._isHost(t)||(this._data={});else if(t&&this._data&&this._isHost(this._data))throw Error("Can't merge these send calls");if(e&&s(this._data))for(var r in t)this._data[r]=t[r];else"string"==typeof t?(n||this.type("form"),n=this._header["content-type"],this._data="application/x-www-form-urlencoded"==n?this._data?this._data+"&"+t:t:(this._data||"")+t):this._data=t;return!e||this._isHost(t)?this:(n||this.type("json"),this)},r.prototype.sortQuery=function(t){return this._sort=void 0===t||t,this},r.prototype._finalizeQueryString=function(){var t=this._query.join("&");if(t&&(this.url+=(this.url.indexOf("?")>=0?"&":"?")+t),this._query.length=0,this._sort){var e=this.url.indexOf("?");if(e>=0){var n=this.url.substring(e+1).split("&");"function"==typeof this._sort?n.sort(this._sort):n.sort(),this.url=this.url.substring(0,e)+"?"+n.join("&")}}},r.prototype._appendQueryString=function(){console.trace("Unsupported")},r.prototype._timeoutError=function(t,e,n){if(!this._aborted){var r=new Error(t+e+"ms exceeded");r.timeout=e,r.code="ECONNABORTED",r.errno=n,this.timedout=!0,this.abort(),this.callback(r)}},r.prototype._setTimeouts=function(){var t=this;this._timeout&&!this._timer&&(this._timer=setTimeout(function(){t._timeoutError("Timeout of ",t._timeout,"ETIME")},this._timeout)),this._responseTimeout&&!this._responseTimeoutTimer&&(this._responseTimeoutTimer=setTimeout(function(){t._timeoutError("Response timeout of ",t._responseTimeout,"ETIMEDOUT")},this._responseTimeout))}},function(t,e,n){"use strict";function r(t){if(t)return i(t)}function i(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}var s=n(55);t.exports=r,r.prototype.get=function(t){return this.header[t.toLowerCase()]},r.prototype._setHeaderProperties=function(t){var e=t["content-type"]||"";this.type=s.type(e);var n=s.params(e);for(var r in n)this[r]=n[r];this.links={};try{t.link&&(this.links=s.parseLinks(t.link))}catch(t){}},r.prototype._setStatusProperties=function(t){var e=t/100|0;this.status=this.statusCode=t,this.statusType=e,this.info=1==e,this.ok=2==e,this.redirect=3==e,this.clientError=4==e,this.serverError=5==e,this.error=(4==e||5==e)&&this.toError(),this.accepted=202==t,this.noContent=204==t,this.badRequest=400==t,this.unauthorized=401==t,this.notAcceptable=406==t,this.forbidden=403==t,this.notFound=404==t}},function(t,e,n){"use strict";e.type=function(t){return t.split(/ *; */).shift()},e.params=function(t){return t.split(/ *; */).reduce(function(t,e){var n=e.split(/ *= */),r=n.shift(),i=n.shift();return r&&i&&(t[r]=i),t},{})},e.parseLinks=function(t){return t.split(/ *, */).reduce(function(t,e){var n=e.split(/ *; */),r=n[0].slice(1,-1);return t[n[1].split(/ *= */)[1].slice(1,-1)]=r,t},{})},e.cleanHeader=function(t,e){return delete t["content-type"],delete t["content-length"],delete t["transfer-encoding"],delete t.host,e&&(delete t.authorization,delete t.cookie),t}},function(t,e){}])});
//# sourceMappingURL=av-min.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!./node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, "* {\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\n\nul,\nol,\nli {\n    list-style: none;\n}\n/*  v-cloak放在li中，隐藏未编译的Mustache标签直到实例准备结束，有了这个指令之后，哪怕在github page上展示，网速较慢情况下也不会先给用户看到 {{ xxx }} 标记。  */\n\n[v-cloak] {\n    display: none;\n}\n\nbody {\n    font-family: fantasy;\n    background: rgba(247, 172, 36, .76);\n}\n\n#app {\n    padding: 40px;\n}\n\nh1 {\n    color: white;\n    font-size: 3em;\n}\n\n.newTask>input {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    outline: none;\n    padding: 5px 10px;\n    margin: 10px 0;\n    width: 50%;\n    border: 1px solid #aaa;\n    border-radius: 5px;\n    font-size: 1.3em;\n}\n\n.todos {\n    line-height: 3;\n}\n\n.todos input {\n    outline: none;\n}\n\n.todos span:nth-child(2){\n    color: blue;\n    padding-left: 10px;\n}\n\n.todos span:nth-child(3) {\n    color: red;\n    padding: 0 10px;\n}\n\n.todos input:checked~span:nth-child(3) {\n    color: green;\n}\n\nbutton {\n    padding: 1px 5px;\n    cursor: pointer;\n}\n\n    ::-webkit-input-placeholder {\n    /* WebKit browsers */\n    color: #aaa;\n}\n\n    :-moz-placeholder {\n    /* Mozilla Firefox 4 to 18 */\n    color: #aaa;\n}\n\n    ::-moz-placeholder {\n    /* Mozilla Firefox 19+ */\n    color: #aaa;\n}\n\n    :-ms-input-placeholder {\n    /* Internet Explorer 10+ */\n    color: #aaa;\n}", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function friendlyDate(time) {
    var offset = +new Date() - time;
    var seconds = 1000,
        minutes = seconds * 60,
        hours = minutes * 60,
        days = hours * 24,
        months = days * 30,
        years = months * 12;
    var t;

    if (offset >= years) {
        t = parseInt(offset / years);
        return t + '年前';
    } else if (offset >= months) {
        t = parseInt(offset / months);
        return t + '个月前';
    } else if (offset >= days) {
        t = parseInt(offset / days);
        return t + '天前';
    } else if (offset >= hours) {
        t = parseInt(offset / hours);
        return t + '小时前';
    } else if (offset >= minutes) {
        t = parseInt(offset / minutes);
        return t + '分钟前';
    }
    return '刚刚';
}

exports.default = friendlyDate;

/***/ })
/******/ ]);