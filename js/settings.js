console.log("js/settings [✓]");

(function() {

  var scope = document.querySelector("div[data-scope='settings']");

  /* Binds */
  scope.querySelector("button[data-fn='connect']").onclick = function(e) {
    var input = scope.querySelector("input[data-type='rs']").value;
    Database.Connect(input); /* TODO */
    
  };

  scope.querySelector("button[data-fn='disconnect']").onclick = function(e) {
    /* lol */
  };

})();
