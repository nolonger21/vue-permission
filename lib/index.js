(function () {
  "use strict";

  function VuePermission() {
    this.reset();
  };

  VuePermission.prototype.hasPermission = function(permission) {
    if (this.god) {
      return true;
    }
    return this.permissions.hasOwnProperty(permission);
  };

  VuePermission.prototype.reset = function() {
    // permission is hash able object.
    this.permissions = {};
    this.god = false;
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

  if (typeof exports == "object") {
    module.exports = Plugin
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return Plugin })
  }

})();