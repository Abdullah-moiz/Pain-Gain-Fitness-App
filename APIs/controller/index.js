import machines_Schema from '../model/dumbbellSchema.js';
import dumbellSchema from '../model/dumbbellSchema.js'
import gainerSchema from '../model/gainerSchema.js'
import access_Schema from '../model/GymAssessories.js';
import assessoriesschema from '../model/GymAssessories.js'


// ^ machine Data logic

export const machineData = async (req, res) => {
    const data = req.body;
    try {
        const savingData = dumbellSchema(data);
        await savingData.save();
        console.log("Data Saved in machine collection");
    } catch (error) {
        console.log('message from machineData saving' + error.message);
    }
}

let getmachineidData;
export const searchmachineid = async (req, res) => {
    const data = req.body;
    const finalId = data.id
    console.log('ID RECEIVED : ' + finalId);
    getmachineidData = finalId;
}


export const getmachineIdData = async (req, res) => {
    try {
        if (getmachineIdData != null) {
            await dumbellSchema.findById(`${getmachineidData}`)
                .then(data => res.send(data))
                .then(console.log('Data dispatch to client'))
        }
        else {
            console.log('no ID received');
        }
    }
    catch (err) {
        console.log('error from sending machine Data');
    }
}


export const deletemachineData = async (req, res) => {
    try {
        if (getmachineIdData != null) {
            await dumbellSchema.findByIdAndDelete(`${getmachineidData}`)

                .then(console.log(' machine Data Deleted '))
        }
        else {
            console.log('no ID received');
        }
    }
    catch (err) {
        console.log('error from deleting machine Data');
    }
}



// ^ Gainer Logic

export const GainerData = async (req, res) => {
    const data = req.body;
    try {
        const saveGainerData = gainerSchema(data);
        await saveGainerData.save();
        console.log('data saved in gainer collections');
    } catch (error) {
        console.log(`Error in saving gainer Data  + ${error.message}`)
    }
}

export const getGainerdata = async (req, res) => {
    try {
        if (getmachineIdData != null) {
            await gainerSchema.findById(`${getmachineidData}`)
                .then(data => res.send(data))
                .then(console.log('Data dispatch to client'))
        }
        else {
            console.log('no ID received');
        }
    }
    catch (err) {
        console.log('error from sending machine Data');
    }
}


export const deleteGainerData = async (req, res) => {
    try {
        if (getmachineIdData != null) {
            await gainerSchema.findByIdAndDelete(`${getmachineidData}`)

                .then(console.log(' gainer Data Deleted '))
        }
        else {
            console.log('no ID received');
        }
    }
    catch (err) {
        console.log('error from deleting gainer Data');
    }
}



// ^ assessories logic

export const assessoriesData = async (req, res) => {
    const data = req.body;
    try {
        const saveassessoriesData = assessoriesschema(data);
        await saveassessoriesData.save();
        console.log('data saved in assessories collections');
    } catch (error) {
        console.log(`Error in saving assessories Data  + ${error.message}`)
    }
}

export const getassessoriesData = async (req, res) => {
    try {
        if (getmachineIdData != null) {
            await assessoriesData.findById(`${getmachineidData}`)
                .then(data => res.send(data))
                .then(console.log('Data dispatch to client'))
        }
        else {
            console.log('no ID received');
        }
    }
    catch (err) {
        console.log('error from sending assessories Data');
    }
}


export const deleteassessoriesData = async (req, res) => {
    try {
        if (getmachineIdData != null) {
            await assessoriesschema.findByIdAndDelete(`${getmachineidData}`)

                .then(console.log(' assessories Data Deleted '))
        }
        else {
            console.log('no ID received');
        }
    }
    catch (err) {
        console.log('error from deleting assessories Data');
    }
}



// fetch All the data
export const getAllmachineData = async (req, res) => {
    try {
      let Data =   await machines_Schema.find({}).limit(50);
      await res.send(Data)
    } catch (error) {
        console.log('error fetching all machine Data' + error.message);
    }
}
export const getAllaccessoriesData = async (req, res) => {
    try {
        let Data =   await access_Schema.find({}).limit(50);
        await res.send(Data)
        
    } catch (error) {
        console.log('error fetching all accessories Data' + error.message);

    }
}
export const getAllmedicineData = async (req, res) => {
    try {
        let Data =   await gainerSchema.find({}).limit(50);
        await res.send(Data)
    } catch (error) {
        console.log('error fetching all medicine Data' + error.message);
    }
}


