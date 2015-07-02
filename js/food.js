console.log("js/food.js [✓]");
(function() {

  /* Templates / HTML Scoping */
  var scope  = document.querySelector("div[data-scope='food']");
  var inject = scope.querySelector("inject");
  var entry_tmpl = scope.querySelector("template[data-template='entry']");
  var total_tmpl = scope.querySelector("template[data-template='total']");

  /* Private */
  var self = {
    loaded: {},

    /* Updates Totals */ 
    total: function(totals) {
      var insert = scope.querySelector("total");
      if (Object.keys(totals).length === 0) {
        insert.innerHTML = tim(total_tmpl.innerHTML, {"calories": 0, "protein": 0});
      } else{
        insert.innerHTML = tim(total_tmpl.innerHTML, totals);
      }
    },

    rebind: function(node, stamp) {
      var removeNode = node.querySelector("button[data-fn='remove']");
      var modifyNode = node.querySelector("button[data-fn='modify']");
      removeNode.setAttribute('data-stamp', stamp);
      modifyNode.setAttribute('data-stamp', stamp);
      removeNode.onclick = self.remove;
      modifyNode.onclick = self.modify;
    },

    unbind: function(node, stamp) {
      var removeNode = node.querySelector("button[data-fn='remove']");
      var modifyNode = node.querySelector("button[data-fn='modify']");
      delete removeNode.onclick; /* no leaks !*/
      delete modifyNode.onclick;
    },

    remove: function(e) {
      var stamp = e.currentTarget.getAttribute('data-stamp');
      var node = inject.querySelector("div[data-stamp='"+stamp+"']");
      self.unbind(node, stamp);
      node.parentElement.removeChild(node);
      var totals = Food.Callback("remove", stamp);
      self.total(totals);
    },

    modify: function(e) {
      var stamp = e.currentTarget.getAttribute('data-stamp');
      var totals = Food.Callback("modify", stamp);
      self.total(totals);
    }
  };

  /* Public */
  top.Food = { 

    Add: function(db, totals) {
      for (var key in db) {
        if (!(key in self.loaded)) {
          inject.insertAdjacentHTML("beforeend", "<div data-stamp="+key+"></div>");
          var node = inject.querySelector("div[data-stamp='"+key+"']");
          node.insertAdjacentHTML("beforeend", tim(entry_tmpl.innerHTML, db[key]));
          self.rebind(node, key);
          self.loaded[key] = true;
        }
      }
      self.total(totals);
    },

    Modify: function(db, stamp, totals) {
      var node = inject.querySelector("div[data-stamp='"+stamp+"']");
      node.innerHTML = tim(entry_tmpl.innerHTML, db[stamp]);
      self.rebind(node, stamp);
      self.total(totals);
    },

    Switch: function(db, totals) {
      self.loaded = {};
      inject.innerHTML = ''; // TODO: this doesn't call the remove method for each bound button
      Food.Add(db, totals);
    },

  };

})();
