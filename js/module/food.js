console.log("js/food.js [✓]");
(function() {

  /* Templates / HTML Scoping */
  var scope = document.querySelector("div[data-scope='food']");
  var inject = scope.querySelector("inject");
  var entry_tmpl = scope.querySelector("template[data-template='entry']");
  var total_tmpl = scope.querySelector("template[data-template='total']");

  /* Private */
  var self = {

    loaded: {},

    /* View */
    total: function(totals) {
      var insert = scope.querySelector("total");
      if (Object.keys(totals).length === 0) {
        insert.innerHTML = tim(total_tmpl.innerHTML, {"calories": 0, "protein": 0});
      } else{
        insert.innerHTML = tim(total_tmpl.innerHTML, totals);
      }
    },

    add: function(db, totals) {
      for (var key in db) {
        if (!(key in self.loaded)) {
          inject.insertAdjacentHTML("beforeend", "<div data-stamp="+key+"></div>");
          var node = inject.querySelector("div[data-stamp='"+key+"']");
          node.insertAdjacentHTML("beforeend", tim(entry_tmpl.innerHTML, db[key]));
          self.bind(node, key);
          self.loaded[key] = true;
        }
      }
      self.total(totals);
    },

    modify: function(db, stamp, totals) {
      var node = inject.querySelector("div[data-stamp='"+stamp+"']");
      node.innerHTML = tim(entry_tmpl.innerHTML, db[stamp]);
      self.bind(node, stamp);
      self.total(totals);
    },

    reload: function(db, totals) {
      self.loaded = {};
      inject.innerHTML = '';
      self.add(db, totals);
    },
    
    /* Binds */
    bind: function(node, stamp) {
      var remove = node.querySelector("button[data-fn='remove']");
      var modify = node.querySelector("button[data-fn='modify']");
      remove.setAttribute('data-stamp', stamp);
      modify.setAttribute('data-stamp', stamp);

      remove.onclick = function(e) {
        var stamp = e.currentTarget.getAttribute('data-stamp');
        var node = inject.querySelector("div[data-stamp='"+stamp+"']");
        self.unbind(node, stamp);
        node.parentElement.removeChild(node);
        Database.Remove(Time.Day(), stamp);
        self.total(Database.Totals(Time.Day()));
      };

      modify.onclick = function(e) {
        var stamp = e.currentTarget.getAttribute('data-stamp');
        var data = {};
        data.entry = Database.Entry(Time.Day(), stamp);
        data.stamp = stamp;
        View('edit', data);
        var totals = Database.Totals(Time.Day());
        self.total(totals);
      };

    },

    unbind: function(node, stamp) {
      var removeNode = node.querySelector("button[data-fn='remove']");
      var modifyNode = node.querySelector("button[data-fn='modify']");
      delete removeNode.onclick; /* no leaks !*/
      delete modifyNode.onclick;
    },

  };

  /* Public */
  top.Food = { 
    Global: function(data) {
      switch (data.mode) {
        case "add": self.add(data.db, data.totals); break;
        case "modify": self.modify(data.db, data.stamp, data.totals); break;
        case "reload": self.reload(data.db, data.totals); break;
      }
    }
  };

})();
