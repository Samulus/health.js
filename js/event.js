console.log("js/event.js [✓]");
(function() {
  Time.Event = function(day) {
    Food.Global({db: Database.Day(day), totals: Database.Totals(day), mode: "reload"});
  };
})();
