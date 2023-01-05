import mongoose from 'mongoose'

const Register_user = mongoose.Schema({
    wantToBe: String,
    Gender : String,
    weekplan : String,
    name : String,
    dob : String,
    weight : String,
    height : String,
    userEmail : String
})

const register_schema  = mongoose.model("User_registration" , Register_user)

export default register_schema;