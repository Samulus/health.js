console.log("js/time.js [✓]");

(function() {
  
  var scope = document.querySelector("div[data-scope='time']");
  var date = scope.querySelector("span[data-scope='date']");

  var self = {};
  self.day = new Date();
  self.stamp = self.day.setHours(0,0,0,0) / 1000;

  top.Time = {
    Day: function() {return self.stamp;}, //  
    Stamp: function() {return new Date().getTime() / 1000;},

    Prev: function(callback) {
      self.stamp = self.day.setHours(-24,0,0,0) / 1000;
      date.innerHTML = self.day.mdy();
      callback(self.stamp);
    },

    Now: function(callback) {
      self.day = new Date();
      self.stamp = self.day.setHours(0,0,0,0) / 1000;
      date.innerHTML = self.day.mdy();
      callback(self.stamp);
    },

    Next: function(callback) {
      self.stamp = self.day.setHours(24,0,0,0) / 1000;
      date.innerHTML = self.day.mdy();
      callback(self.stamp);
    },
  };

})();
