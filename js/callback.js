console.log("js/callback.js [✓]");
/* TODO: remove this entire file and skip the middle man */
(function() {

  Edit.Callback = function(entry) {
    var db = Database.Add(entry, Time.Day(), Time.Stamp());
    Food.Add(db, Database.Totals(Time.Day()));
  };

  Food.Callback = function(action, stamp) {
    if (action === "remove") {
      Database.Remove(Time.Day(), stamp);
    }

    if (action === "modify") {
      var entry = Database.Entry(Time.Day(), stamp);
      Edit.Preload(entry, stamp);
    }
    return Database.Totals(Time.Day());
  };

})();
