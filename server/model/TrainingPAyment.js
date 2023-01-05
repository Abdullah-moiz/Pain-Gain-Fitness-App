import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId

const traningOrder_schema = mongoose.Schema({
    username: String,
    userEmail: String,
    address1: String,
    address2: String,
    state: String,
    country: String,
    zipcode: String,
    tracking_id: String,
    status: String,
    trainingStart: String,
    trainingEnd: String,
    img: String,
    trainerID: {
        type: ObjectId,
        ref: 'PersonalTrainerSchema'
    },
})

const trainingOrder = mongoose.model("TrainingOrderSchema", traningOrder_schema)
export default trainingOrder;