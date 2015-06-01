console.log("js/modify.js [✓]");

(function() {

  /* Scope */
  var scope = document.querySelector("div[data-scope='modify']");
  var cancel = scope.querySelector("button[data-fn='cancel']");

  /* Add / Modify Button */
  scope.querySelector("button[data-fn='modify']").onclick = function(e) {

    var error = false;

    /* Fetch Stats */
    var stats = scope.querySelector("fieldset[data-scope='stats']");
    var entry = {};
    for (var i=0; i < stats.children.length; ++i) {
      var id = stats.children[i].getAttribute('placeholder').toLowerCase();
      if (stats.children[i].getAttribute('type') === "number" && isNaN(parseFloat(stats.children[i].value))) {
        error = true;
        break;
      }

      var safe = function(str) { // thx stackoverflow
          return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
      };

      entry[id] = safe(stats.children[i].value);
    }

    /* Bail if Erroneous Data Detected */
    if (error) 
      return;

    /* Fetch Stamp && Callback */
    var stamp = scope.querySelector("div[data-scope='stamp']");
    Modify.Callback(entry, stamp.getAttribute('data-stamp'));
    stamp.setAttribute('data-stamp', '');
  };

  scope.querySelector("button[data-fn='cancel']").onclick = function(e) {
    /* Clear Inputs */
    var stats = scope.querySelector("fieldset[data-scope='stats']");
    for (var i=0; i < stats.children.length; ++i)
      stats.children[i].value = '';

    /* Wipe Stamp */
    scope.querySelector("div[data-scope='stamp']").setAttribute('data-stamp', '');
  };

  /* Public */
  top.Modify = {
    Load: function(entry, stamp) {

      /* Set Stamp */
      scope.querySelector("div[data-scope='stamp']").setAttribute('data-stamp', stamp);

      /* Fill Modify Fields */
      for (var key in entry) {
        var capital = key.charAt(0).toUpperCase() + key.slice(1);
        scope.querySelector("input[placeholder='"+capital+"']").value = entry[key];
      }
    }
  };

})();
