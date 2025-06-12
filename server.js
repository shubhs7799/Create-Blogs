const express = require("express");
const app = express();
const PORT = 3000;

app.get('/get',(req,res) =>{
    res.send("GET")
})

app.listen(PORT,()=>{
    console.log("Sever is running on " + PORT)
})