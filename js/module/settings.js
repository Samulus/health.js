console.log("js/settings [✓]");

(function() {

  /* Harris Benedict Equation uses health.js */
  // BMR Men = 66 + ( 6.2 x weight in pounds ) + ( 12.7 x height in inches ) – ( 6.76 x age in years )


  var scope = document.querySelector("div[data-scope='settings']");

  var self = {};
  top.Settings = {};

  self.preload = function(data) {};
  self.sanitize = function() {
    
    var stats = {};

    var scope = docume

    var okay = true;
    var weight = scope.querySelector("input[data-type='weight']");

    return okay;
  };

  // @data = {'settings': json}
  Settings.Global = function(data) { 
    if (data !== null) self.preload(data);
  };

  /* Binds */
  scope.querySelector("button[data-fn='apply']").onclick = function(e) {
    if (self.sanitize()) window.history.back();
  };
  scope.querySelector("button[data-fn='cancel']").onclick = function(e) {window.history.back();};

})();
