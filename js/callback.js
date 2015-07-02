console.log("js/callback.js [✓]");
(function() {

  Add.Callback = function(entry) {
    var db = Database.Add(entry, Time.Day(), Time.Stamp());
    Food.Add(db, Database.Totals(Time.Day()));
  };

  Food.Callback = function(action, stamp) {
    if (action === "remove") {
      Database.Remove(Time.Day(), stamp);
    }
    if (action === "modify") {
      var entry = Database.Entry(Time.Day(), stamp);
      alert("modifying entries is temporarily broken: need to combine code for adding and modifying entries into 1 file");
      //Modify.Load(entry, stamp); 
    }
    return Database.Totals(Time.Day());
  };

  Time.Callback = function(day) {
    Food.Switch(Database.Day(day), Database.Totals(day));
  };

})();
