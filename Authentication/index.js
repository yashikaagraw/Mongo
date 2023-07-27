const express = require("express");
const { connection } = require("./db");
const {UserModel} = require("./models/User.model")
const jwt = require("jsonwebtoken")
//var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//foo n bar are payload and shhh is secret key
//var decoded = jwt.verify(token, 'shhhhh');
const app = express();

app.use(express.json())

app.get("/", (req, res)=> {
    res.send("base api route")
})
 
app.post("/signup", async (req, res)=> {
    const {email, password} = req.body;
    const new_user = new UserModel({
        email,
        password
    })
    await new_user.save()
    res.send({ msg :"signup successfull" })
})

app.post("/login", async(req,res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email, password})
    if(!user){
        res.send({"message" : "login failed, invalid credentials"})

    }
    else {
        const token = jwt.sign({}, 'masai');
        //res.send({"message" : "login successfull", "token" : user_id})
       res.send({"message" : "login successfull", "token" : token})
}})


app.get("/reports", (req,res) => {
    //we will check if the request is having a token
 const {token} = req.query
 if(!token){
    res.send("please login first")
 }
 else{
    // to check token is correct or not, use Math,random
    //if(token == Math.random()){
    //how are we going to identify that it is user itself
    // JWT - JSONWEBTOKEN jwt.io 
    // 1. algo - default
    //2.payload- we can give whatever we want to, we can use this strategically
    //3. secret Key- 
    
    //if(token == UserModel.find(_id)){
        var decoded = jwt.verify(token, 'masai');
        console.log(decoded)
        if(token == "xyz"){
        res.send("secret reports")
} else {
    res.send("please login again")
}
      
 }
})





app.listen(8000, async() => {
    try {
        await connection
        console.log("connection to DB successfully")
    } catch (err) {
        console.log("Error while connecting to DB")
        console.log(err)
    }
    console.log("listening on port 8000")
})