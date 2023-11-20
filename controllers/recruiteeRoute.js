const express=require("express");
const recruiteeSchema=require("../model/recruiteeSchema.js");
const recruiteeRoute=express.Router();
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const recruiterSchema = require("../model/recruiterSchema.js");


recruiteeRoute.post('/signup', async (req, res) => {
    const {username,password,email,phone,qualification,institutionName,fieldName,graduationYear,workStatus,skills,resume,linkedinProfile} = req.body;
    try {
      const recruitee = await recruiteeSchema.findOne({$or: [{ username }, { email }],});
      if (recruitee) {
        return res.status(400).json({ message: "Exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      recruiteeSchema.create({username,password: hashedPassword,email,phone,qualification,institutionName,fieldName,graduationYear,workStatus,skills,resume,linkedinProfile},(err,data)=>{
        if(err){
            console.log(err);
            return err;
        }
        else{
            console.log("SignUp successful");
            res.json({ message: 'SignUp successful',recruitee:data });
        }
    })
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error'});
    }
  });

recruiteeRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const recruitee = await recruiteeSchema.findOne({ username});
      if (!recruitee) {
        console.log('Login failed - User not found');
        return res.status(401).json({ message: 'Login failed' });
      }
      const passwordMatch = await bcrypt.compare(password, recruitee.password);
      if (passwordMatch) {
        res.json({ message: 'Login successful', recruitee });
      } else {
        res.json({ message: 'Invalid Credentials', recruitee });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error'});
    }
  });

recruiteeRoute.get("/",(req,res)=>{
    recruiteeSchema.find((err,data)=>{
        if(err)
          return err;
        else
          res.json(data);
    })
})


recruiteeRoute.get("/recruiteePage/:id",(req,res)=>{
  recruiteeSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
      if(err){
          return err;
      }
      else{
          res.json(data);
      }
  })
})

recruiteeRoute.get("/recruiteePage/profile/:id",(req,res)=>{
recruiteeSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
  if(err){
      return err;
  }
  else{
      res.json(data);
  }
})
})


recruiteeRoute.route("/profile/:id")
.get((req,res)=>{
    recruiteeSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
}).put((req,res)=>{
    recruiteeSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set:req.body},
    (err,data)=>{
        if(err){
            return err;
        }
        else{
          res.status(200).json({ message: 'Update Successful', data });
        }
    }
    )
})


recruiteeRoute.route("/applyJob/:id")
.get((req,res)=>{
    recruiteeSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
}).put(async (req, res) => {
  const recruiteeId = req.params.id;
  const formData = req.body;
  try {
    const recruitee = await recruiteeSchema.findById(recruiteeId);
    if (!recruitee) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    recruitee.jobsApplied.push({
      userId:formData.userId,
      jobId:formData.jobId,
    });
    const updatedRecruitee = await recruitee.save();
    res.status(200).json({
      message: 'Update Successful',
      data: updatedRecruitee.jobsApplied,
    });
  } catch (error) {
    console.error('Error during job posting:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports=recruiteeRoute;

