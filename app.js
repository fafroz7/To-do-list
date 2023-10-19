
// #requring packages express, bodyParser

const express = require("express");
const bodyParser = require("body-parser");

const app = express();// #creating app using express
let items = [];
let workItems = [];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//tell our app which is generated using express to use EJS as view engine
app.set('view engine', 'ejs');


 //create get route that just sends the browser the word hello when a user tries to access the home route
//when we render our homepage, first load this route app.get, passing kindofday, newlistitem
app.get("/", function(req, res){

  let today = new Date();
  // var currentDay = today.getDay()
  let options = {
    weekday: "long",
    day: "numeric",
    month:"long"
  };
  //var day = today.toLocaleDateString("bn-BD", options);
  let day = today.toLocaleDateString("en-US", options);
  //creating response
  res.render("list", {listTitle:day, newlistItems: items});
});

app.post("/", function(req, res){
  let item = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

});



app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newlistItems: workItems });
});
app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});



app.get("/about", function(req, res){
  res.render("about");
})

app.listen(process.env.PORT ||3000, function(){
  console.log("Server is running on port 3000");
});
