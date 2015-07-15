(function() {

  var self = {};
  self.prev = null;

  top.View = function(name, data) {
    window.location = '#' + name;

    /* Avoid Unnecessary Reloads -- fix */
    //if (self.prev !== null && window.location === self.prev)
      //return;

    /* 404 */
    var requested = document.querySelector("div[data-scope='"+name+"']");
    if (requested === null) return;

    /* Preload */
    if (typeof data !== "undefined") {
      switch (name) {
        case 'edit': Edit.Global(data); break;
        case 'food': Food.Global(data); break;
      }
    }

    /* Hide Previous */
    var node = document.querySelector("div[style='display: visible']");
    if (node !== null)
      node.setAttribute('style', 'display: none');

    requested.setAttribute('style', 'display: visible');
    //self.prev = window.location;
  };

})();
