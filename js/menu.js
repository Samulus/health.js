console.log("js/menu.js [✓]");
(function() {

  var scope = document.querySelector("div[data-scope='menu']");

  /* Menu */
  scope.querySelector("button[href='#food']").onclick = function() {View('food');};

  /* Misc */
  document.querySelector("div[data-scope='time']").querySelector("button[data-fn='add']").onclick = function(e) {View('add');};

})();
