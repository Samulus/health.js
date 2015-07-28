console.log("js/database.js [✓]");

(function() {
  
  var db = {};
  top.Database = {

    // @settings: {'weight': 180, 'name': 'sam', 'gender': 'male'}
    // @mode: "write" || "read"
    Settings: function(mode, settings) {
      if (mode === 'write' && typeof settings !== 'undefined')
        localStorage.setItem('settings', JSON.stringify(settings));
      if (mode === 'read') {
        settings = localStorage.getItem('settings');
        return (settings !== null) ? JSON.parse(settings) : null;
      }
    },

    // @day: '811296000' -- unixtimestamp @ midnight
    Read: function(day) {
      var item = localStorage.getItem(day);
      if (item === null) return null;
      db[day] = JSON.parse(item);
      return db[day];
    },

    Write: function(day) {
      localStorage.setItem(day, JSON.stringify(db[day]));
    },

    Add: function(entry, day, stamp) {
      if (typeof db[day] === 'undefined')
        db[day] = {};
      db[day][stamp] = entry;

      Database.Write(day);
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
      Database.Write(day);
      return db[day];

    },

    Remove: function(day, stamp) {
      if (stamp in db[day]) {
        delete db[day][stamp]; 
      }
      Database.Write(day);
    },

    Entry: function(day, stamp) {
      Database.Read(day); 
      if (stamp in db[day]) 
        return db[day][stamp];
    },

    Day: function(day) {
      Database.Read(day);
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
