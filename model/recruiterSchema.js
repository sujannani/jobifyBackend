const mongoose=require("mongoose");
const recruiterSchema=new mongoose.Schema({
    "username":{type:String},
    "password":{type:String},
    "email":{type:String},
    "phone":{type:String},
    "company":{type:String},
    "country":{type:String},
    "state":{type:String},
    "city":{type:String},
    "accepted":{type:Number},
    "rejected":{type:Number},
    "shortlisted":{type:Number},
    "applicationsPosted":{type:[{
        "title":{type:String},
        "role":{type:String},
        "location":{type:String},
        "jobMode":{type:String},
        "salary":{type:Number},
        "skills":{type:[String]},
        "description":{type:String},
        "hrId":{type:String},
    }]},
    "applicationsReceived":{type:[{
        "jobId":{type:String},
        "userId":{type:String},
        "username":{type:String},
        "title":{type:String},
        "description":{type:String}
    }]}
},{
    collection:"recruiters"
})

module.exports=mongoose.model("recruiterSchema",recruiterSchema);