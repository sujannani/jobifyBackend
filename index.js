const express=require("express");
const mongoose=require("mongoose");
const recruiteeRoute=require("./controllers/recruiteeRoute");
const recruiterRoute=require("./controllers/recruiterRoute");
const cors = require('cors');
const app=express();
mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://sujan:jobify123@cluster0.gvfxv1v.mongodb.net/jobify")

app.use(cors());
var db=mongoose.connection;
db.on("open",()=>console.log("connected to db"))
db.on("error",()=>console.log("error occured"))

// app.use("/",recruiteeRoute);
app.use(express.json());
app.use('/recruiteeRoute',recruiteeRoute);
app.use('/recruiterRoute',recruiterRoute);

app.listen(4000,()=>{
    console.log("server started at 4000")
})