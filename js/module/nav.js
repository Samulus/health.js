console.log("js/nav.js [✓]");
(function() {

  /* Binds */
  var time = document.querySelector("div[data-scope='time']");
  time.querySelector("button[data-fn='edit']").onclick = function(e) {View('edit');};
  time.querySelector("button[data-fn='prev']").onclick = function() {
    Time.Now(function(stamp) {Food.Food})
  }
  time.querySelector("button[data-fn='now']").onclick = Time.Now;
  time.querySelector("button[data-fn='next']").onclick = Time.Next;

  /* Binds */
  var menu = document.querySelector("nav[data-scope='nav']");
  menu.querySelector("button[href='#menu']").onclick = function(e) {View('menu');};
})();
