console.log("js/callback.js [✓]");
(function() {

  /* Modify --- Updates DB && Refreshes View */
  Modify.Callback = function(entry, stamp) {
    var db = null;

    /* Database && View Update */
    if (stamp === '') {
      db = Database.Add(entry, Time.Day(), Time.Stamp());
      Food.Add(db, Database.Totals(Time.Day()));
    } else {
      db = Database.Modify(entry, Time.Day(), stamp);
      Food.Modify(db, stamp, Database.Totals(Time.Day()));
    }

  };

  /* Food -- Updates DB and returns new totals */
  Food.Callback = function(action, stamp) {

    if (action === "remove") {
      Database.Remove(Time.Day(), stamp);
    }

    if (action === "modify") {
      var entry = Database.Entry(Time.Day(), stamp);
      Modify.Load(entry, stamp); 
    }

    return Database.Totals(Time.Day());
  };

  /* Time —  Updates DB on time changes */
  Time.Callback = function(day) {
    Food.Switch(Database.Day(day), Database.Totals(day));
  };

})();
