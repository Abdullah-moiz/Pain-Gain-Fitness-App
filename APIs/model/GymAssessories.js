import mongoose from "mongoose";

const accessories_schema = mongoose.Schema ({
    product_name  : String,
    product_price : String,
    product_img  : String,
    product_weight : String,
    product_desc : String,
    product_quantity : Number
})

const access_Schema = mongoose.model("gymAssesories_e_commerce_data", accessories_schema) 
export default access_Schema;