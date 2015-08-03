console.log("js/settings [✓]");

(function() {

  /* Harris Benedict Equation (1984 Imperial) */
  // BMR Male:    66 + (6.23 X weight in pounds) + (12.7 X height in inches) – (6.8 X age)
  // BMR Female: 655 + (4.35 X weight in pounds) + (4.7 X height in inches) – (4.7 X age)

  var scope = document.querySelector("div[data-scope='settings']");

  var self = {};
  top.Settings = {};

  self.preload = function(data) {};

  self.sanitize = function(data) {
    /* TODO */
    return data;
  };

  self.calculate = function(data) {
    var bmr = 0.0;

    if (data.gender === 'male')
      bmr += 66  + (6.23 * data.weight) + (12.7 * (data.ft * 12 + data.in)) - (6.8 * data.age);
    else
      bmr += 655 + (4.23 * data.weight) + (4.7 * (data.ft * 12  + data.in)) - (4.7 * data.age);

    var template = scope.querySelector("template[data-template='calculated']");
    var node = scope.querySelector('calculated');
    node.innerHTML = tim(template.innerHTML, {bmr: bmr, maintain: bmr * data.activity, loss: (bmr * data.activity) - 500});
    scope.querySelector("bmr").innerHTML = tim(scope.querySelector("template[data-template='bmr']").innerHTML, {bmr: bmr});
  };


  // @data = {'settings': json}
  Settings.Global = function(data) { 
    if (data !== null) self.preload(data);
  };

  /* Binds */
  scope.querySelector("button[data-fn='apply']").onclick = function(e) {
    //var obj = self.sanitize(Util.InputParse(scope.querySelector("fieldset[data-scope='user_info']")));
    var obj = Util.InputParse(scope.querySelector("fieldset[data-scope='user_info']"));
    self.calculate(obj);

    if (obj !== null) {
      /* peachy keen */
    }

  };
  scope.querySelector("button[data-fn='cancel']").onclick = function(e) {window.history.back();};

})();
