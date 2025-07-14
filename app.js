const express = require("express")

const app = express()


app.get("/hello",(request,response)=>{
    
    response.send("Hello world!")
})

// SAST ANALYSIS
// Adding SQL injection
app.get("/login",(req,res)=>{
    const {username,password} = req.query;
    const fake_query = `SELECT * FROM USERS WHERE username=${username} AND PASSWORD=${password}`
     // ANOTHER SQL INJECTION PRONE CODE
    // eval(string) is used to run string as a javascript code
    eval(username)
    if( (username ==='admin' && password === "admin123") || password === " 'OR '1'=1" )
        {
            res.send("Login Successfull!(Simulated SQL injection bypass) ")
        }
    else{
        res.send("Invalid credentials")
    }
    
    console.log("Executed query "+ fake_query)
   
})

app.listen(3000,()=>{console.log("App is running on port 3000}")})