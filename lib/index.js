(function () {

  function VuePermission() {
    // permission is hash able object.
    this.permissions = {};
  };

  VuePermission.prototype.hasPermission = function(permission) {
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

  const permissionIns = new VuePermission();

  const Plugin = {

    install(Vue, options) {

      Vue.permission = permissionIns;
      // if (Object.hasOwnProperty('defineProperties')) {
      //   Object.defineProperties(Vue.prototype, {
      //     $permission: {
      //       get() {
      //         return permissionIns
      //       }
      //     }
      //   });
      // } else {
      //
      // }
      Vue.prototype.$permission = permissionIns;

      Vue.directive('permission', function (el, binding) {
        if (typeof binding.expression === 'string') {
          var flag = permissionIns.hasPermission(binding.expression);
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