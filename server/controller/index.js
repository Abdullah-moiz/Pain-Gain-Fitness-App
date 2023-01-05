import registerSchema from '../model/RegistrationSchema.js';
import cartSchema from '../model/cartSchema.js';
import orderSchema from '../model/OrderSchema.js';
import complainSchema from '../model/ComplainSchema.js';
import supplierApplication from '../model/SupplierApplicationSchema.js';
import personalApplication from '../model/TrainerRegistrationForm.js';
import trainingOrder from '../model/TrainingPAyment.js'
import mainChatSchema from '../model/MainChat.js'
import nodemailer from 'nodemailer'

// ^ register user logic
export const registerUser = async (req, res) => {
    const Data = req.body;
    const email = req.body.userEmail;
    let user = await registerSchema.find({ userEmail: `${email}` })
    if (user.length > 0) {
        return res.send({ msg: "Your Data is Already Stored" })
    }
    else {
        try {
            const saveData = registerSchema(Data);
            await saveData.save()
            res.send({ msg: `Data Saved` });
        } catch (error) {
            console.log('error in saving registered Data ' + error.message);
        }
    }
}

export const getUserData = async (req, res) => {
    const data = req.query;
    try {
        let user = await registerSchema.findOne({ userEmail: `${data.email}` });
        if (user) {
            return res.send(user)
        }
    } catch (error) {
        console.log('Error in getting User Data ')
    }

}

// ``````````````````````````````` cart controller`````````````````````````````````````````````````````````````
// ^ Add to Cart
export const addToCart = async (req, res) => {
    try {
        const Data = req.body;
        let checkItem = await cartSchema.findOne({ $and: [{ product_id: `${Data.product_id}` }, { userEmail: `${Data.userEmail}` }] })
        if (checkItem) {
            res.send({ msg: "Item Already in Cart" })
        }
        else {
            let addToCart = cartSchema(Data)
            await addToCart.save().then(
                res.json({ msg: "Added to Cart" })
            )
        }
    } catch (error) {
        console.log(`error in adding item to cart + ${error.message}`)
    }
}


// ^ access Cart Data
export const getCartData = async (req, res) => {
    const data = req.query;
    const userEmail = data.email;
    try {
        const user = await cartSchema.find({ userEmail: `${userEmail}` })
        if (user) {
            res.send(user);
        }
    } catch (error) {
        console.log('Error in getting cart data ' + error.message);
    }
}



// ^ remove Cart Data
export const removeItemfromCart = async (req, res) => {
    const data = req.query;
    const itemid = data.data.itemId;
    const userEmail = data.data.userEmail;
    try {
        await cartSchema.deleteOne({ $and: [{ product_id: `${itemid}` }, { userEmail: `${userEmail}` }] }).then(res.send({ msg: "Item Removed Successfully" }))
    } catch (error) {
        console.log(error.message + "error in removing item from cart")
    }
}



//^  update Cart price 

export const updateCart = async (req, res) => {
    let data = req.body;
    const itemid = data.itemId;
    const userEmail = data.userEmail;
    const quantity = data.product_quantity;
    try {
        await cartSchema.findOneAndUpdate({ $and: [{ product_id: `${itemid}` }, { userEmail: `${userEmail}` }] }, { $set: { "product_quantity": quantity } })
            .then(res.send({ msg: "refresh" }))
    } catch (error) {
        console.log(error.message)
    }
}





// `````````````````````````````````````````````````````````````cart Controller Ended`````````````````````````````````````````````````````````````````



// `````````````````````````````````````````````````````````````Order Controller start`````````````````````````````````````````````````````````````````

export const OrderData = async (req, res) => {
    let data = req.body;
    try {
        let orderdata = orderSchema(data);
        await orderdata.save();
        return res.json({ msg: "Order Placed Successfully" })
    } catch (error) {
        console.log('error in saving order details' + error.message)
    }
}

export const userOrderData = async (req, res) => {
    const data = req.query;
    const userEmail = data.email;


    try {
        const user = await orderSchema.find({ userEmail: `${userEmail}` })
        if (user) {
            res.send(user);
        }
    } catch (error) {
        console.log('Error in getting order data ' + error.message);
    }

}


export const getorderDataById = async (req, res) => {
    const data = req.query;
    const id = data.id;
    try {
        const user = await orderSchema.find({ _id: `${id}` })
        if (user) {
            res.send(user);
        }
    } catch (error) {
        console.log('Error in getting order data by id ' + error.message);
    }

}

//``````````````````````````````````````````````````Suppliers ```````````````````````````````````````````

export const getAllOrderData = async (req, res) => {
    const data = req.query;
    const id = data.id;
    try {
        const user = await orderSchema.find({})
        if (user) {
            res.send(user);
        }
    } catch (error) {
        console.log('Error in getting order data by id ' + error.message);
    }

}

export const OrderStatus = async (req, res) => {
    const data = req.body;
    const id = data.id;
    const status = data.status;
    try {
        const user = await orderSchema.findOneAndUpdate({ _id: `${id}` }, { $set: { status: `${status}` } })
    } catch (error) {
        console.log('Error in getting order data by id  for supplier' + error.message);
    }

}





// ------------------------- Admin -----------------------------------------------------------------------------------------


export const cusComplain = async (req, res) => {
    const Data = req.body;
    try {
        const saveData = complainSchema(Data)
        await saveData.save();
        return res.send({ msg: "Your Message Is Successfully Delivered" })
    } catch (error) {
        console.log('error from saving complain' + error.message)
    }
}

export const allComplain = async (req, res) => {

    try {
        let data = await complainSchema.find({});
        return res.send(data)
    } catch (error) {
        console.log('error from getting all complain' + error.message)
    }
}

export const complainDetail = async (req, res) => {
    const data = req.query;
    const id = data.id;
    try {
        const user = await complainSchema.find({ _id: `${id}` })
        if (user) {
            res.send(user);
        }
    } catch (error) {
        console.log('Error in getting order data by id ' + error.message);
    }

}

export const adminReply = async (req, res) => {
    const data = req.body;
    const id = data.id;
    const reply = data.reply
    try {
        await complainSchema.findOneAndUpdate({ $and: [{ _id: `${id}` }] }, { $set: { "reply": reply, "status": "Solved" } })
            .then(res.send({ msg: "Reply Submitted Successfully" }))
    } catch (error) {
        console.log(error.message)
    }
}

// ---------------------------------------------- cus complain view -----------------------------------------------------
export const getSpecificUSerDetail = async (req, res) => {
    const data = req.query;
    const email = data.email;
    try {
        const user = await complainSchema.find({ email: `${email}` })
        if (user) {
            res.send(user);
        }
    } catch (error) {
        console.log('Error in getting complain data for cus by email ' + error.message);
    }
}



// --------------------supplier registration----------------------------------------------------------------------
export const saveSupplierApplication = async (req, res) => {
    const data = req.body;
    let name = data.name;
    (async () => {

        try {

            const transporter = nodemailer.createTransport({

                service: 'gmail',

                hosts: 'smpt.gmail.com',

                auth: {

                    user: 'laravelprojectofc@gmail.com',

                    pass: 'traqkgwrgcptnrty'
                }

            });

            await transporter.sendMail({

                from: 'laravelprojectofc@gmail.com',


                to: "mrmoiz.dev@gmail.com",

                subject: "You Received a Message ",

                html: `Your Received an Application from ${name}`,
                text: `Your Received a message from ${name}`

            });

            console.log("email sent sucessfully");

        } catch (error) {

            console.log("email not sent");

            console.log(error);
        }
    })()

    try {
        const savedata = supplierApplication(data);
        await savedata.save();
        return res.send({ msg: "Your Application is submitted Successfully " })
    } catch (error) {
        console.log("error in saving supplier Application" + error.message)
    }
}
export const getSupplierApplication = async (req, res) => {
    try {
        let user = await supplierApplication.find({});
        return res.send(user)
    } catch (error) {
        console.log("error in saving supplier Application" + error.message)
    }
}


// ------------------------------------------------------- trainer appliction

export const saveTrainerApplication = async (req, res) => {
    const data = req.body;
    let name = data.name;
    (async () => {

        try {

            const transporter = nodemailer.createTransport({

                service: 'gmail',

                hosts: 'smpt.gmail.com',

                auth: {

                    user: 'laravelprojectofc@gmail.com',

                    pass: 'traqkgwrgcptnrty'
                }

            });

            await transporter.sendMail({

                from: 'laravelprojectofc@gmail.com',


                to: "mrmoiz.dev@gmail.com",

                subject: "You Received a Message ",

                html: `Your Received an Application from ${name}`,
                text: `Your Received a message from ${name}`

            });

            console.log("email sent sucessfully");

        } catch (error) {

            console.log("email not sent");

            console.log(error);
        }
    })()

    try {
        const savedata = personalApplication(data);
        await savedata.save();
        return res.send({ msg: "Your Application is submitted Successfully " })
    } catch (error) {
        console.log("error in saving supplier Application" + error.message)
    }
}



export const getTrainerApplication = async (req, res) => {
    try {
        let user = await personalApplication.find({});
        return res.send(user)
    } catch (error) {
        console.log("error in saving supplier Application" + error.message)
    }
}


export const TrainingPayment = async (req, res) => {
    const data = req.body;
    const trainerID = data.trainerID;
    const userEmail = data.userEmail;



    try {
        const check = await trainingOrder.findOne({ $and: [{ userEmail: `${userEmail}` }, { trainerID: `${trainerID}` }] });
        if (check) {
            return res.send({ msg: "You cannot hire Active Trainer more then once" })
        }
        else {
            const saveData = trainingOrder(data);
            await saveData.save();
            return res.send({ msg: "Payment Successfull" })
        }
    } catch (error) {
        console.log('error in saving Training Data ' + error.message)
    }
}


export const getTrainerData = async (req, res) => {
    const data = req.query;
    const comingId = data.getid;
    const id = comingId.slice(1);
    try {
        const user = await personalApplication.find({ _id: `${id}` })
        if (user) {
            res.send(user);
        }
    } catch (error) {
        console.log('Error in getting order data by id ' + error.message);
    }
}

export const hireUserData = async (req, res) => {
    const data = req.query;
    const email = data.userEmail;
    try {
        const user = await trainingOrder.find({ userEmail: `${email}` }).populate("trainerID");
        if (user) {
            res.send(user)
        }
    } catch (error) {
        console.log('Error in getting order data by id ' + error.message);
    }
}

export const studentsData = async (req, res) => {
    const data = req.query;
    const id = data.id;
    if (id != "") {
        try {
            const user = await trainingOrder.find({ trainerID: `${id}` }).populate("trainerID");
            if (user) {
                res.send(user)
            }
        } catch (error) {
            console.log('Error in getting order data by id ' + error.message);
        }
    }
}





// ------------------------------------- MAIN CHAT MODULE -----------------------------------------------------------------

export const sendMessage = async (req, res) => {
    const data = req.body;


    try {
        const saveData = mainChatSchema(data);
        await saveData.save();
    } catch (error) {
        console.log('error in saving main chat Data')
    }

}

export const getMessage = async (req, res) => {
    const data = req.query;
    const chatID = data.chatID;

    try {
        const user = await mainChatSchema.find({ chatID: `${chatID}` });
        if (user) {
            return res.send(user)
        }
    } catch (error) {
        console.log('error in getting user message')
    }

}






