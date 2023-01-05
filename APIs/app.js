import express from "express";
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import AppRoutes from './Routes/index.js'
const Port =  5010;


const connection_Url = process.env.connectionUrl

app.use(cors());
app.use(bodyParser.urlencoded({limit : '50mb' , extended : true}))
app.use(bodyParser.json({limit : '50mb' }));


mongoose.connect(connection_Url,{useNewUrlParser : true , useUnifiedTopology : true})
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log("Getting Error from DB connection" + err.message))







app.use('/',AppRoutes)

app.listen(Port,() => {
    console.log(`Server is running at http://localhost:${Port}`);
})

