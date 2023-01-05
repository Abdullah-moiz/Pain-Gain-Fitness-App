import mongoose from "mongoose";

const supApplication = mongoose.Schema ({
    name : String , 
    email : String , 
    country : String , 
    state : String , 
    address : String , 
    zipcode : String ,  
    city : String , 
    img : String , 
})

const supplierApplication = mongoose.model("supplierApplication", supApplication) 
export default supplierApplication;