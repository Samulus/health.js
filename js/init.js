console.log("js/init.js [✓]");
(function() {

  /* Food */
  (function() {
    var db = Database.Read(Time.Day());
    if (db !== null) {
      Food.Add(db, Database.Totals(Time.Day()));
    }
  })();

})();
