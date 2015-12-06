var components = ["datepicker", "button"];

var capitalize = function(str) { return str.charAt(0).toUpperCase() + str.substr(1); }

console.log("module Components where");
console.log("");
console.log("import Effects as Fx exposing (Effects, Never)");
console.log("");
console.log("componentsMailbox : Signal.Mailbox ComponentActions");
console.log("componentsMailbox = Signal.mailbox NoOpAction");
console.log();
console.log("componentAddressFor = Signal.forwardTo componentsMailbox.address");

var x = components.map(function(c) { return c + ": " + capitalize(c) + "Model"; });

console.log();
console.log("type alias Components = { " + x.join(", ") + " }");

var x = components.map(function(c) { return "Component" + capitalize(c) + "Action"; });

console.log();
console.log("type ComponentActions = NoOpAction | " + x.join(" | "));

console.log();
console.log("initComponents : (Components, Effects ComponentActions)");

var x = components.map(function(c) { return "(" + c + "Model, " + c + "Fx) = " + c + "Init"; });

console.log("initComponents = let " + x.join("\n                     ") + " in");

var x = components.map(function(c) { return c + " = " + c + "Model"; });

console.log("  (");
console.log("    { " + x.join("\n    , "));
console.log("    }");
console.log("  , Fx.batch");

var x = components.map(function(c) { return "Fx.map Component" + capitalize(c) + "Action " + c + "Fx"; });
console.log("      [ " + x.join("\n      , "));
console.log("      ]");
console.log("  )");
