import express from "express";
const Router = express.Router();
import { registerUser, hireUserData, getTrainerData, getTrainerApplication, TrainingPayment, saveTrainerApplication, getSupplierApplication,
     saveSupplierApplication, getSpecificUSerDetail, adminReply, allComplain, complainDetail, cusComplain, getUserData, OrderStatus, 
     getAllOrderData, getorderDataById, addToCart, userOrderData, OrderData, getCartData, removeItemfromCart, updateCart , studentsData} from '../controller/index.js'

import {sendMessage , getMessage}  from '../controller/index.js'



Router.post('/registerUser', registerUser)
Router.get('/getUserData', getUserData);


// `````````````` Cart Routes  ```````````````````````````````````````````````````

Router.post('/AddtoCart', addToCart)

Router.get('/getUserCartItem', getCartData)

Router.delete('/RemoveITemFromCart', removeItemfromCart)

Router.put('/updateCart', updateCart)

// `````````````` Cart Routes  Ended ```````````````````````````````````````````````````

Router.post('/orderData', OrderData)
Router.get('/userorderData', userOrderData)
Router.get('/userorderData/:id', getorderDataById)


// ------------ get supplier Data ------------------------------------------

Router.get('/getAllOrdersData', getAllOrderData);
Router.put('/ChangeOrderStatus', OrderStatus);

// -------------- cus Complain Routes ---------------------------------------
Router.post('/userComplain', cusComplain)
Router.get('/getAllComplain', allComplain)
Router.get('/userComplaindata/:id', complainDetail)
Router.put('/updateReply', adminReply)
Router.get('/getspecificCusDetail', getSpecificUSerDetail)

// -------------------Supplier Registration ---------------------------------------------
Router.post('/saveSupplierApplication', saveSupplierApplication)
Router.get('/getAllApplications', getSupplierApplication)


// ------------------ Personal Trainer Registration ---------------------------------------
Router.post('/saveTrainerForm', saveTrainerApplication)
Router.get('/getAllApplicationspersonal', getTrainerApplication)
Router.post('/saveTrainingPayment', TrainingPayment)
Router.get('/gettraineeData', getTrainerData)
Router.get('/getHiredUserData', hireUserData)
Router.get('/getHiringStudentsData', studentsData)





// ---------------------------- MAIN CHAT ROUTES -----------------------------------------------------
Router.post('/send-message' ,  sendMessage)
Router.get('/get-message' , getMessage);

export default Router;