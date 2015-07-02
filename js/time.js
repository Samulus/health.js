console.log("js/time.js [✓]");

(function() {
  
  var scope = document.querySelector("div[data-scope='time']");
  var date = scope.querySelector("span[data-scope='date']");

  var self = {};
  self.day = new Date();
  self.stamp = self.day.setHours(0,0,0,0) / 1000;

  self.prev= function(e) {
    self.stamp = self.day.setHours(-24,0,0,0) / 1000;
    date.innerHTML = self.day.toLocaleDateString();
    Time.Callback(self.stamp);
  };

  self.now= function(e) {
    self.day = new Date();
    self.stamp = self.day.setHours(0,0,0,0) / 1000;
    date.innerHTML = self.day.toLocaleDateString();
    Time.Callback(self.stamp);
  };

  self.next= function(e) {
    self.stamp = self.day.setHours(24,0,0,0) / 1000;
    date.innerHTML = self.day.toLocaleDateString();
    Time.Callback(self.stamp);
  };

  top.Time = {
    Day: function() {return self.stamp;}, //  
    Stamp: function() {return new Date().getTime() / 1000;}
  };

  /* Bind */
  scope.querySelector("button[data-fn='prev']").onclick = self.prev;
  scope.querySelector("button[data-fn='now']").onclick = self.now;
  scope.querySelector("button[data-fn='next']").onclick = self.next;

})();
