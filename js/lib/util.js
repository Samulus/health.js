(function() {

  top.Util = {};

  Util.InputParse = function(node) {
    var obj = {};

    for (var i=0; i < node.children.length; ++i) {

      var type = null;

      if (node.children[i].tagName === "INPUT") {
        type = node.children[i].getAttribute('data-type');
        obj[type] = (!isNaN(node.children[i].value)) ? parseFloat(node.children[i].value) : node.children[i].value;
      } 

      else if (node.children[i].tagName === "SELECT") {
        type = node.children[i].getAttribute('data-select');
        var value = node.children[i].selectedOptions[0].getAttribute('data-type');
        obj[type] = (!isNaN(value)) ? parseFloat(value) : value; 
      }
    }

    return obj;
  };

})();
