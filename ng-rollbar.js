(function(angular){
  angular.module('tandibar/ng-rollbar', []);

  angular.module('tandibar/ng-rollbar').config(['$provide', function($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', '$injector', '$window', function($delegate, $injector, $window) {
      return function (exception, cause) {
        if($window.Rollbar) {
          $window.Rollbar.error(exception, {cause: cause}, function(err, data) {
            var $rootScope = $injector.get('$rootScope');
            $rootScope.$emit('rollbar:exception', {
              exception: exception,
              err: err,
              data: data ? data.result : null
            });
          });
        }
        $delegate(exception, cause);
      };
    }]);
  }]);

  angular.module('tandibar/ng-rollbar').provider('Rollbar', function RollbarProvider() {
    var rollbarProvider = this;
    var rollbarActivated = true;

    var rollbarVersion = '2.26.4';

    this.init = function(config) {
      var _rollbarConfig = config;
      if (rollbarActivated) {
        /* jshint ignore:start */
        /* rollbar client lib start */
        // https://raw.githubusercontent.com/rollbar/rollbar.js/master/dist/rollbar.snippet.js
        (()=>{"use strict";var r={349:r=>{r.exports={captureUncaughtExceptions:function(r,o,e){if(r){var n;if("function"==typeof o._rollbarOldOnError)n=o._rollbarOldOnError;else if(r.onerror){for(n=r.onerror;n._rollbarOldOnError;)n=n._rollbarOldOnError;o._rollbarOldOnError=n}o.handleAnonymousErrors();var t=function(){var e=Array.prototype.slice.call(arguments,0);!function(r,o,e,n){r._rollbarWrappedError&&(n[4]||(n[4]=r._rollbarWrappedError),n[5]||(n[5]=r._rollbarWrappedError._rollbarContext),r._rollbarWrappedError=null);var t=o.handleUncaughtException.apply(o,n);e&&e.apply(r,n),"anonymous"===t&&(o.anonymousErrorsPending+=1)}(r,o,n,e)};e&&(t._rollbarOldOnError=n),r.onerror=t}},captureUnhandledRejections:function(r,o,e){if(r){"function"==typeof r._rollbarURH&&r._rollbarURH.belongsToShim&&r.removeEventListener("unhandledrejection",r._rollbarURH);var n=function(r){var e,n,t;try{e=r.reason}catch(r){e=void 0}try{n=r.promise}catch(r){n="[unhandledrejection] error getting `promise` from event"}try{t=r.detail,!e&&t&&(e=t.reason,n=t.promise)}catch(r){}e||(e="[unhandledrejection] error getting `reason` from event"),o&&o.handleUnhandledRejection&&o.handleUnhandledRejection(e,n)};n.belongsToShim=e,r._rollbarURH=n,r.addEventListener("unhandledrejection",n)}}}},202:r=>{function o(r,e){this.impl=r(e,this),this.options=e,function(r){for(var o=function(r){return function(){var o=Array.prototype.slice.call(arguments,0);if(this.impl[r])return this.impl[r].apply(this.impl,o)}},e="log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,_createItem,wrap,loadFull,shimId,captureEvent,captureDomContentLoaded,captureLoad".split(","),n=0;n<e.length;n++)r[e[n]]=o(e[n])}(o.prototype)}o.prototype._swapAndProcessMessages=function(r,o){var e,n,t;for(this.impl=r(this.options);e=o.shift();)n=e.method,t=e.args,this[n]&&"function"==typeof this[n]&&("captureDomContentLoaded"===n||"captureLoad"===n?this[n].apply(this,[t[0],e.ts]):this[n].apply(this,t));return this},r.exports=o},758:(r,o,e)=>{var n=e(349),t=e(965);function a(r){return function(){try{return r.apply(this,arguments)}catch(r){try{console.error("[Rollbar]: Internal error",r)}catch(r){}}}}var l=0;function i(r,o){this.options=r,this._rollbarOldOnError=null;var e=l++;this.shimId=function(){return e},"undefined"!=typeof window&&window._rollbarShims&&(window._rollbarShims[e]={handler:o,messages:[]})}var s=e(202),d=function(r,o){return new i(r,o)},p=function(r){return new s(d,r)};function c(r){return a((function(){var o=Array.prototype.slice.call(arguments,0),e={shim:this,method:r,args:o,ts:new Date};window._rollbarShims[this.shimId()].messages.push(e)}))}i.prototype.loadFull=function(r,o,e,n,t){var l=!1,i=o.createElement("script"),s=o.getElementsByTagName("script")[0],d=s.parentNode;i.crossOrigin="",i.src=n.rollbarJsUrl,e||(i.async=!0),i.onload=i.onreadystatechange=a((function(){if(!(l||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState)){i.onload=i.onreadystatechange=null;try{d.removeChild(i)}catch(r){}l=!0,function(){var o;if(void 0===r._rollbarDidLoad){o=new Error("rollbar.js did not load");for(var e,n,a,l,i=0;e=r._rollbarShims[i++];)for(e=e.messages||[];n=e.shift();)for(a=n.args||[],i=0;i<a.length;++i)if("function"==typeof(l=a[i])){l(o);break}}"function"==typeof t&&t(o)}()}})),d.insertBefore(i,s)},i.prototype.wrap=function(r,o,e){try{var n;if(n="function"==typeof o?o:function(){return o||{}},"function"!=typeof r)return r;if(r._isWrap)return r;if(!r._rollbar_wrapped&&(r._rollbar_wrapped=function(){e&&"function"==typeof e&&e.apply(this,arguments);try{return r.apply(this,arguments)}catch(e){var o=e;throw o&&("string"==typeof o&&(o=new String(o)),o._rollbarContext=n()||{},o._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=o),o}},r._rollbar_wrapped._isWrap=!0,r.hasOwnProperty))for(var t in r)r.hasOwnProperty(t)&&(r._rollbar_wrapped[t]=r[t]);return r._rollbar_wrapped}catch(o){return r}};for(var u="log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,captureEvent,captureDomContentLoaded,captureLoad".split(","),f=0;f<u.length;++f)i.prototype[u[f]]=c(u[f]);r.exports={setupShim:function(r,o){if(r){var e=o.globalAlias||"Rollbar";if("object"==typeof r[e])return r[e];r._rollbarShims={},r._rollbarWrappedError=null;var l=new p(o);return a((function(){o.captureUncaught&&(l._rollbarOldOnError=r.onerror,n.captureUncaughtExceptions(r,l,!0),o.wrapGlobalEventHandlers&&t(r,l,!0)),o.captureUnhandledRejections&&n.captureUnhandledRejections(r,l,!0);var a=o.autoInstrument;return!1!==o.enabled&&(void 0===a||!0===a||function(r){return!("object"!=typeof r||void 0!==r.page&&!r.page)}(a))&&r.addEventListener&&(r.addEventListener("load",l.captureLoad.bind(l)),r.addEventListener("DOMContentLoaded",l.captureDomContentLoaded.bind(l))),r[e]=l,l}))()}},Rollbar:p}},157:r=>{r.exports=function(r){return function(o){if(!o&&!window._rollbarInitialized){for(var e,n,t=(r=r||{}).globalAlias||"Rollbar",a=window.rollbar,l=function(r){return new a(r)},i=0;e=window._rollbarShims[i++];)n||(n=e.handler),e.handler._swapAndProcessMessages(l,e.messages);window[t]=n,window._rollbarInitialized=!0}}}},965:r=>{function o(r,o,e){if(o.hasOwnProperty&&o.hasOwnProperty("addEventListener")){for(var n=o.addEventListener;n._rollbarOldAdd&&n.belongsToShim;)n=n._rollbarOldAdd;var t=function(o,e,t){n.call(this,o,r.wrap(e),t)};t._rollbarOldAdd=n,t.belongsToShim=e,o.addEventListener=t;for(var a=o.removeEventListener;a._rollbarOldRemove&&a.belongsToShim;)a=a._rollbarOldRemove;var l=function(r,o,e){a.call(this,r,o&&o._rollbar_wrapped||o,e)};l._rollbarOldRemove=a,l.belongsToShim=e,o.removeEventListener=l}}r.exports=function(r,e,n){if(r){var t,a,l="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(t=0;t<l.length;++t)r[a=l[t]]&&r[a].prototype&&o(e,r[a].prototype,n)}}}},o={};function e(n){var t=o[n];if(void 0!==t)return t.exports;var a=o[n]={exports:{}};return r[n](a,a.exports,e),a.exports}(()=>{var r=e(758),o=e(157);_rollbarConfig=_rollbarConfig||{},_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||"https://cdn.rollbar.com/rollbarjs/refs/tags/v2.26.4/rollbar.min.js",_rollbarConfig.async=void 0===_rollbarConfig.async||_rollbarConfig.async;var n=r.setupShim(window,_rollbarConfig),t=o(_rollbarConfig);window.rollbar=r.Rollbar,n.loadFull(window,document,!_rollbarConfig.async,_rollbarConfig,t)})()})();
        /* rollbar client lib end */
        /* jshint ignore:end */
      }
    };

    this.deinit = function () {
      rollbarActivated = false;
    };

    getter.$inject = ['$log', '$window'];
    function getter($log, $window) {

      function _bindRollbarMethod(methodName) {
        return function() {
          $window.Rollbar[methodName].apply($window.Rollbar, arguments);
        };
      }

      var service = {
        Rollbar: logInactiveMessage,

        configure: logInactiveMessage,

        critical: logInactiveMessage,
        error: logInactiveMessage,
        warning: logInactiveMessage,
        info: logInactiveMessage,
        debug: logInactiveMessage,

        scope: logInactiveMessage,

        verbose: logInactiveMessage,
        enable: logInactiveMessage,
        disable: logInactiveMessage
      };

      if (rollbarActivated) {
        service.Rollbar = $window.Rollbar;

        // bind the native Rollbar methods
        service.configure = _bindRollbarMethod('configure');
        service.critical = _bindRollbarMethod('critical');
        service.error = _bindRollbarMethod('error');
        service.warning = _bindRollbarMethod('warning');
        service.info = _bindRollbarMethod('info');
        service.debug = _bindRollbarMethod('debug');
        service.scope = _bindRollbarMethod('scope');

        service.verbose = function (boolean) {
          if (boolean === undefined) { boolean = true; }
          $window.Rollbar.configure({ verbose: boolean });
        };

        service.enable = function () {
          $window.Rollbar.configure({ enabled: true });
        };

        service.disable = function () {
          $window.Rollbar.configure({ enabled: false });
        };
      }

      function logInactiveMessage() {
        $log.warn("Rollbar is deactivated");
      }

      return service;
    }

    this.$get = getter;
  });

})
(angular);
