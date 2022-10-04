const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const mongoFile = require("/home/adharsh/projects/login page/login/mongo.js")
const auth = require("/home/adharsh/projects/login page/login/auth.js")

let app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.get("/",function(req, res){
    res.render(path.join(__dirname,"/templates/login.hbs"))
});

app.post("/",function(req, res){
    if(auth.checkPass(req.body.email, req.body.password)){
        console.log("user authorized");
        res.render(path.join(__dirname,"/templates/af.hbs"))
    }else{
        console.log("user not authorized");
    }
    
})
app.get("/register", function(req, res){
    res.render(path.join(__dirname,"/templates/register.hbs"))
})

app.post("/register", function(req, res){
    mongoFile.registerUserInDb(req.body)
    res.render(path.join(__dirname,"/templates/af.hbs"))
    
})

app.listen(7000)

console.log("server started");