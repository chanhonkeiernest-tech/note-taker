const mongo = require('mongoose');

const connectdb = async() => {
    try{
        await mongo.connect(process.env.MONGODB_URI)
    }catch (error){
        console.log(error);
        process.exit(1); // Exit process with failure
    }




}

module.exports = connectdb;