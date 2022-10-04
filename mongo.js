const mongoose = require("mongoose")

let Schema = mongoose.Schema;
let schema = new Schema({
    "firstName" : String,
    'lastName' : String,
    "email" : String,
    "password" : String,
})

let user;

function initialize(){
    let db = mongoose.createConnection("mongodb+srv://adharsh:148118198@cluster0.cnkuq0n.mongodb.net/test")
    return new Promise((resolve, reject) => {
        db.on("error",()=>{
            console.log("err");
            reject()
        })

        db.once("open",()=>{
            user = db.model("users",schema)
            resolve()
        })
    })
}

function registerUserInDb(userData){
    console.log("a ",userData);
    initialize().then(()=>{
        let user1 = new user(userData)
        console.log("b",user1);
        user1.save((err)=>{
            if(err){
                console.log("user already exist")
            }else if(err){
                console.log("error in creating user");
            }
        })
    })
}

function loginUserInDb(Email, pass) {
    return new Promise((resolve, reject) => {
        initialize().then(()=>{
            user.find({email:Email}).exec().then((data)=>{
                console.log(data);
                if(data[0].password==pass){
                    resolve(true)
                }
            })
            .catch((err)=>{
                reject("error l",err)
            })
            return false
        })
    })
}

module.exports={registerUserInDb, loginUserInDb}