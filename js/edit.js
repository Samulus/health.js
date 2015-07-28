console.log("js/edit.js [✓]");

(function() {

  top.Edit = {};
  var self = {};
  self.stamp = null; /* set if modifying entry */

  /* Scope */
  var scope = document.querySelector("div[data-scope='edit']");

  /* Wipe Text */
  self.clear = function () {
    var stats = scope.querySelector("fieldset[data-scope='stats']");
    for (var i=0; i < stats.children.length; ++i)
      stats.children[i].value = '';
  };
  
  /* Fetch Input && Verify Validity / Cleanliness */
  self.sanitize = function() {
    var error = false;
    var stats = scope.querySelector("fieldset[data-scope='stats']");
    var entry = {};

    /* Verify Numbers are Inputted */
    for (var i=0; i < stats.children.length; ++i) {
      var id = stats.children[i].getAttribute('data-type');
      if (stats.children[i].getAttribute('type') === "number" && 
          isNaN(parseFloat(stats.children[i].value))) {
        error = true;
        break;
      }

      /* Prevent HTML Injection */
      var safe = function(str) {
          return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
      };

      entry[id] = safe(stats.children[i].value);
    }
    return (error) ? -1 : entry;
  };

  /* Add / Modify */
  scope.querySelector("button[data-fn='edit']").onclick = function(e) {

    var data = {};

    /* Validate Input */
    var entry = self.sanitize();
    if (entry === -1) return;

    /* Add / Modify */
    if (self.stamp === null) {
      data.db = Database.Add(entry, Time.Day(), Time.Stamp()); /* TODO: combine add and Modify into single Database.Update */
      data.mode = "add";
    } else {
      data.db = Database.Modify(entry, Time.Day(), self.stamp);
      data.mode = "modify";
      data.stamp = self.stamp;
      self.stamp = null;
    }

    /* Garner Totals */
    data.totals = Database.Totals(Time.Day());
    View('food', data);

    /* Wipe */
    self.clear();
  };

  /* Cancel */
  scope.querySelector("button[data-fn='cancel']").onclick = function(e) {
    self.clear(); window.history.back();
  };

  /* Public */ 
  Edit.Global = function(data) { // data.stamp, data.entry
    self.stamp = data.stamp;
    var stats = scope.querySelector("fieldset[data-scope='stats']");
    for (var i=0; i < stats.children.length; ++i) {
      var id = stats.children[i].getAttribute('placeholder').toLowerCase();
      stats.children[i].value = data.entry[id];
    }
  };

})();
