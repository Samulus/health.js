console.log("js/settings [✓]");

(function() {

  var scope = document.querySelector("div[data-scope='settings']");

  var self = {};
  top.Settings = {};

  self.preload = function(data) {
  };

  self.sanitize = function() {
  };

  // @data = {'settings': json}
  Settings.Global = function(data) { 
    if (data !== null) self.preload(data);
  };

  /* Binds */
  scope.querySelector("button[data-fn='apply']").onclick = function(e) {self.sanitize();};
  scope.querySelector("button[data-fn='cancel']").onclick = function(e) {window.history.back();};

})();
