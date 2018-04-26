var vuePermission =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  function VuePermission() {
    // permission is hash able object.
    this.permissions = {};
    this.god = false;
  };

  VuePermission.prototype.hasPermission = function(permission) {
    if (this.god) {
      return true;
    }
    return this.permissions.hasOwnProperty(permission);
  };

  VuePermission.prototype.authorize = function(permissions) {
    if (!!permissions) {
      for(var key in permissions) {
        if (permissions.hasOwnProperty(key) && !!permissions[key]) {
          this.permissions[key] = permissions[key];
        }
      }
    }
  };

  var permissionIns = new VuePermission();
  var Plugin = {

    install: function(Vue, options) {
      Vue.permission = permissionIns;
      Vue.prototype.$permission = permissionIns;
      Vue.directive('permission', function (el, binding) {
        if (typeof binding.expression === 'string') {
          var expression = binding.expression;
          if (expression.length > 1 &&
            expression.charAt(0) === "'" &&
            expression.charAt(expression.length - 1) === "'") {
            expression = expression.substr(1, expression.length - 2);
          }
          var flag = permissionIns.hasPermission(expression);
          if (!flag) {
            el.style.display = 'none';
          }
        }
      })
    }
  };

  if (true) {
    module.exports = Plugin
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return Plugin })
  }

})();

/***/ })
/******/ ]);