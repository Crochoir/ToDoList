const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");




var inputs = ["Buy Food", "Cook Food", "Eat food"];
var workInputs = [];

app.set("view engine", "ejs");

app.listen(3000, function(req, res) {
  console.log("server running on port 3000");
}); 

app.get("/", function(req, res) {

  let day = date.getDate();

  res.render("lists", {
    listTitle: day,
    newItems: inputs
  });
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post("/", function(req, res) {
  let input = req.body.newItem;
  if (req.body.list === "Work") {
    workInputs.push(input);
    res.redirect("/work");
  } else {
    inputs.push(input);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("lists", {
    listTitle: "Work List",
    newItems: workInputs
  });
});
app.post("/work", function(req, res) {
  let input = req.body.newItem;
  workInputs.push(input);
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about");

});
