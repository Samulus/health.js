console.log("js/database.js [✓]");
(function() {

  /* Private */
  var db = {};

  /* Public */
  top.Database = {

    Read: function(day_stamp) {
      var item = localStorage.getItem(day_stamp);
      if (item === null) return item;
      db[day_stamp] = JSON.parse(item);
      return db[day_stamp];
    },

    Write: function(day_stamp, day) {
      localStorage.setItem(day_stamp, JSON.stringify(db[day]));
    },

    Add: function(entry, day, stamp) {
      if (typeof db[day] === 'undefined')
        db[day] = {};
      db[day][stamp] = entry;

      Database.Write(day, db[day]);
      return db[day];
    },

    Modify: function(entry, day, stamp) {

      if (typeof db[day] === 'undefined') {
        /* error -- you can't modify an entry for a day that doesn't exist */
      }

      if (typeof db[day][stamp] === 'undefined') {
        /* error —   you can't modify an entry that doesn't exist */
      }

      db[day][stamp] = entry;
      return db[day];

    },

    Remove: function(day, stamp) {
      if (stamp in db[day]) {
        delete db[day][stamp]; 
      }
    },

    Entry: function(day, stamp) {
      if (stamp in db[day]) 
        return db[day][stamp];
    },

    Day: function(day) {
      if (day in db) 
        return db[day];
    },

    Totals: function(day) {
      var out = {};
      for (var entry in db[day]) {
        for (var stat in db[day][entry]) {
          if (stat !== 'name') {  /* TODO: support all numerical types of data */
            if (typeof out[stat] === 'undefined') out[stat] = 0.0;
            out[stat] += parseFloat(db[day][entry][stat]);
          }
        }
      }

      return out;
    }


  };

})();
