import mongoose from "mongoose";

const machine_schema = mongoose.Schema ({
    product_name  : String,
    product_price : String,
    product_img  : String,
    product_desc : String,
    product_weight : String , 
    product_quantity : Number
})


const machines_Schema = mongoose.model("machine_data_e_commerce", machine_schema) 
export default machines_Schema;