console.log("js/time.js [✓]");

/* TODO: only call Time.Event when the time actually changes
* : ignore multiple home button presses */

(function() {
  
  var scope = document.querySelector("div[data-scope='time']");
  var date = scope.querySelector("span[data-scope='date']");

  var self = {};
  self.day = new Date();
  self.stamp = self.day.setHours(0,0,0,0) / 1000;

  top.Time = {
    Day: function() {return self.stamp;}, //  
    Stamp: function() {return new Date().getTime() / 1000;},

    Prev: function(e) {
      self.stprevamp = self.day.setHours(-24,0,0,0) / 1000;
      date.innerHTML = self.day.mdy();
      Time.Event(self.stamp);
    },

    Now: function(e) {
      self.day = new Date();
      self.stamp = self.day.setHours(0,0,0,0) / 1000;
      date.innerHTML = self.day.mdy();
      Time.Event(self.stamp);
    },

    Next: function(e) {
      self.stamp = self.day.setHours(24,0,0,0) / 1000;
      date.innerHTML = self.day.mdy();
      Time.Event(self.stamp);
    },
  };



})();
