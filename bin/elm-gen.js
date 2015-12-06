#!/usr/bin/env node
var fs = require("fs");
var components = JSON.parse(fs.readFileSync("components.json", "utf8"));

var capitalize = function(str) { return str.charAt(0).toUpperCase() + str.substr(1); }

Object.prototype.map = function(f) {
  var r = [];
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      r.push(f([key, this[key]]));
    }
  }

  return r;
}

var x = components.map(function(c) { return "import " + c[1]; });

console.log("module Components where");
console.log("");
console.log(x.join("\n"));
console.log("");
console.log("import Effects as Fx exposing (Effects, Never)");
console.log("");
console.log("mailbox : Signal.Mailbox Action");
console.log("mailbox = Signal.mailbox NoOpAction");
console.log();
console.log("addressFor = Signal.forwardTo mailbox.address");
console.log();
console.log("signal = mailbox.signal");

var x = components.map(function(c) { return c[0] + " : " + c[1] + ".Model"; });

console.log();
console.log("type alias Model = { " + x.join(", ") + " }");

var x = components.map(function(c) { return "Component" + capitalize(c[0]) + "Action " + c[1] + ".Action"; });

console.log();
console.log("type Action = NoOpAction | " + x.join(" | "));

console.log();
console.log("init : (Model, Effects Action)");

var x = components.map(function(c) { return "(" + c[0] + "Model, " + c[0] + "Fx) = " + c[1] + ".init"; });

console.log("init = let " + x.join("\n           ") + " in");

var x = components.map(function(c) { return c[0] + " = " + c[0] + "Model"; });

console.log("  (");
console.log("    { " + x.join("\n    , "));
console.log("    }");
console.log("  , Fx.batch");

var x = components.map(function(c) { return "Fx.map Component" + capitalize(c[0]) + "Action " + c[0] + "Fx"; });
console.log("      [ " + x.join("\n      , "));
console.log("      ]");
console.log("  )");

console.log("");
console.log("update : Action -> Model -> (Model, Effects Action)");
console.log("update action model = case action of");

var x = components.map(function(c)
 { return "  Component" + capitalize(c[0]) + "Action action -> let (m, fx) = " + c[1] + ".update action model." + c[0]
     + " in ({model | " + c[0] + " = m}, Fx.map Component" + capitalize(c[0]) + "Action fx)"
 });
console.log(x.join("\n"));
console.log("  NoOpAction -> (model, Fx.none)");
