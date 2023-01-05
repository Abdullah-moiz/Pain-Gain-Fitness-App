import mongoose from "mongoose";

const gainer_schema = mongoose.Schema ({
    product_name  : String,
    product_price : String,
    product_img  : String,
    product_weight : String,
    product_desc : String,
    product_quantity : Number
})

const Gainer_Schema = mongoose.model("massGainer_e_commerce_data", gainer_schema) 

export default Gainer_Schema;