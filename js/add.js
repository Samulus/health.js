console.log("js/add.js [✓]");

(function() {

  top.Add = {};

  function clear() {
    var stats = scope.querySelector("fieldset[data-scope='stats']");
    for (var i=0; i < stats.children.length; ++i)
      stats.children[i].value = '';
  }

  /* Scope */
  var scope = document.querySelector("div[data-scope='add']");

  /* Add */
  scope.querySelector("button[data-fn='add']").onclick = function(e) {

    /* Sanitize and Fetch Inputs */
    var error = false;
    var stats = scope.querySelector("fieldset[data-scope='stats']");
    var entry = {};

    /* Sanitaize Input */
    for (var i=0; i < stats.children.length; ++i) {
      var id = stats.children[i].getAttribute('placeholder').toLowerCase();
      if (stats.children[i].getAttribute('type') === "number" && isNaN(parseFloat(stats.children[i].value))) {
        error = true;
        break;
      }

      var safe = function(str) { // thx stackoverflow
          return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
      };

      /* Save Entry */
      entry[id] = safe(stats.children[i].value);
    }

    /* Bail if Erroneous Data Detected */
    if (error) return;
    /* Call Callback with succesful new entry, switch to food view */
    Add.Callback(entry); View('food'); clear();
  };

  /* Cancel */
  scope.querySelector("button[data-fn='cancel']").onclick = function(e) {
    clear(); window.history.back();
  };

})();
