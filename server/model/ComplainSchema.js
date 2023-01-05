import mongoose from "mongoose";

const complain_schema = mongoose.Schema ({
    email : String,
    subject : String,
    message : String,
    status : String,
    reply : String,
})

const complainSchema = mongoose.model("complainSchema", complain_schema) 
export default complainSchema;