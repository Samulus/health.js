console.log("js/settings [✓]");

/* TODO: Sanitize Input / Output */
(function() {

  var scope = document.querySelector("div[data-scope='settings']");
  var field = document.querySelector("fieldset[data-scope='user']");
  var stats = document.querySelector("template[data-template='stats']");    

  var self = {};
  top.Settings = {};

  /* Private */
  self.calculate = function(data) {
    var bmr = 0.0;

    if (data.gender === 'male') // harris benedict equation
      bmr += 66  + (6.23 * data.weight) + (12.7 * (data.ft * 12 + data.in)) - (6.8 * data.age);
    else
      bmr += 655 + (4.23 * data.weight) + (4.7 * (data.ft * 12  + data.in)) - (4.7 * data.age);

    var template = scope.querySelector("template[data-template='calculated']");
    var node = scope.querySelector('calculated');
    node.innerHTML = tim(template.innerHTML, {bmr: bmr, maintain: bmr * data.activity, loss: (bmr * data.activity) - 500});
  };

  /* Global */
  Settings.Global = function(data) { 
    if (data !== null)
      Input.Insert(data, field);
  };

  /* Binds */
  scope.querySelector("button[data-fn='apply']").onclick = function(e) {
    var obj = Input.Parse(scope.querySelector("fieldset[data-scope='user_info']"));
    self.calculate(obj);
  };

  scope.querySelector("button[data-fn='cancel']").onclick = function(e) {
    Input.Clear(scope.querySelector("fieldset[data-scope='user_info']"));
    View('menu');
  };

})();
