console.log("js/database.js [✓]");

/*
(function() {
  RemoteStorage.defineModule('health', function(priv, pub) {

    var local_db = null;

    top.DEBUG = {
      priv: priv, pub: pub
    };

    priv.declareType('health', {
      'properties': {
        'db': 'object'
      }
    });

    priv.cache('');

    priv.on('change', function(e) {
      if (e.relativePath === 'db') {
        local_db = e.newValue;
      }
    });

    return {
      exports: {
        write: function(db) {
          return priv.storeObject('health', 'db', {db: db});
        },
        read: function() {
        if (local_db !== null)
          return local_db;
        return null;
        },
        getDay: function(day) {
          if (local_db !== null)
            return local_db[day];
          return null;
        }
      }
    };

  });

  remoteStorage.access.claim('health', 'rw');
})();
*/

/* Local DB */
(function() {



  /* Private */
  var db = {};
  top.DEBUG = db;

  /* Public */
  top.Database = {

    Connect: function(email) {
      /*  TODO: bridge to RemoteStorage */
    },

    Read: function(day) {
      //var item = remoteStorage.health.getDay(day);
      var item = localStorage.getItem(day);
      if (item === null) return null;
      db[day] = JSON.parse(item);
      return db[day];
    },

    Write: function(day) {
      localStorage.setItem(day, JSON.stringify(db[day]));
      //remoteStorage.health.write(db);
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
