const mongo = require('mongoose');

const connect = async() => {
    try{
        await mongo.connect(process.env.MONGODB_URI)
    }catch (error){
        process.exit(1); // Exit process with failure
    }




}

module.exports = connectdb;