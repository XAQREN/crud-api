const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config({path: __dirname + '/.env'})
const port = process.env.PORT || 5000;
const postRouter = require("./routes/rout.js");
var cors = require("cors");


app.get("/",(req,res)=>{
    res.send("hello there");
});
app.use(cors());
app.use(express.json());
app.use("/post",postRouter);

mongoose
.connect(process.env.MONGO_DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err));







//SERVER CONNECTION
app.listen(port, ()=>console.log(`app is running succesfully in the port ${port}`));
