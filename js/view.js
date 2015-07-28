(function() {

  var self = {};
  self.prev = null;
  self.blacklist = ['debug', 'nav'];

  top.View = function(name, data) {
    window.location = '#' + name;

    /* 404 */
    var requested = document.querySelector("div[data-scope='"+name+"']");
    if (requested === null || name in self.blacklist) return;

    /* Preload */
    if (typeof data !== "undefined") {
      switch (name) {
        case 'edit': Edit.Global(data); break;
        case 'food': Food.Global(data); break;
        case 'settings': Settings.Global(data); break;
      }
    }

    /* Hide Previous */
    var node = document.querySelector("div[style='display: visible']");
    if (node !== null)
      node.setAttribute('style', 'display: none');
    requested.setAttribute('style', 'display: visible');
  };

})();
