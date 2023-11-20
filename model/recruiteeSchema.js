const mongoose=require("mongoose");
const recruiteeSchema=new mongoose.Schema({
    "username":{type:String},
    "password":{type:String},
    "email":{type:String},
    "phone":{type:String},
    "qualification":{type:String},
    "institutionName":{type:String},
    "fieldName":{type:String},
    "graduationYear":{type:Number},
    "workStatus":{type:String},
    "skills":{type:[String]},
    "resume":{type:Object},
    "linkedinProfile":{type:String},
    "country":{type:String},
    "state":{type:String},
    "city":{type:String},
    "rating":{type:Number},
    "applied":{type:Number},
    "shortlisted":{type:Number},
    "rejected":{type:Number},
    "jobsApplied":{type:[{
        "jobId":{type:String},
        "userId":{type:String},
    }]}
},{
    collection:"recruitees"
})

module.exports=mongoose.model("recruiteeSchema",recruiteeSchema);