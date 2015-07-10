console.log("js/time.js [✓]");

/* TODO: only call Time.Event when the time actually changes
* : ignore multiple home button presses */

(function() {
  
  var scope = document.querySelector("div[data-scope='time']");
  var date = scope.querySelector("span[data-scope='date']");

  var self = {};
  self.day = new Date();
  self.stamp = self.day.setHours(0,0,0,0) / 1000;

  self.prev= function(e) {
    self.stamp = self.day.setHours(-24,0,0,0) / 1000;
    date.innerHTML = self.day.toLocaleDateString();
    Time.Event(self.stamp);
  };

  self.now= function(e) {
    self.day = new Date();
    self.stamp = self.day.setHours(0,0,0,0) / 1000;
    date.innerHTML = self.day.toLocaleDateString();
    Time.Event(self.stamp);
  };

  self.next= function(e) {
    self.stamp = self.day.setHours(24,0,0,0) / 1000;
    date.innerHTML = self.day.toLocaleDateString();
    Time.Event(self.stamp);
  };

  top.Time = {
    Day: function() {return self.stamp;}, //  
    Stamp: function() {return new Date().getTime() / 1000;}
  };

  /* Binds */
  var time = document.querySelector("div[data-scope='time']");
  time.querySelector("button[data-fn='edit']").onclick = function(e) {View('edit');};
  time.querySelector("button[data-fn='prev']").onclick = self.prev;
  time.querySelector("button[data-fn='now']").onclick = self.now;
  time.querySelector("button[data-fn='next']").onclick = self.next;


})();
