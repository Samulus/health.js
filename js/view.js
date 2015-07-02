(function() {

  top.View = function(name) {
    window.location = '#' + name;

    /* TODO; check if trying to reload same page */

    /* bail if requested view doesn't exist */
    var requested = document.querySelector("div[data-scope='"+name+"']");
    if (requested === null) return;

    /* set previous invisible */
    var node = document.querySelector("div[style='display: visible']");
    if (node !== null)
      node.setAttribute('style', "display: none");

    requested.setAttribute('style', "display: visible");
  };

})();
