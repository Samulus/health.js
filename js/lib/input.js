console.log("[✓] js/lib/input.js");

(function() {

  top.Input = {};

  Input.Insert = function(node, data) {

    var type = null;

    for (var i=0; i < node.children.length; ++i) {

      var mode = node.children[i].tagName;

      if (mode === 'INPUT') {
        type = node.children[i].getAttribute('data-type');
        if (type in data) {
          node.children[i].value = data[type];
        }
      }

      else if (mode == 'SELECT') {
        type = node.children[i].getAttribute('data-select');
        if (type in data) {
          document.querySelector("option[data-value='"+type+"']").selected = true;
        }
      }

    }

  };

  Input.Parse = function(node) {
    var obj = {};

    for (var i=0; i < node.children.length; ++i) {

      var type = null;

      if (node.children[i].tagName === "INPUT") {
        type = node.children[i].getAttribute('data-type');
        obj[type] = (!isNaN(node.children[i].value)) ? parseFloat(node.children[i].value) : node.children[i].value;
      } 

      else if (node.children[i].tagName === "SELECT") {
        type = node.children[i].getAttribute('data-select');
        var value = node.children[i].selectedOptions[0].getAttribute('data-value');
        obj[type] = (!isNaN(value)) ? parseFloat(value) : value; 
      }
    }

    return obj;
  };

  Input.Clear = function(node) {
    for (var i=0; i < node.children.length; ++i) {
      if (node.children[i].tagName === "INPUT") node.children[i].value = '';
    }
  };

})();
