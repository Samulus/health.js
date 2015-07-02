console.log("js/init.js [✓]");
(function() {

  /* Food -- load the present day*/
  (function() {
    var db = Database.Read(Time.Day());
    if (db !== null) {
      Food.Add(db, Database.Totals(Time.Day()));
    }
  })();

})();
