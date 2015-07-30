console.log("js/nav.js [✓]");
(function() {

  /* Binds */
  var time = document.querySelector("div[data-scope='time']");
  time.querySelector("button[data-fn='edit']").onclick = function(e) {View('edit');};

  var reload = function (day) {
    Food.Global({db: Database.Day(day), totals: Database.Totals(day), mode: "reload"});
  };

  time.querySelector("button[data-fn='prev']").onclick = function() {Time.Prev(reload);};
  time.querySelector("button[data-fn='now']").onclick =  function() {Time.Now(reload);};
  time.querySelector("button[data-fn='next']").onclick = function() {Time.Next(reload);};


  /* Binds */
  var menu = document.querySelector("nav[data-scope='nav']");
  menu.querySelector("button[href='#menu']").onclick = function(e) {View('menu');};
})();
