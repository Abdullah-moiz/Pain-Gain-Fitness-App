import mongoose from "mongoose";

const personalTrainerSchema = mongoose.Schema ({
    name : String , 
    email : String , 
    country : String , 
    state : String , 
    address : String , 
    zipcode : String ,  
    city : String , 
    availableStart : String ,
    availableEnd : String ,
    img : String , 
})

const personalApplication = mongoose.model("PersonalTrainerSchema", personalTrainerSchema) 
export default personalApplication;