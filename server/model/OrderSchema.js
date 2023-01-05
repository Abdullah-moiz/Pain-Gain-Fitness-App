import mongoose from "mongoose";

const order_schema = mongoose.Schema ({
    username : String,
    userEmail : String,
    address1:String,
    address2:String,
    state:String,
    country:String,
    zipcode:String,
    tracking_id:String,
    status:String,
    cart : Array
})

const orderSchema = mongoose.model("orderSchema", order_schema) 
export default orderSchema;