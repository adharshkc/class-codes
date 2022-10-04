const fs = require("fs")
const mongo = require("/home/adharsh/projects/login page/login/mongo.js")


function checkPass(email, password){
    let authIs = mongo.loginUserInDb(email, password)
    if(authIs){
        login = true
        return true
    }
    return false
}

function registerUser(data){
    mongo.registerUserInDb(data)
}

module.exports = {checkPass}