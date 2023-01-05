import mongoose from "mongoose";

const cart_Schema = mongoose.Schema ({
    userEmail : String,
    product_id : String,
    product_name  : String,
    product_price : String,
    product_img  : String,
    product_weight : String,
    product_desc : String,
    product_quantity : Number
})

const cartSchema = mongoose.model("cart_Schema", cart_Schema) 
export default cartSchema;