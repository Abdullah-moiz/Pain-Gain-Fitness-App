import mongoose from "mongoose";


const main_chat_schema =  mongoose.Schema({
    chatID : String,
    senderName : String,
    senderImage : String,
    message : String,    
},{ timestamps: true });


const mainChatSchema =  mongoose.model('Main_Chat' , main_chat_schema);
export default mainChatSchema;