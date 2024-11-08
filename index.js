const express=require('express')
const db = require("./src/db/");

const app=express()

app.use(express.json());
// app.use("/", express.static(__dirname + "/public"));

const PORT=7777
app.listen(PORT,()=>{
    console.log('Expressサーバー起動中：',PORT)
})