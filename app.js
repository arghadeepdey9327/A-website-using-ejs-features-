//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const { toUpper, replace, toLower } = require("lodash");
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true,useUnifiedTopology:true});
 const  ho= "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
 const  ab= "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."; 
const  con= "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var ar=[];
const toSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  details:String
});
const Data=mongoose.model("data",toSchema);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  // res.render("home",{homeStartingContent:ho, po:ar});
  Data.find({},function(err,doc){
    if(err){
      console.log(err);
    }
    else{
       res.render("home",{pop:ho,po:doc});
    }
  });
});
app.get("/about",function(req,res){
  res.render("about",{aboutContent:ab});
});
app.get("/contact",function(req,res){
  res.render("contact",{contactContent:con});
});
app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){
//  var no={
//    te:req.body.text,
//    bi:req.body.bigtext}; 
  
//   ar.push(no);
//   res.redirect("/");
  const data=new Data({
    name:req.body.text,
    details:req.body.bigtext
  });
  Data.insertMany(data,function(err,doc){
    if(err){
      console.log(err);
    }
  else{
       res.redirect("/");
  }
  });
});
app.get("/posts/:pos",function(req,res){
    var na=req.params.pos;
    // var ka,ko;
    // ar.forEach(function(lol){
    //    ka=lol.te;
    //    ko=na.replace("-"," ");
    //   if(toLower(na)  && (toLower(ko) || na) === toLower(ka) ){
    //     res.render("text",{ob:ka,bo:lol.bi});

        
    //   }
    //   else {
    //     console.log("not");
    //   }
    // })
    // res.render("te",{ob:"Sorry, I couldn't found"+na})
    Data.findOne({_id:na},function(err,doc){
      if(!doc){
        res.render("te",{ob:"Sorry, I couldn't found"+na})
      }
      else{
        res.render("text",{ob:doc.name,bo:doc.details});
      }
    });
       
    
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
